import "@/styles/thank-you-v22.css";

import { Year } from "./Year";

// The V22 thank-you page frame, shared by thank-you, email confirmation,
// email preferences and 404. No site navigation or signup form by design.
export function WelcomeShell({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <main id="main" className="welcome">
        <div className="scene" role="presentation">
          <div className="scene-image"></div>
          <div className="scene-wash"></div>
        </div>
        <div className="welcome-inner">
          <a className="brand" href="/" aria-label="Pop & Ladle home">
            <img src="/assets/pop-ladle-logo.svg" alt="Pop & Ladle" />
          </a>
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            {eyebrow}
            <span className="eyebrow-line"></span>
          </div>
          {children}
          <footer className="legal">
            <p>Good food, simple ideas, and everyday support made for real life.</p>
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
