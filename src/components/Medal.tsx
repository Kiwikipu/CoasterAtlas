// Médaille dorée (récompense des défis).

export default function Medal({ size = 52 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden="true" className="shrink-0">
      <path d="M18 40 L12 56 L22 52 L26 60 L30 44 Z M42 40 L48 56 L38 52 L34 60 L30 44 Z" fill="#f7b57a" />
      <circle cx="30" cy="26" r="22" fill="#fbd27a" stroke="#f5b942" strokeWidth="3" />
      <circle cx="30" cy="26" r="15" fill="#f9c85b" />
      <path d="M30 15 l3.4 7 7.6 1 -5.5 5.3 1.3 7.6 -6.8 -3.6 -6.8 3.6 1.3 -7.6 -5.5 -5.3 7.6 -1z" fill="#fff6dc" />
    </svg>
  );
}
