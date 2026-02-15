import { z } from "zod";

export const CONTENT_SCHEMA_VERSION = 1;

export const ctaLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  intent: z.enum(["primary", "secondary"]).optional(),
});

export const heroSchema = z.object({
  id: z.string().optional(),
  layout: z.enum(["centered", "split"]).optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  primaryCta: ctaLinkSchema,
  secondaryCta: ctaLinkSchema.optional(),
  background: z
    .discriminatedUnion("type", [
      z.object({
        type: z.literal("image"),
        src: z.string().min(1),
        alt: z.string().min(1),
        priority: z.boolean().optional(),
        sizes: z.string().optional(),
        aspectRatio: z.number().positive().optional(),
      }),
      z.object({
        type: z.literal("gradient"),
        className: z.string().optional(),
      }),
    ])
    .optional(),
  highlights: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .optional(),
});

export const servicesSchema = z.object({
  id: z.string().optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  services: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      icon: z
        .object({
          glyph: z.string().min(1),
          label: z.string().min(1),
        })
        .optional(),
    }),
  ),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
});

export const ctaSchema = z.object({
  id: z.string().optional(),
  eyebrow: z.string().optional(),
  headline: z.string().min(1),
  supportingText: z.string().optional(),
  intent: z.enum(["primary", "secondary"]).optional(),
  cta: ctaLinkSchema,
});

export const headingSchema = z.object({
  id: z.string().optional(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  text: z.string().min(1),
});

export const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("hero"), props: heroSchema }),
  z.object({ type: z.literal("services"), props: servicesSchema }),
  z.object({ type: z.literal("cta"), props: ctaSchema }),
  z.object({ type: z.literal("heading"), props: headingSchema }),
]);

export const pageSchema = z
  .object({
    version: z.literal(CONTENT_SCHEMA_VERSION),
    id: z.string().min(1),
    blocks: z.array(blockSchema),
  })
  .superRefine((page, ctx) => {
    const heroCount = page.blocks.filter((block) => block.type === "hero").length;
    const headingH1Count = page.blocks.filter(
      (block) => block.type === "heading" && block.props.level === 1,
    ).length;
    const totalH1 = heroCount + headingH1Count;

    if (totalH1 !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Pages must include exactly one h1. Provide a hero block or a heading block with level 1.",
        path: ["blocks"],
      });
    }

    if (heroCount === 0 && headingH1Count === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Pages must include either a hero block or an explicit heading block with level 1.",
        path: ["blocks"],
      });
    }
  });

export const siteConfigSchema = z.object({
  business: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    industry: z.string().min(1),
  }),
  branding: z.object({
    colors: z.object({
      background: z.string().min(1),
      foreground: z.string().min(1),
      muted: z.string().min(1),
      accent: z.string().min(1),
      accentAlt: z.string().min(1),
      ring: z.string().min(1),
    }),
    fonts: z.object({
      sans: z.enum(["manrope", "playfair-display"]),
      serif: z.enum(["manrope", "playfair-display"]),
    }),
    mark: z.string().min(1),
    logo: z
      .discriminatedUnion("type", [
        z.object({
          type: z.literal("mark"),
          text: z.string().min(1),
        }),
        z.object({
          type: z.literal("image"),
          src: z.string().min(1),
          alt: z.string().min(1),
        }),
      ])
      .optional(),
  }),
  ui: z.object({
    skipLinkLabel: z.string().min(1),
    menuLabel: z.string().min(1),
    primaryNavLabel: z.string().min(1),
    mobileNavLabel: z.string().min(1),
    footerLegalTemplate: z.string().min(1),
    showPrimaryCta: z.boolean(),
  }),
  ctas: z.object({
    primary: ctaLinkSchema,
    secondary: ctaLinkSchema,
  }),
  contact: z.object({
    email: z.string().min(1),
    phone: z.string().min(1),
    hours: z.string().min(1),
    address: z
      .object({
        line1: z.string().min(1),
        line2: z.string().optional(),
        city: z.string().min(1),
        region: z.string().min(1),
        postalCode: z.string().min(1),
        country: z.string().min(1),
      })
      .optional(),
  }),
  navigation: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
  ),
  social: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().min(1),
      badge: z.string().min(1).optional(),
    }),
  ),
  featureFlags: z.object({
    showServices: z.boolean(),
    showCta: z.boolean(),
  }),
  industries: z.record(
    z.string().min(1),
    z.object({
      label: z.string().min(1),
    }),
  ),
  industryOverrides: z
    .record(
      z.string().min(1),
      z.object({
        hero: z
          .object({
            eyebrow: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          })
          .optional(),
        services: z
          .object({
            eyebrow: z.string().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
          })
          .optional(),
        cta: z
          .object({
            eyebrow: z.string().optional(),
            headline: z.string().optional(),
            supportingText: z.string().optional(),
          })
          .optional(),
      }),
    )
    .optional(),
  seo: z.object({
    defaultTitle: z.string().min(1),
    titleTemplate: z.string().min(1),
    description: z.string().min(1),
    openGraph: z
      .object({
        type: z.enum(["website", "article"]),
      })
      .optional(),
  }),
  pages: z.object({
    home: z.object({
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          openGraph: z
            .object({
              title: z.string().optional(),
              description: z.string().optional(),
              type: z.enum(["website", "article"]).optional(),
              url: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      blocks: z.array(blockSchema),
    }),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type PageDefinition = z.infer<typeof pageSchema>;
