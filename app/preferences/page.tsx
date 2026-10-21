import type { Metadata } from "next";
import { PreferenceQuestion } from "@/components/PreferenceQuestion";
import { UnsubscribePanel } from "@/components/UnsubscribePanel";
import { WelcomeShell } from "@/components/WelcomeShell";
// After WelcomeShell so these rules load after the V22 stylesheet.
import "@/styles/welcome-extra.css";

export const metadata: Metadata = {
  title: "Email preferences | Pop & Ladle",
  robots: { index: false, follow: false },
};

// Linked from marketing email as /preferences?token=… (signed, per subscriber).
export default function PreferencesPage() {
  return (
    <WelcomeShell eyebrow="EMAIL PREFERENCES">
      <h1>Your email,<br /><em>your call.</em></h1>
      <p className="intro">Tell us what would help most in your kitchen, or stop hearing from us.</p>
      <PreferenceQuestion mode="preferences" />
      <UnsubscribePanel />
    </WelcomeShell>
  );
}
