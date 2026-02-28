"use client";

import { useEffect, useMemo, useState } from "react";

type PageSummary = {
  id: string;
};

type PagePayload = {
  seo?: {
    title?: string;
    description?: string;
  };
  blocks: unknown[];
};

const emptyPayload: PagePayload = {
  seo: {
    title: "",
    description: "",
  },
  blocks: [],
};

export function AdminClient() {
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [payload, setPayload] = useState<PagePayload>(emptyPayload);
  const [blocksText, setBlocksText] = useState<string>("[]");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasPage = pages.length > 0;
  const activePage = useMemo(
    () => pages.find((page) => page.id === activeId),
    [pages, activeId],
  );

  useEffect(() => {
    let isMounted = true;
    async function loadPages() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/pages");
        if (!response.ok) {
          throw new Error("Unable to load pages.");
        }
        const data = (await response.json()) as { pages: PageSummary[] };
        if (!isMounted) {
          return;
        }
        setPages(data.pages);
        if (data.pages.length > 0) {
          setActiveId(data.pages[0].id);
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadPages();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeId) {
      return;
    }
    let isMounted = true;
    async function loadPage() {
      setIsLoading(true);
      setStatus("");
      setError("");
      try {
        const response = await fetch(`/api/admin/pages/${activeId}`);
        if (!response.ok) {
          throw new Error("Unable to load page content.");
        }
        const data = (await response.json()) as PagePayload;
        if (!isMounted) {
          return;
        }
        setPayload({
          seo: {
            title: data.seo?.title ?? "",
            description: data.seo?.description ?? "",
          },
          blocks: Array.isArray(data.blocks) ? data.blocks : [],
        });
        setBlocksText(
          JSON.stringify(Array.isArray(data.blocks) ? data.blocks : [], null, 2),
        );
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadPage();
    return () => {
      isMounted = false;
    };
  }, [activeId]);

  async function handleSave() {
    if (!activeId) {
      return;
    }
    setIsSaving(true);
    setStatus("");
    setError("");
    try {
      const parsedBlocks = JSON.parse(blocksText);
      if (!Array.isArray(parsedBlocks)) {
        throw new Error("Blocks JSON must be an array.");
      }
      const body: PagePayload = {
        seo: {
          title: payload.seo?.title?.trim() ?? "",
          description: payload.seo?.description?.trim() ?? "",
        },
        blocks: parsedBlocks,
      };
      const response = await fetch(`/api/admin/pages/${activeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Unable to save.");
      }
      setStatus("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-space-6">
      <div className="flex flex-wrap items-center gap-space-4">
        <label className="text-body-sm text-strong text-foreground">
          Page
          <select
            className="mt-space-2 w-full rounded-xl border border-subtle bg-surface-strong px-space-4 py-space-2 text-body-sm text-foreground"
            value={activeId}
            onChange={(event) => setActiveId(event.target.value)}
            disabled={!hasPage || isLoading}
          >
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.id}
              </option>
            ))}
          </select>
        </label>
        <div className="text-body-xs text-muted">
          {activePage ? `Editing ${activePage.id}` : "No pages loaded."}
        </div>
      </div>

      <div className="grid gap-space-6 md:grid-cols-2">
        <label className="text-body-sm text-strong text-foreground">
          Title
          <input
            type="text"
            value={payload.seo?.title ?? ""}
            onChange={(event) =>
              setPayload((current) => ({
                ...current,
                seo: {
                  ...current.seo,
                  title: event.target.value,
                },
              }))
            }
            className="mt-space-2 w-full rounded-xl border border-subtle bg-surface-strong px-space-4 py-space-2 text-body-sm text-foreground"
          />
        </label>
        <label className="text-body-sm text-strong text-foreground">
          Description
          <input
            type="text"
            value={payload.seo?.description ?? ""}
            onChange={(event) =>
              setPayload((current) => ({
                ...current,
                seo: {
                  ...current.seo,
                  description: event.target.value,
                },
              }))
            }
            className="mt-space-2 w-full rounded-xl border border-subtle bg-surface-strong px-space-4 py-space-2 text-body-sm text-foreground"
          />
        </label>
      </div>

      <label className="text-body-sm text-strong text-foreground">
        Blocks JSON
        <textarea
          rows={14}
          value={blocksText}
          onChange={(event) => setBlocksText(event.target.value)}
          className="mt-space-2 w-full rounded-2xl border border-subtle bg-surface-strong px-space-4 py-space-3 font-mono text-[0.85rem] text-foreground"
        />
      </label>

      <div className="flex flex-wrap items-center gap-space-4">
        <button
          type="button"
          className="focus-ring shadow-button inline-flex items-center justify-center radius-full bg-foreground px-space-6 py-space-2 text-body-sm text-strong text-on-foreground transition hover:bg-foreground-strong"
          onClick={handleSave}
          disabled={isSaving || isLoading || !activeId}
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
        {status && <span className="text-body-sm text-foreground">{status}</span>}
        {error && <span className="text-body-sm text-muted">{error}</span>}
      </div>
    </div>
  );
}
