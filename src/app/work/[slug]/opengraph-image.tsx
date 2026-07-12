import { ImageResponse } from "next/og";
import { getProject } from "@/data/projects";

export const alt = "Joshua Olugbemi project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07141F",
          color: "#FBFAF7",
          padding: "58px 66px",
          fontFamily: "sans-serif",
          borderTop: "18px solid #147DF5",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: "#C6A86A", fontSize: 21, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <span>{project?.number ?? "Case study"} / {project?.status ?? "Work"}</span>
          <span>Joshua Olugbemi</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", fontSize: 95, lineHeight: 0.9, letterSpacing: "-0.055em", fontWeight: 600 }}>
            {project?.title ?? "Project case study"}
          </div>
          <div style={{ display: "flex", maxWidth: 900, color: "rgba(251,250,247,.72)", fontSize: 25, lineHeight: 1.3 }}>
            {project?.summary ?? "Architecture, decisions, outcomes, and honest boundaries."}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 22, borderTop: "2px solid rgba(251,250,247,.4)", fontSize: 18, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          <span>{project?.role ?? "Full-stack software engineer"}</span>
          <span>{project?.year ?? "2026"}</span>
        </div>
      </div>
    ),
    size,
  );
}
