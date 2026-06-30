#!/usr/bin/env python3
"""Generate deterministic description-card PNG assets."""

from __future__ import annotations

import math
import random
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


CARD_W = 618
CARD_H = 983
DESCRIPTION_NAMES = [
    "Impulsive", "Kind", "Provocative", "Cautious", "Ambitious", "Idealistic",
    "Pragmatic", "Secretive", "Generous", "Ruthless", "Diplomatic", "Defiant",
    "Traditional", "Radical", "Patient", "Bold", "Suspicious", "Loyal",
    "Opportunistic", "Principled", "Charismatic", "Calculating", "Protective",
    "Reckless", "Optimistic", "Cynical", "Scholarly", "Streetwise", "Wealthy",
    "Humble", "Militant", "Persuasive", "Eccentric", "Stoic", "Vengeful",
    "Merciful", "Connected", "Independent",
]

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "__docs__" / "cards" / "description"


def font(paths: list[str], size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    for path in paths:
        candidate = Path(path).expanduser()
        if candidate.exists():
            return ImageFont.truetype(candidate, size=size, index=index)
    return ImageFont.truetype("DejaVuSansCondensed-Bold.ttf", size=size)


DISPLAY_FONT_PATHS = [
    "/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf",
    "/Library/Fonts/DIN Condensed Bold.ttf",
]
BODY_FONT_PATHS = [
    "/System/Library/Fonts/Avenir Next Condensed.ttc",
    "/System/Library/Fonts/Supplemental/Avenir Next Condensed.ttc",
]

TITLE_FONT = font(DISPLAY_FONT_PATHS, 92)
LABEL_FONT = font(DISPLAY_FONT_PATHS, 34)
BODY_FONT = font(BODY_FONT_PATHS, 34, index=0)
SMALL_FONT = font(BODY_FONT_PATHS, 24, index=0)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> tuple[int, int]:
    left, top, right, bottom = draw.textbbox((0, 0), text, font=fnt)
    return right - left, bottom - top


def centered_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    stroke_fill: tuple[int, int, int, int] | None = None,
    stroke_width: int = 0,
) -> None:
    x, y = xy
    width, height = text_size(draw, text, fnt)
    draw.text(
        (x - width / 2, y - height / 2),
        text,
        font=fnt,
        fill=fill,
        stroke_width=stroke_width,
        stroke_fill=stroke_fill,
    )


def glow_line(
    layer: Image.Image,
    points: list[tuple[int, int]],
    fill: tuple[int, int, int, int],
    width: int,
    glow: int = 10,
) -> None:
    glow_layer = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_layer)
    gd.line(points, fill=fill, width=width + glow, joint="curve")
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(glow / 2))
    layer.alpha_composite(glow_layer)
    draw = ImageDraw.Draw(layer)
    draw.line(points, fill=fill, width=width, joint="curve")


def rounded_glow_rect(
    layer: Image.Image,
    box: tuple[int, int, int, int],
    radius: int,
    outline: tuple[int, int, int, int],
    width: int = 4,
    fill: tuple[int, int, int, int] | None = None,
) -> None:
    glow = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.rounded_rectangle(box, radius=radius, outline=outline, width=width + 8, fill=fill)
    layer.alpha_composite(glow.filter(ImageFilter.GaussianBlur(5)))
    draw = ImageDraw.Draw(layer)
    draw.rounded_rectangle(box, radius=radius, outline=outline, width=width, fill=fill)


