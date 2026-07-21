"""
Build a polished, branded LaunchNest portfolio PDF from verified-live data.

- Parses `portfolioLive` from src/lib/portfolio.ts (only reachable sites with
  real screenshots).
- Renders a designed HTML document (cover, capabilities, featured projects with
  screenshots, a breadth grid, and a contact page) to PDF via Playwright.

Run: python scripts/build_portfolio_pdf.py
"""

import os
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO_TS = ROOT / "src" / "lib" / "portfolio.ts"
SHOTS = ROOT / "public" / "portfolio"
HTML_OUT = ROOT / "scripts" / "portfolio_pdf.html"
PDF_OUT = Path(r"D:\Desktop\LAUNCH NEST PLAN\LaunchNest_Web_Portfolio_2026_Refined.pdf")

# ---------------------------------------------------------------- parse data

ENTRY_RE = re.compile(
    r'name:\s*"([^"]*)".*?domain:\s*"([^"]*)".*?url:\s*"([^"]*)".*?'
    r'stack:\s*"([^"]*)".*?category:\s*"([^"]*)".*?image:\s*"([^"]*)".*?'
    r'reachable:\s*(true|false)'
)


def parse_live():
    text = PORTFOLIO_TS.read_text(encoding="utf-8")
    block = text.split("portfolioLive: PortfolioItem[] = [", 1)[1].split("];", 1)[0]
    items = []
    for m in ENTRY_RE.finditer(block):
        name, domain, url, stack, category, image, reachable = m.groups()
        slug = image.rsplit("/", 1)[-1]  # e.g. raainvestments-com.jpg
        items.append(
            dict(name=name, domain=domain, url=url, stack=stack,
                 category=category, image=image, slug=slug)
        )
    return items


# Nicer display names for the breadth grid (data names are sometimes machine-ish).
NAME_OVERRIDES = {
    "algorithmicsoftware-co-uk.jpg": "Algorithmic Software",
    "yaisatangwell-com.jpg": "Yaisa Tangwell",
    "pvi-group-com.jpg": "PVI Group",
    "chilspace-com.jpg": "Chil Space",
    "hairglo-co-uk.jpg": "HairGlo",
    "wiz-ai.jpg": "WIZ.AI",
    "salesopsforce-com.jpg": "SalesOpsForce",
    "smeadvantage-co-uk.jpg": "SME Advantage",
    "clearmatrix-io.jpg": "ClearMatrix",
    "specialized-med-com.jpg": "Specialized Med",
    "zbiroh-com.jpg": "Zámek Zbiroh",
    "heartbreakhotel-no.jpg": "Heartbreak Hotel",
    "ruralranges-com.jpg": "Rural Ranges",
    "atelierlivianne-com.jpg": "Atelier Livianne",
    "remoteairservice-com.jpg": "Remote Air Service",
    "lolitaayala-life.jpg": "Lolita Ayala",
    "36threalty-com.jpg": "36th Street Realty",
    "globalsyngas-org.jpg": "Global Syngas Association",
    "omearacamping-ie.jpg": "O'Meara Camping",
    "lainelawfirm-com.jpg": "Laine Law Firm",
    "simonellson-com.jpg": "Simon Ellson",
    "threeoaksbespoke-com.jpg": "Three Oaks Bespoke",
    "amershamwellnessco-clinic.jpg": "Amersham Wellness Co.",
    "formhaustring-co-uk.jpg": "Formé Haus",
    "ipswichglassathome-co-uk.jpg": "Ipswich Glass at Home",
    "fitclubgymgroup-co-uk.jpg": "FitClub Gym Group",
    "joinviper-com.jpg": "VIPER",
    "ortaktekne-com.jpg": "Ortak Tekne",
    "whale-press-99789a-webflow-io.jpg": "Tribune",
    "madmowers-uk.jpg": "MAD Mowers",
    "sites-leadconnectorhq-com.jpg": "Client Landing Page",
    "raainvestments-com.jpg": "RAA Investments",
    "latusmedia-com.jpg": "Latus Media",
    "crownbraiding-com.jpg": "Crown Braiding",
    "cccnc-org.jpg": "CCCNC",
    "iadistribution-com.jpg": "IA Distribution",
    "magicstudio-it.jpg": "Magic Studio",
    "dougsilton-com.jpg": "Doug Silton",
    "ohtech-co-uk.jpg": "Ohtech",
    "pawscape-co-uk.jpg": "Pawscape",
    "dngrtech-com.jpg": "DNGR Tech",
    "mastercutnaturalstone-com.jpg": "MasterCut Natural Stone",
    "serikandikent-com.jpg": "Serikandi Kent",
    "ecofab-ca.jpg": "EcoFab",
}

