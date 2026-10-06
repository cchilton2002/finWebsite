import { defineArrayMember, defineField, defineType, type ConditionalPropertyCallbackContext } from "sanity";

// Topics shown in the site's filter. Add or rename here; the site picks them up automatically.
export const categories = ["Leadership", "Sport & performance", "Wellbeing"];

const kindOf = (c: ConditionalPropertyCallbackContext) => (c.document as { kind?: string } | undefined)?.kind;
const isPdf = (c: ConditionalPropertyCallbackContext) => kindOf(c) !== "PDF"; // hide the PDF field unless type is PDF
const isArticle = (c: ConditionalPropertyCallbackContext) => kindOf(c) !== "Article"; // hide the article body unless type is Article

export default defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: { list: ["Article", "PDF"], layout: "radio" },
      initialValue: "Article",
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required().max(90) }),
    defineField({
      name: "slug",
      title: "Page address",
      type: "slug",
      description: "Click Generate. This becomes the web address of the article.",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", title: "Topic", type: "string", options: { list: categories }, validation: (r) => r.required() }),
    defineField({
      name: "publishedAt",
      title: "Date",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      description: "Resources are shown newest first.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "One or two sentences, shown in the list.",
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "file",
      title: "PDF file",
      type: "file",
      options: { accept: "application/pdf" },
      hidden: isPdf,
      validation: (r) => r.custom((v, ctx) => ((ctx.document as { kind?: string })?.kind === "PDF" && !v ? "Upload the PDF" : true)),
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "array",
      hidden: isArticle,
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullets", value: "bullet" }, { title: "Numbered", value: "number" }],
          marks: {
            decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }],
            annotations: [
              { name: "link", type: "object", title: "Link", fields: [defineField({ name: "href", type: "url", title: "Web address" })] },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Description of the image" })],
        }),
      ],
      validation: (r) => r.custom((v, ctx) => ((ctx.document as { kind?: string })?.kind === "Article" && (!v || v.length === 0) ? "Write the article" : true)),
    }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", kind: "kind", date: "publishedAt" },
    prepare: ({ title, kind, date }) => ({ title, subtitle: `${kind ?? ""} · ${date ?? ""}` }),
  },
});
