export interface Stat {
  value: string;
  label: string;
}
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  detail: string;
}
export interface Faq {
  q: string;
  a: string;
}
export interface Value {
  title: string;
  body: string;
}

export const COMPANY_STATS: Stat[] = [
  { value: "320+", label: "Homes placed" },
  { value: "11", label: "Neighborhoods covered" },
  { value: "98%", label: "Of asking achieved" },
  { value: "4.9★", label: "Average client rating" },
];

export const VALUES: Value[] = [
  { title: "Local", body: "Every agent lives where they sell." },
  { title: "Honest", body: "Realistic numbers from day one." },
  { title: "Small", body: "A roster we can hold in mind." },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "They priced our place honestly when three other agents inflated it to win the listing — and still sold it above asking in nine days.",
    author: "Hannah & Wes Corrigan",
    detail: "Sold in Ladd's Addition · 2025",
  },
  {
    id: "t2",
    quote:
      "We were first-time buyers and completely overwhelmed. Mara talked us out of two houses before finding the one we actually needed.",
    author: "Daniel Okafor",
    detail: "Bought in Sellwood · 2025",
  },
  {
    id: "t3",
    quote:
      "Priya has managed our rental for three years and we genuinely never think about it. That's the whole point, isn't it?",
    author: "The Brennan family",
    detail: "Managed let, Pearl District",
  },
];

export const FAQS: Faq[] = [
  {
    q: "What areas do you cover?",
    a: "Eleven neighborhoods across inner Portland — concentrated on the east side, the Pearl, and the South Waterfront. If it's outside our patch, we'll tell you and point you to someone good.",
  },
  {
    q: "How do you price a home for sale?",
    a: "On the evidence — recent comparable sales, current competition, and the condition of your home. We give you a realistic number from day one, even when a higher one would win us the instruction.",
  },
  {
    q: "Do you charge for a valuation?",
    a: "No. A valuation and an honest conversation about your options are free, with no obligation to list with us afterwards.",
  },
  {
    q: "Can you help me let and manage a property?",
    a: "Yes — letting and full management are core services. We handle referencing, paperwork, maintenance and rent collection so it never becomes a second job.",
  },
  {
    q: "How quickly do you respond?",
    a: "We reply to every enquiry within one business day, usually much sooner.",
  },
];

export interface Partner {
  name: string;
  /** Optional external site. */
  href?: string;
  /** Optional logo in `/public` (e.g. "/images/partners/foo.svg"). Falls back to a wordmark. */
  logo?: string;
}

/** Companies we work with — shown in the homepage marquee. Drop a file in
 *  `public/images/partners/` and set `logo` to swap a wordmark for the real mark. */
export const PARTNERS: Partner[] = [
  { name: "Optima Bank" },
  { name: "Demir Bank" },
  { name: "Bakai Bank" },
  { name: "KICB" },
  { name: "Ayu Group" },
  { name: "Avangard Style" },
  { name: "Elite House" },
  { name: "Ihlas Group" },
];
