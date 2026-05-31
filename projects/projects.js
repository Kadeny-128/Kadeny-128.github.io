/* =================================================================
   Kaden Yeung — Projects content index
   -----------------------------------------------------------------
   Single source of truth for the in-depth project pages.
   The cards in index.html (#projects) link to /project?slug=<slug>.

   Field reference:
     slug     unique id, used in the URL (?slug=)
     title    project name
     tagline  one-line description shown under the title
     year     shown in the meta row
     status   short status label (e.g. "Shipped", "Research")
     tags     array of short strings
     links    array of { label, url, icon } — icon is a boxicons class
     body     Markdown string (rendered with the blog engine).
              Start with "## ..." (never a single "# ") for headings.
   ================================================================= */
window.PROJECTS = [
  {
    slug: "cerebras-drug-discovery",
    title: "Cerebras Drug Discovery Engine",
    tagline:
      "A multi-agent AI swarm that accelerates pharmaceutical lead identification — built in 48 hours.",
    year: "2026",
    status: "Hackathon build",
    tags: ["AI", "Multi-agent", "Drug discovery"],
    links: [
      { label: "View on GitHub", url: "https://github.com/Kadeny-128/consensus-engine", icon: "bxl-github" },
    ],
    body: [
      "## Overview",
      "Consensus is a drug-discovery lead-identification dashboard I built in 48 hours for a Cerebras hackathon. The core idea was **parallel agent orchestration**: instead of running one model over a list of compounds, the system spins up many AI agents at once and processes drug candidates simultaneously.",
      "## The problem",
      "Early-stage drug discovery is a funnel problem. You start with an enormous space of possible compounds and have to narrow it down to a handful worth taking into the lab. Doing that verification one compound at a time is painfully slow — and slow iteration is what makes the whole pipeline expensive.",
      "## How it works",
      "The engine autonomously cross-references biological targets against chemical constraints to verify whether a candidate is worth pursuing. Multiple agents reason over different compounds in parallel, then their conclusions are aggregated — a kind of consensus mechanism.",
      "- **Parallel agents** — many compounds evaluated at the same time, not in sequence",
      "- **Cerebras inference** — the speed of Cerebras' hardware is what made the architecture viable in real time",
      "- **Verification, not just generation** — agents check candidates against target + chemical constraints",
      "## What I learned",
      "I built the entire dashboard in two days of after-school hours. It was a brutal sprint, but it earned me a fireside chat with Cerebras' CTO — and it taught me that the bottleneck in a lot of AI products isn't the model, it's how you orchestrate compute around it.",
    ].join("\n\n"),
  },
  {
    slug: "pac-dose-habs",
    title: "Autodose PAC to Mitigate Annual HABs",
    tagline:
      "A sensor-guided dosing system that keeps desalination plants running through harmful algal blooms.",
    year: "2025",
    status: "Research + prototype",
    tags: ["Research", "Automation", "Desalination"],
    links: [
      { label: "Read the case study", url: "https://pacdose-automation.super.site/", icon: "bx-news" },
      { label: "GitHub", url: "https://github.com/Kadeny-128", icon: "bxl-github" },
    ],
    body: [
      "## Overview",
      "PAC-Dose is a research project tackling one of the quiet failure points of desalination: harmful algal blooms (HABs). When a bloom hits, plants get clogged and have to shut down. My system automates the coagulant dosing that keeps the intake clean.",
      "## The problem",
      "Harmful algal blooms are like giant clouds of tiny algae that grow out of control in the ocean. As they've intensified with warmer oceans, pollution, and climate change, they increasingly hit the coastal areas where desalination plants clean seawater for drinking. Today, dosing of coagulants (or powdered activated carbon — PAC) at the intake is largely **manual**, which barely moves the needle on plant downtime.",
      "## How it works",
      "The concept is sensor-guided auto-dosing: monitor intake water quality in real time and automatically dose the right amount of PAC / coagulant, replacing the manual approach.",
      "- **Sensors at the intake** read water conditions continuously",
      "- **Automated dosing** responds to bloom severity instead of a fixed schedule",
      "- **Goal:** less downtime, better desalination efficiency, and less wasted coagulant",
      "## Where it went",
      "I went deep on water-treatment chemistry and ended up with a working prototype I'm genuinely proud of. The work also put me in contact with an XPrize executive about implementation.",
    ].join("\n\n"),
  },
  {
    slug: "wildfire-detection",
    title: "Wildfire Detection System",
    tagline:
      "Ground-based sensors that score fire risk from the fuel up — prevention over execution.",
    year: "2025",
    status: "Concept + pitch",
    tags: ["IoT", "LoRaWAN", "Hardware"],
    links: [
      { label: "View the 1-pager", url: "https://drive.google.com/file/d/1EF3TtyhLMRUF_RdfzeIRY_qD-F55WKXN/view?usp=drive_link", icon: "bx-file" },
      { label: "GitHub", url: "https://github.com/Kadeny-128", icon: "bxl-github" },
    ],
    body: [
      "## Overview",
      "Every year, wildfires destroy over seven million acres in North America and cause more than $50 billion in damage. This project flips the usual approach: instead of detecting fires once they start, it predicts *where* they're likely to start by watching the fuel on the ground.",
      "## The problem",
      "It's commonly believed that human behaviour ignites wildfires, which makes them feel unpredictable. But it's often not the spark — it's the **fuel**. Dry forest fuels ignite quickly and spread fire rapidly. Yet weather stations only collect data high up in the sky; there's almost no ground-based data on fuel conditions. That gap makes no sense.",
      "## How it works",
      "The plan is a network of low-power ground sensors that watch fuel condition and environment, then send data to the cloud to compute a fire-risk score — so wildfire services know exactly where and how to prevent fires before they start.",
      "- **Tracks** fuel moisture, temperature, and wind",
      "- **Connectivity** over LoRaWAN, powered by solar — built for remote forest deployment",
      "- **Output** a risk score per location, not just an after-the-fact alarm",
      "## Where it went",
      "I built a pitch, a 1-pager, and a landing page, and got to pitch the idea to a VC at Deloitte and someone who runs AI at Google. They didn't ban the idea — which I took as a win. My mentor had worked directly with BC Wildfire Services on a similar project, which gave me a community to build with.",
    ].join("\n\n"),
  },
  {
    slug: "erc20-launch-guide",
    title: "ERC-20 Launch Guide",
    tagline:
      "Launching an Ethereum token in under 30 minutes — then writing the guide so others can too.",
    year: "2025",
    status: "Writing + build",
    tags: ["Web3", "Ethereum", "Writing"],
    links: [
      { label: "Read the guide on Medium", url: "https://kadenyeung.medium.com/how-to-launch-a-crypto-in-30-minutes-812cd3a8fc85", icon: "bxl-medium" },
      { label: "GitHub", url: "https://github.com/Kadeny-128", icon: "bxl-github" },
    ],
    body: [
      "## Overview",
      "I set out to create and launch my own token on Ethereum in under 30 minutes — and then documented the entire process as a guide so anyone could make their own.",
      "## Why",
      "Crypto is easy to talk about and hard to actually *do*. I wanted to understand it from first principles rather than headlines, so I built the thing end-to-end and wrote down every step.",
      "## What I took away",
      "Going through it hands-on gave me real intuition for smart contracts, decentralization, and how crypto tooling is built from the ground up.",
      "- **Smart contracts** — what an ERC-20 actually is under the hood",
      "- **Decentralization** — why these systems are designed the way they are",
      "- **Teaching by doing** — turning a build into a guide others can follow",
    ].join("\n\n"),
  },
];
