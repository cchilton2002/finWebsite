/** A hairline rule with a small numbered label: separates sections without adding boxes or colour. */
export default function SectionLabel({ n, title, dark = false }: { n: string; title: string; dark?: boolean }) {
  return (
    <div className={`border-t ${dark ? "border-white/20" : "border-navy/15"}`}>
      <div className={`mx-auto flex max-w-6xl items-center gap-4 px-6 pt-5 text-xs font-medium uppercase tracking-[0.2em] ${dark ? "text-white/60" : "text-navy-soft"}`}>
        <span className="text-magenta">{n}</span>
        <span>{title}</span>
      </div>
    </div>
  );
}
