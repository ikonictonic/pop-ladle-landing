"use client";

import { useState } from "react";
import { interests, type InterestCode } from "@/lib/site";

const NOT_CONNECTED = "Your selection is ready. Saving will be available when the subscriber service is connected.";

// The optional "What would make your kitchen a little easier?" module on the
// email preferences page, authorised by the signed ?token= from the email link.
// It asks about kitchen help only, never medical information.
export function PreferenceQuestion() {
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const choice = new FormData(e.currentTarget).get("primary_interest") as InterestCode | null;
    if (!choice) {
      setStatus("Choose one answer.");
      return;
    }

    const token = new URLSearchParams(location.search).get("token");
    if (!token) {
      setStatus(NOT_CONNECTED);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/subscriber/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ primary_interest: choice, manage_token: token }),
      });
      if (res.status === 503 || res.status === 404) {
        setStatus(NOT_CONNECTED);
        return;
      }
      if (!res.ok) throw new Error("save failed");
      setStatus("Thank you. We saved your preference.");
      setSaved(true);
    } catch {
      setStatus("We could not save your answer. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="little-question" aria-labelledby="question-heading">
      <button
        className="question-toggle"
        id="question-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="question-panel"
        onClick={() => setOpen(!open)}
      >
        <span>
          <small>YOUR INTERESTS</small>
          <strong id="question-heading">What would make your kitchen a little easier?</strong>
        </span>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="question-panel" id="question-panel" hidden={!open}>
        <p>Choose one thing you&apos;d most like help with. It&apos;s optional.</p>
        <form id="preference-form" onSubmit={onSubmit}>
          <fieldset disabled={saved}>
            <legend className="sr-only">What would make your kitchen easier?</legend>
            {interests.map((interest) => (
              <label key={interest.code}>
                <input type="radio" name="primary_interest" value={interest.code} />
                <span>{interest.label}</span>
              </label>
            ))}
          </fieldset>
          <div className="question-actions">
            <button type="submit" className="save" disabled={busy}>SAVE MY PREFERENCE</button>
          </div>
          <p className="pref-status" id="preference-status" role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
