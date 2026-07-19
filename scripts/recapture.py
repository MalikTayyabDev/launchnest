"""
Re-capture screenshots flagged as blank/partial by detect_blank.py.
Reads scripts/recapture.json, re-shoots each with robust loading
(networkidle + full scroll to trigger lazy content), overwrites the jpg.

Run:  python scripts/recapture.py
"""
import json
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SHOTS = ROOT / "public" / "portfolio"
targets = json.loads((ROOT / "scripts" / "recapture.json").read_text(encoding="utf-8"))

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
)

SCROLL = """async () => {
  await new Promise((resolve) => {
    let total = 0; const step = 500;
    const timer = setInterval(() => {
      window.scrollBy(0, step); total += step;
      if (total >= document.body.scrollHeight - window.innerHeight) {
        clearInterval(timer); resolve();
      }
    }, 120);
  });
}"""


def main():
    print(f"Re-capturing {len(targets)} sites...", flush=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport={"width": 1366, "height": 850},
            user_agent=UA,
            ignore_https_errors=True,
        )
        ctx.set_default_navigation_timeout(60000)
        for t in targets:
            page = ctx.new_page()
            try:
                page.goto(t["url"], wait_until="domcontentloaded")
                try:
                    page.wait_for_load_state("networkidle", timeout=15000)
                except Exception:
                    pass
                # allow preloader animations / hero sliders to finish
                page.wait_for_timeout(7000)
                # trigger lazy-loaded imagery, then return to top
                try:
                    page.evaluate(SCROLL)
                except Exception:
                    pass
                page.wait_for_timeout(1500)
                page.evaluate("window.scrollTo(0, 0)")
                page.wait_for_timeout(3500)
                out = SHOTS / f"{t['slug']}.jpg"
                page.screenshot(path=str(out), type="jpeg", quality=80, full_page=False)
                kb = round(out.stat().st_size / 1024)
                print(f"  OK  {kb:>4}KB  {t['slug']}", flush=True)
            except Exception as ex:
                print(f"  ERR {t['slug']}  {str(ex)[:90]}", flush=True)
            finally:
                page.close()
        ctx.close()
        browser.close()
    print("DONE-RECAPTURE", flush=True)


if __name__ == "__main__":
    main()
