import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { HeroStage } from "@/components/hero-stage";
import { ProjectPreview } from "@/components/project-preview";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/projects";
import { capabilities, siteConfig, timeline } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const engineeringIndex = [
  { number: "01", label: "Product interfaces", tools: "React / Next.js / TypeScript" },
  { number: "02", label: "Backend systems", tools: "Django / FastAPI / REST" },
  { number: "03", label: "Data + integration", tools: "PostgreSQL / APIs / Services" },
  { number: "04", label: "Mobile + delivery", tools: "Flutter / Kotlin / Git / Cloud" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="home-hero home-hero-v2 page-shell">
        <div className="hero-grid-glow" aria-hidden="true" />
        <div className="hero-folio folio-label">
          <span>Software engineering / Web · Mobile · Platforms</span>
          <span>Nigeria / UTC+1</span>
        </div>
        <Reveal className="hero-statement">
          <h1>
            <span>I design &amp; ship</span>
            <span>complete products:</span>
            <span>interface, logic,</span>
            <span>data &amp; <em>delivery.</em></span>
          </h1>
          <p>
            I work across product decisions, responsive interfaces, backend services, data,
            mobile workflows, and deployment—choosing the tools and architecture that fit the work.
          </p>
          <div className="hero-actions">
            <ArrowLink href="/work" className="arrow-link-primary">
              Review the case studies
            </ArrowLink>
            <ArrowLink href={siteConfig.resumeUrl} download>
              Résumé · PDF
            </ArrowLink>
          </div>
        </Reveal>
        <HeroStage />
      </section>

      <section className="engineering-index" aria-label="Engineering range and primary tools">
        <div className="page-shell engineering-index-inner">
          <div className="engineering-index-heading">
            <span>Engineering index</span>
            <strong>Responsibility before tooling.</strong>
          </div>
          <div className="engineering-index-grid">
            {engineeringIndex.map((item) => (
              <div className="engineering-index-item" key={item.number}>
                <span>{item.number}</span>
                <strong>{item.label}</strong>
                <small>{item.tools}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-work" aria-labelledby="featured-work-heading">
        <div className="page-shell">
          <SectionHeading
            number="01"
            label="Selected work"
            title="Three products. Three kinds of engineering ownership."
            description="Backend validation, responsive product delivery, and risk-aware data tooling—shown through architecture, trade-offs, and delivered scope."
          />
        </div>
        <h2 id="featured-work-heading" className="sr-only">Featured work</h2>
        <ProjectPreview project={projects[0]} inverse />
        <ProjectPreview project={projects[1]} flip />
        <ProjectPreview project={projects[2]} />
      </section>

      <section className="capabilities-section page-shell">
        <SectionHeading
            number="02"
            label="Engineering range"
            title="One practice across product, interface, backend, data, and delivery."
        />
        <div className="capability-ledger">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.discipline} className="capability-row" delay={index * 0.025}>
              <span className="capability-number">0{index + 1}</span>
              <h3>{capability.discipline}</h3>
              <p>{capability.detail}</p>
              <span className="capability-tools">{capability.tools}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <div className="page-shell">
          <SectionHeading
            number="03"
            label="Practice"
            title="Independent delivery since 2021. Teaching since 2024."
          />
          <div className="timeline-grid">
            {timeline.map((item, index) => (
              <Reveal className="timeline-item" key={item.title} delay={index * 0.04}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
          <div className="contact-strip">
            <p>
              I’m considering full-stack roles with meaningful ownership across system
              design, product decisions, and delivery.
            </p>
            <ArrowLink href="/contact" className="arrow-link-primary">
              Discuss a role or product
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
