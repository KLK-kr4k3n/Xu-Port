import { CvLayout } from "@/components/CvLayout";
import { Sidebar } from "@/components/Sidebar";
import { getCvContent, getCvMeta, getProjects, normalizeLocale } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default async function CvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const cv = getCvMeta();
  const cvContent = getCvContent(locale);
  const projects = getProjects();

  return (
    <div className="shell cvShell">
      <Sidebar cv={cv} locale={locale} projects={projects} activeSection="cv" />
      <main className="main">
        <CvLayout content={cvContent} />
      </main>
    </div>
  );
}
