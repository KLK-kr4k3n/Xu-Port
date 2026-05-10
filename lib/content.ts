import fs from "fs";
import path from "path";
import type { ContentFile, CvMeta, Locale, ProjectMeta } from "@/types/content";

const ROOT = process.cwd();
const LOCALES: Locale[] = ["zh", "en"];

function readJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function numberedContentDirs() {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{2}$/.test(entry.name))
    .map((entry) => path.join(ROOT, entry.name))
    .sort();
}

export function normalizeLocale(locale: string | undefined): Locale {
  return LOCALES.includes(locale as Locale) ? (locale as Locale) : "zh";
}

export function getCvMeta(): CvMeta {
  const cvDir = path.join(ROOT, "00");
  const meta = readJson<CvMeta>(path.join(cvDir, "meta.json"));

  if (!meta) {
    return {
      slug: "cv",
      type: "cv",
      name: "Mingheng Xu",
      role: {
        zh: "Augment Soma Designer",
        en: "Augment Soma Designer"
      },
      order: 0
    };
  }

  return meta;
}

export function getCvContent(locale: Locale): ContentFile {
  const cvDir = path.join(ROOT, "00");
  const localized = readJson<ContentFile>(path.join(cvDir, `content.${locale}.json`));
  const fallback = readJson<ContentFile>(path.join(cvDir, "content.zh.json"));

  return localized ?? fallback ?? { modules: [] };
}

export function getProjects(): ProjectMeta[] {
  return numberedContentDirs()
    .filter((dir) => path.basename(dir) !== "00")
    .map((dir) => readJson<ProjectMeta>(path.join(dir, "meta.json")))
    .filter((meta): meta is ProjectMeta => Boolean(meta))
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return getProjects().find((project) => project.slug === slug) ?? null;
}

export function getProjectContent(slug: string, locale: Locale): ContentFile | null {
  const projectDir = numberedContentDirs().find((dir) => {
    const meta = readJson<ProjectMeta>(path.join(dir, "meta.json"));
    return meta?.slug === slug;
  });

  if (!projectDir) return null;

  const localized = readJson<ContentFile>(path.join(projectDir, `content.${locale}.json`));
  const fallback = readJson<ContentFile>(path.join(projectDir, "content.zh.json"));

  return localized ?? fallback;
}
