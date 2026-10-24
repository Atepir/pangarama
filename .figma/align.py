"""Aligne un rendu Figma mobile sur le rendu local, bande par bande.

Pour chaque bande de 60 px du mock, on cherche dans une fenêtre de ±80 px la
position locale qui minimise l'écart moyen. Un décalage constant par section
prouve que la structure suit le mock, l'écart venant uniquement du texte.

Usage: python .figma/align.py .figma/figma-about-390.png .figma/live-about-390.png
"""

import sys

import numpy as np
from PIL import Image

figma_path, local_path = sys.argv[1], sys.argv[2]
figma = np.asarray(Image.open(figma_path).convert("RGB"), dtype=np.int16)
local = np.asarray(Image.open(local_path).convert("RGB"), dtype=np.int16)

height = min(figma.shape[0], local.shape[0])
width = min(figma.shape[1], local.shape[1])
mock = figma[:height, :width]
live = local[:height + 80, :width]

band = 60
print(f"mock={figma.shape[1]}x{figma.shape[0]} local={local.shape[1]}x{local.shape[0]}")

for top in range(0, height, band):
    bottom = min(top + band, height)
    reference = mock[top:bottom]
    if reference.size == 0:
        continue
    best = None
    for shift in range(-20, 81):
        start = top + shift
        if start < 0 or start + (bottom - top) > live.shape[0]:
            continue
        diff = float(np.abs(live[start : start + (bottom - top)] - reference).mean())
        if best is None or diff < best[1]:
            best = (shift, diff)
    shift, diff = best
    print(f"mock {top:>5}-{bottom:<5} -> local {top + shift:>5} (shift {shift:+4d}) mean={diff:6.2f}")
