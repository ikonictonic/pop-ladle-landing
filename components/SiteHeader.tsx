"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

type Props = {
  // "home" links to on-page anchors; "page" is the contact/privacy header.
  variant: "home" | "page";
  // The privacy page's CTA icon is drawn by legal.css alone.
  ctaSvg?: boolean;
};

// V20 navigation: full-screen overlay under 901px with Escape, focus cycling and scroll lock.
export function SiteHeader({ variant, ctaSvg = true }: Props) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const lastOpen = useRef(open);

  useEffect(() => {
    if (lastOpen.current === open) return;
    lastOpen.current = open;
    document.documentElement.classList.toggle("pl-menu-open", open);
    document.body.classList.toggle("pl-menu-open", open);
    if (!open) {
      toggle.current?.focus({ preventScroll: true });
      return;
    }
    // The overlay fades in from visibility:hidden, which blocks focus until the
    // transition runs. Focus now (no transition under reduced motion) and again
    // once the fade-in finishes.
    const navEl = nav.current;
    const focusFirstLink = () => navEl?.querySelector("a")?.focus({ preventScroll: true });
    const onFadeIn = (e: TransitionEvent) => e.propertyName === "visibility" && focusFirstLink();
    focusFirstLink();
    navEl?.addEventListener("transitionend", onFadeIn);
    return () => navEl?.removeEventListener("transitionend", onFadeIn);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !toggle.current || !nav.current) return;
      const els = [toggle.current, ...nav.current.querySelectorAll("a")];
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 901px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);
  const home = variant === "home";
  const base = home ? "" : "/";

  const brand = (
    <a aria-label="Pop and Ladle home" className="brand" href={home ? "#top" : "/"}>
      <img alt="Pop & Ladle" src="/assets/pop-ladle-logo.svg" />
    </a>
  );
  const menuToggle = (
    <button
      aria-controls="main-nav"
      aria-expanded={open}
      aria-label={open ? "Close navigation" : "Open navigation"}
      className="menu-toggle"
      id="menu-toggle"
      ref={toggle}
      type="button"
      onClick={() => setOpen(!open)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
  const links = (
    <nav aria-label="Main navigation" className={open ? "open" : undefined} id="main-nav" ref={nav}>
      <a href={`${base}#about`} onClick={close}>About Us</a>
      <a href={`${base}#how`} onClick={close}>What We&apos;re Making</a>
      <a href={`${base}#story`} onClick={close}>Our Story</a>
      <a href={`${base}#questions`} onClick={close}>{home ? "FAQs" : "FAQ's"}</a>
      <a className={home ? "nav-cta button" : "button primary nav-cta"} href={`${base}#join`} onClick={close}>
        GET EARLY ACCESS <ArrowIcon svg={ctaSvg} />
      </a>
    </nav>
  );

  if (home) {
    return (
      <header className="site-header" id="top">
        {brand}
        {menuToggle}
        {links}
      </header>
    );
  }
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        {brand}
        {menuToggle}
        {links}
      </div>
    </header>
  );
}
