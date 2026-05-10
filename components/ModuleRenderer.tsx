import type { ContentModule } from "@/types/content";
import { VideoPlayer } from "@/components/VideoPlayer";

export function ModuleRenderer({ modules }: { modules: ContentModule[] }) {
  return (
    <>
      {modules.map((module, index) => {
        if (module.type === "image" || module.type === "diagram" || module.type === "video") {
          if (module.type === "video") {
            return (
              <section className="module" key={`${module.type}-${index}`}>
                {module.title ? <h2>{module.title}</h2> : null}
                <VideoPlayer caption={module.caption} sources={module.sources} src={module.src} title={module.title} />
                {module.caption ? <p className="caption">{module.caption}</p> : null}
              </section>
            );
          }

          return (
            <section className="module" key={`${module.type}-${index}`}>
              {module.title ? <h2>{module.title}</h2> : null}
              <img className="mediaAsset" src={module.src} alt={module.caption || module.title || ""} />
              {module.caption ? <p className="caption">{module.caption}</p> : null}
            </section>
          );
        }

        if (module.type === "imageRow" || module.type === "imageGrid") {
          return (
            <section className="module" key={`${module.type}-${index}`}>
              {module.title ? <h2>{module.title}</h2> : null}
              <div className={module.type === "imageGrid" ? "mediaGrid" : "mediaRow"}>
                {module.images.map((src) => (
                  <img className="mediaAsset" src={src} alt={module.caption || module.title || ""} key={src} />
                ))}
              </div>
              {module.caption ? <p className="caption">{module.caption}</p> : null}
            </section>
          );
        }

        if (module.type === "table") {
          return (
            <section className="module" key={`${module.type}-${index}`}>
              {module.title ? <h2>{module.title}</h2> : null}
              <p>{module.rows.map((row) => row.join(" / ")).join("\n")}</p>
            </section>
          );
        }

        if (
          module.type === "intro" ||
          module.type === "text" ||
          module.type === "quote" ||
          module.type === "reflection"
        ) {
          return (
            <section className="module" key={`${module.type}-${index}`}>
              {module.title ? <h2>{module.title}</h2> : null}
              <p>{module.body}</p>
            </section>
          );
        }

        return null;
      })}
    </>
  );
}
