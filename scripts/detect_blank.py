"""
Detect screenshots that were captured before the page finished loading
(blank/white or near-empty). Uses simple image statistics.

Outputs scripts/recapture.json -> list of {slug, url} to re-shoot.
"""
import json
from pathlib import Path

from PIL import Image

import re

ROOT = Path(__file__).resolve().parents[1]
SHOTS = ROOT / "public" / "portfolio"
manifest = json.loads((ROOT / "scripts" / "portfolio_manifest.json").read_text(encoding="utf-8"))

# Only analyse slugs shown in the live grid (the portfolioLive array block).
ts = (ROOT / "src" / "lib" / "portfolio.ts").read_text(encoding="utf-8")
live_block = ts.split("portfolioOffline")[0]
live_slugs = set(re.findall(r'image: "/portfolio/([^"]+)\.jpg"', live_block))

# Build slug -> url from manifest.
url_by_slug = {r["slug"]: r["primary"] for r in manifest}


def stats(path: Path):
    im = Image.open(path).convert("L")
    w, h = im.size
    px = list(im.getdata())
    n = len(px)
    mean = sum(px) / n
    var = sum((p - mean) ** 2 for p in px) / n
    std = var ** 0.5
    white = sum(1 for p in px if p >= 244) / n
    return {"w": w, "h": h, "mean": round(mean, 1), "std": round(std, 1), "white": round(white, 3), "kb": round(path.stat().st_size / 1024)}


suspects = []
rows = []
for f in sorted(SHOTS.glob("*.jpg")):
    slug = f.stem
    if slug not in live_slugs or slug not in url_by_slug:
        continue
    s = stats(f)
    # Heuristics for "not fully loaded": mostly white, very flat, or tiny file.
    blank = s["white"] > 0.82 or s["std"] < 22 or s["kb"] < 10
    flag = "SUSPECT" if blank else "ok"
    rows.append(f"{flag:<8} white={s['white']:<5} std={s['std']:<6} {s['kb']:>4}KB  {slug}")
    if blank:
        suspects.append({"slug": slug, "url": url_by_slug[slug], **s})

rows.sort()
print("\n".join(rows))
print(f"\nSUSPECTS: {len(suspects)}")
for s in suspects:
    print(f"  {s['slug']:<34} white={s['white']} std={s['std']} {s['kb']}KB  {s['url']}")

(ROOT / "scripts" / "recapture.json").write_text(json.dumps(suspects, indent=2), encoding="utf-8")
