import { useState } from "react";
import { resources } from "../resourcesData";
import ResourceRow from "../components/ResourceRow";

function Filters({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <span className="mr-2 w-20 text-xs font-medium uppercase tracking-[0.15em] text-navy-soft">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          aria-pressed={o === value}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            o === value ? "border-navy bg-navy text-white" : "border-navy/15 text-navy-soft hover:border-navy/40 hover:text-navy"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function ResourcesPage() {
  const [category, setCategory] = useState("All");
  const [kind, setKind] = useState("All");
  const categories = ["All", ...new Set(resources.map((r) => r.category))];
  const shown = resources
    .filter((r) => category === "All" || r.category === category)
    .filter((r) => kind === "All" || r.kind === kind)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 pb-24 pt-32">
      <h1 className="font-display text-5xl font-medium sm:text-6xl">Resources</h1>
      <p className="mt-4 max-w-xl text-lg text-navy-soft">
        Articles and free downloads on leadership, performance and the psychology underneath both.
      </p>
      <div className="mt-10 space-y-3">
        <Filters label="Topic" options={categories} value={category} onChange={setCategory} />
        <Filters label="Type" options={["All", "Article", "PDF"]} value={kind} onChange={setKind} />
      </div>
      <ul className="mt-12 border-b border-navy/15">
        {shown.map((r) => <li key={r.id}><ResourceRow resource={r} /></li>)}
        {shown.length === 0 && <li className="border-t border-navy/15 py-10 text-navy-soft">Nothing here yet.</li>}
      </ul>
    </main>
  );
}
