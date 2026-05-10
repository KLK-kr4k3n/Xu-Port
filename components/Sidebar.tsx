import Link from "next/link";
import type { CvMeta, Locale, ProjectMeta } from "@/types/content";

type SidebarProps = {
  cv: CvMeta;
  locale: Locale;
  projects: ProjectMeta[];
  activeSection?: "cv" | "projects";
  activeSlug?: string;
  hoverSlug?: string;
};

export function Sidebar({ cv, locale, projects, activeSection = "cv", activeSlug, hoverSlug }: SidebarProps) {
  const highlightedSlug = hoverSlug || activeSlug;
  const zhHref = activeSlug ? `/zh/projects/${activeSlug}` : activeSection === "projects" ? "/zh/projects" : "/zh";
  const enHref = activeSlug ? `/en/projects/${activeSlug}` : activeSection === "projects" ? "/en/projects" : "/en";

  return (
    <aside className="sidebar">
      <div className="identity">
        <h1>{cv.name}</h1>
      </div>

      <Link className={activeSection === "cv" ? "navButton active" : "navButton"} href={`/${locale}`}>
        <span>→</span>
        <span>CV</span>
      </Link>

      <br />

      <Link className={activeSection === "projects" ? "navButton active" : "navButton"} href={`/${locale}/projects`}>
        <span>↓</span>
        <span>Projects</span>
      </Link>

      <ul className={activeSection === "projects" ? "projectNav open" : "projectNav"}>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              className={project.slug === highlightedSlug ? "active" : undefined}
              href={`/${locale}/projects/${project.slug}`}
            >
              {project.title[locale]}
            </Link>
          </li>
        ))}
      </ul>

      <div className="langSwitch">
        <Link className={locale === "zh" ? "active" : undefined} href={zhHref}>
          中文
        </Link>
        <span>/</span>
        <Link className={locale === "en" ? "active" : undefined} href={enHref}>
          EN
        </Link>
      </div>
    </aside>
  );
}
