import type { Metadata } from "next";
import { WelcomeShell } from "@/components/WelcomeShell";

export const metadata: Metadata = {
  title: "This link has expired | Pop & Ladle",
  robots: { index: false, follow: false },
};

// Where the backend sends a dead guide link from the welcome email.
export default function GuideLinkExpiredPage() {
  return (
    <WelcomeShell eyebrow="EVERYDAY CARING IN THE KITCHEN">
      <h1>This link has<br /><em>expired.</em></h1>
      <p className="intro">Download links work for 48 hours. Send us a note and we&apos;ll get you a fresh copy.</p>
      <a className="download" href="/contact">CONTACT US</a>
    </WelcomeShell>
  );
}
