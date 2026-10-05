import type { Resource } from "../resourcesData";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function ResourceCard({ resource: r }: { resource: Resource }) {
  return (
    <article className="flex h-full flex-col border-t border-navy/15 pt-5">
      <p className="text-sm text-navy-soft">{r.category} · {r.kind}</p>
      <h3 className="mt-3 font-display text-2xl font-medium leading-snug">{r.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-navy-soft">{r.summary}</p>
      <div className="mt-6 flex items-center justify-between text-sm">
        <time dateTime={r.date} className="text-navy-soft">{fmt(r.date)}</time>
        {r.href && (
          <a href={r.href} className="font-semibold text-navy hover:text-magenta-deep">
            {r.kind === "PDF" ? "Download" : "Read"} →
          </a>
        )}
      </div>
    </article>
  );
}
