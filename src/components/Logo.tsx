// Logo CoasterAtlas : le globe entouré d'un rail de coaster.
import { useId } from "react";

export function LogoMark({ size = 64, className = "" }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`oc-${id}`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#9fdcd8" />
          <stop offset="1" stopColor="#4fb0b0" />
        </radialGradient>
        <clipPath id={`gl-${id}`}>
          <circle cx="60" cy="62" r="36" />
        </clipPath>
      </defs>
      {/* arrière du rail */}
      <ellipse cx="60" cy="64" rx="54" ry="20" transform="rotate(-18 60 64)" fill="none" stroke="#f28b82" strokeWidth="7" opacity="0.55" />
      <circle cx="60" cy="62" r="36" fill={`url(#oc-${id})`} />
      <g clipPath={`url(#gl-${id})`} fill="#bfe3a8">
        <path d="M30 40 C40 30 52 34 54 42 C56 50 46 52 44 60 C42 68 34 70 28 62 C24 54 24 46 30 40 Z" />
        <path d="M62 34 C72 30 86 36 90 46 C92 54 84 56 80 52 C74 48 70 54 72 62 C74 72 66 82 60 76 C56 70 62 62 58 54 C54 46 54 38 62 34 Z" />
        <path d="M40 80 C46 76 52 80 50 88 C48 94 40 94 38 88 Z" />
      </g>
      {/* avant du rail */}
      <path d="M8 76 C14 96 70 92 112 52" fill="none" stroke="#f28b82" strokeWidth="7" strokeLinecap="round" transform="rotate(-2 60 64)" />
      <path d="M8 76 C14 96 70 92 112 52" fill="none" stroke="#fff" strokeWidth="2.2" strokeDasharray="2 5" transform="rotate(-2 60 64)" />
      {/* petit train */}
      <g fill="#1f2a4d">
        <rect x="58" y="16" width="12" height="7" rx="2" transform="rotate(14 64 20)" />
        <rect x="71" y="20" width="12" height="7" rx="2" transform="rotate(22 77 24)" />
        <rect x="83" y="26" width="12" height="7" rx="2" transform="rotate(30 89 30)" />
        <circle cx="62" cy="14" r="2.4" /><circle cx="75" cy="18" r="2.4" /><circle cx="88" cy="24" r="2.4" />
      </g>
      <g fill="#fbd27a">
        <path d="M14 30 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
        <path d="M104 92 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5z" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-tight ${className}`}>
      Coaster<span className="text-coral">Atlas</span>
    </span>
  );
}

export function Slogan({ className = "" }: { className?: string }) {
  return (
    <p className={`font-display text-xs tracking-[0.28em] text-navy/80 ${className}`}>
      EXPLORE <span className="text-coral">•</span> RIDE <span className="text-teal">•</span> COLLECT{" "}
      <span className="text-peach">•</span> REMEMBER.
    </p>
  );
}
