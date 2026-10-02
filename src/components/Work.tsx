const areas = [
  {
    title: "Leadership",
    body: "Helping individuals, teams and organisations build the confidence, self-awareness and resilience to lead well and keep performing.",
  },
  {
    title: "Sport & performance",
    body: "Supporting athletes, teams and coaches to develop psychological fortitude, flexibility and flow, through one-to-one sessions, group coaching and workshops.",
  },
];

export default function Work() {
  return (
    <section id="work" className="bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
          When people understand themselves better, they perform better.
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-20">
          {areas.map((a) => (
            <div key={a.title} className="border-t-2 border-magenta pt-6">
              <h3 className="font-display text-2xl font-medium">{a.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-navy-soft">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
