import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const ROOT = process.cwd();

const MIME_TYPES: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

export async function GET(_request: Request, { params }: { params: Promise<{ unit: string; asset: string[] }> }) {
  const { unit, asset } = await params;

  if (!/^\d{2}$/.test(unit) || asset.length === 0) {
    return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
  }

  const rootName = asset[0];
  const projectRoot = path.join(ROOT, unit);
  const allowedRoot = rootName === "content_slots" ? path.join(projectRoot, "content_slots") : path.join(projectRoot, "media");
  const filePath =
    rootName === "content_slots" ? path.join(allowedRoot, ...asset.slice(1)) : path.join(allowedRoot, ...asset);
  const relative = path.relative(allowedRoot, filePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
  }

  try {
    const file = await fs.readFile(filePath);
    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    return new Response(new Uint8Array(file), {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentType
      }
    });
  } catch {
    return NextResponse.json({ error: "Media not found." }, { status: 404 });
  }
}
