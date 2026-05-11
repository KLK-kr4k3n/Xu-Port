import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://minghengxu.com"),
  title: "MH—Xu",
  description: "Mingheng Xu portfolio archive.",
  icons: {
    icon: "/thumbnail.svg",
    shortcut: "/thumbnail.svg"
  },
  openGraph: {
    title: "MH—Xu",
    description: "Mingheng Xu portfolio archive.",
    images: [
      {
        url: "/thumbnail.svg",
        width: 1200,
        height: 630,
        alt: "MH—Xu"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MH—Xu",
    description: "Mingheng Xu portfolio archive.",
    images: ["/thumbnail.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
