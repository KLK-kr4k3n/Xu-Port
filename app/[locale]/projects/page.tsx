import { ProjectsView } from "@/components/ProjectsView";
import { getCvMeta, getProjects, normalizeLocale } from "@/lib/content";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const cv = getCvMeta();
  const projects = getProjects();

  return <ProjectsView cv={cv} locale={locale} projects={projects} />;
}
