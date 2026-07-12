"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";

type DiagramProps = {
  kind: Project["diagram"];
  compact?: boolean;
};

const trace = {
  hidden: { pathLength: 0, opacity: 0.25 },
  visible: { pathLength: 1, opacity: 1 },
};

function AnimatedPath({ d, dashed = false }: { d: string; dashed?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.path
      d={d}
      className="diagram-trace"
      strokeDasharray={dashed ? "8 8" : undefined}
      variants={trace}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function Node({ x, y, width = 160, label, meta }: { x: number; y: number; width?: number; label: string; meta: string }) {
  return (
    <g className="diagram-node">
      <rect x={x} y={y} width={width} height="72" />
      <text x={x + 16} y={y + 29} className="diagram-node-title">
        {label}
      </text>
      <text x={x + 16} y={y + 51} className="diagram-node-meta">
        {meta}
      </text>
    </g>
  );
}

export function ProjectDiagram({ kind, compact = false }: DiagramProps) {
  if (kind === "attendance") {
    return (
      <figure className={`project-diagram ${compact ? "diagram-compact" : ""}`}>
        <svg role="img" aria-labelledby="attendance-title attendance-desc" viewBox="0 0 1000 420">
          <title id="attendance-title">Smart Attendance validation architecture</title>
          <desc id="attendance-desc">
            A lecturer broadcasts nearby proof, a student phone scans it, and a Django service validates identity, device, freshness, replay, and duplicate rules before recording attendance.
          </desc>
          <defs>
            <marker id="attendance-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrow" />
            </marker>
          </defs>
          <text x="40" y="44" className="diagram-kicker">LAYERED PROOF / SERVER AUTHORITY</text>
          <Node x={40} y={88} label="Lecturer" meta="broadcast" />
          <Node x={250} y={88} label="Student phone" meta="scan + submit" />
          <Node x={480} y={88} width={190} label="Django API" meta="validate proof" />
          <Node x={790} y={88} width={170} label="Attendance" meta="record / reject" />
          <AnimatedPath d="M200 124 H250" />
          <AnimatedPath d="M410 124 H480" />
          <AnimatedPath d="M670 124 H790" />
          <text x="205" y="103" className="diagram-line-label">BLE</text>
          <text x="205" y="151" className="diagram-line-label">ACOUSTIC</text>
          <g className="diagram-gates">
            <text x="480" y="230" className="diagram-kicker">TRUST GATES</text>
            {[
              ["01", "IDENTITY"],
              ["02", "DEVICE ID"],
              ["03", "FRESHNESS"],
              ["04", "REPLAY"],
              ["05", "DUPLICATE"],
            ].map(([number, label], index) => {
              const x = 40 + index * 184;
              return (
                <g key={label}>
                  <line x1={x} y1="286" x2={x + 145} y2="286" />
                  <text x={x} y="319" className="diagram-gate-number">{number}</text>
                  <text x={x + 38} y="319" className="diagram-gate-label">{label}</text>
                </g>
              );
            })}
          </g>
          <AnimatedPath d="M575 160 V205 H115 V275" dashed />
        </svg>
        <figcaption>Fig. 01 — Attendance is recorded only after layered proof passes server-side trust checks.</figcaption>
      </figure>
    );
  }

  if (kind === "courtesy") {
    return (
      <figure className={`project-diagram ${compact ? "diagram-compact" : ""}`}>
        <svg role="img" aria-labelledby="courtesy-title courtesy-desc" viewBox="0 0 1000 420">
          <title id="courtesy-title">CourtesyChain public content flow</title>
          <desc id="courtesy-desc">
            The public experience moves from product entry to explanation, evidence, and action, while investor content follows a separate route.
          </desc>
          <defs>
            <marker id="courtesy-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrow" />
            </marker>
          </defs>
          <text x="40" y="44" className="diagram-kicker">PUBLIC NARRATIVE / CONTENT SEQUENCE</text>
          <Node x={40} y={96} label="Entry" meta="product premise" />
          <Node x={255} y={96} label="Explain" meta="how it works" />
          <Node x={470} y={96} label="Establish" meta="purpose + proof" />
          <Node x={685} y={96} label="Action" meta="next step" />
          <AnimatedPath d="M200 132 H255 M415 132 H470 M630 132 H685" />
          <path d="M40 250 H845" className="diagram-rule" />
          <text x="40" y="284" className="diagram-gate-number">PRIMARY</text>
          <text x="180" y="284" className="diagram-gate-label">PUBLIC PRODUCT STORY</text>
          <path d="M470 168 V335 H685" className="diagram-branch" />
          <Node x={685} y={300} width={220} label="Investor route" meta="separate intent" />
          <text x="40" y="374" className="diagram-footnote">ONE COMPONENT SYSTEM / RESPONSIVE ACROSS ROUTES</text>
        </svg>
        <figcaption>Fig. 02 — Public and investor intent share a system without competing in the same narrative.</figcaption>
      </figure>
    );
  }

  return (
    <figure className={`project-diagram ${compact ? "diagram-compact" : ""}`}>
      <svg role="img" aria-labelledby="trading-title trading-desc" viewBox="0 0 1000 420">
        <title id="trading-title">MT5 Trade Radar watch-only pipeline</title>
        <desc id="trading-desc">
          Market data moves through ingestion, signal filters, risk gates, and observation storage. A hard boundary prevents broker order placement.
        </desc>
        <defs>
          <marker id="trading-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="diagram-arrow" />
          </marker>
        </defs>
        <text x="40" y="44" className="diagram-kicker">WATCH-ONLY PIPELINE / EXPLICIT BOUNDARY</text>
        <Node x={40} y={102} width={150} label="Market feed" meta="MT5 / mock" />
        <Node x={230} y={102} width={150} label="Ingestion" meta="ticks / candles" />
        <Node x={420} y={102} width={150} label="Filters" meta="trend / RSI / ATR" />
        <Node x={610} y={102} width={150} label="Risk gate" meta="spread / R:R" />
        <AnimatedPath d="M190 138 H230 M380 138 H420 M570 138 H610" />
        <path d="M810 70 V340" className="diagram-boundary" />
        <text x="835" y="100" className="diagram-boundary-label">NO ORDER</text>
        <text x="835" y="124" className="diagram-boundary-label">EXECUTION</text>
        <Node x={420} y={270} width={230} label="Observation journal" meta="persist / score / review" />
        <AnimatedPath d="M685 174 V220 H535 V270" dashed />
        <g className="diagram-gates">
          <text x="40" y="272" className="diagram-kicker">CONSERVATIVE RULES</text>
          <text x="40" y="316" className="diagram-gate-number">01</text>
          <text x="80" y="316" className="diagram-gate-label">FOCUSED SYMBOLS</text>
          <text x="40" y="354" className="diagram-gate-number">02</text>
          <text x="80" y="354" className="diagram-gate-label">SL FIRST IF CANDLE IS AMBIGUOUS</text>
        </g>
      </svg>
      <figcaption>Fig. 03 — Analysis ends at observation; broker execution remains outside the system.</figcaption>
    </figure>
  );
}
