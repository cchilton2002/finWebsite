import { Link } from "react-router-dom";
import { resources } from "../resourcesData";
import ResourceRow from "./ResourceRow";
import Section from "./Section";

export default function LatestResources() {
  const latest = [...resources].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <section id="latest">
      <Section n="04" title="Resources">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-medium sm:text-5xl">Latest resources</h2>
          <Link to="/resources" className="font-semibold text-navy hover:text-magenta-deep">View all →</Link>
        </div>
        <ul className="mt-12 border-b border-navy/15">
          {latest.map((r) => <li key={r.id}><ResourceRow resource={r} /></li>)}
        </ul>
      </Section>
    </section>
  );
}
