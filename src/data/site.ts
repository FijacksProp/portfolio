export const siteConfig = {
  name: "Joshua Olugbemi",
  shortName: "Joshua",
  role: "Full-stack software engineer",
  location: "Nigeria",
  email: "fijacksprop@gmail.com",
  description:
    "Full-stack software engineer building web products with Python, Django, React, TypeScript, and PostgreSQL—from API and data modelling to polished interfaces and deployment.",
  statement:
    "I build dependable full-stack products with Python, Django, React, and PostgreSQL—from backend rules to the interface people use.",
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
    discipline: "Python backend systems",
    detail: "Django services that turn product rules into secure APIs, workflows, authentication, and validation.",
    tools: "Python · Django · DRF · FastAPI",
  },
  {
    discipline: "Product interfaces",
    detail: "Responsive product surfaces with clear interaction, content structure, and maintainable components.",
    tools: "React · TypeScript · Next.js · Tailwind CSS",
  },
  {
    discipline: "Data",
    detail: "Relational models, persistence, reporting, and careful data boundaries.",
    tools: "PostgreSQL · SQLite · MySQL · Supabase",
  },
  {
    discipline: "Deployment",
    detail: "Practical delivery from repository to a production-ready public service.",
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
