import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";

const links = [
  { href: "#work", label: "The work" },
  { href: "#people", label: "People" },
  { href: "#testimonials", label: "What people say" },
];

export default function Header() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    // Explicit type predicate narrows array type from (Element | null)[] to Element[]
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((section): section is Element => section !== null);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-navy/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Wiseheart home">
          <img src={logo} alt="Wiseheart" className="h-8 w-auto" />
        </a>
        <nav aria-label="Main" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
            {links.map((l) => {
              const isActive = activeId === l.href.substring(1);

              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative py-1 transition-colors duration-300 hover:text-navy focus-visible:text-navy
                      after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-magenta
                      after:transition-transform after:duration-300 after:ease-out
                      motion-reduce:transition-none motion-reduce:after:transition-none ${
                        isActive
                          ? "text-navy after:scale-x-100 font-semibold"
                          : "text-navy-soft after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                      }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-magenta-deep motion-reduce:transition-none"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
