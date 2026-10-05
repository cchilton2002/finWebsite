// TODO: placeholder entries. These will come from the CMS later.
export interface Resource {
  id: string;
  title: string;
  kind: "Article" | "PDF";
  category: "Leadership" | "Sport & performance" | "Wellbeing";
  date: string; // ISO
  summary: string;
  href?: string; // PDF file or article URL
}

export const resources: Resource[] = [
  { id: "1", title: "Leading under pressure", kind: "Article", category: "Leadership", date: "2026-09-12", summary: "What changes in how we think and decide when the stakes rise, and how to stay flexible.", href: "#" },
  { id: "2", title: "The performance reset checklist", kind: "PDF", category: "Sport & performance", date: "2026-09-02", summary: "A one-page routine for refocusing between moments, sessions and matches.", href: "#" },
  { id: "3", title: "Self-awareness as a leadership skill", kind: "Article", category: "Leadership", date: "2026-08-20", summary: "Why understanding yourself comes before influencing anyone else.", href: "#" },
  { id: "4", title: "From coping to thriving", kind: "Article", category: "Wellbeing", date: "2026-08-05", summary: "Moving beyond getting through the week towards sustainable confidence.", href: "#" },
  { id: "5", title: "Flow: a practical guide", kind: "PDF", category: "Sport & performance", date: "2026-07-18", summary: "Conditions that help athletes and teams find flow, and what gets in the way.", href: "#" },
  { id: "6", title: "Conversations that change teams", kind: "Article", category: "Leadership", date: "2026-07-01", summary: "Small shifts in how leaders talk that build trust and accountability.", href: "#" },
];
