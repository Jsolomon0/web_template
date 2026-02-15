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

const heroContent = {
  eyebrow: "Business website template",
  title: "Clarity for growing teams",
  description:
    "Build a polished online presence with configurable sections, clear messaging, and reusable blocks.",
  layout: "split",
  highlights: [
    {
      label: "Typical kickoff",
      value: "2 weeks",
    },
    {
      label: "Project clarity",
      value: "Clear milestones",
    },
  ],
  background: {
    type: "gradient",
  },
};

const servicesContent = {
  eyebrow: "Services",
  title: "Services designed for momentum",
  description:
    "Organized offerings that translate into clear next steps and measurable outcomes.",
  columns: 3,
  items: [
    {
      title: "Discovery",
      description:
        "Align on goals, constraints, and success criteria before execution.",
      icon: { glyph: "1", label: "Step one" },
    },
    {
      title: "Planning",
      description:
        "Create a focused roadmap with priorities, timelines, and owners.",
      icon: { glyph: "2", label: "Step two" },
    },
    {
      title: "Delivery",
      description:
        "Execute with consistent communication and measurable checkpoints.",
      icon: { glyph: "3", label: "Step three" },
    },
  ],
};

const primaryCtaContent = {
  eyebrow: "Call to action",
  headline: "Ready for a guided kickoff?",
  supportingText:
    "Choose a starting point and we will tailor a plan around your goals.",
  intent: "primary",
};

const secondaryCtaContent = {
  eyebrow: "Next steps",
  headline: "Let us map your next milestone",
  supportingText:
    "Share a brief summary and we will follow up within one business day.",
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
  pages: {
    home: {
      seo: {
        title: "Clarity for growing teams",
        description:
          "A reusable business website template with configurable blocks, conversion-focused CTAs, and a clean brand system.",
      },
      blocks: [
        {
          type: "hero",
          props: {
            id: "top",
            ...heroContent,
            primaryCta,
            secondaryCta,
          },
        },
        {
          type: "services",
          props: {
            id: "services",
            eyebrow: servicesContent.eyebrow,
            title: servicesContent.title,
            description: servicesContent.description,
            columns: servicesContent.columns,
            services: servicesContent.items,
          },
        },
        {
          type: "cta",
          props: {
            id: "process",
            ...primaryCtaContent,
            cta: primaryCta,
          },
        },
        {
          type: "cta",
          props: {
            id: "contact",
            ...secondaryCtaContent,
            cta: secondaryCta,
          },
        },
      ],
    },
  },
};

export const siteConfig = siteConfigSchema.parse(rawSiteConfig);
