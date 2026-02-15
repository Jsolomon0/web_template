import type { Metadata } from "next";
import { siteConfig } from "@/content/site.config";

type SeoInput = {
  title?: string;
  description?: string;
  openGraph?: Metadata["openGraph"];
};

export function buildMetadata(input: SeoInput = {}): Metadata {
  const title =
    input.title && input.title.length > 0
      ? siteConfig.seo.titleTemplate.replace("%s", input.title)
      : siteConfig.seo.defaultTitle;

  const description = input.description ?? siteConfig.seo.description;

  return {
    title,
    description,
    openGraph: {
      type: siteConfig.seo.openGraph?.type ?? "website",
      title,
      description,
      ...input.openGraph,
    },
  };
}
