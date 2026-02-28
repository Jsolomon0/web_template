import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import {
  createPage,
  getHomePageId,
  getPageIds,
  getPageSeo,
} from "@/content/pages";
import { siteConfig } from "@/content/site.config";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    pageId: string;
  }>;
};

export async function generateStaticParams() {
  const pageIds = await getPageIds();
  const homePageId = await getHomePageId();
  return pageIds
    .filter((pageId) => pageId !== homePageId)
    .map((pageId) => ({ pageId }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { pageId } = await params;
  const pageIds = await getPageIds();
  if (!pageIds.includes(pageId)) {
    return buildMetadata();
  }
  const pageSeo = await getPageSeo(pageId);

  return buildMetadata({
    title: pageSeo?.title ?? siteConfig.business.tagline,
    description: pageSeo?.description,
    openGraph: pageSeo?.openGraph,
  });
}

export default async function GenericPage({ params }: PageProps) {
  const { pageId } = await params;
  const homePageId = await getHomePageId();
  const pageIds = await getPageIds();

  if (pageId === homePageId || !pageIds.includes(pageId)) {
    notFound();
  }

  const page = await createPage(siteConfig, pageId);
  return <BlockRenderer blocks={page.blocks} />;
}
