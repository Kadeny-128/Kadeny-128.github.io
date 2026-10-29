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
    slug: "victory-velocity",
    company: "Victory Velocity",
    role: "Co-Founder",
    period: "2026 – Present",
    tagline: "SEO and custom web solutions for businesses.",
    tags: ["SEO", "Web development", "Agency"],
    links: [
      { label: "victoryvelocity.ca", url: "https://www.victoryvelocity.ca/", icon: "bx-link-external" },
      { label: "Book a call", url: "https://cal.com/kaden-yeung-bgczdf/30min?overlayCalendar=true", icon: "bx-calendar" },
    ],
    body: [
      "## Overview",
      "Victory Velocity is the agency I run on the side. We do two things for businesses: SEO, so people can find you, and custom web solutions, so the site does what you need once they arrive.",
      "## Custom builds",
      "Most of my hours go into the custom side. That could be a booking flow for your customers, or an internal tool that replaces a process someone has been doing by hand for years. If it lives in a browser, I can probably build it.",
      "## Working together",
      "If you have a project in mind, [book a 30 minute call](" + "https://cal.com/kaden-yeung-bgczdf/30min?overlayCalendar=true" + ") or email me at 128kaden@gmail.com.",
    ].join("\n\n"),
  },
  {
    slug: "zero",
    company: "Zero",
    role: "Product Intern",
    period: "Jul – Aug 2026",
    tagline: "A summer on the product team.",
    tags: ["Product"],
    links: [],
    body: [
      "## Overview",
      "I joined Zero as a Product intern in July 2026 and finished in August 2026.",
      "More on what I worked on here soon.",
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
