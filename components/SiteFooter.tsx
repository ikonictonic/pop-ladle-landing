import { CookiePreferencesButton } from "./ConsentManager";
import { SignupForm } from "./SignupForm";
import { Year } from "./Year";

// V17–V19 footer with the early-access signup (#join).
export function SiteFooter() {
  return (
    <footer aria-label="Pop & Ladle footer" className="pl-end">
      <div aria-hidden="true" className="pl-end-art pl-end-art-left"></div>
      <div aria-hidden="true" className="pl-end-art pl-end-art-right"></div>
      <div className="pl-end-container">
        <div className="pl-end-main">
          <div className="pl-end-brand">
            <a aria-label="Pop and Ladle home" href="/">
              <img alt="Pop & Ladle" className="pl-end-logo" src="/assets/pop-ladle-logo.svg" />
            </a>
            <p>Good food, simple ideas, and everyday support made for real life.</p>
          </div>
          <section aria-labelledby="pl-end-join-title" className="pl-end-join" id="join">
            <p className="pl-end-eyebrow">GET EARLY ACCESS</p>
            <h2 id="pl-end-join-title">Be the first to meet Pop &amp; Ladle.</h2>
            <p className="pl-end-join-description">We&apos;ll share launch news, helpful food ideas, tips, and recommendations.</p>
            <SignupForm />
          </section>
        </div>
        <nav aria-label="Footer navigation" className="pl-end-links">
          <a href="/#about">About Us</a>
          <a href="/#how">What We&apos;re Making</a>
          <a href="/#story">Our Story</a>
          <a href="/#questions">FAQs</a>
          <a href="/privacy">Privacy Notice</a>
          <a href="/contact">Contact</a>
          <CookiePreferencesButton />
        </nav>
        <div aria-label="Social channels" className="pl-end-social">
          <span aria-label="Instagram, coming soon">◎</span>
          <span aria-label="LinkedIn, coming soon">in</span>
          <span aria-label="Pinterest, coming soon">p</span>
        </div>
        <p className="pl-end-legal">
          © <Year data-year="" /> Pop &amp; Ladle. Pop &amp; Ladle supports food and household routines and does not replace medical care.
        </p>
      </div>
    </footer>
  );
}
