import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="border-t border-navy/10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-navy-soft sm:flex-row sm:items-center">
        <img src={logo} alt="Wiseheart" className="h-6 w-auto" />
        <p>&copy; {new Date().getFullYear()} Wiseheart. Psychology for leadership &amp; performance.</p>
      </div>
    </footer>
  );
}
