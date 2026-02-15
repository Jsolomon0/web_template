import type { ComponentType } from "react";
import type { CtaProps } from "@/components/blocks/Cta";
import { Cta } from "@/components/blocks/Cta";
import type { HeroProps } from "@/components/blocks/Hero";
import { Hero } from "@/components/blocks/Hero";
import type { HeadingProps } from "@/components/blocks/Heading";
import { Heading } from "@/components/blocks/Heading";
import type { ServicesProps } from "@/components/blocks/Services";
import { Services } from "@/components/blocks/Services";

export type BlockType = "hero" | "services" | "cta" | "heading";

export type BlockPropsByType = {
  hero: HeroProps;
  services: ServicesProps;
  cta: CtaProps;
  heading: HeadingProps;
};

export type Block<K extends BlockType = BlockType> = {
  id?: string;
  type: K;
  props: BlockPropsByType[K];
};

export type PageDefinition = {
  version: number;
  id: string;
  blocks: Block[];
};

export type BlockDefinition =
  | Block
  | {
      id?: string;
      type: string;
      props?: unknown;
    };

export const blockRegistry: { [K in BlockType]: ComponentType<BlockPropsByType[K]> } =
  {
    hero: Hero,
    services: Services,
    cta: Cta,
    heading: Heading,
  };

export function isKnownBlockType(type: string): type is BlockType {
  return type in blockRegistry;
}