# Featured projects (copy carried over from the original deck; all verified live).
FEATURED = [
    dict(slug="9dbreathwork-com.jpg", name="9D Breathwork", tag="Wellness Platform",
         lead="A bold, immersive experience built around transformation and facilitator growth.",
         body="Dramatic imagery, focused messaging and strong conversion paths explain a complex wellness method without overwhelming visitors.",
         focus=["Conversion-led hero structure", "Facilitator acquisition pathway",
                "Educational content hierarchy", "Responsive, high-impact visual system"]),
    dict(slug="ecofab-ca.jpg", name="EcoFab", tag="Construction & Real Estate",
         lead="A trust-first website for modular homes, designed to move visitors from research to quote.",
         body="Clear educational sections, local credibility and visual product storytelling make the modular-home buying process easier to understand and act on.",
         focus=["Quote-focused customer journey", "Modular home education",
                "Local authority and trust signals", "Project and process storytelling"]),
    dict(slug="thevictorianbridal-com.jpg", name="The Victorian Bridal", tag="Luxury Shopify",
         lead="Editorial luxury, collection discovery and appointment booking in one refined storefront.",
         body="A premium visual direction supports the bridal brand while structured collection pathways help visitors browse silhouettes and move naturally toward booking.",
         focus=["Luxury editorial art direction", "Collection-led navigation",
                "Appointment conversion flow", "Shopify storefront experience"]),
    dict(slug="littlesoleil-com-au.jpg", name="Little Soleil", tag="Children's Ecommerce",
         lead="A warm, family-focused Shopify experience combining safety, lifestyle and social proof.",
         body="The storefront balances playful imagery with practical product education, customer stories and category-led shopping for parents.",
         focus=["Shop-by-category merchandising", "Strong parent-focused social proof",
                "Lifestyle-led product presentation", "International Shopify setup"]),
    dict(slug="servicequest-com-au.jpg", name="Service Quest", tag="Local Services Marketplace",
         lead="A service marketplace built around trust, transparent pricing and fast booking.",
         body="A broad service offering feels simple through clear categories, instant-quote messaging and repeated reassurance around reliability.",
         focus=["Instant quote positioning", "Service-category architecture",
                "Trust and guarantee messaging", "Booking-first mobile experience"]),
    dict(slug="store-madmowers-uk.jpg", name="MAD Mowers", tag="Shopify & Service",
         lead="Product discovery, demonstrations and aftercare for a specialist garden-machinery brand.",
         body="The ecommerce and service journey supports both first-time buyers and existing customers, combining category discovery with local expertise.",
         focus=["Specialist product merchandising", "Demo and consultation pathways",
                "Service and repair integration", "Shopify product architecture"]),
    dict(slug="serikandikent-com.jpg", name="Serikandi Kent", tag="Energy & Engineering",
         lead="A corporate platform communicating global engineering expertise and strong local delivery.",
         body="The site presents a joint venture with clarity, supporting credibility through company positioning, project stories and safety milestones.",
         focus=["Joint-venture brand positioning", "Corporate credibility structure",
                "Project and news storytelling", "Responsive stakeholder experience"]),
    dict(slug="hocy-vitaldrink-com.jpg", name="HOCY Vitaldrink", tag="DTC Wellness",
         lead="Ingredient storytelling and premium product education for a modern vitality drink.",
         body="The page turns a complex blend of minerals, fruits and functional benefits into an approachable narrative supported by strong visual sequencing.",
         focus=["Ingredient-led storytelling", "Benefit-focused content flow",
                "Premium product positioning", "Conversion-ready landing page"]),
]

