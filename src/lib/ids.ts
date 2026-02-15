export function createStableId(prefix: string, key: string, index: number) {
  const normalized = `${prefix}-${key}-${index}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return normalized;
}
