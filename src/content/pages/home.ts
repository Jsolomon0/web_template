import type { PageDefinition } from "@/lib/blockRegistry";
import { applyFeatureFlags, applyIndustryOverrides } from "@/lib/industry";
import type { SiteConfig } from "@/content/schema";
import { CONTENT_SCHEMA_VERSION, pageSchema } from "@/content/schema";
import { getEnabledAnchors, resolveCtaLink } from "@/lib/navigation";

export function createHomePage(config: SiteConfig): PageDefinition {
  const basePage: PageDefinition = {
    version: CONTENT_SCHEMA_VERSION,
    id: "home",
    blocks: config.pages.home.blocks,
  };

  const industryAdjusted = applyIndustryOverrides(basePage, config);
  const finalPage = applyFeatureFlags(industryAdjusted, config.featureFlags);
  const enabledAnchors = getEnabledAnchors(finalPage.blocks, config.featureFlags);

  const blocks = finalPage.blocks.map((block) => {
    if (block.type === "hero") {
      const resolvedPrimary = resolveCtaLink(
        block.props.primaryCta,
        [config.ctas.primary, config.ctas.secondary],
        enabledAnchors,
      );
      const resolvedSecondary = block.props.secondaryCta
        ? resolveCtaLink(
            block.props.secondaryCta,
            [config.ctas.secondary, config.ctas.primary],
            enabledAnchors,
          )
        : undefined;

      return {
        ...block,
        props: {
          ...block.props,
          primaryCta: resolvedPrimary,
          secondaryCta: resolvedSecondary,
        },
      };
    }

    if (block.type === "cta") {
      const intent = block.props.intent ?? block.props.cta.intent ?? "primary";
      const fallbackOrder =
        intent === "secondary"
          ? [config.ctas.secondary, config.ctas.primary]
          : [config.ctas.primary, config.ctas.secondary];
      const resolvedCta = resolveCtaLink(
        block.props.cta,
        fallbackOrder,
        enabledAnchors,
      );

      return {
        ...block,
        props: {
          ...block.props,
          cta: resolvedCta,
        },
      };
    }

    return block;
  });

  return pageSchema.parse({ ...finalPage, blocks });
}