CAPABILITIES = [
    ("01", "Web Design & UX", "Clear structure, polished visual systems and responsive interfaces."),
    ("02", "WordPress Development", "Flexible builds with maintainable page structures and conversion flows."),
    ("03", "Shopify OS 2.0", "Custom sections, product discovery and high-quality ecommerce experiences."),
    ("04", "Landing Pages", "Focused messaging, strong calls to action and campaign-ready layouts."),
    ("05", "Performance & QA", "Responsive testing, usability review and launch-readiness checks."),
    ("06", "Ongoing Optimization", "Content improvements, conversion refinements and scalable enhancements."),
]


def img_uri(slug):
    return (SHOTS / slug).as_uri()


def esc(s):
    return (str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def clean_url(u):
    return re.sub(r"^https?://", "", u).rstrip("/")


# ---------------------------------------------------------------- build HTML

def build_html():
    live = parse_live()
    by_slug = {i["slug"]: i for i in live}
    featured_slugs = {f["slug"] for f in FEATURED}

    # Breadth grid = all live minus featured, that actually have a screenshot file.
    grid = [i for i in live if i["slug"] not in featured_slugs and (SHOTS / i["slug"]).exists()]

    total = len(live)

    # ----- cover
    pages = []
    pages.append(f"""
    <section class="page cover">
      <div class="cover-top">
        <span class="brand">LAUNCHNEST</span>
        <span class="edition">2026 Edition</span>
      </div>
      <div class="cover-mid">
        <div class="rule"></div>
        <h1>Web Design &amp;<br>Development Portfolio</h1>
        <p>Selected live work across Shopify, WordPress, Webflow, Wix and custom
        builds — ecommerce, corporate sites, landing pages and digital experiences.</p>
      </div>
      <div class="cover-bottom">
        <span>Build &nbsp;·&nbsp; Optimize &nbsp;·&nbsp; Launch</span>
        <span>{total}+ live sites delivered</span>
      </div>
    </section>
    """)

    # ----- capabilities
    caps = "".join(f"""
      <div class="cap">
        <span class="cap-num">{n}</span>
        <h3>{esc(t)}</h3>
        <p>{esc(d)}</p>
      </div>""" for n, t, d in CAPABILITIES)
    pages.append(f"""
    <section class="page pad">
      <span class="eyebrow">Capabilities</span>
      <h2 class="section-title">Digital experiences built to look sharp and work hard.</h2>
      <p class="section-sub">From strategy and interface design to launch-ready development and optimization.</p>
      <div class="cap-grid">{caps}</div>
    </section>
    """)

    # ----- featured (one per page)
    for f in FEATURED:
        item = by_slug.get(f["slug"], {})
        url = item.get("url", "#")
        stack = item.get("stack", "")
        focus = "".join(f"<li>{esc(x)}</li>" for x in f["focus"])
        pages.append(f"""
        <section class="page pad feature">
          <div class="feature-head">
            <span class="eyebrow">Selected Work</span>
            <span class="stack-badge">{esc(stack)}</span>
          </div>
          <div class="shot"><img src="{img_uri(f['slug'])}" alt="{esc(f['name'])}"></div>
          <div class="feature-body">
            <span class="tag">{esc(f['tag'])}</span>
            <h2>{esc(f['name'])}</h2>
            <p class="lead">{esc(f['lead'])}</p>
            <p class="desc">{esc(f['body'])}</p>
            <ul class="focus">{focus}</ul>
            <div class="link"><span class="dot"></span>{esc(clean_url(url))}</div>
          </div>
        </section>
        """)

    # ----- breadth grid (9 per page: 3 x 3)
    per = 9
    chunks = [grid[i:i + per] for i in range(0, len(grid), per)]
    for idx, chunk in enumerate(chunks):
        cards = ""
        for it in chunk:
            name = NAME_OVERRIDES.get(it["slug"], it["name"])
            cards += f"""
            <div class="card">
              <div class="card-shot"><img src="{img_uri(it['slug'])}" alt="{esc(name)}"></div>
              <div class="card-meta">
                <span class="card-cat">{esc(it['category'])}</span>
                <h4>{esc(name)}</h4>
                <span class="card-url">{esc(clean_url(it['domain']))}</span>
              </div>
            </div>"""
        head = "" if idx > 0 else f"""
          <span class="eyebrow">More Live Work</span>
          <h2 class="section-title">A cross-section of what we&apos;ve shipped.</h2>
          <p class="section-sub">Every project below is live and verified — WordPress, Shopify, Webflow, Wix and custom builds.</p>"""
        pages.append(f"""
        <section class="page pad">
          {head}
          <div class="card-grid">{cards}</div>
        </section>
        """)

    # ----- contact
    pages.append("""
    <section class="page contact">
      <div class="rule"></div>
      <h2>Ready to launch<br>something better?</h2>
      <p class="contact-lead">A focused website makes your offer easier to trust, easier to
      understand and easier to buy. Let's build yours.</p>
      <div class="contact-grid">
        <div>
          <span class="c-label">Expertise</span>
          <p>Shopify · WordPress · Webflow · Wix · Custom · Landing Pages</p>
        </div>
        <div>
          <span class="c-label">Services</span>
          <p>Design · Development · Performance · Ongoing Optimization</p>
        </div>
      </div>
      <div class="contact-foot">
        <span class="brand">LAUNCHNEST</span>
        <span>Build · Optimize · Launch</span>
      </div>
    </section>
    """)

    return CSS + "<body>" + "".join(pages) + "</body>"


CSS = """<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--navy:#0B1F3A;--gold:#C8A24B;--offwhite:#F6F4EF;--slate:#5B6B7F;--line:#E4E0D7;}
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
@page{size:A4;margin:0;}
body{font-family:'Inter',system-ui,Arial,sans-serif;color:var(--navy);}
.page{position:relative;width:210mm;height:297mm;overflow:hidden;page-break-after:always;background:#fff;}
.page:last-child{page-break-after:auto;}
.pad{padding:22mm 20mm;}
h1,h2,h3,h4,.brand,.tag,.eyebrow,.stack-badge,.card-cat,.c-label,.section-title{font-family:'Space Grotesk','Inter',sans-serif;}
.eyebrow{display:inline-block;font-size:10pt;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:10mm;}
.section-title{font-size:26pt;font-weight:700;line-height:1.12;max-width:150mm;}
.section-sub{margin-top:5mm;font-size:12pt;color:var(--slate);max-width:150mm;line-height:1.5;}

/* cover */
.cover{background:var(--navy);color:var(--offwhite);display:flex;flex-direction:column;justify-content:space-between;padding:24mm 20mm;}
.cover-top{display:flex;justify-content:space-between;align-items:center;}
.brand{font-weight:700;letter-spacing:.28em;font-size:12pt;}
.edition{font-size:10pt;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);}
.cover-mid .rule{width:64px;height:4px;background:var(--gold);margin-bottom:14mm;}
.cover-mid h1{font-size:46pt;line-height:1.05;font-weight:700;letter-spacing:-.01em;}
.cover-mid p{margin-top:10mm;font-size:13pt;line-height:1.6;color:#C9D4E2;max-width:150mm;}
.cover-bottom{display:flex;justify-content:space-between;align-items:center;font-size:10.5pt;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);border-top:1px solid rgba(255,255,255,.15);padding-top:8mm;}

/* capabilities */
.cap-grid{margin-top:14mm;display:grid;grid-template-columns:1fr 1fr;gap:12mm 14mm;}
.cap-num{font-family:'Space Grotesk';color:var(--gold);font-weight:700;font-size:13pt;}
.cap h3{font-size:14pt;margin:3mm 0 2mm;font-weight:600;}
.cap p{font-size:11pt;color:var(--slate);line-height:1.5;}

/* featured */
.feature-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8mm;}
.feature-head .eyebrow{margin-bottom:0;}
.stack-badge{font-size:9pt;letter-spacing:.1em;text-transform:uppercase;color:var(--navy);background:var(--offwhite);border:1px solid var(--line);padding:2mm 4mm;border-radius:100px;font-weight:600;}
.shot{border:1px solid var(--line);border-radius:3mm;overflow:hidden;box-shadow:0 18px 50px -24px rgba(11,31,58,.4);height:120mm;background:var(--offwhite);}
.shot img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;}
.feature-body{margin-top:10mm;}
.tag{font-size:9.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:600;}
.feature-body h2{font-size:28pt;font-weight:700;margin:3mm 0 4mm;letter-spacing:-.01em;}
.lead{font-size:13.5pt;line-height:1.45;color:var(--navy);font-weight:500;max-width:160mm;}
.desc{margin-top:4mm;font-size:11pt;line-height:1.55;color:var(--slate);max-width:160mm;}
.focus{margin:6mm 0 0;list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:3mm 8mm;}
.focus li{position:relative;padding-left:7mm;font-size:10.5pt;color:var(--navy);line-height:1.4;}
.focus li:before{content:"";position:absolute;left:0;top:2mm;width:3mm;height:3mm;background:var(--gold);border-radius:50%;}
.link{margin-top:8mm;display:flex;align-items:center;gap:3mm;font-family:'Space Grotesk';font-weight:600;font-size:11pt;color:var(--navy);}
.link .dot{width:2.5mm;height:2.5mm;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.18);}

/* breadth grid */
.card-grid{margin-top:12mm;display:grid;grid-template-columns:repeat(3,1fr);gap:8mm 7mm;}
.card{border:1px solid var(--line);border-radius:2.5mm;overflow:hidden;background:#fff;}
.card-shot{height:34mm;background:var(--offwhite);overflow:hidden;border-bottom:1px solid var(--line);}
.card-shot img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;}
.card-meta{padding:4mm 4mm 5mm;}
.card-cat{font-size:7.5pt;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:600;}
.card-meta h4{font-size:11pt;font-weight:600;margin:1.5mm 0;line-height:1.2;}
.card-url{font-size:8.5pt;color:var(--slate);word-break:break-all;}

/* contact */
.contact{background:var(--navy);color:var(--offwhite);padding:28mm 20mm;display:flex;flex-direction:column;justify-content:center;}
.contact .rule{width:64px;height:4px;background:var(--gold);margin-bottom:12mm;}
.contact h2{font-size:38pt;font-weight:700;line-height:1.08;}
.contact-lead{margin-top:8mm;font-size:13pt;line-height:1.6;color:#C9D4E2;max-width:150mm;}
.contact-grid{margin-top:16mm;display:grid;grid-template-columns:1fr 1fr;gap:12mm;}
.c-label{font-size:9.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:600;}
.contact-grid p{margin-top:3mm;font-size:11.5pt;color:#E7EDF4;line-height:1.5;}
.contact-foot{margin-top:22mm;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.15);padding-top:8mm;font-size:10.5pt;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);}
</style></head>"""


def main():
    html = build_html()
    HTML_OUT.write_text(html, encoding="utf-8")
    PDF_OUT.parent.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(HTML_OUT.as_uri(), wait_until="networkidle")
        page.wait_for_timeout(1500)  # let fonts + images settle
        page.emulate_media(media="print")
        page.pdf(path=str(PDF_OUT), format="A4", print_background=True,
                 prefer_css_page_size=True)
        browser.close()

    print(f"PDF written to: {PDF_OUT}")
    print(f"Size: {PDF_OUT.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
