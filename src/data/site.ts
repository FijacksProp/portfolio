export const siteConfig = {
  name: "Joshua Olugbemi",
  shortName: "Joshua",
  role: "Full-stack software engineer",
  location: "Nigeria",
  email: "fijacksprop@gmail.com",
  description:
    "Full-stack software engineer designing and delivering web platforms, APIs, mobile experiences, data systems, and production-ready products.",
  statement:
    "I build dependable software across product interfaces, backend services, data, mobile workflows, and delivery.",
  resumeUrl: "/joshua-olugbemi-resume.pdf",
  socials: {
    github: "https://github.com/FijacksProp",
    linkedin: "https://www.linkedin.com/in/joshua-olugbemi-624760281",
    x: "https://x.com/fijacksprop",
  },
} as const;

const normalizeSiteUrl = (value: string) => {
  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return url.replace(/\/+$/, "");
};

export const getSiteUrl = () =>
  normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.VERCEL_URL ??
      "http://localhost:3000",
  );

export const navigation = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const capabilities = [
  {
    discipline: "Product interfaces",
    detail: "Responsive product surfaces with clear interaction, content structure, and maintainable components.",
    tools: "React · TypeScript · Next.js · Tailwind CSS",
  },
  {
    discipline: "Backend systems",
    detail: "APIs, authentication, business rules, and service architecture that hold up beyond the interface.",
    tools: "Python · Django · DRF · FastAPI",
  },
  {
    discipline: "Data + integration",
    detail: "Relational models, persistence, reporting, and integrations across product boundaries.",
    tools: "PostgreSQL · SQLite · MySQL · REST APIs",
  },
  {
    discipline: "Delivery",
    detail: "Practical ownership from repository and testing through deployment and production readiness.",
    tools: "Vercel · Render · Netlify · GitHub",
  },
  {
    discipline: "Device-aware software",
    detail: "Software that connects physical devices and proximity signals to verifiable product workflows.",
    tools: "BLE · Acoustic beaconing · Kotlin · Flutter",
  },
] as const;

export const timeline = [
  {
    year: "2021—Now",
    title: "Independent full-stack software engineer",
    description:
      "Building client websites, web applications, dashboards, product prototypes, APIs, and deployment workflows.",
  },
  {
    year: "2022—2026",
    title: "B.Sc. Telecommunication Science",
    description:
      "University of Ilorin. Final-year work explores attendance verification through BLE and acoustic proximity signals.",
  },
  {
    year: "2024—Now",
    title: "Web development instructor",
    description:
      "Teaching practical frontend and backend development; invited as a guest web design instructor for Tech Summit in November 2024.",
  },
] as const;
