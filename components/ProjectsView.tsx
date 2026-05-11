"use client";

import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import type { CvMeta, Locale, ProjectMeta } from "@/types/content";

type ProjectsViewProps = {
  cv: CvMeta;
  locale: Locale;
  projects: ProjectMeta[];
};

export function ProjectsView({ cv, locale, projects }: ProjectsViewProps) {
  const [hoverSlug, setHoverSlug] = useState<string | undefined>();

  return (
    <div className="shell projectsShell">
      <Sidebar cv={cv} locale={locale} projects={projects} activeSection="projects" hoverSlug={hoverSlug} />
      <main className="main">
        <section className="section projectListSection">
          <h1 className="pageTitle">Projects</h1>
          <div className="projectPreviewList">
            {projects.map((project) => (
              <Link
                aria-label={project.title[locale]}
                className="projectPreview"
                href={`/${locale}/projects/${project.slug}`}
                key={project.slug}
                onBlur={() => setHoverSlug(undefined)}
                onFocus={() => setHoverSlug(project.slug)}
                onMouseEnter={() => setHoverSlug(project.slug)}
                onMouseLeave={() => setHoverSlug(undefined)}
              >
                <span className="projectPreviewTitle">{project.title[locale]}</span>
                {project.cover ? <img src={project.cover} alt="" /> : null}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
