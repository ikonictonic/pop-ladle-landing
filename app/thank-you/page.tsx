import type { Metadata } from "next";
import { PreferenceQuestion } from "@/components/PreferenceQuestion";
import { WelcomeShell } from "@/components/WelcomeShell";
import { socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "You're at the table | Pop & Ladle",
  description: "Thanks for joining Pop & Ladle. Here is a little something from our kitchen to yours.",
  robots: { index: false, follow: true },
};

const socialLabels = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", pinterest: "Pinterest", youtube: "YouTube" };

// V22 thank-you page. Deliberately no site navigation or signup form.
export default function ThankYouPage() {
  const liveSocial = (Object.keys(socialLinks) as (keyof typeof socialLinks)[]).filter((key) =>
    /^https:\/\//.test(socialLinks[key]),
  );

  return (
    <WelcomeShell eyebrow="WELCOME TO THE TABLE">
      <h1>
        You&apos;re on the list.<br /><em>Pull up a chair.</em>
      </h1>
      <p className="intro">
        We&apos;re glad you&apos;re here. While we&apos;re getting everything ready, here&apos;s a little something from our kitchen to yours.
      </p>
      <div className="confirm-note">
        <span className="note-icon" aria-hidden="true">✉</span>
        <span>
          <strong>One small thing before we begin.</strong> Check your inbox to confirm your email address so we can keep in touch.
        </span>
      </div>
      <section className="gift" aria-labelledby="gift-heading">
        <div className="gift-icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="60" height="60" fill="none">
            <rect x="14" y="8" width="37" height="47" rx="4" fill="#FCF7F0" stroke="#7A5A45" strokeWidth="2.2" />
            <path d="M22 21h22M22 28h18M22 35h22M22 42h15" stroke="#E46A4F" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M43 47l5 5 10-11" stroke="#D34120" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="gift-kicker">A LITTLE GIFT FOR YOUR KITCHEN</p>
        <h2 id="gift-heading">The Everyday Kitchen Planner</h2>
        <p>Four printable pages for meals, drinks, favorites, and the week ahead. Made to be useful today.</p>
        <a className="download" href="/Everyday-Kitchen-Planner.pdf" download>
          DOWNLOAD YOUR FREE PLANNER{" "}
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v13m-5-5 5 5 5-5M5 18v3h14v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>
      <PreferenceQuestion mode="thank-you" />
      <div className="social">
        <p>GOOD THINGS ARE COOKING</p>
        <h2>Stay close to the kitchen.</h2>
        <div className="social-links">
          {liveSocial.map((key) => (
            <a key={key} href={socialLinks[key]} target="_blank" rel="noopener noreferrer">
              {socialLabels[key]}
            </a>
          ))}
          {liveSocial.length === 0 && (
            <span id="social-pending">Our social channels are coming soon. You&apos;ll hear from us first.</span>
          )}
        </div>
      </div>
    </WelcomeShell>
  );
}
