"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";

export function SystemStory({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const items = project.implementation;

  const moveFocus = (current: number, key: string) => {
    let next = current;
    if (key === "ArrowRight") next = (current + 1) % items.length;
    if (key === "ArrowLeft") next = (current - 1 + items.length) % items.length;
    if (key === "Home") next = 0;
    if (key === "End") next = items.length - 1;
    if (next === current && !["Home", "End"].includes(key)) return;
    setActive(next);
    document.getElementById(`flow-tab-${project.slug}-${next}`)?.focus();
  };

  return (
    <div className="system-story">
      <div className="system-story-track" role="tablist" aria-label={`${project.title} system flow`}>
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`flow-panel-${project.slug}`}
            id={`flow-tab-${project.slug}-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
                event.preventDefault();
                moveFocus(index, event.key);
              }
            }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
            {index < items.length - 1 && <i aria-hidden="true">→</i>}
          </button>
        ))}
      </div>
      <motion.div
        id={`flow-panel-${project.slug}`}
        role="tabpanel"
        aria-labelledby={`flow-tab-${project.slug}-${active}`}
        className="system-story-panel"
        key={active}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span>Active layer / {String(active + 1).padStart(2, "0")}</span>
        <h3>{items[active].label}</h3>
        <p>{items[active].value}</p>
        <div className="system-story-progress" aria-hidden="true">
          <motion.i initial={{ width: 0 }} animate={{ width: `${((active + 1) / items.length) * 100}%` }} />
        </div>
      </motion.div>
    </div>
  );
}
