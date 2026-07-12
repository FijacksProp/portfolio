export function HeroStage() {
  return (
    <figure
      id="software-practice"
      className="hero-stage"
      aria-label="Full-stack system atlas showing five connected areas of Joshua's software practice"
    >
      <div className="hero-stage-label">
        <span>Full-stack system atlas</span>
        <strong>05 connected layers</strong>
      </div>

      <div className="developer-atlas">
        <div className="atlas-grid" aria-hidden="true" />
        <div className="atlas-heading">
          <span>Engineering scope / 001</span>
          <strong>From first input to shipped product.</strong>
        </div>

        <svg className="atlas-traces" viewBox="0 0 640 500" aria-hidden="true">
          <path d="M142 156 V204 H244" />
          <path d="M498 156 V204 H396" />
          <path d="M142 348 V302 H244" />
          <path d="M498 348 V302 H396" />
          <path d="M320 304 V421" />
          <circle cx="244" cy="204" r="4" />
          <circle cx="396" cy="204" r="4" />
          <circle cx="244" cy="302" r="4" />
          <circle cx="396" cy="302" r="4" />
          <circle cx="320" cy="421" r="4" />
        </svg>

        <article className="atlas-node atlas-interface">
          <span className="atlas-node-index">01 / Experience</span>
          <strong>Product interface</strong>
          <small>React · Next.js · Flutter</small>
          <span className="atlas-artifact">route / interaction / state</span>
        </article>

        <article className="atlas-node atlas-service">
          <span className="atlas-node-index">02 / Logic</span>
          <strong>Service layer</strong>
          <small>Django REST · FastAPI</small>
          <span className="atlas-artifact">contract / auth / validation</span>
        </article>

        <article className="atlas-node atlas-input">
          <span className="atlas-node-index">03 / Context</span>
          <strong>Real-world input</strong>
          <small>BLE · devices · user events</small>
          <span className="atlas-artifact">sense / interpret / respond</span>
        </article>

        <article className="atlas-node atlas-data">
          <span className="atlas-node-index">04 / State</span>
          <strong>Data + rules</strong>
          <small>PostgreSQL · persistence</small>
          <span className="atlas-artifact">model / query / protect</span>
        </article>

        <div className="atlas-core">
          <span>System composition</span>
          <strong>Engineering<br /><em>ownership.</em></strong>
          <div><i /> model <i /> build <i /> validate</div>
        </div>

        <article className="atlas-node atlas-delivery">
          <span className="atlas-node-index">05 / Release</span>
          <strong>Delivery</strong>
          <small>Git · build · deploy</small>
        </article>
      </div>

      <figcaption className="hero-stage-foot">
        <span>Interfaces</span>
        <span>Services</span>
        <span>Data</span>
        <span>Delivery</span>
        <span>Signals</span>
      </figcaption>
    </figure>
  );
}
