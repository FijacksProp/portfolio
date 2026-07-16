import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Joshua Olugbemi — Portfolio",
    short_name: "Joshua Olugbemi",
    description: "Full-stack software engineer building dependable products across interfaces, backend services, data, mobile workflows, and delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F1EA",
    theme_color: "#F4F1EA",
    icons: [{ src: "/fp-mark.png", sizes: "240x180", type: "image/png" }],
  };
}
