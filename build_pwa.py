import os
import sys
import time
import json
import re
import zipfile
import subprocess
import urllib.request
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading

BASE_API = 'https://pwabuilder-cloudapk.azurewebsites.net'
PORT = 8080
DIST_DIR = os.path.abspath('dist')

class DistHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    
    def log_message(self, format, *args):
        # Silence normal HTTP access logs
        pass

def start_http_server():
    server = HTTPServer(('127.0.0.1', PORT), DistHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    print(f"Local HTTP server serving {DIST_DIR} on http://127.0.0.1:{PORT}", flush=True)
    return server

def start_cloudflared():
    cloudflared_path = os.path.abspath('cloudflared.exe')
    if not os.path.exists(cloudflared_path):
        raise FileNotFoundError(f"cloudflared.exe not found at {cloudflared_path}")
    
    cmd = [cloudflared_path, 'tunnel', '--url', f'http://127.0.0.1:{PORT}']
    print(f"Starting tunnel with: {' '.join(cmd)}", flush=True)
    
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
    
    tunnel_url = None
    url_pattern = re.compile(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com')
    
    start_time = time.time()
    while time.time() - start_time < 35:
        line = proc.stdout.readline()
        if not line:
            time.sleep(0.1)
            continue
        print("  [cloudflared]", line.strip(), flush=True)
        match = url_pattern.search(line)
        if match:
            tunnel_url = match.group(0)
            break
            
    if not tunnel_url:
        proc.terminate()
        raise TimeoutError("Failed to extract trycloudflare.com tunnel URL within 35s")
        
    print(f"\n>>> Established Cloudflare Tunnel: {tunnel_url}\n", flush=True)
    print("Waiting 8 seconds for Cloudflare edge DNS propagation...", flush=True)
    time.sleep(8)
    return proc, tunnel_url

def package_pwa(full_pwa_url):
    host_url = urllib.parse.urlparse(full_pwa_url).netloc
    
    options = {
        "additionalTrustedOrigins": [],
        "appVersion": "1.0.0.0",
        "appVersionCode": 1,
        "backgroundColor": "#0A0E17",
        "display": "standalone",
        "enableSiteSettingsShortcut": True,
        "enableNotifications": False,
        "includeSourceCode": True,
        "fallbackType": "customtabs",
        "features": {
            "locationDelegation": {"enabled": False},
            "playBilling": {"enabled": False}
        },
        "host": host_url,
        "iconUrl": full_pwa_url + "/icon-512.png",
        "maskableIconUrl": full_pwa_url + "/icon-maskable-512.png",
        "launcherName": "DawnTactics",
        "name": "DawnTactics AI",
        "navigationColor": "#0A0E17",
        "navigationColorDark": "#0A0E17",
        "navigationDividerColor": "#F59E0B",
        "navigationDividerColorDark": "#F59E0B",
        "orientation": "default",
        "packageId": "com.dawntactics.ai",
        "pwaUrl": full_pwa_url,
        "shortcuts": [
            {
                "name": "Live Draft Simulator",
                "short_name": "Live Draft",
                "url": "/#draft",
                "icons": [{"sizes": "192x192", "src": full_pwa_url + "/icon-192.png"}]
            },
            {
                "name": "Equipment Matrix",
                "short_name": "Item Builder",
                "url": "/#itemization",
                "icons": [{"sizes": "192x192", "src": full_pwa_url + "/icon-192.png"}]
            }
        ],
        "signingMode": "new",
        "signing": {
            "file": None,
            "alias": "dawntactics-key",
            "fullName": "Saidimar Rey",
            "organization": "DawnTactics",
            "organizationalUnit": "Esports Engineering",
            "countryCode": "PH",
            "keyPassword": "Password123!",
            "storePassword": "Password123!"
        },
        "splashScreenFadeOutDuration": 300,
        "startUrl": "/",
        "themeColor": "#0A0E17",
        "themeColorDark": "#0A0E17",
        "webManifestUrl": full_pwa_url + "/manifest.json"
    }

    data = json.dumps(options).encode('utf-8')
    headers = {
        'Content-Type': 'application/json',
        'platform-identifier': 'ServerUI',
        'platform-identifier-version': '1.0.0',
        'User-Agent': 'Mozilla/5.0'
    }

    print(f"Connecting to PWABuilder CloudAPK API for host: {host_url}...", flush=True)
    req = urllib.request.Request(BASE_API + '/enqueuePackageJob', data=data, headers=headers)

    with urllib.request.urlopen(req, timeout=30) as resp:
        job_id = resp.read().decode('utf-8').strip('"')
        print(f"Enqueued Job Successfully! Job ID: {job_id}", flush=True)

    for attempt in range(80):
        time.sleep(3)
        poll_url = BASE_API + '/getPackageJob?id=' + urllib.parse.quote(job_id)
        poll_req = urllib.request.Request(poll_url, headers=headers)
        with urllib.request.urlopen(poll_req, timeout=30) as poll_resp:
            job_status = json.loads(poll_resp.read().decode('utf-8'))
            status = job_status.get('status')
            logs = job_status.get('logs', [])
            if logs:
                print(f"[{status}] {logs[-1]}", flush=True)
            else:
                print(f"Attempt {attempt+1}: Status = {status}", flush=True)

            if status == 'Completed':
                print("\n=== PWABuilder Build Succeeded! Downloading Android Package ===", flush=True)
                dl_url = BASE_API + '/downloadPackageZip?id=' + urllib.parse.quote(job_id)
                dl_req = urllib.request.Request(dl_url, headers=headers)
                with urllib.request.urlopen(dl_req, timeout=120) as dl_resp:
                    zip_content = dl_resp.read()
                    zip_file = "DawnTactics-Android-PWABuilder.zip"
                    with open(zip_file, "wb") as f:
                        f.write(zip_content)
                    print(f"Saved: {zip_file} ({len(zip_content)} bytes)", flush=True)

                # Extract artifacts from zip
                with zipfile.ZipFile(zip_file, 'r') as z:
                    for name in z.namelist():
                        if name.endswith('app-release-signed.apk'):
                            with open('DawnTactics.apk', 'wb') as apk_out:
                                apk_out.write(z.read(name))
                            print("Extracted: DawnTactics.apk", flush=True)
                        elif name.endswith('app-release-signed.aab'):
                            with open('DawnTactics.aab', 'wb') as aab_out:
                                aab_out.write(z.read(name))
                            print("Extracted: DawnTactics.aab", flush=True)
                        elif name.endswith('assetlinks.json'):
                            os.makedirs('.well-known', exist_ok=True)
                            with open('.well-known/assetlinks.json', 'wb') as al_out:
                                al_out.write(z.read(name))
                            with open('assetlinks.json', 'wb') as al_out2:
                                al_out2.write(z.read(name))
                            print("Extracted: assetlinks.json", flush=True)
                        elif name.endswith('signingKey.keystore'):
                            with open('signingKey.keystore', 'wb') as ks_out:
                                ks_out.write(z.read(name))
                            print("Extracted: signingKey.keystore", flush=True)
                return True
            elif status == 'Failed':
                print("Build Failed. Logs:", flush=True)
                for line in logs:
                    print("  ", line, flush=True)
                return False
    return False

def main():
    server = start_http_server()
    cf_proc = None
    try:
        cf_proc, tunnel_url = start_cloudflared()
        success = package_pwa(tunnel_url)
        if success:
            print("\n>>> [SUCCESS] STANDALONE ANDROID & DESKTOP BUILD COMPLETE! <<<\n", flush=True)
        else:
            print("\n>>> [FAILED] Build did not complete successfully. <<<\n", flush=True)
    finally:
        if cf_proc:
            cf_proc.terminate()
            print("Cloudflare tunnel terminated.", flush=True)
        server.shutdown()
        print("Local HTTP server shut down.", flush=True)

if __name__ == '__main__':
    main()
