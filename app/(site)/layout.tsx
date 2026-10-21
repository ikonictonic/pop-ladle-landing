import { ConsentManager } from "@/components/ConsentManager";

// Home, contact and privacy share the cookie banner and consent-gated tags.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <ConsentManager>{children}</ConsentManager>;
}
