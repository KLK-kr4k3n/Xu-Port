import { ProjectsView } from "@/components/ProjectsView";
import { getCvMeta, getProjects, normalizeLocale } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const cv = getCvMeta();
  const projects = getProjects();

  return <ProjectsView cv={cv} locale={locale} projects={projects} />;
}
