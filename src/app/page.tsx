import type { Metadata } from "next";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { createHomePage } from "@/content/pages/home";
import { siteConfig } from "@/content/site.config";
import { buildMetadata } from "@/lib/seo";

const homeSeo = siteConfig.pages?.home?.seo;

export const metadata: Metadata = buildMetadata({
  title: homeSeo?.title ?? siteConfig.business.tagline,
  description: homeSeo?.description,
  openGraph: homeSeo?.openGraph,
});

export default function Home() {
  const page = createHomePage(siteConfig);

  return <BlockRenderer blocks={page.blocks} />;
}
