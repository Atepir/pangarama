"""Comparaison finale : profil de décalage par dixième de page.

Pour chaque paire (rendu Figma, capture locale), on découpe le mock en dix
tranches et on reporte le décalage médian et l'écart moyen de la meilleure
correspondance. Un décalage stable par tranche prouve que la structure de la
page suit le mock, l'écart venant du texte et des états volontairement
différents (voir `files/rapport-final.md`).

Usage: python .figma/final-compare.py
"""

import numpy as np
from PIL import Image

PAIRS = [
    ("accueil 1440", ".figma/figma-home-1440.png", ".figma/final/accueil-1440.png"),
    ("accueil 390", ".figma/figma-home-390.png", ".figma/final/accueil-390.png"),
    ("a-propos 390", ".figma/figma-about-390.png", ".figma/final/a-propos-390.png"),
    (
        "realisations-insights 1440",
        ".figma/figma-hub-1440.png",
        ".figma/final/realisations-insights-1440.png",
    ),
    (
        "realisations-insights 390",
        ".figma/figma-hub-390.png",
        ".figma/final/realisations-insights-390.png",
    ),
    ("menu mobile 390", ".figma/figma-menu-390.png", ".figma/final/menu-mobile-390.png"),
]

BAND = 60
WINDOW = 80


def profile(mock, live):
    """Décalage et écart de chaque bande du mock vis-à-vis du rendu local."""
    height = min(mock.shape[0], live.shape[0] + WINDOW)
    out = []
    for top in range(0, height, BAND):
        bottom = min(top + BAND, height)
        reference = mock[top:bottom]
        if reference.size == 0:
            continue
        best = None
        for shift in range(-WINDOW, WINDOW + 1):
            start = top + shift
            if start < 0 or start + (bottom - top) > live.shape[0]:
                continue
            diff = float(np.abs(live[start : start + (bottom - top)] - reference).mean())
            if best is None or diff < best[1]:
                best = (shift, diff)
        if best:
            out.append((top, best[0], best[1]))
    return out


for label, mock_path, live_path in PAIRS:
    mock = np.asarray(Image.open(mock_path).convert("RGB"), dtype=np.int16)
    live = np.asarray(Image.open(live_path).convert("RGB"), dtype=np.int16)
    bands = profile(mock, live)
    shifts = np.array([band[1] for band in bands])
    tenth = max(1, len(bands) // 10)

    print(f"=== {label} : mock {mock.shape[1]}x{mock.shape[0]} / local {live.shape[1]}x{live.shape[0]}")
    for index in range(0, len(bands), tenth):
        chunk = bands[index : index + tenth]
        offsets = np.array([band[1] for band in chunk])
        diffs = np.array([band[2] for band in chunk])
        print(
            f"  lignes {chunk[0][0]:>5}-{chunk[-1][0]:<5} décalage médian {int(np.median(offsets)):+4d}"
            f" (min {offsets.min():+4d} max {offsets.max():+4d}) écart moyen {diffs.mean():6.2f}"
        )
    print(f"  bandes analysées {len(bands)} · décalage min {shifts.min():+d} max {shifts.max():+d}")
