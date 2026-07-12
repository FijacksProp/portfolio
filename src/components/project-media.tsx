import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectMediaProps = {
  kind: Project["diagram"];
  priority?: boolean;
  compact?: boolean;
};

function AttendanceMedia({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`project-media media-attendance ${compact ? "project-media-compact" : ""}`}>
      <div className="signal-rings" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <div className="attendance-phone">
        <div className="phone-topline"><span>9:41</span><span>● ● ●</span></div>
        <Image src="/projects/attendance-app-icon.png" alt="" width={96} height={96} className="attendance-icon" />
        <span className="phone-kicker">Nearby session</span>
        <strong>CSC 491</strong>
        <p>Acoustic + BLE verification</p>
        <div className="scan-button"><span />Scanning classroom</div>
        <div className="phone-signals">
          <span><i />BLE detected</span>
          <span><i />Proof fresh</span>
        </div>
      </div>
      <div className="signal-node signal-node-a"><span>BLE</span><strong>−61 dBm</strong></div>
      <div className="signal-node signal-node-b"><span>Acoustic</span><strong>18.4 kHz</strong></div>
      <div className="signal-node signal-node-c"><span>Backend</span><strong>Validated</strong></div>
      <div className="media-caption">Illustrative system view / implemented Android + Django proof flow</div>
    </div>
  );
}

function CourtesyMedia({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`project-media media-courtesy ${compact ? "project-media-compact" : ""}`}>
      <div className="courtesy-signal-field" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="courtesy-browser">
        <div className="browser-bar"><span /><span /><span /><small>courtesychain.com</small></div>
        <div className="browser-copy">
          <small>Behavioral intelligence / public product</small>
          <strong>Courtesy pays.<br />Drive kind.</strong>
          <p>A responsive product story that turns a complex concept into a route people can follow.</p>
          <span>Explore how it works →</span>
        </div>
      </div>
      <div className="courtesy-route-map" aria-label="CourtesyChain route architecture">
        <span>Content architecture</span>
        <div><i>01</i><strong>Home</strong><small>Premise</small></div>
        <div><i>02</i><strong>How it works</strong><small>Explanation</small></div>
        <div><i>03</i><strong>Investors</strong><small>Separate intent</small></div>
      </div>
      <div className="media-caption">Illustrative interface architecture / actual routes and content system</div>
    </div>
  );
}

function TradingMedia({ compact = false }: { compact?: boolean }) {
  const candles: Array<[number, number, number, number, boolean]> = [
    [100, 176, 146, 124, true], [145, 138, 114, 95, false], [190, 151, 128, 108, true],
    [235, 126, 92, 74, true], [280, 105, 132, 86, false], [325, 139, 112, 101, false],
    [370, 127, 84, 68, true], [415, 93, 72, 54, true], [460, 82, 110, 65, false],
    [505, 116, 89, 73, true], [550, 98, 62, 43, true], [595, 72, 95, 58, false],
  ];

  return (
    <div className={`project-media media-trading ${compact ? "project-media-compact" : ""}`}>
      <div className="trade-topbar">
        <span>MARKET OBSERVATION</span><span>EUR / USD</span><span className="watch-only">WATCH ONLY</span>
      </div>
      <svg viewBox="0 0 720 360" role="img" aria-label="Illustrative market-analysis chart ending at a no-execution boundary">
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4c8dff" stopOpacity=".38" />
            <stop offset="1" stopColor="#4c8dff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="chart-grid">
          {[60, 120, 180, 240, 300].map((y) => <line key={y} x1="42" x2="650" y1={y} y2={y} />)}
          {[100, 200, 300, 400, 500, 600].map((x) => <line key={x} x1={x} x2={x} y1="38" y2="320" />)}
        </g>
        <path className="chart-area" d="M42 268 C120 250 132 210 190 220 S286 164 338 181 S430 112 480 137 S564 82 650 94 L650 320 L42 320Z" />
        <path className="chart-line" d="M42 268 C120 250 132 210 190 220 S286 164 338 181 S430 112 480 137 S564 82 650 94" />
        <g className="candles">
          {candles.map(([x, bottom, top, wick, up]) => (
            <g key={x} className={up ? "candle-up" : "candle-down"}>
              <line x1={x} x2={x} y1={wick} y2={bottom + 18} />
              <rect x={x - 6} y={top} width="12" height={Math.max(12, bottom - top)} />
            </g>
          ))}
        </g>
        <line className="execution-line" x1="678" x2="678" y1="30" y2="327" />
        <text className="execution-copy" x="695" y="65" transform="rotate(90 695 65)">NO ORDER EXECUTION</text>
      </svg>
      <div className="trade-metrics">
        <div><span>Trend filter</span><strong>Aligned</strong></div>
        <div><span>Risk gate</span><strong>Required</strong></div>
        <div><span>Journal</span><strong>Recorded</strong></div>
      </div>
      <div className="media-caption">Illustrative market view / no performance data</div>
    </div>
  );
}

export function ProjectMedia({ kind, compact = false }: ProjectMediaProps) {
  if (kind === "attendance") return <AttendanceMedia compact={compact} />;
  if (kind === "courtesy") return <CourtesyMedia compact={compact} />;
  return <TradingMedia compact={compact} />;
}
