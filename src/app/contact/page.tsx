import type { Metadata } from "next";
import { BrandMark } from "@/components/brand-mark";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Joshua Olugbemi about full-stack engineering roles and selected product collaborations.",
  alternates: { canonical: "/contact" },
};

const links = [
  { label: "GitHub", value: "@FijacksProp", href: siteConfig.socials.github },
  { label: "LinkedIn", value: "Joshua Olugbemi", href: siteConfig.socials.linkedin },
  { label: "X / Twitter", value: "@fijacksprop", href: siteConfig.socials.x },
  { label: "Résumé", value: "PDF · 69 KB", href: siteConfig.resumeUrl, download: true },
] as const;

export default function ContactPage() {
  return (
    <section className="contact-page page-shell">
      <div className="contact-kicker folio-label">
        <span>Contact / Work enquiries</span>
        <span>Nigeria · UTC+1</span>
      </div>
      <Reveal className="contact-intro">
        <p>
          I’m interested in full-stack engineering roles where I can own architecture,
          product decisions, and delivery—and in selected product engagements with a clear technical mandate.
        </p>
      </Reveal>
      <Reveal className="contact-email" delay={0.05}>
        <span className="folio-label">Email / Direct</span>
        <h1><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></h1>
      </Reveal>
      <div className="contact-ledger">
        {links.map((link, index) => (
          <a href={link.href} key={link.label} download={"download" in link ? true : undefined}>
            <span>0{index + 1}</span>
            <strong>{link.label}</strong>
            <span>{link.value}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <div className="contact-signature">
        <BrandMark linked={false} compact />
        <p>Joshua Olugbemi / Full-stack software engineer</p>
      </div>
    </section>
  );
}
