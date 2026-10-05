import { Link } from "react-router-dom";
import mark from "../assets/mark.svg";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <img
        src={mark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[62%] w-[34rem] -translate-y-1/2 opacity-[0.12] md:hidden"
      />
      {/* MarkFlow draws the animated mark over this box on md+ screens. */}
      <div data-mark-hero aria-hidden="true" className="pointer-events-none absolute -right-10 top-[62%] hidden aspect-square w-[30rem] -translate-y-1/2 md:block lg:right-24 lg:w-[34rem]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
        <p className="mb-6 text-lg font-medium text-navy-soft">
          Psychology for leadership &amp; performance
        </p>
        <h1 className="font-display text-[clamp(2.25rem,10vw,3.75rem)] font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
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
          <Link to="/#contact" className="rounded-full bg-magenta px-7 py-3 font-semibold text-white hover:bg-magenta-deep">
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
