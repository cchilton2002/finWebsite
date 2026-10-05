import type { Resource } from "../resourcesData";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function ResourceRow({ resource: r }: { resource: Resource }) {
  const pdf = r.kind === "PDF";
  const row = "group relative grid items-baseline gap-x-10 gap-y-3 border-t border-navy/15 py-8 md:grid-cols-[8rem_1fr_auto]";
  const inner = (
    <>
      <span aria-hidden="true" className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-magenta transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100 motion-reduce:transition-none" />
      <time dateTime={r.date} className="text-sm text-navy-soft">{fmt(r.date)}</time>
      <div>
        <h3 className="font-display text-2xl font-medium leading-snug transition-colors group-hover:text-magenta-deep">{r.title}</h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-navy-soft">{r.summary}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-navy-soft">{r.category}</p>
      </div>
      <span
        className={`inline-flex items-center gap-2 justify-self-start rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300 motion-reduce:transition-none md:justify-self-end ${
          pdf
            ? "border-magenta/40 text-magenta-deep group-hover:border-magenta group-hover:bg-magenta group-hover:text-white group-focus-visible:bg-magenta group-focus-visible:text-white group-active:bg-magenta group-active:text-white"
            : "border-navy/25 text-navy group-hover:border-navy group-hover:bg-navy group-hover:text-white group-focus-visible:bg-navy group-focus-visible:text-white group-active:bg-navy group-active:text-white"
        }`}
      >
        {pdf ? "PDF" : "Article"}
        <span aria-hidden="true" className={`transition-transform duration-300 motion-reduce:transition-none ${pdf ? "group-hover:translate-y-0.5" : "group-hover:translate-x-1"}`}>
          {pdf ? "↓" : "→"}
        </span>
      </span>
    </>
  );
  return r.href ? (
    <a href={r.href} aria-label={`${pdf ? "Download" : "Read"}: ${r.title}`} className={row}>{inner}</a>
  ) : (
    <div className={row}>{inner}</div>
  );
}
