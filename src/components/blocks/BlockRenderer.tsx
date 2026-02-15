import { blockRegistry, isKnownBlockType } from "@/lib/blockRegistry";
import type { Block, BlockDefinition } from "@/lib/blockRegistry";

type BlockRendererProps = {
  blocks: BlockDefinition[];
};

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="page-stack">
      {blocks.map((block, index) => {
        if (!isKnownBlockType(block.type)) {
          if (process.env.NODE_ENV !== "production") {
            return (
              <div
                key={`unknown-${index}`}
                role="alert"
                className="text-body-sm rounded-xl border border-strong bg-surface-strong pad-space-4 text-foreground"
              >
                Unknown block type: {block.type}
              </div>
            );
          }

          console.warn(`Unknown block type: ${block.type}`);
          return null;
        }

        const Component = blockRegistry[block.type];
        const blockId = (block as Block).id ?? (block as Block).props?.id;

        return (
          <Component
            key={blockId ?? `${block.type}-${index}`}
            {...(block as Block).props}
          />
        );
      })}
    </div>
  );
}
