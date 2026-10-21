import "@/styles/pages/contact.css";

import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact | Pop & Ladle",
  description: "Reach the Pop & Ladle team.",
  openGraph: {
    title: "Contact | Pop & Ladle",
    description: "Reach the Pop & Ladle team.",
    images: ["/assets/hero-care.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader variant="page" />
      <main className="contact-page" id="main">
        <div className="contact-shell wrap">
          <a aria-label="Back to the Pop and Ladle home page" className="back-link" href="/">‹ Back to home</a>
          <div className="contact-intro">
            <p className="eyebrow">GET IN TOUCH</p>
            <h1>We&apos;d love to hear from you.</h1>
            <p>Questions about Pop &amp; Ladle, early access, or working together? Send us a note. We&apos;re glad you&apos;re here.</p>
          </div>
          <div className="contact-columns">
            <section aria-labelledby="send-note" className="contact-form-panel">
              <h2 id="send-note">Send us a message.</h2>
              <p className="form-intro">Tell us a little about what brings you here, and we&apos;ll take it from there.</p>
              <ContactForm />
            </section>
            <aside className="contact-photo">
              <img alt="Family and caregivers sharing a conversation around the table" src="/assets/meal-together.jpg" />
              <div className="photo-note">
                <p>Some of the best ideas begin with a conversation around the table.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
