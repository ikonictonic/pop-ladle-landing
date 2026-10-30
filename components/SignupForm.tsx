"use client";

import { useState } from "react";
import { consentCopy } from "@/lib/site";
import { ArrowSvg } from "./ArrowIcon";

const NOT_CONNECTED = "The signup service is being connected. Please check back soon.";
const FAILED = "Your request could not be sent right now. Please try again shortly.";

// Footer early-access form. Success goes to the thank-you page, which asks the
// visitor to confirm by email.
export function SignupForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("");
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    setBusy(true);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          email: data.get("email"),
          marketingConsent: data.get("marketing-consent") === "on",
          consentVersion: consentCopy.version,
          sourcePage: location.pathname,
          company: data.get("company"),
        }),
      });
      if (res.status === 503 || res.status === 404) {
        setStatus(NOT_CONNECTED);
        return;
      }
      if (!res.ok) throw new Error("request");
      // A full page load, not router.push: the home stylesheets must not follow.
      location.assign(new URL("/thank-you", location.href).href);
    } catch {
      setStatus(FAILED);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form id="signup-form" noValidate onSubmit={onSubmit}>
      <label className="pl-sr" htmlFor="email">Your email address</label>
      <div className="pl-end-field">
        <input autoComplete="email" id="email" inputMode="email" maxLength={254} name="email" placeholder="you@example.com" required type="email" />
        <button type="submit" disabled={busy}>
          Get Early Access <ArrowSvg aria-hidden="true" />
        </button>
      </div>
      <label className="pl-end-consent">
        <input id="marketing-consent" name="marketing-consent" required type="checkbox" />
        <span>
          {consentCopy.lead}
          <a href="/privacy">{consentCopy.link}</a>
          {consentCopy.tail}
        </span>
      </label>
      {/* Left empty by people; bots that fill it are dropped server-side. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company
          <input autoComplete="off" name="company" tabIndex={-1} type="text" />
        </label>
      </div>
      <div aria-live="polite" className="form-status" id="signup-status" role="status">
        {status}
      </div>
    </form>
  );
}
