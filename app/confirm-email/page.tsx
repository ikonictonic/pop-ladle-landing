import type { Metadata } from "next";
import { Suspense } from "react";
import { WelcomeShell } from "@/components/WelcomeShell";
import { confirmSubscriberEmail } from "@/lib/api";

export const metadata: Metadata = {
  title: "Confirm your email | Pop & Ladle",
  robots: { index: false, follow: false },
};

// GET /confirm-email?token=… from the confirmation email. The backend checks
// the single-use token and activates the subscription.
export default function ConfirmEmailPage({ searchParams }: PageProps<"/confirm-email">) {
  return (
    <WelcomeShell eyebrow="EMAIL CONFIRMATION">
      <Suspense fallback={<p className="intro">Confirming your email.</p>}>
        <ConfirmResult searchParams={searchParams} />
      </Suspense>
    </WelcomeShell>
  );
}

async function ConfirmResult({ searchParams }: Pick<PageProps<"/confirm-email">, "searchParams">) {
  const { token } = await searchParams;
  const status = await confirmSubscriberEmail(typeof token === "string" ? token : "");

  if (status === "confirmed") {
    return (
      <>
        <h1>You&apos;re confirmed.<br /><em>Welcome to the table.</em></h1>
        <p className="intro">Your Everyday Kitchen Planner is on its way to your inbox. You can also download it now.</p>
        <a className="download" href="/Everyday-Kitchen-Planner.pdf" download>DOWNLOAD YOUR FREE PLANNER</a>
      </>
    );
  }
  if (status === "unavailable") {
    return (
      <>
        <h1>We couldn&apos;t confirm<br /><em>your email just now.</em></h1>
        <p className="intro">Please open the link from your email again in a few minutes.</p>
      </>
    );
  }
  return (
    <>
      <h1>{status === "expired" ? "This link has expired." : "This link has already been used."}</h1>
      <p className="intro">
        {status === "expired"
          ? "Confirmation links work for 48 hours. Sign up again and we'll send you a fresh one."
          : "If you already confirmed your email, you're all set. If not, sign up again for a fresh link."}
      </p>
      <a className="download" href="/#join">GET EARLY ACCESS</a>
    </>
  );
}
