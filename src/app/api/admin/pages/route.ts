import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const PAGES_DIR = path.join(process.cwd(), "src", "content", "pages", "data");

export async function GET() {
  const entries = await fs.readdir(PAGES_DIR);
  const pages = entries
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => ({ id: path.basename(entry, ".json") }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return NextResponse.json({ pages });
}
