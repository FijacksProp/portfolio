"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const disciplines = ["Interfaces", "Services", "Data", "Delivery"] as const;

export function SitePreloader() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(false);

  const finish = useCallback(() => {
    document.documentElement.removeAttribute("data-preloading");
    document.documentElement.setAttribute("data-portfolio-ready", "true");
    window.dispatchEvent(new Event("portfolio:ready"));
    setVisible(false);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const frame = window.requestAnimationFrame(finish);
      return () => window.cancelAnimationFrame(frame);
    }

    document.documentElement.setAttribute("data-preloading", "true");
    const startFrame = window.requestAnimationFrame(() => setActive(true));
    const fallback = window.setTimeout(finish, 4300);

    return () => {
      window.cancelAnimationFrame(startFrame);
      window.clearTimeout(fallback);
      document.documentElement.removeAttribute("data-preloading");
    };
  }, [finish]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`site-preloader${active ? " site-preloader-active" : ""}`}
      onAnimationEnd={(event) => {
        if (event.currentTarget === event.target) finish();
      }}
    >
      <div className="preloader-ghost-word">SYSTEMS</div>
      <div className="preloader-color-field">
        <div className="preloader-mark-plate">
          <Image
            src="/fp-mark.png"
            alt=""
            fill
            sizes="(max-width: 639px) calc(100vw - 68px), 360px"
            priority
          />
        </div>
        <span>FP / Software practice</span>
      </div>

      <header className="preloader-header">
        <div className="preloader-brand">
          <Image src="/fp-mark.png" alt="" width={240} height={180} sizes="58px" priority />
          <span>
            <strong>Joshua Olugbemi</strong>
            <small>Software practice</small>
          </span>
        </div>
        <span className="preloader-edition">Portfolio / 2026</span>
      </header>

      <div className="preloader-stage">
        <span className="preloader-kicker">Engineering across</span>
        <div className="preloader-number-window">
          <div className="preloader-number-reel">
            {disciplines.map((_, index) => (
              <span key={index}>{String(index + 1).padStart(2, "0")}</span>
            ))}
          </div>
        </div>
        <div className="preloader-word-window">
          <div className="preloader-word-reel">
            {disciplines.map((discipline) => (
              <strong key={discipline}>{discipline}</strong>
            ))}
          </div>
        </div>
      </div>

      <footer className="preloader-footer">
        <span>Full-stack systems</span>
        <strong>Designed · Built · Delivered</strong>
      </footer>

      <div className="preloader-wipe" />
      <div className="preloader-wipe-accent" />
    </div>
  );
}
