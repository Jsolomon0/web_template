import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/content/site.config";
import { getNavigationItems, getPrimaryCta } from "@/lib/navigation";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontStackRegistry = {
    manrope: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
    "playfair-display": 'Georgia, "Times New Roman", Times, serif',
  } as const;

  const sansFont =
    fontStackRegistry[siteConfig.branding.fonts.sans] ??
    fontStackRegistry.manrope;
  const serifFont =
    fontStackRegistry[siteConfig.branding.fonts.serif] ??
    fontStackRegistry["playfair-display"];

  const brandStyle = {
    "--font-sans": sansFont,
    "--font-serif": serifFont,
    "--background": siteConfig.branding.colors.background,
    "--foreground": siteConfig.branding.colors.foreground,
    "--muted": siteConfig.branding.colors.muted,
    "--accent": siteConfig.branding.colors.accent,
    "--accent-2": siteConfig.branding.colors.accentAlt,
    "--ring": siteConfig.branding.colors.ring,
  } as React.CSSProperties;

  const navigation = getNavigationItems(siteConfig);
  const primaryCta = getPrimaryCta(siteConfig);
  const industryLabel =
    siteConfig.industries[siteConfig.business.industry]?.label ??
    siteConfig.business.industry;
  const logo =
    siteConfig.branding.logo ?? {
      type: "mark" as const,
      text: siteConfig.branding.mark,
    };

  return (
    <html lang="en">
      <body className="antialiased" style={brandStyle}>
        {/* Skip link keeps keyboard users from tabbing through the full header. */}
        <a className="skip-link" href="#main">
          {siteConfig.ui.skipLinkLabel}
        </a>
        <SiteHeader
          logo={logo}
          businessName={siteConfig.business.name}
          industryLabel={industryLabel}
          navigation={navigation}
          primaryCta={primaryCta}
          menuLabel={siteConfig.ui.menuLabel}
          primaryNavLabel={siteConfig.ui.primaryNavLabel}
          mobileNavLabel={siteConfig.ui.mobileNavLabel}
          showPrimaryCta={siteConfig.ui.showPrimaryCta}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter
          businessName={siteConfig.business.name}
          tagline={siteConfig.business.tagline}
          contact={siteConfig.contact}
          navigation={navigation}
          social={siteConfig.social}
          footerLegalTemplate={siteConfig.ui.footerLegalTemplate}
        />
      </body>
    </html>
  );
}
