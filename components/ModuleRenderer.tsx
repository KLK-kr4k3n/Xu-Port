import type { ContentModule } from "@/types/content";

function toEmbedUrl(src: string): string | null {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) return src;

      const id =
        url.searchParams.get("v") ||
        (url.pathname.startsWith("/shorts/") ? url.pathname.split("/").filter(Boolean)[1] : null);

      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "bilibili.com" || host.endsWith(".bilibili.com")) {
      if (host === "player.bilibili.com") return src;

      const bvid = src.match(/BV[a-zA-Z0-9]+/)?.[0];
      return bvid ? `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0` : null;
    }
  } catch {
    return null;
  }

  return null;
}

function isExternalUrl(src: string) {
  return /^https?:\/\//.test(src);
}

export function ModuleRenderer({ modules }: { modules: ContentModule[] }) {
  return (
    <>
      {modules.map((module, index) => {
        if (module.type === "image" || module.type === "diagram" || module.type === "video") {
          if (module.type === "video") {
            const embedUrl = toEmbedUrl(module.src);

            return (
              <section className="module" key={`${module.type}-${index}`}>
                {module.title ? <h2>{module.title}</h2> : null}
                {embedUrl ? (
                  <div className="videoFrame">
                    <iframe
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="videoEmbed"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      src={embedUrl}
                      title={module.title || module.caption || "Project video"}
                    />
                  </div>
                ) : isExternalUrl(module.src) ? (
                  <a className="videoLink" href={module.src} rel="noreferrer" target="_blank">
                    {module.caption || module.title || module.src}
                  </a>
                ) : (
                  <video className="mediaAsset" controls src={module.src} />
                )}
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
