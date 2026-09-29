import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    width = 1200
    height = 630
    
    # 1. Background with rich dark emerald gradient
    img = Image.new("RGBA", (width, height), (3, 15, 9, 255))
    draw = ImageDraw.Draw(img)

    # Draw gradient strips from top-left emerald to bottom-right slate dark
    for y in range(height):
        ratio = y / height
        r = int(2 + (1 - ratio) * 10)
        g = int(24 + (1 - ratio) * 84)
        b = int(14 + (1 - ratio) * 39)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Decorative emerald glow circles
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([(-100, -100), (500, 500)], fill=(0, 108, 53, 60))
    glow_draw.ellipse([(800, 200), (1350, 750)], fill=(74, 222, 128, 30))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # Subtle grid accent lines
    for x in range(0, width, 120):
        draw.line([(x, 0), (x, height)], fill=(255, 255, 255, 6), width=1)
    for y in range(0, height, 120):
        draw.line([(0, y), (width, y)], fill=(255, 255, 255, 6), width=1)

    # Outer border
    draw.rectangle([(24, 24), (width - 25, height - 25)], outline=(74, 222, 128, 60), width=2)
    draw.rectangle([(30, 30), (width - 31, height - 31)], outline=(255, 255, 255, 20), width=1)

    # Badge Pill top-left
    badge_bg = (16, 185, 129, 40)
    badge_border = (52, 211, 153, 160)
    draw.rounded_rectangle([(80, 75), (560, 125)], radius=25, fill=badge_bg, outline=badge_border, width=2)

    # Load system fonts
    font_bold_path = "C:\\Windows\\Fonts\\arialbd.ttf"
    font_reg_path = "C:\\Windows\\Fonts\\arial.ttf"
    font_segoe = "C:\\Windows\\Fonts\\segoeui.ttf"
    font_segoe_bold = "C:\\Windows\\Fonts\\segoeuib.ttf"

    font_badge = ImageFont.truetype(font_segoe_bold if os.path.exists(font_segoe_bold) else font_bold_path, 22)
    font_title = ImageFont.truetype(font_segoe_bold if os.path.exists(font_segoe_bold) else font_bold_path, 64)
    font_sub = ImageFont.truetype(font_segoe if os.path.exists(font_segoe) else font_reg_path, 30)
    font_features = ImageFont.truetype(font_segoe_bold if os.path.exists(font_segoe_bold) else font_bold_path, 24)
    font_url = ImageFont.truetype(font_segoe_bold if os.path.exists(font_segoe_bold) else font_bold_path, 26)

    # Badge text
    draw.text((105, 87), "SAUDI ARABIA EXPAT DIGITAL PLATFORM", fill=(110, 231, 183, 255), font=font_badge)

    # Main Brand Title
    draw.text((80, 160), "Probashi Hub", fill=(255, 255, 255, 255), font=font_title)
    
    # Gradient accent bar
    draw.rounded_rectangle([(80, 245), (420, 252)], radius=3, fill=(16, 185, 129, 255))

    # English / Arabic descriptor
    draw.text((80, 275), "The One-Stop Official Legal, Iqama & Emergency Hub", fill=(226, 232, 240, 255), font=font_sub)
    draw.text((80, 325), "for Bangladeshi Expatriates in the Kingdom of Saudi Arabia", fill=(148, 163, 184, 255), font=font_sub)

    # 4 Feature Pills
    features = [
        "50+ Problem Workflows",
        "Labor Law Art. 84 & 85 Calculator",
        "Arabic Letter Generator",
        "24/7 SOS & Emergency Hotlines"
    ]

    card_x = 80
    card_y = 410
    card_w = 480
    card_h = 60

    for i, feat in enumerate(features):
        row = i // 2
        col = i % 2
        fx = 80 + col * (520)
        fy = 405 + row * (75)
        
        # Draw feature chip
        draw.rounded_rectangle([(fx, fy), (fx + 500, fy + 58)], radius=14, fill=(15, 23, 42, 200), outline=(51, 65, 85, 180), width=1)
        # Green check circle
        draw.ellipse([(fx + 16, fy + 17), (fx + 40, fy + 41)], fill=(5, 150, 105, 255))
        draw.text((fx + 22, fy + 16), "✓", fill=(255, 255, 255, 255), font=font_features)
        draw.text((fx + 52, fy + 16), feat, fill=(241, 245, 249, 255), font=font_features)

    # Bottom domain brand
    draw.line([(80, 560), (1120, 560)], fill=(51, 65, 85, 120), width=1)
    draw.text((80, 575), "probashi-hub.vercel.app", fill=(52, 211, 153, 255), font=font_url)
    draw.text((800, 575), "Official verified data - Absher - Qiwa - Najm", fill=(148, 163, 184, 255), font=font_badge)

    # Output path
    out_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "og-image.png")
    img.convert("RGB").save(out_path, "PNG", quality=95)
    print(f"[SUCCESS] Generated high-res OpenGraph social image at: {out_path}")

if __name__ == "__main__":
    generate_og_image()
