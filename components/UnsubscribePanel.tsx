"use client";

import { useState } from "react";

// Withdraws marketing consent using the signed ?token= from an email link.
export function UnsubscribePanel() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function unsubscribe() {
    const token = new URLSearchParams(location.search).get("token");
    if (!token) {
      setStatus("This link is missing its code. Use the link from your most recent email.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/subscriber/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ token }),
      });
      if (res.status === 400) {
        setStatus("This link is not valid. Use the link from your most recent email.");
        return;
      }
      if (!res.ok) throw new Error("withdraw failed");
      setDone(true);
      setStatus("You're unsubscribed. We won't send you marketing email.");
    } catch {
      setStatus("We could not update your preferences. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="unsubscribe-panel" aria-labelledby="unsubscribe-heading">
      <h2 id="unsubscribe-heading">Stop Pop &amp; Ladle emails</h2>
      <p>You&apos;ll stop getting recipes and launch news from us. You can sign up again anytime.</p>
      {!done && (
        <button type="button" className="save" disabled={busy} onClick={unsubscribe}>
          UNSUBSCRIBE
        </button>
      )}
      <p className="pref-status" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
