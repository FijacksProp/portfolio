"use client";

import { useState } from "react";

const cards = [
  {
    id: "product",
    number: "01",
    eyebrow: "Product engineering",
    title: <>Interfaces<br />people understand.</>,
    detail: "React · Next.js · TypeScript",
    className: "work-stack-blue",
  },
  {
    id: "backend",
    number: "02",
    eyebrow: "Backend systems",
    title: <>Rules, services<br />&amp; reliable APIs.</>,
    detail: "Django · FastAPI · PostgreSQL",
    className: "work-stack-dark",
  },
  {
    id: "delivery",
    number: "03",
    eyebrow: "Release ownership",
    title: <>Built to ship.<br />Built to hold.</>,
    detail: "Build · test · deploy",
    className: "work-stack-lime",
  },
] as const;

export function WorkHeroDeck() {
  const [selected, setSelected] = useState<(typeof cards)[number]["id"] | null>(null);

  return (
    <div id="engineering-range" className="work-hero-stack">
      <div className="work-deck-caption" aria-hidden="true">
        <span>Engineering range</span>
        <span>Select a layer / 01—03</span>
      </div>
      <div className="work-stack-track" role="group" aria-label="Engineering range cards">
        {cards.map((card) => (
          <button
            type="button"
            className={`work-stack-card ${card.className}`}
            data-active={selected === card.id ? "true" : "false"}
            aria-pressed={selected === card.id}
            key={card.id}
            onClick={() => setSelected((current) => current === card.id ? null : card.id)}
          >
            <span className="work-card-index">{card.number} / {card.eyebrow}</span>
            <strong>{card.title}</strong>
            <small>{card.detail}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
