import type { Metadata, Viewport } from "next";
import { LivingSystemsBackground } from "@/components/living-systems-background";
import { MotionProvider } from "@/components/motion-provider";
import { SitePreloader } from "@/components/site-preloader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl, siteConfig } from "@/data/site";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/manrope/index.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import "./redesign.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Joshua Olugbemi — Full-stack software engineer",
    template: "%s — Joshua Olugbemi",
  },
  description: siteConfig.description,
  applicationName: "Joshua Olugbemi Portfolio",
  authors: [{ name: siteConfig.name, url: siteConfig.socials.github }],
  creator: siteConfig.name,
  keywords: [
    "Joshua Olugbemi",
    "full-stack developer",
    "product software engineer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Python developer",
    "Django developer",
    "Flutter developer",
    "Nigeria software developer",
    "Telecommunication Science",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Joshua Olugbemi — Full-stack software engineer",
    description: siteConfig.statement,
    url: "/",
    siteName: "Joshua Olugbemi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Olugbemi — Full-stack software engineer",
    description: siteConfig.statement,
  },
  icons: {
    icon: "/fp-mark.png",
    shortcut: "/fp-mark.png",
    apple: "/fp-mark.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#F4F1EA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    email: `mailto:${siteConfig.email}`,
    url: getSiteUrl(),
    sameAs: Object.values(siteConfig.socials),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Ilorin",
    },
    knowsAbout: [
      "Full-stack development",
      "Product engineering",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Django",
      "PostgreSQL",
      "Flutter",
      "REST APIs",
      "Bluetooth Low Energy",
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <MotionProvider>
          <SitePreloader />
          <LivingSystemsBackground />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
