import math
from PIL import Image, ImageDraw, ImageFont

def draw_mythic_icon(size, is_maskable=False):
    img = Image.new("RGBA", (size, size), (10, 14, 23, 255))
    draw = ImageDraw.Draw(img)
    
    # Safe zone padding for maskable
    padding = size * 0.18 if is_maskable else size * 0.08
    cx, cy = size / 2, size / 2
    r = (size / 2) - padding
    
    # Background subtle radial/diamond glow
    for step in range(12, 0, -1):
        glow_r = r * (1 + step * 0.04)
        alpha = int(18 * (1 - step / 13))
        draw.ellipse([cx - glow_r, cy - glow_r, cx + glow_r, cy + glow_r], fill=(245, 158, 11, alpha))

    # Outer Shield / Crest
    shield_pts = [
        (cx, cy - r),
        (cx + r * 0.85, cy - r * 0.65),
        (cx + r * 0.80, cy + r * 0.25),
        (cx, cy + r),
        (cx - r * 0.80, cy + r * 0.25),
        (cx - r * 0.85, cy - r * 0.65),
    ]
    draw.polygon(shield_pts, fill=(17, 24, 39, 255), outline=(245, 158, 11, 255), width=max(2, int(size * 0.02)))
    
    # Inner border
    inner_r = r * 0.86
    inner_pts = [
        (cx, cy - inner_r),
        (cx + inner_r * 0.85, cy - inner_r * 0.65),
        (cx + inner_r * 0.80, cy + inner_r * 0.25),
        (cx, cy + inner_r),
        (cx - inner_r * 0.80, cy + inner_r * 0.25),
        (cx - inner_r * 0.85, cy - inner_r * 0.65),
    ]
    draw.polygon(inner_pts, outline=(217, 119, 6, 180), width=max(1, int(size * 0.01)))

    # Central Mythic 8-point Star
    star_r_outer = r * 0.52
    star_r_inner = r * 0.22
    star_pts = []
    for i in range(16):
        ang = i * (math.pi / 8) - math.pi / 2
        cur_r = star_r_outer if i % 2 == 0 else star_r_inner
        star_pts.append((cx + cur_r * math.cos(ang), cy + cur_r * math.sin(ang)))
    draw.polygon(star_pts, fill=(245, 158, 11, 255), outline=(254, 240, 138, 255), width=max(1, int(size * 0.012)))

    # Core Diamond
    core_r = r * 0.16
    core_pts = [
        (cx, cy - core_r),
        (cx + core_r, cy),
        (cx, cy + core_r),
        (cx - core_r, cy),
    ]
    draw.polygon(core_pts, fill=(255, 255, 255, 255))
    
    return img

def draw_screenshot_desktop():
    w, h = 1280, 720
    img = Image.new("RGBA", (w, h), (10, 14, 23, 255))
    draw = ImageDraw.Draw(img)
    
    # Header bar
    draw.rectangle([0, 0, w, 64], fill=(17, 24, 39, 255), outline=(30, 41, 59, 255))
    draw.rectangle([32, 20, 240, 44], fill=(245, 158, 11, 40), outline=(245, 158, 11, 180))
    
    # Bans Bar
    draw.rounded_rectangle([32, 80, w - 32, 130], radius=12, fill=(17, 24, 39, 200), outline=(30, 41, 59, 255))
    
    # 5v5 Main Draft Board (Blue 5 slots, Center Win Rate Gauge, Red 5 slots)
    slot_w, slot_h = 360, 420
    # Blue box
    draw.rounded_rectangle([32, 150, 32 + slot_w, 150 + slot_h], radius=16, fill=(15, 23, 42, 220), outline=(59, 130, 246, 120))
    # Center box
    draw.rounded_rectangle([420, 150, 420 + 440, 150 + slot_h], radius=16, fill=(17, 24, 39, 240), outline=(245, 158, 11, 100))
    # Red box
    draw.rounded_rectangle([w - 32 - slot_w, 150, w - 32, 150 + slot_h], radius=16, fill=(24, 15, 20, 220), outline=(239, 68, 68, 120))

    # Center Winrate Gauge Arc
    draw.ellipse([540, 200, 740, 400], outline=(245, 158, 11, 255), width=8)

    # Bottom Tactical Intelligence Suite
    draw.rounded_rectangle([32, 590, w - 32, 695], radius=14, fill=(17, 24, 39, 230), outline=(245, 158, 11, 80))
    
    return img

def draw_screenshot_mobile():
    w, h = 720, 1280
    img = Image.new("RGBA", (w, h), (10, 14, 23, 255))
    draw = ImageDraw.Draw(img)
    
    # Header
    draw.rectangle([0, 0, w, 80], fill=(17, 24, 39, 255), outline=(30, 41, 59, 255))
    
    # Top bans
    draw.rounded_rectangle([24, 100, w - 24, 170], radius=12, fill=(17, 24, 39, 200), outline=(30, 41, 59, 255))
    
    # Win rate Gauge
    draw.rounded_rectangle([24, 190, w - 24, 370], radius=16, fill=(17, 24, 39, 240), outline=(245, 158, 11, 120))
    draw.ellipse([w/2 - 70, 220, w/2 + 70, 360], outline=(245, 158, 11, 255), width=6)

    # Blue Heroes
    draw.rounded_rectangle([24, 390, w - 24, 690], radius=16, fill=(15, 23, 42, 220), outline=(59, 130, 246, 120))
    
    # Red Heroes
    draw.rounded_rectangle([24, 710, w - 24, 1010], radius=16, fill=(24, 15, 20, 220), outline=(239, 68, 68, 120))

    # Bottom nav
    draw.rounded_rectangle([24, 1030, w - 24, 1240], radius=14, fill=(17, 24, 39, 230), outline=(245, 158, 11, 80))
    
    return img

if __name__ == "__main__":
    print("Generating icons and screenshots...")
    # Standard Icons
    draw_mythic_icon(192, is_maskable=False).save("public/icon-192.png")
    draw_mythic_icon(512, is_maskable=False).save("public/icon-512.png")
    
    # Maskable Icons (safe zone padding)
    draw_mythic_icon(192, is_maskable=True).save("public/icon-maskable-192.png")
    draw_mythic_icon(512, is_maskable=True).save("public/icon-maskable-512.png")

    # Screenshots
    draw_screenshot_desktop().save("public/screenshot-desktop.png")
    draw_screenshot_mobile().save("public/screenshot-mobile.png")
    print("Icons and screenshots generated successfully in public/!")
