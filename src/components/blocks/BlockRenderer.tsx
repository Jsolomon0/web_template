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

        const typedBlock = block as Block;
        const blockId = typedBlock.id ?? typedBlock.props?.id;
        const key = blockId ?? `${typedBlock.type}-${index}`;

        switch (typedBlock.type) {
          case "hero":
            return <blockRegistry.hero key={key} {...typedBlock.props} />;
          case "services":
            return <blockRegistry.services key={key} {...typedBlock.props} />;
          case "cta":
            return <blockRegistry.cta key={key} {...typedBlock.props} />;
          case "heading":
            return <blockRegistry.heading key={key} {...typedBlock.props} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
