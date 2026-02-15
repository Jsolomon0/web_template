import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/content/site.config";
import { getNavigationItems, getPrimaryCta } from "@/lib/navigation";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontRegistry = {
    manrope,
    "playfair-display": playfair,
  };

  const sansFont = fontRegistry[siteConfig.branding.fonts.sans] ?? manrope;
  const serifFont = fontRegistry[siteConfig.branding.fonts.serif] ?? playfair;

  const brandStyle = {
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
      <body
        className={`${sansFont.variable} ${serifFont.variable} antialiased`}
        style={brandStyle}
      >
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
