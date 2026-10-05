import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import logo from "../assets/logo.svg";

const items = [
  { label: "The work", to: "/#work", section: "work" },
  { label: "People", to: "/#people", section: "people" },
  { label: "What people say", to: "/#testimonials", section: "testimonials" },
  { label: "Resources", to: "/resources", section: "latest" },
];
const sectionIds = [...items.map((i) => i.section), "contact"];

const pill = "rounded-2xl bg-white/80 shadow-sm ring-1 ring-navy/10 backdrop-blur-md";

export default function Header() {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  // Switch the nav to white while the navy testimonials section is behind the middle of it.
  useEffect(() => {
    setDark(false);
    const el = document.getElementById("testimonials");
    if (pathname !== "/" || !el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      setDark(r.top <= 110 && r.bottom > 110);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // Track which home-page section is in view.
  useEffect(() => {
    if (pathname !== "/") return setActiveId("");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const id = e.target.id;
          if (e.isIntersecting) setActiveId(id);
          else setActiveId((cur) => (cur === id ? "" : cur));
        }),
      { rootMargin: "-20% 0px -60% 0px" }
    );
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile menu on navigation, Escape, and lock page scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (i: (typeof items)[number]) =>
    i.to === "/resources" ? pathname === "/resources" || activeId === "latest" : pathname === "/" && activeId === i.section;

  // On the home page, scroll directly so clicking works even if the URL already has this #hash.
  const onNav = (to: string) => (e: React.MouseEvent) => {
    const hash = to.split("#")[1];
    setOpen(false);
    if (pathname !== "/" || !hash) return;
    e.preventDefault();
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    navigate(to, { replace: true });
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-4 sm:p-6">
        <Link to="/" aria-label="Wiseheart home" className={`pointer-events-auto px-4 py-2.5 ${pill}`}>
          <img src={logo} alt="Wiseheart" className="h-7 w-auto" />
        </Link>

        {/* Desktop: minimal vertical list, no container */}
        <nav aria-label="Main" className={`pointer-events-auto -mr-6 hidden bg-linear-to-l from-60% to-transparent py-3 pl-16 pr-6 lg:block ${dark ? "from-navy/95" : "from-white/95"}`}>
          <ul className="flex flex-col items-end gap-3 text-sm font-medium">
            {items.map((i) => {
              const active = isActive(i);
              return (
                <li key={i.label}>
                  <Link
                    to={i.to}
                    onClick={onNav(i.to)}
                    className={`group flex items-center gap-3 transition-colors duration-300 motion-reduce:transition-none ${
                      dark
                        ? active ? "text-white" : "text-white/70 hover:text-white"
                        : active ? "text-navy" : "text-navy-soft hover:text-navy"
                    }`}
                  >
                    <span
                      className="relative py-0.5 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-magenta after:transition-transform after:duration-300 after:ease-out group-hover:after:origin-left group-hover:after:scale-x-100 group-focus-visible:after:origin-left group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none"
                    >
                      {i.label}
                    </span>
                    <span className="relative h-1.5 w-1.5">
                      {active && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute inset-0 rounded-full bg-magenta"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile: menu button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`pointer-events-auto px-5 py-2.5 text-sm font-semibold lg:hidden ${pill}`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-navy px-8 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-5 font-display text-4xl text-white">
                {[...items, { label: "Get in touch", to: "/#contact", section: "contact" }].map((i, n) => (
                  <motion.li key={i.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * n + 0.1 }}>
                    <Link to={i.to} onClick={onNav(i.to)} className="hover:text-magenta">{i.label}</Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
