import type { Metadata, Viewport } from "next";

// Each page imports its own stylesheets (the V20/V22 CSS files share class names),
// and internal links are plain <a> tags so every navigation is a full page load
// that only carries that page's CSS.

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  icons: { icon: { url: "/assets/logo-mark.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = {
  themeColor: "#FCF7F0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
