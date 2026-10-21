"use client";

import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

// The current year, filled in on the client like the static site did, so a
// prerendered page never shows a stale year.
export function Year(props: React.HTMLAttributes<HTMLSpanElement>) {
  const year = useSyncExternalStore(noSubscribe, () => String(new Date().getFullYear()), () => "");
  return <span {...props}>{year}</span>;
}
