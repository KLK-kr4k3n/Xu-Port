import { notFound } from "next/navigation";
import { ModuleRenderer } from "@/components/ModuleRenderer";
import { Sidebar } from "@/components/Sidebar";
import { getCvMeta, getProjectBySlug, getProjectContent, getProjects, normalizeLocale } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = getProjects();
  return ["zh", "en"].flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const cv = getCvMeta();
  const projects = getProjects();
  const project = getProjectBySlug(slug);
  const content = getProjectContent(slug, locale);

  if (!project || !content) notFound();

  return (
    <div className={`shell projectDetailShell locale-${locale}`}>
      <Sidebar cv={cv} locale={locale} projects={projects} activeSection="projects" activeSlug={slug} />
      <main className="main">
        <section className="section">
          <div className="projectHeader">
            <h1 className="pageTitle">{project.title[locale]}</h1>
            {project.award ? <p className="projectAward">{project.award[locale]}</p> : null}
          </div>
          {project.subtitle[locale] ? <p className="subtitle">{project.subtitle[locale]}</p> : null}
          <ModuleRenderer modules={content.modules} />
        </section>
      </main>
    </div>
  );
}
