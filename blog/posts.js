/* =================================================================
   Kaden Yeung — Blog content index
   -----------------------------------------------------------------
   This file is the single source of truth for every post on the blog.
   To publish a new article:
     1. Write it in the Studio (studio.html) or by hand.
     2. Save the markdown into  blog/posts/<slug>.md
     3. Drop any images into    blog/images/
     4. Add a new object to the TOP of the BLOG_POSTS array below.
     5. Commit + push.  That's it — the blog rebuilds itself.

   Field reference:
     slug      unique id, also the ?slug= used in the URL  (no spaces)
     title     headline
     subtitle  dek / one-line description (optional)
     date      ISO date "YYYY-MM-DD" — controls ordering (newest first)
     dateLabel human-friendly date shown on the page
     tags      array of short strings (optional)
     cover     image filename inside blog/images/  ("" for none)
     excerpt   teaser shown on the blog index card
     file      markdown filename inside blog/posts/
     featured  true to highlight at the top of the index (optional)
   ================================================================= */
window.BLOG_POSTS = [
  {
    slug: "finishing-high-school-starting-an",
    title:
      "Finishing high-school, starting an agency, and teaching my 13-year-old brother how to code.",
    subtitle: "2026, first half.",
    date: "2026-05-28",
    dateLabel: "May 2026",
    tags: ["Life", "Building", "Agency"],
    cover: "finishing-high-school-starting-an_img8.jpg",
    excerpt:
      "HABs research, a Cerebras hackathon, a photo booth, a GEO + ChatGPT-ads agency, and a reminder that no metric replaces the people you love.",
    file: "finishing-high-school-starting-an.md",
    featured: true,
  },
  {
    slug: "18",
    title: "18.",
    subtitle: "break-up talk.",
    date: "2026-02-15",
    dateLabel: "Feb 2026",
    tags: ["Life", "Reflection"],
    cover: "",
    excerpt:
      "My first breakup, withdrawal syndrome, the myth of closure, and the quiet battle of learning to be 'me' again.",
    file: "18.md",
  },
  {
    slug: "things-seen-only-by-those-at-home",
    title: "Things seen only by those at home with Nature and its works.",
    subtitle:
      "If I die by next morning, the wheel of time goes on, nature goes on.",
    date: "2026-01-20",
    dateLabel: "Jan 2026",
    tags: ["Philosophy", "Stoicism"],
    cover: "",
    excerpt:
      "An evening on the porch, Marcus Aurelius, and the strange beauty of a reality that carries on with or without us.",
    file: "things-seen-only-by-those-at-home.md",
  },
  {
    slug: "17-and-building-from-stagnant-to",
    title: "17 & Building: From Stagnant to Spotlight",
    subtitle: "a boring week — followed by the most awesome Saturday in my life.",
    date: "2025-06-14",
    dateLabel: "Jun 2025",
    tags: ["Building", "TKS", "Speaking"],
    cover: "17-and-building-from-stagnant-to_img1.png",
    excerpt:
      "From two stagnant weeks to leading my first panel in front of 250+ people with a Microsoft director. Breakthroughs come right after the valleys.",
    file: "17-and-building-from-stagnant-to.md",
  },
  {
    slug: "17-and-living-delicious-ambiguity",
    title: "17 & living : delicious ambiguity",
    subtitle:
      "living life with ambiguity, not knowing what happens next is the “meaning”.",
    date: "2025-06-07",
    dateLabel: "Jun 2025",
    tags: ["Life", "Web Summit", "People"],
    cover: "17-and-living-delicious-ambiguity_img1.png",
    excerpt:
      "A week at Web Summit, switching my goal from 'startups' to 'people', and the speakers who taught me to dance through life's ambiguity.",
    file: "17-and-living-delicious-ambiguity.md",
  },
  {
    slug: "17-and-building-chapter-1",
    title: "17 & Building : Chapter 1",
    subtitle:
      "Read my “private journal”. Every week — new projects, new thoughts, new perspectives.",
    date: "2025-05-24",
    dateLabel: "May 2025",
    tags: ["Building", "Wildfire", "Authenticity"],
    cover: "17-and-building-chapter-1_img6.jpg",
    excerpt:
      "The first chapter: a wildfire-detection idea, an honest look at building vs. proving my worth, freewriting, and a free ticket to Web Summit.",
    file: "17-and-building-chapter-1.md",
  },
  {
    slug: "kaden-yeung-december-newsletter",
    title: "Kaden Yeung | December Newsletter",
    subtitle: "Philosophy, an IKEA project, and the start of a business.",
    date: "2024-12-30",
    dateLabel: "Dec 2024",
    tags: ["Newsletter", "Philosophy", "TKS"],
    cover: "kaden-yeung-december-newsletter_img1.png",
    excerpt:
      "A December of Sapiens and Mark Manson, an LOI social, a two-week IKEA challenge, and the plan to build a business of my own.",
    file: "kaden-yeung-december-newsletter.md",
  },
  {
    slug: "kaden-yeung-november-newsletter",
    title: "Kaden Yeung | November Newsletter",
    subtitle: "A potato gun, crypto, sleep, and learning in public.",
    date: "2024-11-28",
    dateLabel: "Nov 2024",
    tags: ["Newsletter", "Hackathon", "Crypto"],
    cover: "kaden-yeung-november-newsletter_img2.png",
    excerpt:
      "My first hackathon (a Q-tip cannon), a crypto deep-dive, a broken sleep schedule, and a calming app built in Figma.",
    file: "kaden-yeung-november-newsletter.md",
  },
];
