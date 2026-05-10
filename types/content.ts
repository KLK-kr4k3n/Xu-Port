export type Locale = "zh" | "en";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type CvMeta = {
  slug: "cv";
  type: "cv";
  name: string;
  role: LocalizedText;
  order: number;
};

export type ProjectMeta = {
  slug: string;
  type: "project";
  title: LocalizedText;
  subtitle: LocalizedText;
  category: LocalizedText;
  year: string;
  tools: string[];
  cover?: string;
  award?: LocalizedText;
  featured: boolean;
  order: number;
};

export type ContentModule =
  | {
      type: "intro" | "text" | "quote" | "reflection";
      title?: string;
      body: string;
    }
  | {
      type: "image" | "diagram" | "video";
      title?: string;
      src: string;
      sources?: {
        label: string;
        src: string;
      }[];
      caption?: string;
    }
  | {
      type: "imageRow" | "imageGrid";
      title?: string;
      images: string[];
      caption?: string;
    }
  | {
      type: "table";
      title?: string;
      rows: string[][];
    };

export type ContentFile = {
  modules: ContentModule[];
};
