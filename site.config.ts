const siteConfig = {
  // ─────────────────────────────────────────
  // BASIC INFO (Required)
  // ─────────────────────────────────────────

  name: "Your Channel Name",

  tagline: "Your creator website—ready to customize and ship.",

  description:
    "This is the starting point: a clean, launch-ready site template for creators. Customize the copy, add your links, and publish a homepage you’re proud of—then build more creator features over time.",

  // ─────────────────────────────────────────
  // COLORS (Choose your brand colors)
  // ─────────────────────────────────────────

  colors: {
    primary: "#00DAFF",        // Electric cyan
    secondary: "#FB637A",      // Warm punchy accent (pink/red)
    background: "#ffffff",
    foreground: "#171717",
    backgroundDark: "#082430", // Deep blue-green (nice “tech” dark)
    foregroundDark: "#ededed",
  },

  // ─────────────────────────────────────────
  // CALL TO ACTION BUTTONS
  // ─────────────────────────────────────────

  cta: {
    primaryText: "Customize This Site",
    primaryLink: "#customize", // section id on the page

    secondaryText: "Watch on YouTube",
    secondaryLink: "https://youtube.com/@yourchannel", // your YouTube channel URL
  },

  // ─────────────────────────────────────────
  // SOCIAL LINKS (Leave empty to hide)
  // ─────────────────────────────────────────

  social: {
    youtube: "",   // https://youtube.com/@yourhandle
    twitter: "",   // https://x.com/yourhandle
    github: "",    // optional: link to your repo or leave blank
    linkedin: "",  // https://linkedin.com/in/you
    instagram: "", // https://instagram.com/yourhandle
  },

  // ─────────────────────────────────────────
  // FEATURES SECTION (Optional)
  // ─────────────────────────────────────────

  features: [
    {
      title: "Launch a clean homepage first",
      description:
        "Start simple: a polished personal site with the right sections, strong defaults, and a layout that looks legit out of the box.",
    },
    {
      title: "Make it yours in minutes",
      description:
        "Swap in your channel name, bio, links, and brand colors. You’ll have a customized site live fast—without getting stuck tweaking details.",
    },
    {
      title: "Add creator features as you grow",
      description:
        "This template is built to expand. In future builds, you can layer in things like email capture, gated content, a dashboard, and payments—step by step.",
    },
  ],

  // ─────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────

  footer: {
    copyright: "Your Channel Name",
  },
};

export default siteConfig;
export type SiteConfig = typeof siteConfig;