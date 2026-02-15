import type { SiteConfig } from "@/content/schema";
import type { PageDefinition } from "@/lib/blockRegistry";

export function applyIndustryOverrides(
  page: PageDefinition,
  config: SiteConfig,
): PageDefinition {
  const overrides =
    config.industryOverrides?.[config.business.industry] ?? undefined;

  if (!overrides) {
    return page;
  }

  const blocks = page.blocks.map((block) => {
    switch (block.type) {
      case "hero":
        return {
          ...block,
          props: {
            ...block.props,
            ...overrides.hero,
          },
        };
      case "services":
        return {
          ...block,
          props: {
            ...block.props,
            ...overrides.services,
          },
        };
      case "cta":
        return {
          ...block,
          props: {
            ...block.props,
            ...overrides.cta,
          },
        };
      default:
        return block;
    }
  });

  return { ...page, blocks };
}

export function applyFeatureFlags(
  page: PageDefinition,
  flags: SiteConfig["featureFlags"],
): PageDefinition {
  const filtered = page.blocks.filter((block) => {
    if (block.type === "services" && !flags.showServices) {
      return false;
    }
    if (block.type === "cta" && !flags.showCta) {
      return false;
    }
    return true;
  });

  return { ...page, blocks: filtered };
}
