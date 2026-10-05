import Section from "./Section";
import { StaticPiece } from "./MarkFlow";
import type { PieceKey } from "../markPaths";

const areas: { title: string; piece: PieceKey; body: string }[] = [
  {
    title: "Leadership",
    piece: "navy",
    body: "Helping individuals, teams and organisations build the confidence, self-awareness and resilience to lead well and keep performing.",
  },
  {
    title: "Sport & performance",
    piece: "magenta",
    body: "Supporting athletes, teams and coaches to develop psychological fortitude, flexibility and flow, through one-to-one sessions, group coaching and workshops.",
  },
];

export default function Work() {
  return (
    <section id="work">
      <Section n="01" title="The work">
        <h2 className="max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
          When people understand themselves better, they perform better.
        </h2>
        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-24">
          {areas.map((a) => (
            <div key={a.title}>
              {/* The mark's halves land here on desktop (see MarkFlow). */}
              <div data-mark-target={a.piece} className="h-14 w-14">
                <StaticPiece k={a.piece} className="h-full w-full md:hidden" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium">{a.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-navy-soft">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
