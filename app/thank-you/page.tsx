import "@/styles/thank-you-v23.css";

import type { Metadata } from "next";
import { Year } from "@/components/Year";
import { socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "One more step | Pop & Ladle",
  description: "Thank you for joining Pop & Ladle. Please confirm your email subscription.",
  robots: { index: false, follow: true },
};

const socialLabels = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", pinterest: "Pinterest", youtube: "YouTube" };

// V25 thank-you page: where signup lands, asking the visitor to confirm by
// email. Deliberately no site navigation, forms or PDF download. It has its own
// stylesheet rather than WelcomeShell, whose V22 CSS shares these class names.
export default function ThankYouPage() {
  const liveSocial = (Object.keys(socialLinks) as (keyof typeof socialLinks)[]).filter((key) =>
    /^https:\/\//.test(socialLinks[key]),
  );

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <main className="welcome" id="main">
        <div className="scene" role="presentation">
          <div className="scene-image"></div>
          <div className="scene-wash"></div>
        </div>
        <div className="welcome-inner">
          <a aria-label="Pop & Ladle home" className="brand" href="/">
            <img alt="Pop & Ladle" src="/assets/pop-ladle-logo.svg" />
          </a>
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            THANK YOU FOR JOINING
            <span className="eyebrow-line"></span>
          </div>
          <h1>You’re almost at<br />the table.</h1>
          <p className="intro">Thank you for joining Pop &amp; Ladle. We’re glad you’re here. There’s just one more step to complete your subscription.</p>
          <section aria-labelledby="next-title" className="next-step">
            <div aria-hidden="true" className="mail-emblem">
              <svg fill="none" height="42" viewBox="0 0 48 48" width="42">
                <rect height="25" rx="5" stroke="currentColor" strokeWidth="2" width="36" x="6" y="12"></rect>
                <path d="m8 16 16 12 16-12" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <p className="step-label">CHECK YOUR INBOX</p>
            <h2 id="next-title">We’ve sent you an email.</h2>
            <p>Open the confirmation email from Pop &amp; Ladle and select <strong>Confirm My Subscription</strong>.</p>
            <p>After you confirm, we’ll send your personal welcome along with a complimentary copy of <em>Everyday Caring in the Kitchen</em>, our 15-page guide to food, hydration, and everyday kitchen routines.</p>
            <div className="mail-help">
              <h3>Having trouble finding our email?</h3>
              <p>Please check your junk mail or spam folder. If you use Outlook, our email may appear in your <strong>Other</strong> inbox rather than your <strong>Focused</strong> tab.</p>
              <p>You can add our sending address to your contacts to help future messages arrive where you expect them.</p>
            </div>
          </section>
          <div className="social">
            <p>WHILE WE GET THE KITCHEN READY</p>
            <h2>Stay close to the kitchen.</h2>
            <div className="social-links">
              {liveSocial.map((key) => (
                <a key={key} href={socialLinks[key]} target="_blank" rel="noopener noreferrer">
                  {socialLabels[key]}
                </a>
              ))}
              {liveSocial.length === 0 && (
                <span id="social-pending">Our social channels are coming soon. We’ll share them as they’re ready.</span>
              )}
            </div>
          </div>
          <footer className="legal">
            <p>Good food, simple ideas, and everyday support made for real life.</p>
            <p className="guide-notice"><em>Everyday Caring in the Kitchen</em> provides general educational information rather than medical advice. Follow the guidance of your healthcare team.</p>
            <nav aria-label="Footer">
              <a href="/">Home</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy Notice</a>
            </nav>
            <small>© <Year id="year" /> Pop &amp; Ladle. All rights reserved.</small>
          </footer>
        </div>
      </main>
    </>
  );
}
