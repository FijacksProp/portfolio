import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/arrow-link";
import { ProjectDiagram } from "@/components/project-diagram";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { SystemStory } from "@/components/system-story";
import { getProject, projects } from "@/data/projects";
import { getSiteUrl } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Joshua Olugbemi`,
      description: project.summary,
      type: "article",
      url: `/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Joshua Olugbemi`,
      description: project.summary,
    },
  };
}

const chapterLabels = {
  "smart-attendance-system": ["Project context", "Trust problem", "Proof architecture", "Validation choices", "Prototype delivered", "Operating limits"],
  courtesychain: ["Product context", "Communication challenge", "Experience flow", "Interface decisions", "Public delivery", "Responsibility boundary"],
  "mt5-trade-radar": ["Prototype context", "Risk problem", "Analysis pipeline", "Safety decisions", "Observation system", "Trading limits"],
} as const;

const chapterIds = ["context", "problem", "architecture", "decisions", "outcome", "limitations"] as const;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const labels = chapterLabels[project.slug as keyof typeof chapterLabels];
  const chapters = chapterIds.map((id, chapterIndex) => [id, labels[chapterIndex]] as const);
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    dateCreated: project.year,
    creator: {
      "@type": "Person",
      name: "Joshua Olugbemi",
      url: getSiteUrl(),
    },
    url: `${getSiteUrl()}/work/${project.slug}`,
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <header className="case-hero">
        <div className="page-shell case-hero-grid">
          <div className="case-number folio-label">
            <span>{project.number}</span>
            <span>{project.status}</span>
          </div>
          <Reveal className={`case-title${project.slug === "courtesychain" ? " case-title-courtesy" : ""}`}>
            <p>{project.eyebrow}</p>
            <h1>
              {project.slug === "courtesychain" ? <>Courtesy<wbr />Chain</> : project.title}
            </h1>
            <blockquote>{project.premise}</blockquote>
          </Reveal>
          <Reveal className="case-meta" delay={0.05}>
            <dl>
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Year</dt><dd>{project.year}</dd></div>
              <div><dt>Status</dt><dd>{project.status}</dd></div>
              <div><dt>Stack</dt><dd>{project.stack.slice(0, 4).join(" · ")}</dd></div>
            </dl>
            {project.links.length > 0 && (
              <div className="case-links">
                {project.links.map((link) => (
                  <ArrowLink href={link.href} external key={link.href}>
                    {link.label}
                  </ArrowLink>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal className="case-architecture" delay={0.08}>
            <ProjectMedia kind={project.diagram} priority />
          </Reveal>
        </div>
      </header>

      <div className="page-shell case-body">
        <aside className="case-rail" aria-label="Case study chapters">
          <span className="folio-label">On this page</span>
          <nav>
            {chapters.map(([id, label], chapterIndex) => (
              <a key={id} href={`#${id}`}>
                <span>0{chapterIndex + 1}</span>
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <details className="case-mobile-nav">
          <summary>On this page</summary>
          <nav>
            {chapters.map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
        </details>

        <article className="case-article">
          <section id="context" className="case-section">
            <header><span>01</span><h2>{labels[0]}</h2></header>
            <div className="case-prose">
              {project.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <aside className="case-annotation">
              <span className="folio-label">Contribution</span>
              <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </aside>
          </section>

          <section id="problem" className="case-section case-section-wide">
            <header><span>02</span><h2>{labels[1]}</h2></header>
            <p className="case-lead">{project.problem}</p>
          </section>

          <section id="architecture" className="case-section">
            <header><span>03</span><h2>{labels[2]}</h2></header>
            <div className="case-system-story"><SystemStory project={project} /></div>
            <div className="case-diagram-support"><ProjectDiagram kind={project.diagram} /></div>
            <p className="case-note">
              Explore each layer, then read the complete system map. Visuals explain the
              implemented architecture without inventing performance results.
            </p>
          </section>

          <section id="decisions" className="case-section">
            <header><span>04</span><h2>{labels[3]}</h2></header>
            <div className="decision-list">
              {project.decisions.map((decision, decisionIndex) => (
                <article key={decision.title}>
                  <span>{String(decisionIndex + 1).padStart(2, "0")}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="outcome" className="case-section evidence-section">
            <header><span>05</span><h2>{labels[4]}</h2></header>
            <ul className="evidence-list evidence-positive">
              {project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
            </ul>
          </section>

          <section id="limitations" className="case-section evidence-section limitations-section">
            <header><span>06</span><h2>{labels[5]}</h2></header>
            <ul className="evidence-list">
              {project.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
            </ul>
          </section>

          <section className="case-stack" aria-labelledby="stack-heading">
            <span className="folio-label">Technical register</span>
            <h2 id="stack-heading">Stack used</h2>
            <p>{project.stack.join(" · ")}</p>
          </section>
        </article>
      </div>

      <nav className="next-project" aria-label="Next case study">
        <div className="page-shell next-project-inner">
          <span className="folio-label">Next case study / {nextProject.number}</span>
          <Link href={`/work/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
    </>
  );
}
