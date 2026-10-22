"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import "@/styles/access-gate.css";

// Private-preview password gate, the same one the old popladle.com used: the
// pop-ladle backend holds FRONTEND_GATE_PASSWORD and sets the session cookie, so
// one password covers every Pop & Ladle surface. Off unless
// NEXT_PUBLIC_ACCESS_GATE_ENABLED is "true". It hides the pages from visitors;
// the page source still carries their content.
const ENABLED = process.env.NEXT_PUBLIC_ACCESS_GATE_ENABLED === "true";

// The backend scopes its cookie to /api/v1, so the same-origin fallback keeps
// that path (next.config.ts rewrites it). Production points straight at the
// API, as the old site did: https://api.popladle.com/api/v1.
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1").replace(/\/+$/, "");

// Opened from email, by people who never had the password. Unsubscribe has to work.
const OPEN_PATHS = ["/confirm-email", "/preferences"];

// Every internal link is a full page load, so this tab remembers it was let in
// and shows the page while the backend re-checks, instead of a blank screen.
const HINT_KEY = "pl-access-gate";

type Phase = "checking" | "locked" | "authorized" | "error";
type GateStatus = { required: boolean; authorized: boolean };

const UNREACHABLE = "We could not verify access with the server. Please try again.";

async function gateRequest(path: "status" | "unlock", password?: string): Promise<GateStatus> {
  const res = await fetch(`${API_BASE}/access-gate/${path}`, {
    method: password === undefined ? "GET" : "POST",
    credentials: "include",
    headers: password === undefined ? undefined : { "Content-Type": "application/json" },
    body: password === undefined ? undefined : JSON.stringify({ password }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error?.code ?? "HTTP_ERROR");
  return data as GateStatus;
}

function remember(authorized: boolean) {
  try {
    if (authorized) sessionStorage.setItem(HINT_KEY, "1");
    else sessionStorage.removeItem(HINT_KEY);
  } catch {}
}

function readHint() {
  try {
    return sessionStorage.getItem(HINT_KEY) === "1";
  } catch {
    return false;
  }
}

function phaseFor(status: GateStatus): Phase {
  const authorized = status.authorized || !status.required;
  remember(authorized);
  return authorized ? "authorized" : "locked";
}

const noSubscribe = () => () => {};

export function AccessGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const open = !ENABLED || OPEN_PATHS.includes(pathname);
  const hinted = useSyncExternalStore(noSubscribe, readHint, () => false);
  const [phase, setPhase] = useState<Phase>("checking");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) return;
    let cancelled = false;
    gateRequest("status")
      .then((status) => {
        if (!cancelled) setPhase(phaseFor(status));
      })
      .catch(() => {
        if (cancelled) return;
        setMessage(UNREACHABLE);
        setPhase("error");
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  function retry() {
    setMessage("");
    setPhase("checking");
    gateRequest("status")
      .then((status) => setPhase(phaseFor(status)))
      .catch(() => {
        setMessage(UNREACHABLE);
        setPhase("error");
      });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password) {
      setMessage("Enter the access password.");
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      const result = await gateRequest("unlock", password);
      if (result.authorized) {
        remember(true);
        setPassword("");
        setPhase("authorized");
      } else {
        setMessage("That password is incorrect.");
      }
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      if (code === "FRONTEND_GATE_PASSWORD_INCORRECT") {
        setMessage("That password is incorrect. Please try again.");
      } else if (code === "FRONTEND_GATE_RATE_LIMITED") {
        setMessage("Too many incorrect attempts. Please wait and try again.");
      } else {
        setMessage("We could not verify that password. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (open || phase === "authorized" || (phase === "checking" && hinted)) return <>{children}</>;

  if (phase === "checking") {
    return (
      <main className="pl-gate">
        <p className="pl-gate-sr" role="status">Checking access</p>
      </main>
    );
  }

  return (
    <main className="pl-gate">
      <section className="pl-gate-card" aria-labelledby="pl-gate-title">
        <img className="pl-gate-logo" src="/assets/pop-ladle-logo.svg" alt="Pop & Ladle" />
        <h1 id="pl-gate-title">Private preview</h1>
        {phase === "error" ? (
          <div className="pl-gate-form">
            <p className="pl-gate-message" role="alert">{message}</p>
            <button type="button" onClick={retry}>Try again</button>
          </div>
        ) : (
          <form className="pl-gate-form" noValidate onSubmit={onSubmit}>
            <p className="pl-gate-intro">Enter the access password to continue.</p>
            <label htmlFor="pl-gate-password">Access password</label>
            <input
              autoComplete="current-password"
              autoFocus
              disabled={submitting}
              id="pl-gate-password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
            />
            {message ? <p className="pl-gate-message" role="alert">{message}</p> : null}
            <button type="submit" disabled={submitting}>{submitting ? "Checking" : "Continue"}</button>
          </form>
        )}
      </section>
    </main>
  );
}
