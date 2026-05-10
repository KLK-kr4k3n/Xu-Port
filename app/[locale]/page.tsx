import { CvLayout } from "@/components/CvLayout";
import { Sidebar } from "@/components/Sidebar";
import { getCvContent, getCvMeta, getProjects, normalizeLocale } from "@/lib/content";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const cv = getCvMeta();
  const cvContent = getCvContent(locale);
  const projects = getProjects();

  return (
    <div className="shell">
      <Sidebar cv={cv} locale={locale} projects={projects} activeSection="cv" />
      <main className="main">
        <CvLayout content={cvContent} />
      </main>
    </div>
  );
}
