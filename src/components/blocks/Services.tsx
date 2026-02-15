import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { createStableId } from "@/lib/ids";

type ServiceItem = {
  title: string;
  description: string;
  icon?: {
    glyph: string;
    label: string;
  };
};

export type ServicesProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
};

export function Services({
  id,
  eyebrow,
  title,
  description,
  services,
  columns = 3,
}: ServicesProps) {
  const gridStyle = {
    "--columns": columns,
  } as CSSProperties;

  return (
    <section id={id} className="section-pad">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-space-6">
          <div>
            {eyebrow && (
              <p className="text-eyebrow text-muted">
                {eyebrow}
              </p>
            )}
            <h2 className="text-heading-md text-foreground mt-space-3">
              {title}
            </h2>
          </div>
          {description && (
            <p className="text-body text-muted max-w-copy">{description}</p>
          )}
        </div>
        <div className="services-grid mt-space-10" style={gridStyle}>
          {services.map((item, index) => {
            const serviceId = createStableId(id ?? "services", item.title, index);

            return (
              <article
                key={item.title}
                className="hover-raise hover-shadow-elevated bg-surface border border-subtle radius-2xl pad-space-6 shadow-card transition hover:border-strong"
                aria-labelledby={serviceId}
              >
                {item.icon && (
                  <div className="text-body-sm bg-foreground flex size-icon-lg items-center justify-center radius-full text-strong text-on-foreground">
                    <span aria-hidden="true">{item.icon.glyph}</span>
                    {/* Screen readers get a descriptive label for the icon. */}
                    <span className="sr-only">{item.icon.label}</span>
                  </div>
                )}
                <h3 id={serviceId} className="text-heading-sm text-foreground mt-space-4">
                  {item.title}
                </h3>
                <p className="text-body-sm text-muted mt-space-2">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
