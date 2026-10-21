"use client";

import { useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

const TOPICS = [
  "Early access and launch",
  "Product questions",
  "Caregiver feedback",
  "Professional or organizational partnership",
  "Press and media",
  "Privacy or personal data request",
  "Technical or website issue",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("");
    if (!form.reportValidity()) return;

    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      if (res.status === 503 || res.status === 404) {
        setStatus("The signup service is being connected. Please check back soon.");
        return;
      }
      if (!res.ok) throw new Error("request");
      setStatus("Your message has been received.");
      form.reset();
    } catch {
      setStatus("Your request could not be sent right now. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" id="contact-form" onSubmit={onSubmit}>
      <div className="field-pair">
        <label>
          Your name
          <input autoComplete="name" maxLength={120} name="name" placeholder="Your name" required />
        </label>
        <label>
          Email address
          <input autoComplete="email" maxLength={254} name="email" placeholder="you@example.com" required type="email" />
        </label>
      </div>
      <label>
        What can we help with?
        <select name="reason" required defaultValue="">
          <option disabled value="">Select a topic</option>
          {TOPICS.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>
      <label>
        Your message
        <textarea maxLength={4000} name="message" placeholder="What's on your mind?" required rows={5}></textarea>
      </label>
      <p className="form-help">Please keep medical records and sensitive health information out of this message.</p>
      {/* Left empty by people; bots that fill it are dropped server-side. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company
          <input autoComplete="off" name="company" tabIndex={-1} type="text" />
        </label>
      </div>
      <button className="button primary contact-submit" type="submit" disabled={busy}>
        SEND MESSAGE <ArrowIcon />
      </button>
      <p aria-live="polite" className="form-status" id="contact-status">
        {status}
      </p>
    </form>
  );
}
