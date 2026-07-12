export function SystemTrace() {
  const nodes = ["Interface", "API", "Data", "Signal"];

  return (
    <figure className="system-trace" aria-labelledby="system-trace-caption">
      <svg viewBox="0 0 1000 90" role="img" aria-hidden="true">
        <line x1="34" y1="35" x2="966" y2="35" />
        {nodes.map((node, index) => {
          const x = 34 + index * 310.5;
          return (
            <g key={node}>
              <circle cx={x} cy="35" r="5" />
              <text x={x} y="72" textAnchor={index === 0 ? "start" : index === 3 ? "end" : "middle"}>
                0{index + 1} / {node.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption id="system-trace-caption" className="sr-only">
        Joshua works across interface, API, data, and real-world signal layers.
      </figcaption>
    </figure>
  );
}