def wrap_to_width(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    for width in range(16, 5, -1):
        candidate = textwrap.wrap(text, width=width)
        if candidate and all(text_size(draw, line, fnt)[0] <= max_width for line in candidate):
            lines = candidate
            break
    return lines or [text]


def background(seed: int) -> Image.Image:
    rng = random.Random(seed)
    image = Image.new("RGBA", (CARD_W, CARD_H), (18, 12, 44, 255))
    px = image.load()
    for y in range(CARD_H):
        t = y / CARD_H
        for x in range(CARD_W):
            dx = (x - CARD_W * 0.54) / CARD_W
            dy = (y - CARD_H * 0.44) / CARD_H
            radial = max(0, 1 - math.sqrt(dx * dx + dy * dy) * 1.95)
            scan = 10 if (y // 8) % 2 == 0 else 0
            r = int(15 + 48 * radial + 28 * t + scan)
            g = int(9 + 18 * radial + 4 * t)
            b = int(42 + 76 * radial + 48 * (1 - t) + scan)
            px[x, y] = (r, g, b, 255)

    draw = ImageDraw.Draw(image)
    for _ in range(130):
        x = rng.randrange(24, CARD_W - 24)
        y = rng.randrange(24, CARD_H - 24)
        alpha = rng.randrange(36, 128)
        radius = rng.choice([1, 1, 1, 2])
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(245, 240, 255, alpha))

    haze = Image.new("RGBA", image.size, (0, 0, 0, 0))
    hd = ImageDraw.Draw(haze)
    for _ in range(5):
        x = rng.randrange(-160, CARD_W)
        y = rng.randrange(-120, CARD_H)
        color = rng.choice([(172, 76, 255, 60), (255, 94, 185, 44), (108, 249, 214, 38)])
        hd.ellipse((x, y, x + rng.randrange(220, 420), y + rng.randrange(180, 360)), fill=color)
    image.alpha_composite(haze.filter(ImageFilter.GaussianBlur(50)))
    return image


def draw_description_card(name: str, idx: int) -> Image.Image:
    image = background(idx + 100)
    draw = ImageDraw.Draw(image)

    magenta = (255, 126, 224, 230)
    cyan = (125, 249, 214, 230)
    cream = (255, 248, 226, 255)
    gold = (255, 209, 102, 245)

    rounded_glow_rect(image, (25, 25, CARD_W - 25, CARD_H - 25), 30, magenta, width=5)
    rounded_glow_rect(image, (48, 74, CARD_W - 48, CARD_H - 74), 20, (255, 220, 252, 175), width=2)
    rounded_glow_rect(image, (58, 168, CARD_W - 58, 580), 12, (255, 209, 247, 155), width=3, fill=(16, 18, 48, 112))
    rounded_glow_rect(image, (58, 650, CARD_W - 58, 868), 12, cyan, width=4, fill=(8, 20, 32, 152))

    for y in range(184, 568, 17):
        draw.line((78, y, CARD_W - 78, y), fill=(255, 255, 255, 18), width=2)
    for y in range(668, 852, 16):
        draw.line((82, y, CARD_W - 82, y), fill=(125, 249, 214, 22), width=2)

    glow_line(image, [(78, 110), (190, 110), (225, 74), (430, 74), (464, 110), (540, 110)], cyan, 4)
    glow_line(image, [(72, 610), (172, 610), (206, 576), (420, 576), (458, 610), (548, 610)], magenta, 4)
    glow_line(image, [(90, 898), (260, 898), (292, 930), (430, 930), (458, 898), (530, 898)], cyan, 4)

    draw.ellipse((64, 62, 146, 144), outline=(255, 238, 246, 230), width=6)
    centered_text(draw, (105, 101), str(idx + 1), LABEL_FONT, cream, stroke_fill=(44, 16, 80, 255), stroke_width=2)
    draw.rounded_rectangle((400, 70, 550, 136), radius=18, outline=cyan, width=5, fill=(11, 22, 36, 215))
    centered_text(draw, (475, 102), "DESC", LABEL_FONT, cream)

    title = name.upper()
    title_font = TITLE_FONT
    title_width, _ = text_size(draw, title, title_font)
    if title_width > 430:
        title_font = font(DISPLAY_FONT_PATHS, 78)
    centered_text(draw, (CARD_W // 2, 350), title, title_font, cream, stroke_fill=(42, 8, 70, 255), stroke_width=3)

    article = "An" if name[0].lower() in "aeiou" else "A"
    body = f"{article} {name.lower()} public instinct."
    lines = wrap_to_width(draw, body, BODY_FONT, 420)
    line_y = 728
    for line in lines:
        centered_text(draw, (CARD_W // 2, line_y), line, BODY_FONT, (235, 245, 255, 245))
        line_y += 46

    draw.line((186, 818, 432, 818), fill=(255, 209, 102, 160), width=2)
    centered_text(draw, (CARD_W // 2, 846), "PLAYER DESCRIPTION", SMALL_FONT, gold)

    for x, y, r in [(78, 612, 14), (538, 612, 14), (78, 894, 12), (538, 894, 12)]:
        draw.ellipse((x - r, y - r, x + r, y + r), outline=(255, 235, 250, 200), width=3)

    return image


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for idx, name in enumerate(DESCRIPTION_NAMES):
        image = draw_description_card(name, idx)
        out_path = OUT_DIR / f"description-{idx:03d}_F.png"
        image.save(out_path, optimize=True)
    print(f"Generated {len(DESCRIPTION_NAMES)} description cards in {OUT_DIR}")


if __name__ == "__main__":
    main()
