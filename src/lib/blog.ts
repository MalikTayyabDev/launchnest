export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingTime: string;
  author: string;
  body: string[]; // paragraphs
};

export const posts: BlogPost[] = [
  {
    slug: "why-your-checkout-is-slow",
    title: "Why your checkout is slow (and how to find out in 10 minutes)",
    excerpt:
      "Most slow checkouts aren't a hosting problem. They're a third-party script problem. Here's exactly how to find the culprit.",
    category: "Performance",
    date: "2026-05-14",
    readingTime: "6 min read",
    author: "LaunchNest",
    body: [
      "When a checkout feels slow, the instinct is to blame the host or the platform. In our experience, that's rarely the real cause. The usual culprit is a stack of third-party scripts — chat widgets, analytics, upsell apps — each loading synchronously on the one page where every millisecond costs you money.",
      "Open your checkout in Chrome, run a Performance trace, and look at the main thread. If you see long blocking tasks tied to a domain that isn't yours, you've found the problem. The fix is usually to defer, replace, or remove the offending script — not to migrate hosts.",
      "We rebuilt one client's Shopify checkout by isolating two blocking apps. Replacing one and deferring the other cut load time by 1.8 seconds and lifted mobile conversion 14%. No hosting change required.",
    ],
  },
  {
    slug: "core-web-vitals-that-matter",
    title: "The Core Web Vitals that actually move revenue",
    excerpt:
      "Not every metric is worth chasing. Here's which ones correlate with conversions and which are mostly noise.",
    category: "SEO",
    date: "2026-04-02",
    readingTime: "7 min read",
    author: "LaunchNest",
    body: [
      "Core Web Vitals are a useful proxy for user experience, but they aren't all equal in business terms. Largest Contentful Paint (LCP) is the one we watch most closely — it maps directly to how fast a user perceives your page as usable.",
      "Our internal standard is an LCP under 2.5 seconds on a mid-range mobile device on a real network, not a lab machine on fiber. That constraint changes which optimizations are worth the effort.",
      "Interaction to Next Paint (INP) matters most on interactive pages — checkouts, dashboards, configurators. Cumulative Layout Shift (CLS) is often the cheapest to fix: reserve space for images and embeds, and most of the score problem disappears.",
    ],
  },
  {
    slug: "what-maintenance-actually-means",
    title: "What 'website maintenance' should actually include",
    excerpt:
      "The word is vague on purpose. Here's the specific checklist a real maintenance plan covers.",
    category: "Maintenance",
    date: "2026-02-20",
    readingTime: "5 min read",
    author: "LaunchNest",
    body: [
      "\"Maintenance\" is one of the vaguest words in this industry, which is exactly why it's easy to underdeliver on. A real plan is a specific checklist, not a vibe.",
      "At minimum it should cover: dependency and plugin updates on a schedule, automated off-site backups you can actually restore from, uptime monitoring with alerts, and security patching. Anything less is just hoping nothing breaks.",
      "The reason it matters: an unpatched plugin update taking down your checkout at 2am is not a hypothetical. It's the single most common emergency we get called about — usually by someone whose previous developer has long since disappeared.",
    ],
  },
  {
    slug: "shopify-speed-optimization-checklist",
    title: "A practical Shopify speed optimization checklist",
    excerpt:
      "The specific, in-order list we work through when a Shopify store is slow — before touching the theme code.",
    category: "Performance",
    date: "2026-06-10",
    readingTime: "8 min read",
    author: "LaunchNest",
    body: [
      "Most Shopify speed advice is either too generic (\"optimize your images\") or too aggressive (\"rip out your theme\"). The truth sits in the middle, and it's boring: audit, measure, remove, then optimize — in that order.",
      "Start with the apps. Every Shopify app that injects a script is a tax on every page load. Open your theme's rendered source and count the third-party domains. In most slow stores we audit, two or three apps account for the majority of the blocking JavaScript. Removing or replacing them is usually the single biggest win.",
      "Next, images. Shopify serves responsive images if you let it — use the theme's image_url filters with width parameters and loading=\"lazy\" below the fold. The hero image is the exception: it's almost always your LCP element, so preload it and never lazy-load it.",
      "Then fonts. Self-host or preconnect, subset to the weights you actually use, and set font-display: swap. A single unused font weight can delay your first render on mobile.",
      "Only after all that do we touch Liquid and theme JavaScript. Optimizing code you could have deleted is wasted effort. The checklist works because it forces you to remove before you refine.",
    ],
  },
  {
    slug: "how-much-should-a-website-cost",
    title: "How much should a website actually cost in 2026?",
    excerpt:
      "Why website pricing is all over the map — and how to tell a fair quote from a guess or a rip-off.",
    category: "Pricing",
    date: "2026-06-28",
    readingTime: "6 min read",
    author: "LaunchNest",
    body: [
      "\"How much does a website cost?\" is a fair question with a frustrating answer: it depends. But it doesn't depend on nothing — it depends on a few specific things, and once you know them you can read a quote properly.",
      "The biggest driver is whether the site is a template build or a bespoke platform. A well-executed template site can be genuinely great and start in the low hundreds. A custom platform with integrations, a real CMS, and performance guarantees is a different category, and pricing scales accordingly.",
      "The second driver is what happens after launch. A cheap build with no maintenance is often more expensive over two years than a solid build with a care plan — because you pay for the emergencies instead of the prevention.",
      "Be wary of two extremes: a quote far below market usually means corners you'll pay for later, and a quote far above it should come with a very specific justification. A fair quote tells you what you're getting, what it's built on, and who maintains it. That's what we aim for with transparent starting ranges rather than a single mystery number.",
    ],
  },
  {
    slug: "webflow-vs-wordpress",
    title: "Webflow vs WordPress for a growing business",
    excerpt:
      "A straight comparison based on who edits the site, what it has to do, and where you're headed — not platform tribalism.",
    category: "Development",
    date: "2026-07-08",
    readingTime: "7 min read",
    author: "LaunchNest",
    body: [
      "The Webflow-versus-WordPress debate usually generates more heat than light, because the right answer depends entirely on your situation. Both are excellent tools. Neither is universally better.",
      "Choose Webflow when the site is primarily marketing, your team wants a clean visual editor, and you value hosting and security being handled for you. It's fast to build, hard to break, and produces good markup out of the box.",
      "Choose WordPress when you need deep customization, a large content operation, e-commerce beyond the basics, or specific plugins and integrations that only exist in that ecosystem. The trade-off is that WordPress needs real maintenance — it's powerful precisely because it's open.",
      "The deciding questions we ask clients: Who edits this weekly? How custom is the functionality? And do you want to own maintenance or outsource it? Answer those honestly and the platform usually picks itself. What matters far more than the logo is that whichever you choose is built well and kept up to date.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
