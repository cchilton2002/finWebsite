import { useState } from "react";
import Section from "./Section";
import { people, type Person } from "../content";

function Photo({ person }: { person: Person }) {
  const [failed, setFailed] = useState(false);
  const initials = person.name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-mist">
      {failed ? (
        <div className="flex h-full items-center justify-center font-display text-7xl text-navy/30">
          {initials}
        </div>
      ) : (
        <img
          src={person.photo}
          alt={`${person.name}, ${person.role}`}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export default function People() {
  return (
    <section id="people">
      <Section n="02" title="People">
      <h2 className="font-display text-4xl font-medium sm:text-5xl">The people behind Wiseheart</h2>
      <div className="mt-16 space-y-24">
        {people.map((p, i) => (
          <article key={p.id} className="grid items-start gap-10 md:grid-cols-12 md:gap-16">
            <div className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
              <Photo person={p} />
            </div>
            <div className="md:col-span-7">
              {p.tagline && <p className="mb-2 font-medium text-magenta-deep">{p.tagline}</p>}
              <h3 className="font-display text-3xl font-medium">{p.name}</h3>
              <p className="mt-1 text-navy-soft">{p.role}</p>
              <div className="mt-6 max-w-xl space-y-4 leading-relaxed text-navy-soft">
                {p.paragraphs.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
      </Section>
    </section>
  );
}
