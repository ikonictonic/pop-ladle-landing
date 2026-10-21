import "@/styles/pages/privacy.css";

import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Notice | Pop & Ladle",
  description: "How Pop & Ladle plans to collect, use, and protect personal information.",
  openGraph: {
    title: "Privacy Notice | Pop & Ladle",
    description: "How Pop & Ladle plans to collect, use, and protect personal information.",
    images: ["/assets/hero-care.jpg"],
  },
};

// Draft legal copy (October 20, 2026). Review with counsel before publication.
export default function PrivacyPage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader variant="page" ctaSvg={false} />
      <main className="subpage wrap privacy-page" id="main">
        <a className="back-link" href="/">‹ Back to home</a>
        <div className="subpage-heading"><p className="eyebrow">Your information</p><h1>Privacy Notice</h1><p>How we handle information when you visit, contact us, or join the early-access list.</p><p className="effective">Draft prepared October 20, 2026. Effective date to be set at publication.</p></div>
        <div className="notice-panel"><strong>Publication details requiring confirmation</strong><p>Company legal name, business mailing address, privacy contact, retention periods, vendor contracts and subprocessors, final tracker configuration, applicable California thresholds, EU representative where required, and the German Impressum must be confirmed before this notice goes live.</p></div>
        <div className="privacy-layout">
        <aside aria-label="Privacy notice topics" className="privacy-sidebar"><p>In this notice</p>
        <nav>
        <a href="#privacy-1">Who is responsible for your information</a>
        <a href="#privacy-2">Information we collect</a>
        <a href="#privacy-3">How we use personal information</a>
        <a href="#privacy-4">Our legal bases under GDPR</a>
        <a href="#privacy-5">Email subscriptions and Resend</a>
        <a href="#privacy-6">Google Analytics</a>
        <a href="#privacy-7">Meta and LinkedIn advertising pixels</a>
        <a href="#privacy-8">Cookies and your choices</a>
        <a href="#privacy-9">California privacy rights</a>
        <a href="#privacy-10">European and German privacy rights</a>
        <a href="#privacy-11">Email rules in the United States</a>
        <a href="#privacy-12">Recipients and international transfers</a>
        <a href="#privacy-13">Retention and security</a>
        <a href="#privacy-14">Children, health information, and links</a>
        <a href="#privacy-15">Changes to this notice</a>
        <a href="#privacy-16">How to reach us</a>
        </nav>
        </aside>
        <div className="privacy-content">
        <section id="privacy-1"><h2>Who is responsible for your information</h2><p>Pop &amp; Ladle is the organization responsible for personal information collected through this website. Before publication, the legal company name, business mailing address, privacy email address, and any required European representative or German legal notice details must be inserted in the controller information below.</p></section>
        <section id="privacy-2"><h2>Information we collect</h2><p>When you join our email list, we collect your email address, confirmation and consent details, timestamps, and the preferences you choose to share. When you contact us, we collect your name, email address, message, selected topic, and information you voluntarily provide. We also process basic technical information required to operate and secure this website, such as IP address, browser information, access times, and server logs. Optional analytics and advertising tools may collect browser and device identifiers, pages visited, referrals, and interactions after the applicable consent has been given.</p></section>
        <section id="privacy-3"><h2>How we use personal information</h2><p>We use information to provide the website, respond to requests, manage early-access subscriptions, send updates you request, maintain unsubscribe and suppression records, prevent abuse, protect website security, and comply with applicable legal obligations. When permitted, analytics helps us understand page activity, while advertising tools help measure outreach and assess campaign performance. We do not use contact-form messages as consent to receive promotional email.</p></section>
        <section id="privacy-4"><h2>Our legal bases under GDPR</h2><p>For visitors covered by GDPR, we rely on consent for optional analytics, advertising cookies, and early-access marketing emails; legitimate interests for proportionate website security and routine communications; steps taken at your request for relevant inquiries about potential services; and legal obligations when retention or disclosure is required by law. We identify a lawful basis for each additional processing activity before introducing it. You can withdraw consent prospectively at any time. Withdrawal leaves earlier lawful processing unaffected.</p></section>
        <section id="privacy-5"><h2>Email subscriptions and Resend</h2><p>We plan to use Resend to manage email subscriptions, confirmation messages, campaigns, and unsubscribe requests. Email-related information may include your address, consent status, subscription source, timestamp, delivery status, and interactions when measurement is enabled. We intend to use a confirmation email for a documented double opt-in process before activating promotional subscriptions. Every marketing email will provide a way to unsubscribe. We maintain a limited suppression record to respect opt-outs. Resend may act as a processor under an applicable data-processing agreement. Its actual hosting location, subprocessors, and data-transfer terms must be verified against the contracted service before launch.</p></section>
        <section id="privacy-6"><h2>Google Analytics</h2><p>With your permission where required, Google Analytics may process page views, interaction events, approximate location derived from IP address, device and browser information, and identifiers linked to analytics cookies. We use this information to evaluate website performance. Our implementation will use consent-aware controls and hold analytics loading until permission is granted. Google’s privacy terms and applicable international transfer safeguards govern its processing as a service provider.</p></section>
        <section id="privacy-7"><h2>Meta and LinkedIn advertising pixels</h2><p>With your permission where required, the Meta Pixel and LinkedIn Insight Tag may process events about visits and website interactions, along with cookies, identifiers, IP address, and device information. Meta and LinkedIn may combine data received through their services with information collected elsewhere according to their terms and privacy policies. Depending on actual configuration and applicable law, related disclosures or rights to opt out of selling or sharing for cross-context behavioral advertising may apply. These tags will remain inactive until the advertising category is accepted.</p></section>
        <section id="privacy-8"><h2>Cookies and your choices</h2><p>Strictly necessary technology supports core page operations and retains privacy choices. Optional analytics and advertising technology is separated into distinct consent categories. The cookie banner lets you accept optional categories, reject them, or choose them individually. You may reopen Cookie preferences from the footer to change your selection. We plan to block optional third-party tags before consent and apply Google Consent Mode v2 where Google tags are installed. Browser privacy settings and recognized legally required opt-out signals will be addressed in the production implementation.</p></section>
        <section id="privacy-9"><h2>California privacy rights</h2><p>California residents may have rights to know or access personal information, delete it, correct inaccuracies, receive information about data practices, limit certain uses of sensitive personal information, and opt out of the sale or sharing of personal information for cross-context behavioral advertising, subject to applicable thresholds and exceptions. We will provide methods to make requests and honor applicable requirements, including requests made by authorized agents. We will verify requests proportionately and apply required response timelines. We will also provide a Do Not Sell or Share My Personal Information mechanism if our actual data practices trigger that obligation. We will assess Global Privacy Control and other applicable opt-out preference signals before launching tracking.</p></section>
        <section id="privacy-10"><h2>European and German privacy rights</h2><p>Where GDPR applies, you may request access, rectification, erasure, restriction, portability where applicable, and object to processing based on legitimate interests or to direct marketing. You may withdraw consent at any time and complain to a competent data protection supervisory authority. For Germany, optional storage and access to information on your device is subject to Section 25 of the Telecommunications Digital Services Data Protection Act (TDDDG), together with applicable GDPR rules. Promotional email is also subject to Section 7 of the Act Against Unfair Competition (UWG), generally requiring prior express consent unless a statutory exception applies. We intend to use double opt-in and maintain records of the confirmation process. German site identification rules may require an Impressum with operator details on the published site.</p></section>
        <section id="privacy-11"><h2>Email rules in the United States</h2><p>We follow applicable CAN-SPAM requirements for commercial email, including accurate sender information, truthful subject lines, a valid physical mailing address, an unsubscribe method, and timely processing of opt-out requests. Our operational goal is to act on unsubscribes immediately. The law generally allows up to 10 business days for applicable opt-out requests.</p></section>
        <section id="privacy-12"><h2>Recipients and international transfers</h2><p>We may use hosting and technical support providers, Resend for email, Google for analytics, Meta and LinkedIn for advertising measurement, and professional advisers where appropriate. Where international transfers are regulated, we will assess adequacy decisions, applicable contractual safeguards, transfer assessments, and vendor terms. Actual providers, hosting regions, subprocessors, and safeguards must be confirmed against signed agreements before publication.</p></section>
        <section id="privacy-13"><h2>Retention and security</h2><p>We retain subscription records while you remain subscribed and keep minimal suppression and consent records as reasonably required to honor preferences or demonstrate compliance. Contact requests are retained only for operational needs or applicable legal requirements. Server security logs are kept for limited operational periods. Final retention schedules will be documented before launch. We use appropriate access controls, encryption in transit, restricted administrative access, backups, and proportionate technical and organizational measures.</p></section>
        <section id="privacy-14"><h2>Children, health information, and links</h2><p>This pre-launch site is intended for adults. We do not intentionally solicit information from children under 13. Please avoid submitting medical details or other sensitive personal information through our general contact form. Pop &amp; Ladle supports food and household routines and does not replace medical care. Links to third-party websites are governed by those websites’ privacy practices.</p></section>
        <section id="privacy-15"><h2>Changes to this notice</h2><p>We may revise this notice as features, vendors, and laws change. We will display a revised effective date and provide additional notice when required. Material changes to consent-based processing will be accompanied by a new choice when necessary.</p></section>
        <section id="privacy-16"><h2>How to reach us</h2><p>Use our Contact form and select “Privacy or personal data request.” A verified privacy contact address and legal mailing address will appear here before launch. You can also open Cookie preferences from the footer to manage optional tracking.</p></section>
        <section><h2>Additional provider information</h2><p>See the provider privacy terms for <a href="https://resend.com/legal/privacy-policy" rel="noopener noreferrer">Resend</a>, <a href="https://policies.google.com/privacy" rel="noopener noreferrer">Google</a>, <a href="https://www.facebook.com/privacy/policy/" rel="noopener noreferrer">Meta</a>, and <a href="https://www.linkedin.com/legal/privacy-policy" rel="noopener noreferrer">LinkedIn</a>. Applicable official laws and regulator guidance include <a href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business" rel="noopener noreferrer">CAN-SPAM</a>, <a href="https://cppa.ca.gov/" rel="noopener noreferrer">California Privacy Protection Agency</a>, <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" rel="noopener noreferrer">GDPR</a>, <a href="https://www.gesetze-im-internet.de/uwg_2004/__7.html" rel="noopener noreferrer">UWG § 7</a>, and <a href="https://www.gesetze-im-internet.de/ttdsg/__25.html" rel="noopener noreferrer">TDDDG § 25</a>.</p></section></div></div>
      </main>
      <SiteFooter />
    </>
  );
}
