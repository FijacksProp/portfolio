import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <BrandMark linked={false} compact />
          <p>
            Joshua Olugbemi
            <br />
            Full-stack software engineer
          </p>
        </div>
        <div className="footer-cell">
          <span className="folio-label">Contact</span>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <span>Nigeria</span>
        </div>
        <div className="footer-cell">
          <span className="folio-label">Elsewhere</span>
          <a href={siteConfig.socials.github}>GitHub</a>
          <a href={siteConfig.socials.linkedin}>LinkedIn</a>
          <a href={siteConfig.socials.x}>X / Twitter</a>
        </div>
        <div className="footer-cell">
          <span className="folio-label">Document</span>
          <a href={siteConfig.resumeUrl} download>
            Résumé · PDF · 69 KB
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
