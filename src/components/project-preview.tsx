import { ArrowLink } from "@/components/arrow-link";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/data/projects";

type ProjectPreviewProps = {
  project: Project;
  inverse?: boolean;
  flip?: boolean;
};

export function ProjectPreview({ project, inverse = false, flip = false }: ProjectPreviewProps) {
  return (
    <article className={`project-preview ${inverse ? "project-preview-inverse" : ""} ${flip ? "project-preview-flip" : ""}`}>
      <div className="page-shell project-preview-grid">
        <Reveal className="project-preview-copy">
          <div className="project-preview-meta">
            <span>{project.number}</span>
            <span>{project.status}</span>
            <span>{project.year}</span>
          </div>
          <p className="project-eyebrow">{project.eyebrow}</p>
          <h3>{project.title}</h3>
          <p className="project-summary">{project.summary}</p>
          <p className="project-role">Role — {project.role}</p>
          <ArrowLink href={`/work/${project.slug}`}>
            {project.cta}
          </ArrowLink>
        </Reveal>
        <Reveal className="project-preview-figure" delay={0.06}>
          <ProjectMedia kind={project.diagram} compact />
        </Reveal>
      </div>
    </article>
  );
}
