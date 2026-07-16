"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type AtlasBranch = "all" | "interface" | "backend" | "logic" | "data" | "delivery";

type AtlasNode = {
  branch: Exclude<AtlasBranch, "all">;
  className: string;
  index: string;
  discipline: string;
  title: string;
  tools: string;
  artifact?: string;
  route: string;
};

const atlasNodes: AtlasNode[] = [
  {
    branch: "interface",
    className: "atlas-interface",
    index: "01",
    discipline: "Experience",
    title: "Product interface",
    tools: "React · Next.js · Flutter",
    artifact: "route / interaction / state",
    route: "M142 156 V204 H244",
  },
  {
    branch: "backend",
    className: "atlas-backend",
    index: "02",
    discipline: "Services",
    title: "Application services",
    tools: "Django · FastAPI · REST",
    artifact: "contract / auth / validation",
    route: "M498 156 V204 H396",
  },
  {
    branch: "logic",
    className: "atlas-logic",
    index: "03",
    discipline: "Product rules",
    title: "Domain logic",
    tools: "Workflows · permissions · tests",
    artifact: "model / enforce / respond",
    route: "M142 348 V302 H244",
  },
  {
    branch: "data",
    className: "atlas-data",
    index: "04",
    discipline: "State",
    title: "Data systems",
    tools: "PostgreSQL · persistence",
    artifact: "model / query / protect",
    route: "M498 348 V302 H396",
  },
  {
    branch: "delivery",
    className: "atlas-delivery",
    index: "05",
    discipline: "Release",
    title: "Delivery",
    tools: "Git · test · build · deploy",
    route: "M320 304 V421",
  },
];

const routeEndpoints = [
  { x: 241, y: 201 },
  { x: 393, y: 201 },
  { x: 241, y: 299 },
  { x: 393, y: 299 },
  { x: 317, y: 418 },
] as const;

const branchNames: Record<AtlasBranch, string> = {
  all: "the complete product architecture",
  interface: "the product interface layer",
  backend: "the application services layer",
  logic: "the domain logic layer",
  data: "the data systems layer",
  delivery: "the delivery layer",
};

