"""Compare la structure verticale de deux captures via les aplats de la maquette.

Chaque ligne est classée dans la palette du projet (en-tête, ivoire, sable,
forêt), puis les transitions sont listées pour les deux rendus.

Usage: python .figma/rows.py .figma/figma-about-390.png .figma/shots/a-propos-390.png
"""

import sys

import numpy as np
from PIL import Image

PALETTE = {
    "header": (0xFB, 0xF9, 0xF4),
    "ivory": (0xFD, 0xFD, 0xFB),
    "sand": (0xF2, 0xF5, 0xF1),
    "forest": (0x18, 0x31, 0x29),
}


def classify(path: str) -> list[str]:
    image = np.asarray(Image.open(path).convert("RGB"), dtype=np.int16)
    out = []
    for row in image:
        median = np.median(row, axis=0)
        name = min(
            PALETTE,
            key=lambda key: sum((int(median[index]) - PALETTE[key][index]) ** 2 for index in range(3)),
        )
        out.append(name)
    return out


def transitions(bands: list[str]) -> list[tuple[str, int, int]]:
    out: list[tuple[str, int, int]] = []
    start = 0
    for index in range(1, len(bands) + 1):
        if index == len(bands) or bands[index] != bands[start]:
            out.append((bands[start], start, index))
            start = index
    return [item for item in out if item[2] - item[1] >= 3]


def main() -> None:
    left_path, right_path = sys.argv[1], sys.argv[2]
    left, right = transitions(classify(left_path)), transitions(classify(right_path))
    print(f"{left_path}: {sum(b - a for _, a, b in left)} px / {len(left)} bandes")
    print(f"{right_path}: {sum(b - a for _, a, b in right)} px / {len(right)} bandes")
    print()
    print(f"{'figma':>26} | {'local':>26}")
    for index in range(max(len(left), len(right))):
        a = left[index] if index < len(left) else None
        b = right[index] if index < len(right) else None
        left_text = f"{a[0]:>8} {a[1]:>5}-{a[2]:<5} h={a[2] - a[1]:>4}" if a else " " * 26
        right_text = f"{b[0]:>8} {b[1]:>5}-{b[2]:<5} h={b[2] - b[1]:>4}" if b else " " * 26
        flag = ""
        if a and b:
            flag = "  OK" if a[0] == b[0] and abs((b[2] - b[1]) - (a[2] - a[1])) <= 6 else "  <<"
        print(f"{left_text} | {right_text}{flag}")


if __name__ == "__main__":
    main()
