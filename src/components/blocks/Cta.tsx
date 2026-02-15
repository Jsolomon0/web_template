import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export type CtaProps = {
  id?: string;
  eyebrow?: string;
  headline: string;
  supportingText?: string;
  intent?: "primary" | "secondary";
  cta: {
    label: string;
    href: string;
    intent?: "primary" | "secondary";
  };
};

export function Cta({
  id,
  eyebrow,
  headline,
  supportingText,
  intent = "primary",
  cta,
}: CtaProps) {
  const surface =
    intent === "primary" ? "cta-surface-primary" : "cta-surface-secondary";
  const resolvedButtonIntent = cta.intent ?? intent;

  return (
    <section id={id} className="section-pad">
      <Container>
        <div className={`cta-panel radius-3xl ${surface}`}>
          <div className="flex flex-wrap items-center justify-between gap-space-6">
            <div>
              {eyebrow && (
                <p
                  className={`text-eyebrow ${
                    intent === "primary" ? "text-on-primary-muted" : "text-muted"
                  }`}
                >
                  {eyebrow}
                </p>
              )}
              <h2 className="text-heading-md mt-space-3">{headline}</h2>
              {supportingText && (
                <p
                  className={`text-body-sm mt-space-2 ${
                    intent === "primary" ? "text-on-primary" : "text-muted"
                  }`}
                >
                  {supportingText}
                </p>
              )}
            </div>
            <Button href={cta.href} intent={resolvedButtonIntent}>
              {cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
