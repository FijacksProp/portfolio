"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type RouteTone = "primary" | "secondary" | "sand";

type SystemRoute = {
  d: string;
  tone: RouteTone;
  dashed?: boolean;
};

type SystemNode = {
  x: number;
  y: number;
  tone?: Exclude<RouteTone, "secondary">;
  ring?: boolean;
};

type SystemMap = {
  routes: SystemRoute[];
  nodes: SystemNode[];
  signals: { route: number; duration: number; delay: number; tone?: "blue" | "lime" | "sand" }[];
};

const maps = {
  home: {
    routes: [
      { d: "M-40 164 H202 V302 H412 V422 H720", tone: "primary" },
      { d: "M1640 126 H1392 V248 H1188 V390 H978", tone: "sand" },
      { d: "M-20 786 H164 V642 H366 V824 H618", tone: "secondary" },
      { d: "M1620 812 H1448 V678 H1244 V846 H1096", tone: "primary" },
      { d: "M318 -40 V138 H566 V238 H758", tone: "secondary", dashed: true },
      { d: "M1282 1040 V884 H1014 V720 H830", tone: "sand", dashed: true },
      { d: "M-20 506 H184 V522 H1416 V500 H1620", tone: "secondary" },
      { d: "M792 -40 V178 H816 V820 H792 V1040", tone: "secondary", dashed: true },
      { d: "M68 918 C244 860 250 732 424 694 S704 600 806 506", tone: "primary" },
      { d: "M1534 54 C1374 102 1382 250 1218 302 S936 416 816 506", tone: "sand" },
    ],
    nodes: [
      { x: 202, y: 164, tone: "primary", ring: true },
      { x: 412, y: 302 },
      { x: 1392, y: 248, tone: "sand", ring: true },
      { x: 1244, y: 678, tone: "primary" },
      { x: 366, y: 642 },
      { x: 816, y: 506, tone: "primary", ring: true },
      { x: 1014, y: 884, tone: "sand" },
      { x: 566, y: 238 },
    ],
    signals: [
      { route: 0, duration: 15, delay: -4, tone: "blue" },
      { route: 1, duration: 18, delay: -12, tone: "sand" },
      { route: 3, duration: 20, delay: -7, tone: "lime" },
      { route: 8, duration: 23, delay: -16, tone: "blue" },
    ],
  },
  work: {
    routes: [
      { d: "M184 -40 V1040", tone: "primary" },
      { d: "M184 142 H446 V244 H736", tone: "secondary" },
      { d: "M184 432 H354 V354 H648 V474 H936", tone: "sand" },
      { d: "M184 742 H468 V642 H804 V760 H1126", tone: "primary" },
      { d: "M1418 -40 V1040", tone: "secondary", dashed: true },
      { d: "M1418 188 H1234 V306 H990", tone: "primary" },
      { d: "M1418 526 H1256 V454 H1084 V592 H858", tone: "secondary" },
      { d: "M1418 842 H1280 V730 H1118", tone: "sand" },
      { d: "M-20 904 H286 V862 H614", tone: "secondary", dashed: true },
      { d: "M1620 82 H1510 V124 H1308", tone: "secondary" },
    ],
    nodes: [
      { x: 184, y: 142, tone: "primary", ring: true },
      { x: 184, y: 432, tone: "sand" },
      { x: 184, y: 742, tone: "primary", ring: true },
      { x: 446, y: 244 },
      { x: 648, y: 354, tone: "sand" },
      { x: 804, y: 642, tone: "primary" },
      { x: 1418, y: 526 },
      { x: 1256, y: 454, tone: "primary", ring: true },
      { x: 1280, y: 730, tone: "sand" },
    ],
    signals: [
      { route: 0, duration: 19, delay: -6, tone: "blue" },
      { route: 2, duration: 16, delay: -9, tone: "sand" },
      { route: 5, duration: 15, delay: -2, tone: "lime" },
      { route: 7, duration: 18, delay: -14, tone: "sand" },
    ],
  },
  about: {
    routes: [
      { d: "M214 -40 V1040", tone: "sand" },
      { d: "M214 126 H456 V224 H760", tone: "secondary" },
      { d: "M214 384 H520 V494 H858", tone: "primary" },
      { d: "M214 678 H404 V782 H704", tone: "secondary" },
      { d: "M214 916 H526", tone: "sand" },
      { d: "M1530 84 C1292 132 1326 338 1090 384 S878 596 858 494", tone: "primary" },
      { d: "M1604 876 C1380 822 1378 692 1164 654 S926 548 858 494", tone: "sand" },
      { d: "M1228 -40 V178 H1080 V310", tone: "secondary", dashed: true },
      { d: "M1328 1040 V850 H1112 V742", tone: "secondary", dashed: true },
    ],
    nodes: [
      { x: 214, y: 126, tone: "sand", ring: true },
      { x: 214, y: 384, tone: "primary" },
      { x: 214, y: 678 },
      { x: 214, y: 916, tone: "sand", ring: true },
      { x: 520, y: 494, tone: "primary" },
      { x: 858, y: 494, tone: "primary", ring: true },
      { x: 1164, y: 654, tone: "sand" },
      { x: 1080, y: 178 },
    ],
    signals: [
      { route: 0, duration: 22, delay: -13, tone: "sand" },
      { route: 2, duration: 17, delay: -4, tone: "blue" },
      { route: 5, duration: 24, delay: -18, tone: "lime" },
    ],
  },
  contact: {
    routes: [
      { d: "M-30 108 H250 V230 H508 V420 H790", tone: "primary" },
      { d: "M1630 102 H1374 V246 H1112 V420 H790", tone: "sand" },
      { d: "M-30 892 H274 V774 H514 V596 H790", tone: "secondary" },
      { d: "M1630 910 H1350 V782 H1088 V596 H790", tone: "primary" },
      { d: "M790 -40 V420", tone: "secondary", dashed: true },
      { d: "M790 596 V1040", tone: "sand", dashed: true },
      { d: "M790 420 V596", tone: "primary" },
      { d: "M86 512 H356 V508 H1228 V512 H1514", tone: "secondary" },
      { d: "M248 54 C424 164 486 292 790 420", tone: "sand" },
      { d: "M1378 962 C1208 844 1114 714 790 596", tone: "primary" },
    ],
    nodes: [
      { x: 250, y: 230, tone: "primary" },
      { x: 1374, y: 246, tone: "sand" },
      { x: 514, y: 596 },
      { x: 1088, y: 596, tone: "primary" },
      { x: 790, y: 420, tone: "primary", ring: true },
      { x: 790, y: 596, tone: "sand", ring: true },
      { x: 356, y: 508 },
      { x: 1228, y: 512 },
    ],
    signals: [
      { route: 0, duration: 18, delay: -3, tone: "blue" },
      { route: 1, duration: 20, delay: -13, tone: "sand" },
      { route: 3, duration: 21, delay: -8, tone: "lime" },
      { route: 9, duration: 25, delay: -19, tone: "blue" },
    ],
  },
  case: {
    routes: [
      { d: "M92 80 H468 V248 H734 V432 H1022 V608 H1508", tone: "primary" },
      { d: "M92 932 H402 V778 H682 V612 H1022", tone: "sand" },
      { d: "M1508 96 H1278 V232 H1062 V432 H734", tone: "secondary" },
      { d: "M1508 916 H1308 V772 H1142 V608 H1022", tone: "primary" },
      { d: "M468 -30 V248", tone: "secondary", dashed: true },
      { d: "M1308 1040 V772", tone: "secondary", dashed: true },
      { d: "M-20 520 H270 V466 H548", tone: "secondary" },
      { d: "M1620 510 H1364 V548 H1114", tone: "sand" },
      { d: "M734 432 V612", tone: "primary" },
      { d: "M1022 432 V608", tone: "secondary", dashed: true },
    ],
    nodes: [
      { x: 468, y: 248, tone: "primary", ring: true },
      { x: 734, y: 432, tone: "primary" },
      { x: 1022, y: 608, tone: "sand", ring: true },
      { x: 402, y: 778, tone: "sand" },
      { x: 1278, y: 232 },
      { x: 1308, y: 772, tone: "primary" },
      { x: 270, y: 466 },
      { x: 1364, y: 548, tone: "sand" },
    ],
    signals: [
      { route: 0, duration: 22, delay: -9, tone: "blue" },
      { route: 1, duration: 18, delay: -3, tone: "sand" },
      { route: 3, duration: 19, delay: -14, tone: "lime" },
      { route: 8, duration: 12, delay: -7, tone: "blue" },
    ],
  },
  courtesy: {
    routes: [
      { d: "M-30 188 H260 V286 H520 V416 H808", tone: "primary" },
      { d: "M-30 506 H310 V438 H520", tone: "sand" },
      { d: "M-30 812 H284 V686 H520 V578 H808", tone: "secondary" },
      { d: "M808 416 V578", tone: "primary" },
      { d: "M808 496 H1048 V338 H1324 V190 H1630", tone: "sand" },
      { d: "M808 496 H1120 V620 H1386 V794 H1630", tone: "primary" },
      { d: "M398 -40 V142 H592 V286", tone: "secondary", dashed: true },
      { d: "M1210 1040 V856 H1048 V620", tone: "secondary", dashed: true },
      { d: "M260 286 C434 230 640 292 808 416", tone: "primary" },
      { d: "M1386 794 C1262 738 1160 632 1120 496", tone: "sand" },
    ],
    nodes: [
      { x: 260, y: 286, tone: "primary", ring: true },
      { x: 310, y: 438, tone: "sand" },
      { x: 520, y: 416 },
      { x: 520, y: 578, tone: "primary" },
      { x: 808, y: 496, tone: "primary", ring: true },
      { x: 1048, y: 338, tone: "sand" },
      { x: 1120, y: 620, tone: "primary" },
      { x: 1386, y: 794, tone: "sand", ring: true },
    ],
    signals: [
      { route: 0, duration: 19, delay: -5, tone: "blue" },
      { route: 1, duration: 15, delay: -11, tone: "sand" },
      { route: 4, duration: 20, delay: -3, tone: "lime" },
      { route: 5, duration: 23, delay: -16, tone: "blue" },
    ],
  },
  radar: {
    routes: [
      { d: "M-30 210 H258 V304 H512 V414 H798 V510 H1118", tone: "primary" },
      { d: "M-30 438 H310 V508 H512", tone: "secondary" },
      { d: "M-30 760 H280 V650 H512 V586 H798 V510", tone: "sand" },
      { d: "M1118 -40 V1040", tone: "sand", dashed: true },
      { d: "M1118 510 H1300 V352 H1510", tone: "secondary" },
      { d: "M1118 510 H1300 V674 H1510", tone: "secondary" },
      { d: "M1510 352 V674", tone: "primary" },
      { d: "M1510 510 H1620", tone: "secondary", dashed: true },
      { d: "M258 304 C410 224 644 290 798 414 S1014 516 1118 510", tone: "primary" },
      { d: "M1510 674 C1380 760 1260 706 1118 510", tone: "sand" },
    ],
    nodes: [
      { x: 258, y: 304, tone: "primary" },
      { x: 310, y: 508 },
      { x: 512, y: 414, tone: "primary", ring: true },
      { x: 512, y: 586, tone: "sand" },
      { x: 798, y: 510, tone: "primary" },
      { x: 1118, y: 510, tone: "sand", ring: true },
      { x: 1300, y: 352 },
      { x: 1300, y: 674, tone: "primary" },
      { x: 1510, y: 510, tone: "primary", ring: true },
    ],
    signals: [
      { route: 0, duration: 21, delay: -10, tone: "blue" },
      { route: 2, duration: 18, delay: -4, tone: "sand" },
      { route: 8, duration: 24, delay: -19, tone: "lime" },
      { route: 9, duration: 20, delay: -7, tone: "sand" },
    ],
  },
} satisfies Record<string, SystemMap>;

