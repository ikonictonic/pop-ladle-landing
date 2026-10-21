/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions, prefer-rest-params, prefer-spread --
   Vendor loader snippets: gtag and fbq queue the `arguments` object itself, so rest parameters would break them. */
import { analytics } from "./site";

export type CookieConsent = { analytics: boolean; ads: boolean; updated?: string };

type TagWindow = Window & Record<string, any>;

function addScript(src: string) {
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

// Loads optional tags only for the categories the visitor accepted.
// Never pass emails or food/care preferences into these tags.
export function loadTags(c: CookieConsent) {
  const w = window as TagWindow;
  const { googleAnalyticsId, metaPixelId, linkedInPartnerId } = analytics;

  if (c.analytics && googleAnalyticsId && !w.plAnalyticsLoaded) {
    w.plAnalyticsLoaded = true;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      // gtag expects the arguments object, not an array.
      w.dataLayer.push(arguments);
    };
    w.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    updateGoogleConsent(c);
    w.gtag("js", new Date());
    w.gtag("config", googleAnalyticsId, { anonymize_ip: true });
    addScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(googleAnalyticsId));
  }

  if (c.ads && metaPixelId && !w.plMetaLoaded) {
    w.plMetaLoaded = true;
    if (!w.fbq) {
      const n: any = (w.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      n.queue = [];
      n.loaded = true;
      n.version = "2.0";
      const t = document.createElement("script");
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      const first = document.getElementsByTagName("script")[0];
      first.parentNode!.insertBefore(t, first);
    }
    w.fbq("init", metaPixelId);
    w.fbq("track", "PageView");
  }

  if (c.ads && linkedInPartnerId && !w.plLinkedInLoaded) {
    w.plLinkedInLoaded = true;
    w._linkedin_partner_id = linkedInPartnerId;
    w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || [];
    w._linkedin_data_partner_ids.push(linkedInPartnerId);
    addScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }
}

export function updateGoogleConsent(c: CookieConsent) {
  const w = window as TagWindow;
  if (!w.gtag) return;
  w.gtag("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.ads ? "granted" : "denied",
    ad_user_data: c.ads ? "granted" : "denied",
    ad_personalization: c.ads ? "granted" : "denied",
  });
}
