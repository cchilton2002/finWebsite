import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { BOX, pieces, type PieceKey } from "../markPaths";

const keys = Object.keys(pieces) as PieceKey[];
const SWAY: Record<PieceKey, number> = { navy: -0.06, magenta: 0.06 }; // sideways drift, as a share of viewport width
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function Svg({ k, className, style }: { k: PieceKey; className?: string; style?: React.CSSProperties }) {
  const { bbox, fill, d } = pieces[k];
  return (
    <svg viewBox={bbox.join(" ")} className={className} style={style} aria-hidden="true">
      <path d={d} fill={fill} />
    </svg>
  );
}

/** Static piece, used in place of the animation on small screens. */
export const StaticPiece = Svg;

interface Geo { w: number; h: number; c0: [number, number]; c1: [number, number]; s1: number; end: number }

/**
 * The logo mark starts whole in the hero. As you scroll, its two halves drift apart
 * and settle beside "Leadership" and "Sport & performance".
 * Hero and targets are found via data-mark-hero / data-mark-target="navy|magenta".
 */
export default function MarkFlow() {
  const { pathname } = useLocation();
  const layer = useRef<HTMLDivElement>(null);
  const els = useRef<Partial<Record<PieceKey, HTMLDivElement | null>>>({});

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let geo: Partial<Record<PieceKey, Geo>> | null = null;

    const render = () => {
      if (!geo) return;
      const y = window.scrollY;
      keys.forEach((k) => {
        const g = geo![k], el = els.current[k];
        if (!g || !el) return;
        const raw = clamp(y / g.end);
        const e = reduce ? (raw > 0.5 ? 1 : 0) : ease(raw);
        const sway = reduce ? 0 : SWAY[k] * window.innerWidth * Math.sin(Math.PI * e);
        const cx = g.c0[0] + (g.c1[0] - g.c0[0]) * e + sway;
        const cy = g.c0[1] + (g.c1[1] - g.c0[1]) * e;
        const s = 1 + (g.s1 - 1) * e;
        el.style.transform = `translate(${cx - g.w / 2}px, ${cy - g.h / 2}px) scale(${s})`;
      });
    };

    const measure = () => {
      const l = layer.current;
      const hero = document.querySelector("[data-mark-hero]");
      const hr = hero?.getBoundingClientRect();
      if (!l || !hero || !hr || hr.width === 0) { geo = null; if (l) l.style.display = "none"; return; }
      l.style.display = "";
      const H = hr.width, next: Partial<Record<PieceKey, Geo>> = {};
      keys.forEach((k) => {
        const t = document.querySelector(`[data-mark-target="${k}"]`)?.getBoundingClientRect();
        const el = els.current[k];
        if (!t || !el) return;
        const [bx, by, bw, bh] = pieces[k].bbox;
        const w = (bw / BOX) * H, h = (bh / BOX) * H;
        el.style.width = `${w}px`; el.style.height = `${h}px`;
        const c1: [number, number] = [t.left + scrollX + t.width / 2, t.top + scrollY + t.height / 2];
        next[k] = {
          w, h,
          c0: [hr.left + scrollX + ((bx + bw / 2) / BOX) * H, hr.top + scrollY + ((by + bh / 2) / BOX) * H],
          c1,
          s1: t.width / Math.max(w, h),
          end: Math.max(1, c1[1] - window.innerHeight * 0.55),
        };
      });
      geo = next;
      render();
    };

    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(render); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  return (
    <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block">
      {keys.map((k) => (
        <div key={k} ref={(el) => { els.current[k] = el; }} className="absolute left-0 top-0 will-change-transform">
          <Svg k={k} className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
