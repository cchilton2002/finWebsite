import { useState } from "react";
import Section from "./Section";
import { testimonials } from "../content";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const go = (next: number) => setI((next + n) % n);

  return (
    <section
      id="testimonials"
      className="bg-navy text-white"
      aria-roledescription="carousel"
      aria-label="What people say"
    >
      <Section n="03" title="What people say" dark>
      <div className="text-center">
        <div className="overflow-hidden" aria-live="polite">
          <div
            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {testimonials.map((t, idx) => (
              <figure
                key={idx}
                className="w-full shrink-0 px-2"
                aria-hidden={idx !== i}
                role="group"
                aria-label={`${idx + 1} of ${n}`}
              >
                <blockquote className="font-display text-2xl font-normal leading-snug sm:text-4xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 text-white/70">
                  {t.name && <span className="font-semibold text-white">{t.name}, </span>}
                  {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button onClick={() => go(i - 1)} aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 hover:border-white hover:bg-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button key={idx} onClick={() => go(idx)} aria-label={`Show testimonial ${idx + 1}`}
                aria-current={idx === i}
                className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-magenta" : "w-2.5 bg-white/40 hover:bg-white/70"}`} />
            ))}
          </div>
          <button onClick={() => go(i + 1)} aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 hover:border-white hover:bg-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      </Section>
    </section>
  );
}
