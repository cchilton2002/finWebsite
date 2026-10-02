// All editable copy lives here.

export const contact = {
  email: "fin@wiseheart.co.uk",
  phone: "07496 777175",
  phoneHref: "tel:+447496777175",
  tiktok: "https://www.tiktok.com/@wiseheart.ft?lang=en",
  // TODO: put the PDF at public/resources/free-resources.pdf (or change this path)
  resourcesPdf: "/resources/free-resources.pdf",
  // Optional: a Formspree (or similar) endpoint, e.g. "https://formspree.io/f/xxxxxxx".
  // While empty, submitting opens the visitor's email app with the message pre-filled.
  formEndpoint: "",
  interests: ["Leadership", "Sport & performance", "Not sure yet"],
};

export interface Person {
  id: string;
  name: string;
  role: string;
  tagline?: string;
  photo: string; // file in /public/images
  paragraphs: string[];
}

export const people: Person[] = [
  {
    id: "richard",
    name: "Richard Thorp",
    role: "Founder",
    tagline: "20+ years building the work",
    photo: "/images/richard.jpg.jpeg",
    paragraphs: [
      "Richard founded Wiseheart with a simple but powerful belief: that when people understand themselves better, they perform better. Over more than 20 years, he built a body of work that helped individuals, teams and organisations develop the confidence, self-awareness and resilience needed to truly thrive.",
      "His approach was never theory for theory's sake. It was grounded, human and direct, connecting insight with action in a way that stayed with people long after the work was done. That philosophy is the heart of everything Wiseheart does today.",
      "Richard's legacy lives in the work. In every workshop, every conversation and every person who leaves feeling more capable than when they arrived.",
    ],
  },
  {
    id: "fin",
    name: "Fin Thorp",
    role: "Sport & Performance Lead",
    photo: "/images/fin.jpg.jpeg",
    paragraphs: [
      "Fin leads the Sports and Performance aspect of Wiseheart, bringing a fresh perspective to the organisation's established approach. His work focuses on the psychological and emotional demands of sport and performance, supporting athletes, teams and coaches in developing psychological fortitude, flexibility, and flow.",
      "Through one-to-one sessions, group coaching and workshops, Fin's purpose is to support others to become their very own performance psychologists, whatever your performance context may be. His aim is to help people build the psychological awareness and skills to cultivate confidence, nurture motivation, and manage pressure with a flexible approach specifically designed to facilitate sustainable success.",
      "His work represents the next generation of Wiseheart, extending its principles into sport while remaining rooted in helping people move from coping to thriving.",
    ],
  },
];

export interface Testimonial {
  quote: string;
  name?: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The leadership programme completely changed how I lead. It's practical, honest and built on real integrity. I use what I learned every single day.",
    role: "Founder, Education Consultancy",
  },
  {
    quote: "The coaching challenged me, supported me and gave me real confidence in my own ability. I came away a better leader — and a better version of myself.",
    role: "Customer Experience Director",
  },
  {
    quote: "Years later, I still draw on the guidance and insight I gained. The impact on how I lead and how I relate to my team has lasted.",
    role: "SVP and General Manager",
  },
  {
    quote: "Fin really helped develop my mental fitness, adding an entirely different edge to my training and development as a competitor.",
    role: "Rowing Athlete",
  },
];
