import "@/styles/pages/home.css";

import type { Metadata } from "next";
import { ArrowIcon } from "@/components/ArrowIcon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Pop & Ladle | Made for the people who care",
  description:
    "Pop & Ladle is being built to make food, hydration, and everyday meal decisions easier for caregivers and the people they love. Join the early-access list.",
  openGraph: {
    title: "Pop & Ladle | Made for the people who care",
    description: "A little more help for every meal, every sip, and every day.",
    images: ["/assets/hero-care.jpg"],
  },
};

const faqs = [
  {
    q: "What is Pop & Ladle?",
    a: "Pop & Ladle is being built to help people make everyday decisions about meals, drinks, and food routines for themselves or someone in their care. We will share more as the product gets closer to launch.",
  },
  {
    q: "Who is Pop & Ladle for?",
    a: "We are starting with family caregivers and the people they support. Our long-term vision includes professional caregivers, dietitians, physicians, and care organizations.",
  },
  {
    q: "When will Pop & Ladle launch?",
    a: "We are preparing for launch and will share timing as plans are confirmed. Early-access subscribers will hear about important updates first.",
  },
  {
    q: "What will I receive if I sign up?",
    a: "You will receive product launch updates and occasional practical food, meal, and hydration ideas. You can unsubscribe using the link in any marketing email.",
  },
  {
    q: "Will joining the list cost anything?",
    a: "Joining the early-access email list is free. Details about future product access and pricing will be shared as they become available.",
  },
  {
    q: "Will Pop & Ladle provide medical advice?",
    a: "Pop & Ladle supports food and household routines and does not replace medical care. Individual nutrition and medical decisions belong with the appropriate licensed care professional.",
  },
  {
    q: "How will you use my information?",
    a: "We use the information you submit to manage your request and, with your permission, send email updates. Our Privacy Notice describes the planned analytics and advertising tools, privacy choices, and how to contact us.",
  },
];

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader variant="home" />
      <main id="main">
        <section aria-labelledby="hero-title" className="hero">
          <div aria-label="Care team and family meeting around a kitchen table" className="hero-photo" role="img"></div>
          <div className="hero-content">
            <p className="eyebrow">Built by Caregivers for Caregivers</p>
            <h1 id="hero-title">
              <span className="hero-line">You carry their care.</span>
              <span className="hero-line"><em>We&apos;ll carry the kitchen.</em></span>
            </h1>
            <p>What to cook, what to pour, and how to make everyday meals work for the people in your care.</p>
            <p className="hero-sub">Pop &amp; Ladle is bringing a little more help to the table.</p>
            <a className="button button-dark" href="#join">GET EARLY ACCESS <ArrowIcon /></a>
            <div className="launch-note">Something good is cooking. Coming soon.</div>
          </div>
        </section>

        <section className="statement wrap" id="about">
          <div className="statement-grid">
            <h2>Some days, three bites and a glass of water feel like a win.</h2>
            <div className="statement-copy">
              <p>Meals can change from one day to the next. We are building practical support for the people planning food, preparing drinks, and helping someone through their daily routine.</p>
              <p><strong>Good food, simple ideas, and everyday support made for real life.</strong></p>
            </div>
          </div>
        </section>

        <section className="feature-section" id="how">
          <div className="wrap">
            <div className="section-heading">
              <div><h2>Help for the everyday kitchen.</h2></div>
              <p>From the first glass of water and a balanced breakfast to the last meal of the day, Pop &amp; Ladle is built around the food and routines people manage at home.</p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-image"><img alt="Golden egg bites with vegetables on a ceramic plate" loading="eager" src="/assets/egg-bites.jpg" /></div>
                <div className="feature-text">
                  <h3><span className="feature-title-line">Meals that fit</span><span className="feature-title-line">the way you care.</span></h3>
                  <p>Familiar recipes and practical ideas for changing appetites and preferences.</p>
                </div>
              </article>
              <article className="feature-card">
                <div className="feature-image"><img alt="Refreshing cucumber, lemon and mint drinks" loading="eager" src="/assets/hydration.jpg" /></div>
                <div className="feature-text">
                  <h3><span className="feature-title-line">More ways to make</span><span className="feature-title-line">every sip count.</span></h3>
                  <p>Drinks and food ideas that make everyday hydration easier to plan.</p>
                </div>
              </article>
              <article className="feature-card">
                <div className="feature-image"><img alt="Chicken pita sandwiches with fresh vegetables" loading="eager" src="/assets/chicken-pita.jpg" /></div>
                <div className="feature-text">
                  <h3>Helpful food ideas for busy days.</h3>
                  <p>Simple preparation ideas for the people cooking and caring each day.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="story-title" className="story" id="story">
          <div className="story-photo"><img alt="Daughter sharing a home-cooked meal with her mother" loading="eager" src="/assets/care-together.jpg" /></div>
          <div className="story-content">
            <h2 id="story-title">Built from our own family table.</h2>
            <p>Pop &amp; Ladle began with the everyday work of preparing meals and helping the people we love eat and drink well as their needs changed.</p>
            <p>We are building practical food and household support from the experience of caring for our own family.</p>
            <a className="text-link" href="#join">Get early access</a>
          </div>
        </section>

        <section aria-labelledby="food-title" className="food-section wrap">
          <div className="food-head">
            <h2 id="food-title">Good food, simple ideas, and everyday support made for real life.</h2>
            <p>A look at the meals and drinks that inspire Pop &amp; Ladle.</p>
          </div>
          <div className="food-gallery">
            <figure className="gallery-large"><img alt="Roasted salmon with potatoes and greens" loading="eager" src="/assets/salmon.jpg" /></figure>
            <figure><img alt="Blueberry and oat breakfast jar" loading="eager" src="/assets/breakfast-jar.jpg" /></figure>
            <figure><img alt="Colorful shrimp and quinoa bowl" loading="eager" src="/assets/shrimp-bowl.jpg" /></figure>
          </div>
        </section>

        <section className="faq wrap" id="questions">
          <div className="faq-title">
            <h2>Frequently asked questions</h2>
            <p>More details will follow as we get closer to launch.</p>
          </div>
          <div className="faq-list">
            {/* A shared name keeps only one answer open at a time. */}
            {faqs.map((f) => (
              <details className="faq-item" name="faq" key={f.q}>
                <summary>{f.q}<span aria-hidden="true" className="chev"></span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
