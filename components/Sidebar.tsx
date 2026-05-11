"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CvMeta, Locale, ProjectMeta } from "@/types/content";

type SidebarProps = {
  cv: CvMeta;
  locale: Locale;
  projects: ProjectMeta[];
  activeSection?: "cv" | "projects";
  activeSlug?: string;
  hoverSlug?: string;
  isLanding?: boolean;
};

export function Sidebar({ cv, locale, projects, activeSection = "cv", activeSlug, hoverSlug, isLanding }: SidebarProps) {
  const router = useRouter();
  const highlightedSlug = hoverSlug || activeSlug;
  const zhHref = isLanding
    ? "/zh"
    : activeSlug
      ? `/zh/projects/${activeSlug}`
      : activeSection === "projects"
        ? "/zh/projects"
        : "/zh/cv";
  const enHref = isLanding
    ? "/en"
    : activeSlug
      ? `/en/projects/${activeSlug}`
      : activeSection === "projects"
        ? "/en/projects"
        : "/en/cv";

  function returnHomeOnSecondMobileClick(event: React.MouseEvent<HTMLAnchorElement>, section: "cv" | "projects") {
    if (isLanding || activeSection !== section) return;
    if (!window.matchMedia("(max-width: 820px)").matches) return;

    event.preventDefault();
    router.push(`/${locale}`);
  }

  return (
    <aside className="sidebar">
      <div className="identity">
        <h1>{cv.name}</h1>
      </div>

      <Link
        className={activeSection === "cv" ? "navButton active" : "navButton"}
        href={`/${locale}/cv`}
        onClick={(event) => returnHomeOnSecondMobileClick(event, "cv")}
      >
        <span>→</span>
        <span>CV</span>
      </Link>

      <br />

      <Link
        className={activeSection === "projects" ? "navButton active" : "navButton"}
        href={`/${locale}/projects`}
        onClick={(event) => returnHomeOnSecondMobileClick(event, "projects")}
      >
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
