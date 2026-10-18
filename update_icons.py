import os
from PIL import Image, ImageOps

src_path = r"C:\Users\Saidimar Rey\.gemini\antigravity\brain\c84f65b5-1b2a-4ea6-a3df-9e550f5c6ae6\dawntactics_icon_pure_1790701669192.jpg"

if not os.path.exists(src_path):
    raise FileNotFoundError(f"Source image not found: {src_path}")

img = Image.open(src_path).convert("RGBA")

# 1. Standard 512x512 & 192x192
icon_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
icon_192 = img.resize((192, 192), Image.Resampling.LANCZOS)

icon_512.save("public/icon-512.png", "PNG")
icon_192.save("public/icon-192.png", "PNG")

# 2. Maskable icons (scaled down to 80% with dark theme background #0A0E17 for Android safe zone)
bg_color = (10, 14, 23, 255)

def make_maskable(size):
    canvas = Image.new("RGBA", (size, size), bg_color)
    content_size = int(size * 0.82)
    resized_content = img.resize((content_size, content_size), Image.Resampling.LANCZOS)
    offset = (size - content_size) // 2
    canvas.paste(resized_content, (offset, offset), resized_content)
    return canvas

maskable_512 = make_maskable(512)
maskable_192 = make_maskable(192)

maskable_512.save("public/icon-maskable-512.png", "PNG")
maskable_192.save("public/icon-maskable-192.png", "PNG")

# Copy to dist as well
os.makedirs("dist", exist_ok=True)
icon_512.save("dist/icon-512.png", "PNG")
icon_192.save("dist/icon-192.png", "PNG")
maskable_512.save("dist/icon-maskable-512.png", "PNG")
maskable_192.save("dist/icon-maskable-192.png", "PNG")

print("Successfully updated public/ and dist/ with the new Mythic icon assets!")
