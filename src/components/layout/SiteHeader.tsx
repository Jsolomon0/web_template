import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type NavigationItem = {
  label: string;
  href: string;
};

type CtaLink = {
  label: string;
  href: string;
  intent?: "primary" | "secondary";
};

type BrandingLogo =
  | {
      type: "mark";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    };

type SiteHeaderProps = {
  logo: BrandingLogo;
  businessName: string;
  industryLabel: string;
  navigation: NavigationItem[];
  primaryCta: CtaLink;
  menuLabel: string;
  primaryNavLabel: string;
  mobileNavLabel: string;
  showPrimaryCta: boolean;
};

export function SiteHeader({
  logo,
  businessName,
  industryLabel,
  navigation,
  primaryCta,
  menuLabel,
  primaryNavLabel,
  mobileNavLabel,
  showPrimaryCta,
}: SiteHeaderProps) {
  const menuId = "mobile-navigation-panel";

  return (
    <header className="sticky top-0 z-20 border-b border-subtle bg-surface backdrop-blur">
      <Container className="flex items-center justify-between py-space-4">
        <div className="flex items-center gap-space-3">
          <div className="bg-foreground grid size-icon-md place-items-center radius-full text-body-sm text-strong text-on-foreground overflow-hidden">
            {logo.type === "image" ? (
              <Image src={logo.src} alt={logo.alt} width={40} height={40} />
            ) : (
              logo.text
            )}
          </div>
          <div>
            <p className="text-foreground text-body text-strong">
              {businessName}
            </p>
            <p className="text-muted text-body-xs">
              {industryLabel}
            </p>
          </div>
        </div>
        <nav
          aria-label={primaryNavLabel}
          className="text-muted hidden items-center gap-space-6 text-body-sm text-medium md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              className="focus-ring transition hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        {showPrimaryCta && (
          <Button
            href={primaryCta.href}
            intent={primaryCta.intent}
            size="sm"
            className="hidden md:inline-flex"
          >
            {primaryCta.label}
          </Button>
        )}
        <details className="relative md:hidden">
          <summary
            className="focus-ring text-foreground radius-full border border-subtle px-space-4 py-space-2 text-body-sm text-strong transition hover:border-strong"
            aria-controls={menuId}
            aria-haspopup="menu"
          >
            {menuLabel}
          </summary>
          <div
            id={menuId}
            className="bg-surface-strong shadow-elevated border border-subtle absolute right-0 mt-space-3 w-menu-panel radius-2xl pad-space-4"
          >
            <nav
              aria-label={mobileNavLabel}
              className="flex flex-col gap-space-3 text-body-sm text-medium"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  className="focus-ring text-muted transition hover:text-foreground"
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            {showPrimaryCta && (
              <Button
                href={primaryCta.href}
                intent={primaryCta.intent}
                size="sm"
                className="mt-space-4 w-full justify-center"
              >
                {primaryCta.label}
              </Button>
            )}
          </div>
        </details>
      </Container>
    </header>
  );
}