export function HeroStage() {
  const stageRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<AtlasBranch>("all");
  const [hoveredBranch, setHoveredBranch] = useState<AtlasBranch | null>(null);
  const [stageHovered, setStageHovered] = useState(false);
  const activeBranch = hoveredBranch ?? selectedBranch;

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const stageYSource = useTransform(scrollYProgress, [0, 0.38, 1], [20, 0, -12]);
  const stageScaleSource = useTransform(scrollYProgress, [0, 0.38, 1], [0.982, 1, 0.994]);
  const gridY = useTransform(scrollYProgress, [0, 1], [-7, 12]);
  const readProgress = useTransform(scrollYProgress, [0.12, 0.72], [0, 1]);
  const stageY = useSpring(stageYSource, { stiffness: 150, damping: 28, mass: 0.45 });
  const stageScale = useSpring(stageScaleSource, { stiffness: 150, damping: 28, mass: 0.45 });

  const tiltXTarget = useMotionValue(0);
  const tiltYTarget = useMotionValue(0);
  const lightXTarget = useMotionValue(320);
  const lightYTarget = useMotionValue(250);
  const tiltX = useSpring(tiltXTarget, { stiffness: 190, damping: 25, mass: 0.5 });
  const tiltY = useSpring(tiltYTarget, { stiffness: 190, damping: 25, mass: 0.5 });
  const lightX = useSpring(lightXTarget, { stiffness: 115, damping: 24, mass: 0.65 });
  const lightY = useSpring(lightYTarget, { stiffness: 115, damping: 24, mass: 0.65 });

  useEffect(() => {
    const activate = () => setReady(true);
    window.addEventListener("portfolio:ready", activate);

    const frame = window.requestAnimationFrame(() => {
      const preloader = document.querySelector(".site-preloader");
      if (!preloader && !document.documentElement.hasAttribute("data-preloading")) activate();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("portfolio:ready", activate);
    };
  }, []);

  const canUsePointerDepth = (event: ReactPointerEvent<HTMLElement>) => (
    !reduceMotion
    && event.pointerType === "mouse"
    && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches
  );

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canUsePointerDepth(event)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const horizontal = localX / bounds.width - 0.5;
    const vertical = localY / bounds.height - 0.5;

    tiltXTarget.set(vertical * -2.1);
    tiltYTarget.set(horizontal * 2.5);
    lightXTarget.set(localX);
    lightYTarget.set(localY);
  };

  const resetPointerDepth = () => {
    tiltXTarget.set(0);
    tiltYTarget.set(0);
    setStageHovered(false);
    setHoveredBranch(null);
  };

  const routeIsActive = (branch: AtlasBranch) => activeBranch === "all" || activeBranch === branch;

  return (
    <motion.figure
      ref={stageRef}
      id="software-practice"
      className="hero-stage"
      data-active={activeBranch}
      data-ready={ready || Boolean(reduceMotion)}
      aria-label="Interactive full-stack product architecture showing Joshua's connected engineering practice"
      style={reduceMotion ? undefined : { y: stageY, scale: stageScale }}
    >
      <motion.div
        className="hero-stage-surface"
        onPointerEnter={(event) => {
          if (canUsePointerDepth(event)) setStageHovered(true);
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointerDepth}
        style={reduceMotion ? undefined : {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1200,
        }}
      >
        <div className="hero-stage-label">
          <span>Full-stack product architecture</span>
          <strong>05 connected layers</strong>
        </div>

        <div className="developer-atlas">
          <motion.div
            className="atlas-grid"
            aria-hidden="true"
            style={reduceMotion ? undefined : { y: gridY }}
          />
          <motion.div
            className="atlas-pointer-light"
            aria-hidden="true"
            animate={{ opacity: stageHovered && !reduceMotion ? 0.62 : 0.16 }}
            style={{ left: lightX, top: lightY }}
          />
          <div className="atlas-heading">
            <span>System map / 001</span>
            <strong>One product. Every engineering layer working together.</strong>
          </div>

          <svg className="atlas-traces" viewBox="0 0 640 500" aria-hidden="true">
            {atlasNodes.map((node, index) => {
              const isActive = routeIsActive(node.branch);
              return (
                <g key={node.branch} className={`atlas-route atlas-route-${node.branch}`}>
                  <motion.path
                    d={node.route}
                    initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.12 }}
                    animate={ready || reduceMotion ? {
                      pathLength: 1,
                      opacity: isActive ? 0.92 : 0.2,
                      strokeWidth: isActive ? 1.65 : 1,
                    } : { pathLength: 0, opacity: 0.12 }}
                    transition={{
                      pathLength: { duration: reduceMotion ? 0 : 0.68, delay: 0.18 + index * 0.075, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: reduceMotion ? 0 : 0.22 },
                      strokeWidth: { duration: reduceMotion ? 0 : 0.22 },
                    }}
                  />
                  {activeBranch !== "all" && isActive && !reduceMotion && (
                    <motion.path
                      key={`${node.branch}-${activeBranch}`}
                      d={node.route}
                      className="atlas-route-execution"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <motion.rect
                    x={routeEndpoints[index].x}
                    y={routeEndpoints[index].y}
                    width="6"
                    height="6"
                    initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.45 }}
                    animate={ready || reduceMotion ? {
                      opacity: isActive ? 1 : 0.25,
                      scale: 1,
                    } : { opacity: 0, scale: 0.45 }}
                    transition={{ duration: reduceMotion ? 0 : 0.28, delay: 0.58 + index * 0.06 }}
                  />
                </g>
              );
            })}
          </svg>

          {atlasNodes.map((node, index) => {
            const isActive = routeIsActive(node.branch);
            return (
              <button
                key={node.branch}
                type="button"
                className={`atlas-node ${node.className}`}
                data-active={isActive}
                aria-pressed={selectedBranch === node.branch}
                aria-label={`Inspect ${branchNames[node.branch]}`}
                onClick={() => setSelectedBranch(node.branch)}
                onPointerEnter={() => setHoveredBranch(node.branch)}
                onPointerLeave={() => setHoveredBranch(null)}
                onFocus={() => setHoveredBranch(node.branch)}
                onBlur={() => setHoveredBranch(null)}
              >
                <motion.span
                  className="atlas-node-reveal"
                  initial={reduceMotion ? false : { opacity: 0, y: 13 }}
                  animate={ready || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 13 }}
                  transition={{ duration: reduceMotion ? 0 : 0.52, delay: 0.11 + index * 0.065, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="atlas-node-surface">
                    <span className="atlas-node-index">{node.index} / {node.discipline}</span>
                    <strong>{node.title}</strong>
                    <small>{node.tools}</small>
                    {node.artifact && <span className="atlas-artifact">{node.artifact}</span>}
                  </span>
                </motion.span>
              </button>
            );
          })}

          <button
            type="button"
            className="atlas-core"
            data-active={activeBranch === "all"}
            aria-pressed={selectedBranch === "all"}
            aria-label="Inspect the complete product architecture"
            onClick={() => setSelectedBranch("all")}
            onPointerEnter={() => setHoveredBranch("all")}
            onPointerLeave={() => setHoveredBranch(null)}
            onFocus={() => setHoveredBranch("all")}
            onBlur={() => setHoveredBranch(null)}
          >
            <motion.span
              className="atlas-core-reveal"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={ready || reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.58, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="atlas-core-surface">
                <span>Engineering practice</span>
                <strong>Full-stack<br /><em>/ ownership.</em></strong>
                <span className="atlas-core-method">shape <i /> build <i /> ship</span>
              </span>
            </motion.span>
          </button>
        </div>

        <figcaption className="hero-stage-foot">
          <span>Product</span>
          <span>Interfaces</span>
          <span>Services</span>
          <span>Data</span>
          <span>Delivery</span>
        </figcaption>
        <motion.i
          className="atlas-read-progress"
          aria-hidden="true"
          style={reduceMotion ? { scaleX: 1 } : { scaleX: readProgress }}
        />
        <span className="sr-only" aria-live="polite">Showing {branchNames[activeBranch]}.</span>
      </motion.div>
    </motion.figure>
  );
}
