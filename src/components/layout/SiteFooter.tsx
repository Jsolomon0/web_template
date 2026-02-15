import { Container } from "@/components/ui/Container";

type NavigationItem = {
  label: string;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
  badge?: string;
};

type ContactInfo = {
  email: string;
  phone: string;
  hours: string;
};

type SiteFooterProps = {
  businessName: string;
  tagline: string;
  contact: ContactInfo;
  navigation: NavigationItem[];
  social: SocialLink[];
  footerLegalTemplate: string;
};

export function SiteFooter({
  businessName,
  tagline,
  contact,
  navigation,
  social,
  footerLegalTemplate,
}: SiteFooterProps) {
  const legalText = footerLegalTemplate
    .replace("{year}", String(new Date().getFullYear()))
    .replace("{business}", businessName);

  return (
    <footer className="border-t border-subtle bg-surface">
      <Container className="text-muted flex flex-wrap items-center justify-between gap-space-6 py-space-10 text-body-sm">
        <div>
          <p className="text-foreground text-body text-strong">
            {businessName}
          </p>
          <p className="text-muted text-body-xs">
            {tagline}
          </p>
        </div>
        <div className="text-muted text-body-xs">
          <p>
            <span className="text-foreground text-strong">
              {contact.phone}
            </span>
          </p>
          <p>{contact.email}</p>
          <p>{contact.hours}</p>
        </div>
        <div className="flex flex-wrap gap-space-5">
          {navigation.map((item) => (
            <a
              key={item.href}
              className="focus-ring transition hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-space-3">
          {social.map((item) => (
            <a
              key={item.href}
              className="focus-ring text-foreground bg-surface-strong border border-subtle grid size-icon-sm place-items-center radius-full text-body-xs text-strong transition hover:border-strong"
              href={item.href}
            >
              {(item.badge ?? item.label.slice(0, 2)).toUpperCase()}
            </a>
          ))}
        </div>
        <p className="text-muted w-full text-body-xs md:w-auto">{legalText}</p>
      </Container>
    </footer>
  );
}
