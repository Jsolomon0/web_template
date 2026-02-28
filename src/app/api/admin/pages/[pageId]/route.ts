import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { pageFileSchema } from "@/content/schema";

const PAGES_DIR = path.join(process.cwd(), "src", "content", "pages", "data");

type RouteParams = {
  params: Promise<{
    pageId: string;
  }>;
};

async function readPageFile(pageId: string) {
  const filePath = path.join(PAGES_DIR, `${pageId}.json`);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = pageFileSchema.parse(JSON.parse(raw));
  return { parsed, filePath };
}

export async function GET(request: Request, { params }: RouteParams) {
  const { pageId } = await params;
  try {
    const { parsed } = await readPageFile(pageId);
    return NextResponse.json({
      seo: parsed.seo ?? {},
      blocks: parsed.blocks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Page not found or invalid." },
      { status: 404 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { pageId } = await params;
  const body = await request.json();
  try {
    const { parsed, filePath } = await readPageFile(pageId);
    const nextSeo = {
      ...parsed.seo,
      ...body.seo,
    };
    const nextPage = {
      ...parsed,
      seo: nextSeo,
      blocks: body.blocks,
    };
    const validated = pageFileSchema.parse(nextPage);
    await fs.writeFile(filePath, JSON.stringify(validated, null, 2));
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save page.";
    return new NextResponse(message, { status: 400 });
  }
}
