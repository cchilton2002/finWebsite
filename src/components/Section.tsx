import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Editorial section layout: a narrow label column (number + title) on the left,
 * content on the right. On desktop the label stays in view while you read the section,
 * and dims when another section takes over so only one number reads as current.
 */
export default function Section({ n, title, dark = false, children }: { n: string; title: string; dark?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // A thin band 40% down the viewport: the section crossing it is the current one.
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "-40% 0px -59% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto grid max-w-7xl gap-8 px-6 py-24 sm:py-32 lg:grid-cols-[10rem_1fr] lg:gap-12">
      <div>
        <p
          className={`flex gap-3 text-xs font-medium uppercase tracking-[0.2em] transition-opacity duration-500 motion-reduce:transition-none lg:sticky lg:top-28 lg:block ${
            dark ? "text-white/60" : "text-navy-soft"
          } ${active ? "" : "lg:opacity-25"}`}
        >
          <span className="text-magenta lg:block">{n}</span>
          <span className="lg:mt-2 lg:block">{title}</span>
        </p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
