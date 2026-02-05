/**
 * ============================================
 * SITE CONFIGURATION
 * ============================================
 *
 * This is the ONE file you need to edit to customize your site.
 * Change the values below and your site will update automatically.
 *
 * No coding knowledge required - just change the text between the quotes!
 */

const siteConfig = {
  // ─────────────────────────────────────────
  // BASIC INFO (Required)
  // ─────────────────────────────────────────

  /** Your site/company/project name */
  name: "My Channel",

  /** A short tagline (appears below the name) */
  tagline: "Building something amazing",

  /** A longer description for search engines */
  description: "A website for creators who want to build tech into their brand.",

  // ─────────────────────────────────────────
  // COLORS (Choose your brand colors)
  // ─────────────────────────────────────────
  //
  // Use hex colors like "#3b82f6" or color names like "blue"
  // Find colors at: https://tailwindcss.com/docs/customizing-colors
  //
  colors: {
    /** Main brand color (buttons, links, accents) */
    primary: "#00DAFF",      // Blue

    /** Secondary accent color */
    secondary: "#8b5cf6",    // Purple

    /** Background color for light mode */
    background: "#ffffff",   // White

    /** Text color for light mode */
    foreground: "#171717",   // Near black

    /** Background color for dark mode */
    backgroundDark: "#0a0a0a", // Near black

    /** Text color for dark mode */
    foregroundDark: "#ededed",  // Near white
  },

  // ─────────────────────────────────────────
  // CALL TO ACTION BUTTONS
  // ─────────────────────────────────────────

  cta: {
    /** Primary button text */
    primaryText: "Get Started",

    /** Where the primary button links to */
    primaryLink: "#",

    /** Secondary button text */
    secondaryText: "See YouTube Channel",

    /** Where the secondary button links to */
    secondaryLink: "#",
  },

  // ─────────────────────────────────────────
  // SOCIAL LINKS (Leave empty to hide)
  // ─────────────────────────────────────────

  social: {
    youtube: "",      // e.g., "https://youtube.com/@yourhandle"
    twitter: "",      // e.g., "https://twitter.com/yourhandle"
    github: "",       // e.g., "https://github.com/yourrepo"
    linkedin: "",     // e.g., "https://linkedin.com/in/yourprofile"
    instagram: "",    // e.g., "https://instagram.com/yourhandle"
  },

  // ─────────────────────────────────────────
  // FEATURES SECTION (Optional)
  // ─────────────────────────────────────────
  //
  // Add up to 3 features to highlight on your landing page.
  // Set to an empty array [] to hide this section.
  //
  features: [
    {
      title: "Fast & Modern",
      description: "Built with the latest web technologies for optimal performance.",
    },
    {
      title: "Easy to Customize",
      description: "Change colors, text, and more with simple configuration.",
    },
    {
      title: "Ready to Deploy",
      description: "One-click deployment to Vercel, Netlify, or any hosting platform.",
    },
  ],

  // ─────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────

  footer: {
    /** Copyright text (the year updates automatically) */
    copyright: "Your Channel Name",
  },
};

export default siteConfig;

// Type export for TypeScript users (you can ignore this)
export type SiteConfig = typeof siteConfig;
