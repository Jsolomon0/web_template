import type { SiteConfig } from "@/content/schema";
import type { BlockDefinition } from "@/lib/blockRegistry";

export type CtaLink = {
  label: string;
  href: string;
  intent?: "primary" | "secondary";
};

function isHashLink(href: string) {
  return href.startsWith("#");
}

function getBlockAnchor(block: BlockDefinition) {
  const props = (block as { props?: { id?: string } }).props;
  if (!props?.id) {
    return undefined;
  }
  return `#${props.id}`;
}

function isBlockEnabled(
  block: BlockDefinition,
  flags: SiteConfig["featureFlags"],
) {
  if (block.type === "services" && !flags.showServices) {
    return false;
  }
  if (block.type === "cta" && !flags.showCta) {
    return false;
  }
  return true;
}

export function getEnabledAnchors(
  blocks: BlockDefinition[],
  flags: SiteConfig["featureFlags"],
) {
  const anchors = new Set<string>();

  blocks
    .filter((block) => isBlockEnabled(block, flags))
    .forEach((block) => {
      const anchor = getBlockAnchor(block);
      if (anchor) {
        anchors.add(anchor);
      }
    });

  return anchors;
}

export function resolveCtaLink(
  cta: CtaLink,
  fallbacks: CtaLink[],
  enabledAnchors: Set<string>,
) {
  if (!isHashLink(cta.href)) {
    return cta;
  }

  if (enabledAnchors.has(cta.href)) {
    return cta;
  }

  for (const fallback of fallbacks) {
    if (!isHashLink(fallback.href)) {
      return fallback;
    }
    if (enabledAnchors.has(fallback.href)) {
      return fallback;
    }
  }

  const firstAnchor = enabledAnchors.values().next().value as string | undefined;
  if (firstAnchor) {
    return { ...cta, href: firstAnchor };
  }

  return cta;
}

export function getNavigationItems(config: SiteConfig) {
  const enabledAnchors = getEnabledAnchors(
    config.pages.home.blocks,
    config.featureFlags,
  );

  return config.navigation.filter((item) => {
    if (!isHashLink(item.href)) {
      return true;
    }
    return enabledAnchors.has(item.href);
  });
}

export function getPrimaryCta(
  config: SiteConfig,
  blocks: BlockDefinition[] = config.pages.home.blocks,
) {
  const primary = config.ctas.primary;
  const secondary = config.ctas.secondary;

  if (!isHashLink(primary.href)) {
    return primary;
  }

  const enabledAnchors = getEnabledAnchors(blocks, config.featureFlags);
  return resolveCtaLink(primary, [secondary], enabledAnchors);
}
