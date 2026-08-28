import type { LanguageCode } from "@/shared/constants/languages";
import { cn } from "@/shared/lib/cn";

/**
 * Inline SVG flags — emoji flags are not rendered on Windows, so the language
 * switcher draws them instead of relying on the system font.
 */

function UnionJack() {
  return (
    <svg viewBox="0 0 60 30" className="size-full">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function Tricolour() {
  return (
    <svg viewBox="0 0 60 30" className="size-full">
      <rect width="60" height="10" fill="#fff" />
      <rect y="10" width="60" height="10" fill="#0039A6" />
      <rect y="20" width="60" height="10" fill="#D52B1E" />
    </svg>
  );
}

const SUN_RAYS = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);

function KyrgyzSun() {
  return (
    <svg viewBox="0 0 60 30" className="size-full">
      <rect width="60" height="30" fill="#E8112D" />
      <g stroke="#FFEF00" strokeWidth="1.6" strokeLinecap="round">
        {SUN_RAYS.map((deg) => (
          <line key={deg} x1="30" y1="30" x2="30" y2="24" transform={`rotate(${deg} 30 15)`} />
        ))}
      </g>
      <circle cx="30" cy="15" r="6.5" fill="#FFEF00" />
      <g stroke="#E8112D" strokeWidth="1" fill="none">
        <path d="M25,15 h10 M30,10 v10" />
      </g>
    </svg>
  );
}

/** The four small stars sit on an arc facing the large one: [x, y, rotation]. */
const SMALL_STARS: [number, number, number][] = [
  [17, 4.5, 23],
  [21, 8, 45],
  [21, 13.5, 68],
  [17, 17, 90],
];

function ChinaFlag() {
  return (
    <svg viewBox="0 0 60 30" className="size-full">
      <rect width="60" height="30" fill="#EE1C25" />
      <g fill="#FFDE00">
        <Star cx={10} cy={9} r={5.5} />
        {SMALL_STARS.map(([cx, cy, rot]) => (
          <Star key={`${cx}-${cy}`} cx={cx} cy={cy} r={2} rotate={rot} />
        ))}
      </g>
    </svg>
  );
}

function Star({ cx, cy, r, rotate = 0 }: { cx: number; cy: number; r: number; rotate?: number }) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : r * 0.382;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
  }).join(" ");
  return <polygon points={points} transform={`rotate(${rotate} ${cx} ${cy})`} />;
}

const FLAGS: Record<LanguageCode, () => React.JSX.Element> = {
  en: UnionJack,
  ru: Tricolour,
  ky: KyrgyzSun,
  zh: ChinaFlag,
};

export function Flag({ code, className }: { code: LanguageCode; className?: string }) {
  const Shape = FLAGS[code];
  return (
    // <i> rather than <span>: SelectTrigger line-clamps its direct span children,
    // which would override the fixed inline-block box below.
    <i
      aria-hidden
      className={cn(
        "inline-block h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10",
        className,
      )}
    >
      <Shape />
    </i>
  );
}
