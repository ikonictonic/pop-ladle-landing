// The "open in new" arrow used on CTA buttons.
export function ArrowIcon({ svg = true }: { svg?: boolean }) {
  return (
    <i aria-hidden="true" className="fa-solid fa-arrow-up-right-from-square">
      {svg && <ArrowSvg />}
    </i>
  );
}

export function ArrowSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg focusable="false" viewBox="0 0 24 24" {...props}>
      <path d="M13 5h6v6M19 5l-9 9"></path>
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"></path>
    </svg>
  );
}
