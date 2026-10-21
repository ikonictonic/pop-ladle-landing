"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { type CookieConsent, loadTags, updateGoogleConsent } from "@/lib/tags";

const STORAGE_KEY = "pl-consent-v1";

const OpenPreferencesContext = createContext<() => void>(() => {});

export function useOpenCookiePreferences() {
  return useContext(OpenPreferencesContext);
}

// Cookie banner, preferences dialog, and consent-gated tag loading.
export function ConsentManager({ children }: { children: React.ReactNode }) {
  const state = useRef<CookieConsent | null>(null);
  const [bannerHidden, setBannerHidden] = useState(true);
  const dialog = useRef<HTMLDialogElement>(null);
  const analyticsBox = useRef<HTMLInputElement>(null);
  const adsBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      state.current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {}
    if (state.current) loadTags(state.current);
    else setBannerHidden(false);
  }, []);

  const save = useCallback((c: CookieConsent) => {
    const old = state.current;
    const next = { analytics: !!c.analytics, ads: !!c.ads, updated: new Date().toISOString() };
    state.current = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setBannerHidden(true);
    // Tags that already loaded can't be unloaded, so a withdrawal reloads the page.
    if (old && ((old.analytics && !next.analytics) || (old.ads && !next.ads))) {
      location.reload();
      return;
    }
    updateGoogleConsent(next);
    loadTags(next);
  }, []);

  const openPreferences = useCallback(() => {
    analyticsBox.current!.checked = !!state.current?.analytics;
    adsBox.current!.checked = !!state.current?.ads;
    dialog.current!.showModal();
  }, []);

  return (
    <OpenPreferencesContext.Provider value={openPreferences}>
      {children}
      <div aria-label="Cookie choices" className="cookie-banner" hidden={bannerHidden} id="cookie-banner" role="region">
        <div>
          <strong>Your privacy matters.</strong>
          <p>
            We use optional analytics and advertising cookies to understand visits and measure our outreach. Choose
            what works for you. Essential site features remain available either way.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="button secondary" type="button" onClick={() => save({ analytics: false, ads: false })}>
            Reject optional
          </button>
          <button className="button secondary" type="button" onClick={openPreferences}>
            Preferences
          </button>
          <button className="button primary" type="button" onClick={() => save({ analytics: true, ads: true })}>
            Accept optional
          </button>
        </div>
      </div>
      <dialog aria-labelledby="prefs-title" className="privacy-dialog" id="privacy-dialog" ref={dialog}>
        <form method="dialog">
          <h2 id="prefs-title">Cookie preferences</h2>
          <p>Essential functions are always active. Analytics and advertising are optional and start only after you choose them.</p>
          <label>
            <input defaultChecked disabled type="checkbox" /> Essential site functions
          </label>
          <label>
            <input id="pref-analytics" ref={analyticsBox} type="checkbox" /> Analytics (Google Analytics)
          </label>
          <label>
            <input id="pref-ads" ref={adsBox} type="checkbox" /> Advertising measurement (Meta and LinkedIn)
          </label>
          <div className="dialog-actions">
            <button className="button secondary" value="cancel">
              Cancel
            </button>
            <button
              className="button primary"
              id="save-preferences"
              value="save"
              onClick={() => save({ analytics: analyticsBox.current!.checked, ads: adsBox.current!.checked })}
            >
              Save choices
            </button>
          </div>
        </form>
      </dialog>
    </OpenPreferencesContext.Provider>
  );
}

export function CookiePreferencesButton() {
  const open = useOpenCookiePreferences();
  return (
    <button data-open-privacy="" type="button" onClick={open}>
      Cookie preferences
    </button>
  );
}
