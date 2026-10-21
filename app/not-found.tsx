import { WelcomeShell } from "@/components/WelcomeShell";

export default function NotFound() {
  return (
    <WelcomeShell eyebrow="PAGE NOT FOUND">
      <h1>We couldn&apos;t find<br /><em>that page.</em></h1>
      <p className="intro">The link may be old or mistyped.</p>
      <a className="download" href="/">BACK TO HOME</a>
    </WelcomeShell>
  );
}
