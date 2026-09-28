import os
from PIL import Image, ImageDraw, ImageFont

def generate_icons():
    # Colors: Saudi Emerald Green (#006C35), darker green (#003B1D), accent light green (#4ADE80), Bangladesh red circle (#F42A41)
    for size in [192, 512, 64, 32, 16]:
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Rounded rectangle background
        corner_radius = int(size * 0.22)
        # Gradient simulation or rich solid fill
        bg_color = (0, 108, 53, 255) # Saudi green
        draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=corner_radius, fill=bg_color)

        # Subtle border ring
        ring_inset = int(size * 0.08)
        ring_width = max(1, int(size * 0.025))
        draw.ellipse([(ring_inset, ring_inset), (size - ring_inset, size - ring_inset)], outline=(74, 222, 128, 100), width=ring_width)

        # Top-right red dot (representing Bangladesh flag circle inside Saudi green)
        dot_r = int(size * 0.07)
        dot_cx = int(size * 0.78)
        dot_cy = int(size * 0.22)
        draw.ellipse([(dot_cx - dot_r, dot_cy - dot_r), (dot_cx + dot_r, dot_cy + dot_r)], fill=(244, 42, 65, 255))

        # Try to load Windows font (e.g. Arial or Vrinda or Kalpurush or Segoe UI)
        font = None
        font_paths = [
            "C:\\Windows\\Fonts\\arialbd.ttf",
            "C:\\Windows\\Fonts\\arial.ttf",
            "C:\\Windows\\Fonts\\segoeui.ttf",
            "C:\\Windows\\Fonts\\vrinda.ttf",
        ]
        font_size = int(size * 0.52)
        for fp in font_paths:
            if os.path.exists(fp):
                try:
                    font = ImageFont.truetype(fp, font_size)
                    break
                except Exception:
                    continue

        # Draw "P" or "প্র"
        # Since standard Arial might not render Bengali glyphs without complex shaping in PIL,
        # let's test if "P" or Bengali text works cleanly or draw a crisp stylized symbol.
        symbol = "P"
        # If Bengali font exists, we could use it, but "P" is universal for "Probashi Hub"
        if font:
            bbox = draw.textbbox((0, 0), symbol, font=font)
            text_w = bbox[2] - bbox[0]
            text_h = bbox[3] - bbox[1]
            tx = (size - text_w) // 2 - bbox[0]
            ty = (size - text_h) // 2 - bbox[1]
            draw.text((tx, ty), symbol, fill=(255, 255, 255, 255), font=font)
        else:
            # Fallback draw
            pass

        if size == 192:
            img.save("public/icon-192x192.png", "PNG")
            print("Saved public/icon-192x192.png")
        elif size == 512:
            img.save("public/icon-512x512.png", "PNG")
            print("Saved public/icon-512x512.png")
            # Also save as apple-touch-icon
            img.resize((180, 180), Image.Resampling.LANCZOS).save("public/apple-touch-icon.png", "PNG")
            print("Saved public/apple-touch-icon.png")
        elif size == 64:
            # Create favicon.ico combining 16, 32, 64
            img16 = img.resize((16, 16), Image.Resampling.LANCZOS)
            img32 = img.resize((32, 32), Image.Resampling.LANCZOS)
            img.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (64, 64)])
            print("Saved public/favicon.ico")

if __name__ == "__main__":
    generate_icons()
