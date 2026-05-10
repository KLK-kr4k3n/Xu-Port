"use client";

import { useMemo, useState } from "react";

type VideoSource = {
  label: string;
  src: string;
};

type VideoPlayerProps = {
  src: string;
  sources?: VideoSource[];
  title?: string;
  caption?: string;
};

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

export function VideoPlayer({ src, sources, title, caption }: VideoPlayerProps) {
  const videoSources = useMemo(() => sources?.length ? sources : [{ label: "Video", src }], [sources, src]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSource = videoSources[activeIndex] ?? videoSources[0];
  const embedUrl = toEmbedUrl(activeSource.src);
  const switcher =
    videoSources.length > 1 ? (
      <div className="videoSourceSwitch" aria-label="Video source">
        {videoSources.map((source, index) => (
          <button
            aria-label={source.label}
            className={index === activeIndex ? "videoSourceButton active" : "videoSourceButton"}
            key={`${source.label}-${source.src}`}
            onClick={() => setActiveIndex(index)}
            title={source.label}
            type="button"
          />
        ))}
      </div>
    ) : null;

  return (
    <>
      {embedUrl ? (
        <div className="videoFrame">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="videoEmbed"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={embedUrl}
            title={title || caption || activeSource.label || "Project video"}
          />
        </div>
      ) : isExternalUrl(activeSource.src) ? (
        <a className="videoLink" href={activeSource.src} rel="noreferrer" target="_blank">
          {caption || title || activeSource.label || activeSource.src}
        </a>
      ) : (
        <video className="mediaAsset" controls src={activeSource.src} />
      )}
      {switcher}
    </>
  );
}
