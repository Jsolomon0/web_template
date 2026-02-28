import { siteConfigSchema } from "@/content/schema";

const primaryCta = {
  label: "Schedule a call",
  href: "#contact",
  intent: "primary",
};

const secondaryCta = {
  label: "Send a message",
  href: "mailto:hello@northwind.studio",
  intent: "secondary",
};

const rawSiteConfig = {
  business: {
    name: "Northwind Studio",
    tagline: "Clarity for growing teams",
    industry: "consulting",
  },
  branding: {
    colors: {
      background: "#f8fafc",
      foreground: "#0f172a",
      muted: "#475569",
      accent: "#f97316",
      accentAlt: "#14b8a6",
      ring: "rgba(15, 23, 42, 0.12)",
    },
    fonts: {
      sans: "manrope",
      serif: "playfair-display",
    },
    mark: "NS",
    logo: {
      type: "mark",
      text: "NS",
    },
  },
  ui: {
    skipLinkLabel: "Skip to content",
    menuLabel: "Menu",
    primaryNavLabel: "Primary navigation",
    mobileNavLabel: "Mobile navigation",
    footerLegalTemplate: "{year} {business}. All rights reserved.",
    showPrimaryCta: true,
  },
  ctas: {
    primary: primaryCta,
    secondary: secondaryCta,
  },
  contact: {
    email: "hello@northwind.studio",
    phone: "(555) 010-2468",
    hours: "Mon-Fri, 9:00 AM-6:00 PM",
    address: {
      line1: "125 Harbor Avenue",
      city: "Seattle",
      region: "WA",
      postalCode: "98101",
      country: "United States",
    },
  },
  navigation: [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com", badge: "IN" },
    { label: "X", href: "https://www.x.com", badge: "X" },
  ],
  featureFlags: {
    showServices: true,
    showCta: true,
  },
  industries: {
    consulting: { label: "Consulting" },
    "real-estate": { label: "Real Estate" },
  },
  industryOverrides: {
    consulting: {
      hero: {
        eyebrow: "Strategic advisory",
        title: "Guidance that aligns leaders, teams, and outcomes",
        description:
          "Decision support, execution planning, and delivery coaching designed to keep initiatives on track.",
      },
    },
    "real-estate": {
      hero: {
        eyebrow: "Property advisory",
        title: "Market insight for confident property decisions",
        description:
          "Portfolio planning, transaction support, and asset strategy tailored to regional markets.",
      },
      services: {
        eyebrow: "Services",
        title: "Advisory services for property teams",
        description:
          "Insight-driven support for acquisitions, leasing, and asset positioning.",
      },
      cta: {
        eyebrow: "Next steps",
        headline: "Plan your next property move",
        supportingText:
          "Get a focused roadmap aligned to timelines, budgets, and growth targets.",
      },
    },
  },
  seo: {
    defaultTitle: "Northwind Studio",
    titleTemplate: "%s | Northwind Studio",
    description:
      "A flexible business website template built for clarity, trust, and measurable outcomes.",
    openGraph: {
      type: "website",
    },
  },
};

export const siteConfig = siteConfigSchema.parse(rawSiteConfig);
