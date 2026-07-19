"""
Portfolio capture: for every URL in Portfolio.txt this script
  1. checks reachability,
  2. detects the platform / tech stack from headers + HTML,
  3. captures a screenshot of the main page.

Output:
  - screenshots -> public/portfolio/<slug>.jpg
  - manifest    -> scripts/portfolio_manifest.json

Run:  python scripts/portfolio_capture.py
"""

import json
import re
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

SOURCE = Path(r"c:\Users\ARFA TECH\Documents\Experience\Portfolio.txt")
ROOT = Path(__file__).resolve().parents[1]
SHOTS_DIR = ROOT / "public" / "portfolio"
MANIFEST = ROOT / "scripts" / "portfolio_manifest.json"

VIEWPORT = {"width": 1366, "height": 850}
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
)

URL_RE = re.compile(r"https?://[^\s>()]+", re.IGNORECASE)


def slugify(url: str) -> str:
    host = re.sub(r"^https?://", "", url).split("/")[0]
    host = host.replace("www.", "")
    return re.sub(r"[^a-z0-9]+", "-", host.lower()).strip("-")


def parse_sources():
    """Return list of dicts: {line, primary, alternates, label}."""
    entries = []
    seen = set()
    for raw in SOURCE.read_text(encoding="utf-8", errors="ignore").splitlines():
        line = raw.strip()
        if not line:
            continue
        urls = [u.rstrip(").,") for u in URL_RE.findall(line)]
        if not urls:
            continue
        # ">>" means "redirects to real domain" -> use the target as primary.
        if ">>" in line:
            primary = urls[-1]
            alternates = urls[:-1]
        else:
            primary = urls[0]
            alternates = urls[1:]
        label = None
        m = re.search(r"\(([^)]+)\)\s*$", line)
        if m:
            label = m.group(1).strip()
        key = slugify(primary)
        if key in seen:
            # duplicate site -> skip capture but keep note on the existing entry
            for e in entries:
                if e["slug"] == key:
                    e["duplicate_lines"].append(line[:60])
            continue
        seen.add(key)
        entries.append(
            {
                "slug": key,
                "primary": primary,
                "alternates": alternates,
                "label": label,
                "duplicate_lines": [],
            }
        )
    return entries


def detect_stack(url: str, final_url: str, headers: dict, html: str) -> str:
    blob = " ".join(
        [
            url.lower(),
            (final_url or "").lower(),
            " ".join(f"{k}:{v}" for k, v in (headers or {}).items()).lower(),
            (html or "").lower(),
        ]
    )

    def has(*needles):
        return any(n in blob for n in needles)

    if has("myshopify.com", "cdn.shopify.com", "shopify.theme", "x-shopify", "x-shopid"):
        return "Shopify"
    if has("wixstatic.com", "parastorage.com", "x-wix-", "static.wixstatic", "wix.com/"):
        return "Wix"
    if has("squarespace.com", "static1.squarespace.com", "squarespace-cdn.com"):
        return "Squarespace"
    if has(".webflow.io", "website-files.com", "data-wf-page", "data-wf-site"):
        return "Webflow"
    if has("framerusercontent.com", "__framer", "framer.com"):
        return "Framer"
    if has("leadconnectorhq.com", "msgsndr.com"):
        return "GoHighLevel"
    if has("irp.cdn-website.com", "dudaone", "dudamobile"):
        return "Duda"
    if has("weebly.com", "editmysite.com"):
        return "Weebly"
    if has("wp-content", "wp-includes", "/wp-json", "wpengine", "wpcomstaging", "wp-emoji", "wordpress"):
        if has("woocommerce", "/cart", "add-to-cart"):
            return "WordPress (WooCommerce)"
        return "WordPress"
    return "Custom"


def capture(entries):
    SHOTS_DIR.mkdir(parents=True, exist_ok=True)
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport=VIEWPORT,
            user_agent=USER_AGENT,
            ignore_https_errors=True,
            java_script_enabled=True,
        )
        context.set_default_navigation_timeout(35000)

        total = len(entries)
        for i, e in enumerate(entries, 1):
            url = e["primary"]
            rec = {
                **e,
                "reachable": False,
                "status": None,
                "final_url": None,
                "title": None,
                "stack": "Custom",
                "screenshot": None,
                "error": None,
            }
            page = context.new_page()
            try:
                resp = page.goto(url, wait_until="domcontentloaded")
                status = resp.status if resp else None
                rec["status"] = status
                rec["final_url"] = page.url
                rec["reachable"] = bool(status and status < 400)
                # let the page settle / lazy content paint
                try:
                    page.wait_for_load_state("networkidle", timeout=6000)
                except Exception:
                    pass
                time.sleep(1.5)
                try:
                    rec["title"] = (page.title() or "").strip()[:160]
                except Exception:
                    pass
                html = ""
                try:
                    html = page.content()
                except Exception:
                    pass
                headers = {}
                try:
                    headers = resp.headers if resp else {}
                except Exception:
                    pass
                rec["stack"] = detect_stack(url, page.url, headers, html)
                if e.get("label", "") and "ghl" in e["label"].lower():
                    rec["stack"] = "GoHighLevel"
                shot = f"{e['slug']}.jpg"
                page.screenshot(
                    path=str(SHOTS_DIR / shot),
                    type="jpeg",
                    quality=78,
                    full_page=False,
                )
                rec["screenshot"] = f"/portfolio/{shot}"
            except Exception as ex:
                rec["error"] = str(ex)[:200]
                # Attempt a screenshot of whatever rendered before failing.
                try:
                    shot = f"{e['slug']}.jpg"
                    page.screenshot(path=str(SHOTS_DIR / shot), type="jpeg", quality=78)
                    rec["screenshot"] = f"/portfolio/{shot}"
                except Exception:
                    pass
            finally:
                page.close()

            state = "OK " if rec["reachable"] else "DOWN"
            print(f"[{i:>2}/{total}] {state} {rec['stack']:<22} {url}", flush=True)
            results.append(rec)
            # persist incrementally so a crash keeps progress
            MANIFEST.write_text(json.dumps(results, indent=2), encoding="utf-8")

        context.close()
        browser.close()
    return results


def main():
    entries = parse_sources()
    print(f"Parsed {len(entries)} unique sites from Portfolio.txt", flush=True)
    results = capture(entries)
    up = sum(1 for r in results if r["reachable"])
    print(f"\nDONE-CAPTURE  reachable={up}  down={len(results)-up}  total={len(results)}", flush=True)


if __name__ == "__main__":
    main()
