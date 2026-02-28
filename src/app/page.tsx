import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { createPage, getHomePageId, getPageSeo } from "@/content/pages";
import { siteConfig } from "@/content/site.config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const homePageId = await getHomePageId();
  const homeSeo = await getPageSeo(homePageId);
  return buildMetadata({
    title: homeSeo?.title ?? siteConfig.business.tagline,
    description: homeSeo?.description,
    openGraph: homeSeo?.openGraph,
  });
}

export default async function Home() {
  const homePageId = await getHomePageId();
  const page = await createPage(siteConfig, homePageId);

  return <BlockRenderer blocks={page.blocks} />;
}
