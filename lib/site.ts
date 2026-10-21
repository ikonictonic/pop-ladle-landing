// Public site settings. Safe for the browser: no secrets here.

export const analytics = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  linkedInPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "",
};

// Only https:// links are shown. Empty links stay hidden on the thank-you page.
export const socialLinks: Record<"instagram" | "facebook" | "linkedin" | "pinterest" | "youtube", string> = {
  instagram: "",
  facebook: "",
  linkedin: "",
  pinterest: "",
  youtube: "",
};

// The signup checkbox wording. Changing any of it means bumping `version`,
// because the server stores the version and full text as consent evidence.
export const consentCopy = {
  version: "footer-v17/2026-10-20",
  lead: "I'd like to receive Pop & Ladle emails with recipes, care ideas, and launch updates. I can unsubscribe anytime. See the ",
  link: "Privacy Notice",
  tail: ".",
};
export const consentText = consentCopy.lead + consentCopy.link + consentCopy.tail;

export const privacyNoticeVersion = "draft/2026-10-20";

export const interests = [
  { code: "meal_planning", label: "Planning meals for the week" },
  { code: "hydration", label: "Helping someone eat and drink more consistently" },
  { code: "food_preferences", label: "Finding foods someone enjoys" },
  { code: "time_saving", label: "Spending less time planning, shopping, and cooking" },
  { code: "other", label: "Something else" },
] as const;

export type InterestCode = (typeof interests)[number]["code"];

export function isInterestCode(value: unknown): value is InterestCode {
  return interests.some((i) => i.code === value);
}
