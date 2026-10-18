import base64
import os

with open('public/icon-192.png', 'rb') as f:
    icon_b64 = base64.b64encode(f.read()).decode('utf-8')

mobileconfig_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>FullScreen</key>
            <true/>
            <key>Icon</key>
            <data>{icon_b64}</data>
            <key>IsRemovable</key>
            <true/>
            <key>Label</key>
            <string>DawnTactics AI</string>
            <key>PayloadDescription</key>
            <string>Mobile Legends: Bang Bang Draft &amp; Itemization Tactical Engine</string>
            <key>PayloadDisplayName</key>
            <string>DawnTactics AI Web Clip</string>
            <key>PayloadIdentifier</key>
            <string>com.dawntactics.ai.webclip</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>e90680d2-97b7-4c3e-967b-d2c67b93cfa1</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>https://dawntactics-ai-production.up.railway.app/</string>
        </dict>
    </array>
    <key>PayloadDescription</key>
    <string>Installs the DawnTactics AI Land of Dawn Draft Intelligence &amp; Itemization Engine onto your iPhone home screen.</string>
    <key>PayloadDisplayName</key>
    <string>DawnTactics AI</string>
    <key>PayloadIdentifier</key>
    <string>com.dawntactics.ai.profile</string>
    <key>PayloadOrganization</key>
    <string>DawnTactics AI</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>4b939d88-7ff6-427c-9b16-e414c22998a4</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>"""

with open('public/DawnTactics.mobileconfig', 'w', encoding='utf-8') as f:
    f.write(mobileconfig_content)

print(f"Generated public/DawnTactics.mobileconfig, size: {os.path.getsize('public/DawnTactics.mobileconfig')} bytes")