type MapVariant = keyof typeof maps;

function getMapVariant(pathname: string): MapVariant {
  if (pathname === "/") return "home";
  if (pathname === "/work") return "work";
  if (pathname === "/work/courtesychain") return "courtesy";
  if (pathname === "/work/mt5-trade-radar") return "radar";
  if (pathname.startsWith("/work/")) return "case";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  return "home";
}

function MapDrawing({ map, withSignals = false }: { map: SystemMap; withSignals?: boolean }) {
  return (
    <>
      <g className="systems-routes">
        {map.routes.map((route, index) => (
          <path
            className={`systems-route systems-route-${route.tone}${route.dashed ? " systems-route-dashed" : ""}`}
            d={route.d}
            key={`${route.d}-${index}`}
          />
        ))}
      </g>

      <g className="systems-nodes">
        {map.nodes.map((node, index) => (
          <g
            className={`systems-node systems-node-${node.tone ?? "secondary"}${node.ring ? " systems-node-ringed" : ""}`}
            key={`${node.x}-${node.y}-${index}`}
            transform={`translate(${node.x} ${node.y})`}
          >
            {node.ring && <circle className="systems-node-orbit" r="15" />}
            <circle className="systems-node-core" r="3.25" />
          </g>
        ))}
      </g>

      {withSignals && (
        <g className="systems-signals">
          {map.signals.map((signal, index) => {
            const route = map.routes[signal.route];
            return (
              <circle
                className={`systems-signal systems-signal-${signal.tone ?? "blue"}`}
                key={`${route.d}-${index}`}
                r="3.5"
              >
                <animateMotion
                  begin={`${signal.delay}s`}
                  dur={`${signal.duration}s`}
                  path={route.d}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>
      )}
    </>
  );
}

export function LivingSystemsBackground() {
  const pathname = usePathname();
  const variant = getMapVariant(pathname);
  const map = maps[variant];
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!root || !finePointer.matches) return;

    let frame = 0;
    const handlePointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        root.style.setProperty("--systems-pointer-x", `${event.clientX}px`);
        root.style.setProperty("--systems-pointer-y", `${event.clientY}px`);
        root.dataset.engaged = "true";
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleVisibilityChange = () => {
      if (document.hidden) svg.pauseAnimations();
      else svg.unpauseAnimations();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    handleVisibilityChange();
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [variant]);

  return (
    <div
      aria-hidden="true"
      className="living-systems-background"
      data-variant={variant}
      ref={rootRef}
    >
      <div className="systems-grid" />
      <svg
        className="systems-map systems-map-base"
        key={variant}
        preserveAspectRatio="xMidYMid slice"
        ref={svgRef}
        viewBox="0 0 1600 1000"
      >
        <MapDrawing map={map} withSignals />
      </svg>
      <div className="systems-map-proximity">
        <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 1000">
          <MapDrawing map={map} />
        </svg>
      </div>
      <div className="systems-vignette" />
    </div>
  );
}
