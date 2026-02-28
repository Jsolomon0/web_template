import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { SiteConfig } from "@/content/schema";
import {
  CONTENT_SCHEMA_VERSION,
  manifestSchema,
  pageFileSchema,
  pageSchema,
} from "@/content/schema";
import { getEnabledAnchors, resolveCtaLink } from "@/lib/navigation";
import { applyFeatureFlags, applyIndustryOverrides } from "@/lib/industry";
import type { PageDefinition } from "@/lib/blockRegistry";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "pages");
const PAGES_DIR = path.join(CONTENT_ROOT, "data");
const MANIFEST_PATH = path.join(CONTENT_ROOT, "manifest.json");

type PageFile = z.infer<typeof pageFileSchema>;

const readManifest = cache(async () => {
  const raw = await fs.readFile(MANIFEST_PATH, "utf8");
  const parsed = manifestSchema.parse(JSON.parse(raw));
  if (parsed.version !== CONTENT_SCHEMA_VERSION) {
    throw new Error("Content manifest version mismatch.");
  }
  return parsed;
});

const readPageFile = cache(async (pageId: string): Promise<PageFile> => {
  const filePath = path.join(PAGES_DIR, `${pageId}.json`);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = pageFileSchema.parse(JSON.parse(raw));
  if (parsed.version !== CONTENT_SCHEMA_VERSION) {
    throw new Error(`Page ${pageId} has a schema version mismatch.`);
  }
  if (parsed.id !== pageId) {
    throw new Error(`Page id mismatch: expected ${pageId}, found ${parsed.id}.`);
  }
  return parsed;
});

const readAllPages = cache(async (): Promise<PageFile[]> => {
  const entries = await fs.readdir(PAGES_DIR);
  const files = entries.filter((entry) => entry.endsWith(".json"));
  const pages = await Promise.all(
    files.map((file) => readPageFile(path.basename(file, ".json"))),
  );
  return pages;
});

export async function getHomePageId() {
  const manifest = await readManifest();
  const pageIds = await getPageIds();
  if (!pageIds.includes(manifest.homePageId)) {
    throw new Error(
      `Home page id "${manifest.homePageId}" does not exist in content/pages/data.`,
    );
  }
  return manifest.homePageId;
}

export async function getPageIds() {
  const pages = await readAllPages();
  return pages.map((page) => page.id);
}

export async function getPageSeo(pageId: string) {
  const page = await readPageFile(pageId);
  return page.seo;
}

export async function createPage(
  config: SiteConfig,
  pageId: string,
): Promise<PageDefinition> {
  const pageFile = await readPageFile(pageId);
  const basePage: PageDefinition = {
    version: CONTENT_SCHEMA_VERSION,
    id: pageFile.id,
    blocks: pageFile.blocks,
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
