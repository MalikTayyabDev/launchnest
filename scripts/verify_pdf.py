from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "scripts" / "portfolio_pdf.html"
OUT = ROOT / "scripts" / "_preview"
OUT.mkdir(exist_ok=True)

# page indices to capture: cover, capabilities, a feature, a grid, contact
want = {0: "01_cover", 1: "02_caps", 2: "03_feature", 10: "11_grid", 15: "16_contact"}

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 794, "height": 1123}, device_scale_factor=1.3)
    page.goto(HTML.as_uri(), wait_until="networkidle")
    page.wait_for_timeout(1200)
    pages = page.query_selector_all("section.page")
    print("total pages:", len(pages))
    for i, el in enumerate(pages):
        if i in want:
            el.scroll_into_view_if_needed()
            el.screenshot(path=str(OUT / f"{want[i]}.png"))
            print("captured", want[i])
    b.close()
