export type ProjectStatus = "live" | "prototype" | "academic";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectDecision = {
  title: string;
  description: string;
};

export type Project = {
  number: string;
  slug: string;
  title: string;
  year: string;
  role: string;
  status: ProjectStatus;
  eyebrow: string;
  cta: string;
  summary: string;
  premise: string;
  context: string[];
  problem: string;
  responsibilities: string[];
  stack: string[];
  decisions: ProjectDecision[];
  implementation: { label: string; value: string }[];
  limitations: string[];
  outcomes: string[];
  links: ProjectLink[];
  featured: boolean;
  diagram: "attendance" | "courtesy" | "trading";
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "smart-attendance-system",
    title: "Smart Attendance System",
    year: "2026",
    role: "Product engineer · Final-year project",
    status: "academic",
    eyebrow: "Proximity verification / Mobile + backend",
    cta: "Trace the verification architecture",
    summary:
      "A working attendance prototype that combines BLE, acoustic beaconing, device trust, and backend validation to verify classroom presence.",
    premise:
      "Attendance proof should be layered, short-lived, and validated by the server—not trusted simply because a phone says it was present.",
    context: [
      "This final-year project connects my Telecommunication Science background with full-stack software engineering. The system includes a Flutter mobile client, native Android signal processing, and a Django REST backend.",
      "Lecturers create live sessions and broadcast a nearby proof. Students scan, submit evidence, and receive an attendance record only after the backend validates the session, identity, device, freshness, and proof path.",
    ],
    problem:
      "Conventional sign-in flows can confirm an account without confirming physical presence. The project needed a practical classroom-range signal, a second short-range copresence signal, and server-side rules that reduce replay and account-sharing fraud.",
    responsibilities: [
      "Designed the layered attendance-proof model and validation flow.",
      "Built student and lecturer workflows across Flutter and Django REST Framework.",
      "Integrated Android BLE advertising/scanning and acoustic broadcast/scan behavior.",
      "Implemented device binding, duplicate prevention, reporting, and CSV export.",
      "Prepared deployment, demonstration, and academic documentation.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Kotlin",
      "Android Bluetooth APIs",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
    ],
    decisions: [
      {
        title: "Use BLE as the practical proximity signal",
        description:
          "BLE provides the stronger classroom-range proof path in the current prototype and works across ordinary Android hardware with the correct permissions.",
      },
      {
        title: "Keep acoustic beaconing as layered evidence",
        description:
          "Speaker-to-microphone decoding demonstrates short-range copresence, but the system presents its sensitivity to noise, phone orientation, and hardware honestly.",
      },
      {
        title: "Make the backend the final authority",
        description:
          "The client submits proof; it does not award attendance. The server checks identity, active session state, device ownership, freshness, replays, and duplicates.",
      },
      {
        title: "Treat Wi-Fi as fallback—not distance proof",
        description:
          "Same-network evidence can help controlled demonstrations, but it cannot prove exact classroom distance and is labelled accordingly.",
      },
    ],
    implementation: [
      { label: "Client", value: "Flutter application with native Kotlin integrations" },
      { label: "Signal paths", value: "BLE, acoustic beacon, controlled LAN fallback" },
      { label: "Authority", value: "Django REST validation and token authentication" },
      { label: "Trust controls", value: "Device binding, freshness, replay and duplicate checks" },
      { label: "Operations", value: "Session reports, attendance history and CSV export" },
    ],
    limitations: [
      "Acoustic decoding is short-range and sensitive to environmental noise and device hardware.",
      "BLE range varies with permissions, obstacles, Bluetooth hardware, and room conditions.",
      "The current native signal implementation targets Android; iOS is not supported.",
      "The project is a proximity-verification prototype, not a production indoor-positioning system.",
    ],
    outcomes: [
      "Delivered a working Android attendance flow for both lecturer and student roles.",
      "Implemented layered proof submission with server-side validation and duplicate prevention.",
      "Added device trust, validation reporting, and downloadable attendance records.",
      "Documented practical operating conditions and honest boundaries for demonstration.",
    ],
    links: [
      {
        label: "View public repository",
        href: "https://github.com/FijacksProp/sa-acoustic-ble",
      },
    ],
    featured: true,
    diagram: "attendance",
  },
  {
    number: "02",
    slug: "courtesychain",
    title: "CourtesyChain",
    year: "2026",
    role: "Lead web developer",
    status: "live",
    eyebrow: "Public product platform / Responsive web",
    cta: "Examine the product delivery",
    summary:
      "A live React product platform that sequences an unfamiliar courtesy-and-rewards proposition across public and investor-facing routes.",
    premise:
      "An unfamiliar product needs a page structure that establishes the idea, explains its value, and makes the next action obvious without overwhelming the visitor.",
    context: [
      "CourtesyChain presents a product concept built around encouraging kinder driving and rewarding positive behavior. The website had to translate that proposition for a broad public audience.",
      "As lead web developer, I shaped and implemented the public interface, responsive content structure, product communication, and supporting routes, including an investor-facing area.",
    ],
    problem:
      "The concept crosses community, incentives, and Web3. The interface needed to establish trust and sequence those ideas in plain language across desktop and mobile, while remaining practical to deploy and maintain.",
    responsibilities: [
      "Led implementation of the React and TypeScript web experience.",
      "Structured the public narrative from product premise to action.",
      "Built responsive page sections, navigation, contact surfaces, and investor content.",
      "Prepared the site for consistent build, test, and deployment workflows.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Vitest"],
    decisions: [
      {
        title: "Explain before asking",
        description:
          "The page sequence introduces the behavioral idea before presenting rewards and product actions, reducing the cognitive jump for first-time visitors.",
      },
      {
        title: "Build one responsive content system",
        description:
          "Components and layout rules are shared across routes so content can change without creating inconsistent mobile and desktop experiences.",
      },
      {
        title: "Separate public and investor intent",
        description:
          "Investor-oriented information lives in a dedicated route rather than competing with the primary public product narrative.",
      },
    ],
    implementation: [
      { label: "Interface", value: "Component-led React and TypeScript application" },
      { label: "Content", value: "Narrative product sections and focused calls to action" },
      { label: "Responsiveness", value: "Shared page system across desktop and mobile" },
      { label: "Supporting route", value: "Dedicated investor portal content" },
    ],
    limitations: [
      "The case study does not claim product adoption or commercial results that were not independently verified.",
      "The live site represents an evolving MVP and its public content may continue to change.",
      "My role is presented as lead web development, not sole ownership of the wider product or business.",
    ],
    outcomes: [
      "Delivered a live public product experience at courtesychain.com.",
      "Established a reusable responsive structure across the core pages.",
      "Created a separate path for investor-oriented product communication.",
      "Maintained a repository workflow with build, test, and lint commands.",
    ],
    links: [
      { label: "Visit live site", href: "https://courtesychain.com" },
      {
        label: "View public repository",
        href: "https://github.com/FijacksProp/courtesychain",
      },
    ],
    featured: true,
    diagram: "courtesy",
  },
  {
    number: "03",
    slug: "mt5-trade-radar",
    title: "MT5 Trade Radar",
    year: "2026",
    role: "Full-stack developer",
    status: "prototype",
    eyebrow: "Market observation / Risk-aware prototype",
    cta: "Inspect the watch-only boundary",
    summary:
      "A watch-only MT5 assistant that reads market data, filters potential setups, records observations, and deliberately never places trades.",
    premise:
      "A useful market assistant can make its reasoning visible and keep execution outside the system boundary while the signal logic is still being evaluated.",
    context: [
      "MT5 Trade Radar is a private-source prototype for risk-constrained market observation. A FastAPI service reads or mocks market data, while a React dashboard presents signals, settings, and a journal.",
      "The system ranks a focused symbol universe, evaluates conservative setup rules, persists observations, and tracks later outcomes without sending an order to a broker.",
    ],
    problem:
      "Market feeds are noisy, broker conditions vary, and a directional suggestion can look more certain than it is. The prototype needed explicit filters, inspectable risk suggestions, and a hard boundary between observation and execution.",
    responsibilities: [
      "Designed the watch-only product boundary and phased architecture.",
      "Built FastAPI routes for health, settings, signals, journal, and market data.",
      "Built the React and TypeScript dashboard for signals, settings, instrument search, and journal review.",
      "Implemented conservative filtering, scoring, persistence, and observation tracking.",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "React", "TypeScript", "Vite", "Tailwind CSS"],
    decisions: [
      {
        title: "Make the first release watch-only",
        description:
          "No backend method sends orders. The system can be evaluated as an information tool before any higher-risk capability is considered.",
      },
      {
        title: "Prefer a focused scan universe",
        description:
          "The default scanner prioritizes selected symbols instead of treating every visible broker instrument as equally useful.",
      },
      {
        title: "Use conservative outcome tracking",
        description:
          "When a later candle could have touched both stop loss and take profit, the journal records the stop first rather than claiming an optimistic outcome.",
      },
      {
        title: "Keep mock fallback available",
        description:
          "The interface and data flow remain testable when a local MT5 terminal is unavailable.",
      },
    ],
    implementation: [
      { label: "API", value: "FastAPI routes with SQLAlchemy persistence" },
      { label: "Market bridge", value: "Read-only MT5 status, tick and candle endpoints" },
      { label: "Scanner", value: "EMA, pullback, RSI, ATR, spread and risk/reward filters" },
      { label: "Journal", value: "Persistent observations, duplicate prevention and summaries" },
      { label: "Safety boundary", value: "No broker order placement" },
    ],
    limitations: [
      "The prototype is an observation tool, not financial advice or a trading guarantee.",
      "Signal quality remains dependent on market conditions, broker data, and filter configuration.",
      "The repository is private; the portfolio exposes product architecture but not source code.",
      "Live MT5 reads require a compatible local terminal and platform environment.",
    ],
    outcomes: [
      "Delivered a working FastAPI and React observation workflow from market read to persisted journal entry.",
      "Added read-only market endpoints, focused signal ranking, and searchable instruments.",
      "Persisted observations and tracked later outcomes with a conservative rule.",
      "Kept order execution completely outside the implemented system.",
    ],
    links: [],
    featured: true,
    diagram: "trading",
  },
];

export const archiveProjects = [
  {
    number: "04",
    title: "U-Genesis Group",
    year: "2026",
    type: "Full-stack business platform",
    description:
      "A React and TypeScript web application paired with a Django backend and practical business workflows.",
    href: "https://github.com/FijacksProp/ugenesisgroup",
    image: null,
  },
  {
    number: "05",
    title: "Tanit Cuisine",
    year: "2026",
    type: "Restaurant web experience",
    description:
      "A Next.js and TypeScript dining site with responsive editorial content and reusable interaction components.",
    href: "https://github.com/FijacksProp/tanit-cuisine",
    image: "/projects/tanit-jollof.jpg",
  },
  {
    number: "06",
    title: "TenT Food Platform",
    year: "2024",
    type: "Django food platform",
    description:
      "A Django application covering menu content, blog publishing, and food-business presentation.",
    href: "https://github.com/FijacksProp/TenT",
    image: null,
  },
  {
    number: "07",
    title: "Tele Help Desk",
    year: "2025",
    type: "Service support system",
    description:
      "A Django-based help-desk project exploring structured service and support workflows.",
    href: "https://github.com/FijacksProp/tele_help_desk",
    image: null,
  },
] as const;

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
