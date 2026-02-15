import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type HeroCta = {
  label: string;
  href: string;
  intent?: "primary" | "secondary";
};

type HeroBackground =
  | {
      type: "image";
      src: string;
      alt: string;
      priority?: boolean;
      sizes?: string;
      aspectRatio?: number;
    }
  | {
      type: "gradient";
      className?: string;
    };

export type HeroProps = {
  id?: string;
  layout?: "centered" | "split";
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  background?: HeroBackground;
  highlights?: Array<{
    label: string;
    value: string;
  }>;
};

export function Hero({
  id,
  layout = "split",
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  background,
  highlights,
}: HeroProps) {
  const sectionStyle =
    background?.type === "image"
      ? { aspectRatio: background.aspectRatio ?? 16 / 9 }
      : undefined;

  return (
    <section
      id={id}
      className="section-hero relative overflow-hidden"
      style={sectionStyle}
    >
      {background?.type === "image" && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={background.src}
            alt={background.alt}
            fill
            priority={background.priority ?? true}
            sizes={background.sizes ?? "100vw"}
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
      )}
      {background?.type === "gradient" && (
        <div
          className={`hero-blob bg-accent-soft animate-float-soft ${background.className ?? ""}`}
          aria-hidden="true"
        />
      )}
      <Container
        className={`items-center gap-space-12 ${
          layout === "split"
            ? "hero-grid-split"
            : "mx-auto grid max-w-content text-center"
        }`}
      >
        <div className="animate-fade-up">
          {eyebrow && (
            <p className="text-eyebrow text-muted bg-surface-strong border border-subtle inline-flex items-center radius-full px-space-4 py-space-2">
              {eyebrow}
            </p>
          )}
          <h1 className="text-heading-lg text-foreground mt-space-6">
            {title}
          </h1>
          {description && (
            <p className="text-body-lg text-muted mt-space-4">{description}</p>
          )}
          <div
            className={`mt-space-8 flex flex-wrap gap-space-4 ${
              layout === "centered" ? "justify-center" : ""
            }`}
          >
            <Button href={primaryCta.href} intent={primaryCta.intent}>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} intent={secondaryCta.intent}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
        {layout === "split" && highlights && highlights.length > 0 && (
          <div className="relative animate-fade-up-delayed">
            <div className="shadow-elevated bg-surface border border-subtle radius-3xl pad-space-8 backdrop-blur">
              <div className="space-y-space-6">
                {highlights.map((item) => (
                  <div key={item.label}>
                    <p className="text-eyebrow text-muted">
                      {item.label}
                    </p>
                    <p className="text-heading-md text-foreground mt-space-2">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
