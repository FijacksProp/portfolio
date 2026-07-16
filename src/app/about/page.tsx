import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { capabilities, siteConfig, timeline } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Joshua Olugbemi is a full-stack software engineer and web development instructor working across product interfaces, backend systems, data, mobile software, and delivery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="about-hero page-shell">
        <div className="page-kicker folio-label">About / Working method</div>
        <Reveal className="about-thesis">
          <h1>
            I build both sides of the <em>request.</em>
          </h1>
        </Reveal>
        <Reveal className="about-intro" delay={0.05}>
          <p>
            I’m Joshua, a full-stack software engineer working across product interfaces,
            backend services, relational data, mobile workflows, and deployment. I move between
            architecture and implementation, choosing tools around the product instead of forcing
            every problem into one stack.
          </p>
          <p>
            For backend work I often reach for Python and Django; for interfaces I work with
            React, Next.js, and TypeScript, with Flutter and native Android where a product extends
            into mobile or device-aware systems. My Telecommunication Science background adds
            another perspective when software meets physical constraints. Since 2021, I’ve owned
            delivery across client platforms, product prototypes, dashboards, APIs, and academic systems.
          </p>
        </Reveal>
        <blockquote className="about-quote">
          My method: understand the product, make the architecture legible, then carry each
          decision through interface, service, data, and release.
        </blockquote>
      </header>

      <section className="about-chronology">
        <div className="page-shell">
          <header className="about-section-heading">
            <span className="folio-label">01 / Chronology</span>
            <h2>Practice, education, teaching.</h2>
          </header>
          <div className="about-timeline">
            {timeline.map((item, index) => (
              <Reveal key={item.title} className="about-timeline-row" delay={index * 0.04}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-disciplines page-shell">
        <header className="about-section-heading">
          <span className="folio-label">02 / System ownership</span>
          <h2>What I can own across a system.</h2>
        </header>
        <div className="discipline-list">
          {capabilities.map((item, index) => (
            <div key={item.discipline} className="discipline-row">
              <span>0{index + 1}</span>
              <h3>{item.discipline}</h3>
              <p>{item.detail}</p>
              <p>{item.tools}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-resume">
        <div className="page-shell about-resume-inner">
          <div>
            <span className="folio-label">03 / Full record</span>
            <h2>The concise version is one page.</h2>
          </div>
          <p>
            Experience, education, featured work, and contact information in a printable
            document.
          </p>
          <ArrowLink href={siteConfig.resumeUrl} download className="arrow-link-primary">
            Download résumé · PDF · 69 KB
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
