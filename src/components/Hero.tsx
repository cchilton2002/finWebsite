import mark from "../assets/mark.svg";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <img
        src={mark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 w-[34rem] -translate-y-1/2 opacity-[0.12] sm:-right-10 sm:opacity-100 sm:w-[30rem] lg:right-10 lg:w-[34rem]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-40">
        <p className="mb-6 text-lg font-medium text-navy-soft">
          Psychology for leadership &amp; performance
        </p>
        <h1 className="font-display text-6xl font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
          Think Better.
          <br />
          Feel Better.
          <br />
          Perform Better.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-soft">
          A psychology-driven approach that fuses the rigour of organisational
          leadership with the complex demands of elite sport.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="rounded-full bg-magenta px-7 py-3 font-semibold text-white hover:bg-magenta-deep">
            Get in touch
          </a>
          <a href="#work" className="rounded-full border border-navy/25 px-7 py-3 font-semibold hover:border-navy">
            See the work
          </a>
        </div>
      </div>
    </section>
  );
}
