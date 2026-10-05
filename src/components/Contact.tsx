import { useState, type FormEvent } from "react";
import Section from "./Section";
import { Link } from "react-router-dom";
import { contact } from "../content";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 w-full rounded-none border-0 border-b border-navy/25 bg-transparent px-0 py-3 text-navy placeholder:text-navy/40 focus:border-magenta focus:outline-none focus:ring-0";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    if (!contact.formEndpoint) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nInterested in: ${data.interest}\n\n${data.about}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        "Enquiry from " + data.name
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact">
      <Section n="05" title="Contact">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
            It starts with a conversation.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-soft">
            Tell us a little about where you are and what you&rsquo;re working
            towards. We&rsquo;ll come back to you personally.
          </p>

          <ul className="mt-8 space-y-2 font-semibold">
            <li><a href={`mailto:${contact.email}`} className="text-magenta-deep hover:underline">{contact.email}</a></li>
            <li><a href={contact.phoneHref} className="text-magenta-deep hover:underline">{contact.phone}</a></li>
          </ul>

          <div className="mt-10 border-t border-navy/10 pt-6">
            <p className="font-semibold">Check out our socials and free resources</p>
            <ul className="mt-3 space-y-2 text-navy-soft">
              <li>
                <a href={contact.tiktok} target="_blank" rel="noopener noreferrer" className="underline decoration-navy/30 underline-offset-4 hover:text-navy hover:decoration-magenta">
                  TikTok
                </a>
              </li>
              <li>
                <Link to="/resources" className="underline decoration-navy/30 underline-offset-4 hover:text-navy hover:decoration-magenta">
                  Free resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          {status === "sent" ? (
            <div role="status" className="border-t border-navy/15 pt-8">
              <h3 className="font-display text-2xl font-medium">Thank you, message received.</h3>
              <p className="mt-3 text-navy-soft">We&rsquo;ll come back to you personally.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block font-medium">
                  Name
                  <input name="name" type="text" required autoComplete="name" className={field} />
                </label>
                <label className="block font-medium">
                  Email
                  <input name="email" type="email" required autoComplete="email" className={field} />
                </label>
              </div>
              <label className="block font-medium">
                I&rsquo;m interested in
                <select name="interest" defaultValue={contact.interests[0]} className={field}>
                  {contact.interests.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="block font-medium">
                A little about you
                <textarea name="about" rows={5} required className={field} />
              </label>

              {status === "error" && (
                <p role="alert" className="text-magenta-deep">
                  Something went wrong sending that. Please try again, or email {contact.email}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-magenta px-7 py-3 font-semibold text-white hover:bg-magenta-deep disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
      </Section>
    </section>
  );
}
