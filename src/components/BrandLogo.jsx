/* Solvexa Consulting: Logo als SVG nachgebaut (Original: brand/solvexa-logo.jpg).
   Bildmarke: Sechseck aus zwei punktsymmetrischen Hälften, die ein "S" bilden.
   tone="dark"  -> für dunklen Grund (Navy-Teile werden hell)
   tone="light" -> Originalfarben auf hellem Grund */
export const BRAND = { navy: "#17365F", orange: "#F0892D", light: "#F8F9FA", lightSub: "#A9B4C2" };

export function BrandMark({ tone = "dark", className = "h-9 w-9", title }) {
  const top = tone === "dark" ? BRAND.light : BRAND.navy;
  return (
    <svg viewBox="0 0 100 100" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <g fill="none" strokeWidth="13" strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M62 60 L12 40 L12 28 L50 6 L88 28 L88 36" stroke={top} />
        <path d="M38 40 L88 60 L88 72 L50 94 L12 72 L12 64" stroke={BRAND.orange} />
      </g>
    </svg>
  );
}

/* Wortmarke: SOLVEX + Λ mit orangem Dreieck, darunter CONSULTING gesperrt. */
export default function BrandLogo({ tone = "dark", className = "h-9", divider = true }) {
  const main = tone === "dark" ? BRAND.light : BRAND.navy;
  const sub = tone === "dark" ? BRAND.lightSub : BRAND.navy;
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Solvexa Consulting" role="img">
      <BrandMark tone={tone} className="h-full w-auto" />
      {divider && <span className="h-[85%] w-px" style={{ background: main, opacity: 0.6 }} />}
      <svg viewBox="0 0 236 64" className="h-full w-auto" aria-hidden="true">
        <text x="0" y="36" fill={main} fontFamily="'Geist Variable', Inter, system-ui, sans-serif" fontWeight="600" fontSize="40" letterSpacing="2.5">SOLVEX</text>
        {/* Λ ohne Querstrich, mit orangem Dreieck */}
        <path d="M193 36 L210 6 L227 36" fill="none" stroke={main} strokeWidth="5.4" strokeLinejoin="miter" />
        <path d="M204 36 L210 25 L216 36 Z" fill={BRAND.orange} />
        <text x="1" y="60" fill={sub} fontFamily="'Geist Variable', Inter, system-ui, sans-serif" fontWeight="500" fontSize="15.5" letterSpacing="11.2">CONSULTING</text>
      </svg>
    </span>
  );
}
