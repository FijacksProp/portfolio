import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import Image from "next/image";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { WorkHeroDeck } from "@/components/work-hero-deck";
import { archiveProjects, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Full-stack case studies spanning product interfaces, backend validation, mobile workflows, and risk-aware data tooling.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="work-hero page-shell">
        <div className="page-kicker folio-label">Work / Engineering record</div>
        <Reveal className="work-title">
          <h1>Selected products</h1>
          <p>
            Three products selected for the decisions they expose across product experience,
            backend trust, mobile workflows, and risk-aware analysis.
          </p>
        </Reveal>
        <div className="work-folio" aria-hidden="true">01—03</div>
        <WorkHeroDeck />
      </header>

      <section className="work-index" aria-label="Featured case studies">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className={`work-index-entry ${index === 0 ? "work-index-entry-featured" : ""}`}
          >
            <div className="page-shell work-index-grid">
              <Reveal className="work-index-copy">
                <div className="project-preview-meta">
                  <span>{project.number}</span>
                  <span>{project.status}</span>
                  <span>{project.year}</span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <dl className="project-ledger">
                  <div><dt>Role</dt><dd>{project.role}</dd></div>
                  <div><dt>Focus</dt><dd>{project.eyebrow}</dd></div>
                </dl>
                <ArrowLink href={`/work/${project.slug}`}>
                  {project.cta}
                </ArrowLink>
              </Reveal>
              <Reveal className="work-index-figure" delay={0.05}>
                <ProjectMedia kind={project.diagram} compact />
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      <section className="archive-section page-shell">
        <header className="archive-heading">
          <span className="folio-label">Archive / 04—07</span>
          <h2>Project archive</h2>
          <p>Earlier and client-facing work, kept concise and linked to public evidence.</p>
        </header>
        <div className="archive-table" role="list">
          {archiveProjects.map((project) => (
            <a href={project.href} className="archive-row" key={project.title} role="listitem">
              {project.image && (
                <span className="archive-image">
                  <Image src={project.image} alt="" fill sizes="180px" />
                </span>
              )}
              <span className="archive-number">{project.number}</span>
              <span className="archive-name">{project.title}</span>
              <span className="archive-type">{project.type}</span>
              <span className="archive-year">{project.year}</span>
              <span className="archive-arrow" aria-hidden="true">↗</span>
              <span className="archive-description">{project.description}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
