/* =================================================================
   Kaden Yeung — Experience content index
   -----------------------------------------------------------------
   Single source of truth for the in-depth experience pages.
   The rows in index.html (#experience) link to /experience.html?slug=<slug>.

   Field reference:
     slug     unique id, used in the URL (?slug=)
     company  organization name, shown as the page H1
     role     job title, shown in the meta row
     period   date range, shown in the meta row
     tagline  one-line subtitle shown under the H1
     tags     array of short strings
     links    array of { label, url, icon } — icon is a boxicons class
     body     Markdown string (rendered with the blog engine).
              Start with "## ..." (never a single "# ") for headings.
   ================================================================= */
window.EXPERIENCE = [
  {
    slug: "zero",
    company: "Zero",
    role: "Product Intern",
    period: "Jul 2026 – Present",
    tagline: "Building on the product team.",
    tags: ["Product"],
    links: [],
    body: [
      "## Overview",
      "I joined Zero as a Product intern in July 2026 and am currently still on the team.",
      "More on what I'm building here soon.",
    ].join("\n\n"),
  },
  {
    slug: "victory-velocity",
    company: "Victory Velocity",
    role: "Co-Founder",
    period: "2026 – Present",
    tagline: "Helping businesses get found and cited by AI search engines.",
    tags: ["GEO", "SEO", "Agency"],
    links: [
      { label: "Read my writing on Medium", url: "https://kadenyeung.medium.com/", icon: "bxl-medium" },
    ],
    body: [
      "## Overview",
      "Victory Velocity is the GEO and ChatGPT-ads agency I'm co-founding, helping businesses show up in AI engines. Search is shifting from Google links to AI citations, and paid discovery is shifting from keyword bidding to conversational context — Victory Velocity helps brands adapt to both.",
      "## Why I started it",
      "I noticed the shift firsthand: more of my own research and buying decisions were routing through AI answers instead of search results. I wrote up the thesis in *The Biggest Shift in Marketing Since Google Ads* and started building the agency around it.",
    ].join("\n\n"),
  },
  {
    slug: "singularity-health",
    company: "Singularity Health",
    role: "Operations Intern",
    period: "May 2025 – Dec 2025",
    tagline: "Raising money and sitting in on investor conversations.",
    tags: ["Operations", "Fundraising"],
    links: [
      { label: "Visit website", url: "https://www.singularity.health/", icon: "bx-link-external" },
    ],
    body: [
      "## Overview",
      "Reached out to 50+ startups and landed an operations role helping Singularity Health raise money.",
      "## What I took away",
      "Sitting in on conversations with VCs and investor meetings was eye-opening — my first real look at how fundraising conversations actually happen.",
    ].join("\n\n"),
  },
  {
    slug: "robotics-instructor",
    company: "University Neighbourhoods Association",
    role: "Robotics Instructor",
    period: "Jul 2024 – Jun 2025",
    tagline: "Taught robotics to kids in the community for a year.",
    tags: ["Teaching", "Robotics"],
    links: [],
    body: [
      "## Overview",
      "Spent a year as a Robotics Instructor with the University Neighbourhoods Association, teaching robotics fundamentals to students in the community.",
    ].join("\n\n"),
  },
  {
    slug: "uob-kay-hian",
    company: "UOB Kay Hian",
    role: "App-Dev Intern",
    period: "2024",
    tagline: "My first taste of corporate life.",
    tags: ["UI/UX", "App-dev"],
    links: [
      { label: "Visit website", url: "https://www.uobkayhian.com/", icon: "bx-link-external" },
    ],
    body: [
      "## Overview",
      "My first taste of corporate life, working in the e-business department on UI/UX design and product feedback.",
    ].join("\n\n"),
  },
];
