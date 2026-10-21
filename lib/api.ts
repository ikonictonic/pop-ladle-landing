// Origin of the pop-ladle backend (e.g. https://api.popladle.com). Server-side
// only: browsers call same-origin /api/* paths, which next.config.ts rewrites
// to `${API_URL}/api/v1/*`.
export const apiUrl = (process.env.API_URL ?? "").replace(/\/+$/, "");

export type ConfirmStatus = "confirmed" | "expired" | "invalid" | "unavailable";

export async function confirmSubscriberEmail(token: string): Promise<ConfirmStatus> {
  if (!apiUrl) return "unavailable";
  try {
    const res = await fetch(`${apiUrl}/api/v1/subscriber/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) return "unavailable";
    const { status } = (await res.json()) as { status?: string };
    return status === "confirmed" || status === "expired" ? status : "invalid";
  } catch {
    return "unavailable";
  }
}
