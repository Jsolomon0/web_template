import { Container } from "@/components/ui/Container";

export type HeadingProps = {
  id?: string;
  level: 1 | 2 | 3;
  text: string;
};

const levelClassName: Record<HeadingProps["level"], string> = {
  1: "text-heading-lg",
  2: "text-heading-md",
  3: "text-heading-sm",
};

export function Heading({ id, level, text }: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <section id={id} className="section-pad">
      <Container>
        <Tag className={`${levelClassName[level]} text-foreground`}>{text}</Tag>
      </Container>
    </section>
  );
}
