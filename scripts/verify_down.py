"""
Second-pass verification for sites marked DOWN by the Playwright capture.

Many hosts block headless Chromium but respond fine to a normal HTTP client
(and vice-versa). This re-checks every DOWN entry with `requests`, and for any
that come back up it retries a screenshot with a longer wait. Updates the
manifest in place.

Run:  python scripts/verify_down.py
"""

import json
import time
from pathlib import Path

import requests
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts" / "portfolio_manifest.json"
SHOTS_DIR = ROOT / "public" / "portfolio"

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
)
HEADERS = {
    "User-Agent": UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def http_check(url):
    for method in ("get", "head"):
        try:
            r = getattr(requests, method)(
                url, headers=HEADERS, timeout=25, allow_redirects=True, verify=False
            )
            if r.status_code < 400:
                return True, r.status_code, r.url, (r.text if method == "get" else "")
            last = (False, r.status_code, r.url, "")
        except Exception as ex:
            last = (False, None, None, str(ex)[:120])
    return last


def main():
    requests.packages.urllib3.disable_warnings()
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    down = [r for r in data if not r["reachable"]]
    print(f"Re-checking {len(down)} down sites via HTTP...", flush=True)

    recovered = []
    for r in down:
        ok, status, final, html = http_check(r["primary"])
        if ok:
            r["reachable"] = True
            r["status"] = status
            r["final_url"] = final
            r["recovered_via"] = "http"
            recovered.append(r)
            print(f"  UP   {status}  {r['primary']}", flush=True)
        else:
            r["http_status"] = status
            print(f"  down {status}  {r['primary']}", flush=True)

    # Retry screenshots for recovered sites (longer wait, load event).
    if recovered:
        print(f"\nRe-screenshotting {len(recovered)} recovered sites...", flush=True)
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            ctx = browser.new_context(
                viewport={"width": 1366, "height": 850},
                user_agent=UA,
                ignore_https_errors=True,
            )
            ctx.set_default_navigation_timeout(45000)
            for r in recovered:
                page = ctx.new_page()
                try:
                    page.goto(r["primary"], wait_until="load")
                    try:
                        page.wait_for_load_state("networkidle", timeout=8000)
                    except Exception:
                        pass
                    time.sleep(2)
                    shot = f"{r['slug']}.jpg"
                    page.screenshot(path=str(SHOTS_DIR / shot), type="jpeg", quality=78)
                    r["screenshot"] = f"/portfolio/{shot}"
                    print(f"  shot OK  {r['primary']}", flush=True)
                except Exception as ex:
                    print(f"  shot ERR {r['primary']}  {str(ex)[:80]}", flush=True)
                finally:
                    page.close()
            ctx.close()
            browser.close()

    MANIFEST.write_text(json.dumps(data, indent=2), encoding="utf-8")
    up = sum(1 for r in data if r["reachable"])
    print(f"\nDONE-VERIFY  recovered={len(recovered)}  now_up={up}  down={len(data)-up}  total={len(data)}", flush=True)


if __name__ == "__main__":
    main()
