"use client";

import { Document, Page, Text, View, StyleSheet, Image, Font, pdf } from "@react-pdf/renderer";
import type { LanguageCode } from "@/shared/constants/languages";

/** Entity-agnostic payload so this shared lib doesn't depend on the property entity. */
export interface BrochureData {
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  features: string[];
  image?: string;
  agent?: { name: string; phone: string; email: string };
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, color: "#0E0E0E", fontFamily: "Helvetica" },
  brand: { fontSize: 10, letterSpacing: 3, color: "#BD8B00", marginBottom: 18 },
  image: { width: "100%", height: 240, objectFit: "cover", borderRadius: 8, marginBottom: 18 },
  title: { fontSize: 26, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  location: { fontSize: 12, color: "#777777", marginBottom: 14 },
  price: { fontSize: 20, color: "#BD8B00", fontFamily: "Helvetica-Bold", marginBottom: 16 },
  specRow: { flexDirection: "row", gap: 24, marginBottom: 18 },
  spec: { fontSize: 11, color: "#444444" },
  heading: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#777777",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  body: { fontSize: 11, lineHeight: 1.6, color: "#333333", marginBottom: 16 },
  feature: { fontSize: 11, color: "#333333", marginBottom: 3 },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 40,
    right: 40,
    borderTop: "1px solid #E6E6E6",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
    color: "#777777",
  },
});

function Brochure({ data }: { data: BrochureData }) {
  return (
    <Document title={`${data.title} — Grand City`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>GRAND CITY · REAL ESTATE &amp; CONSULTING</Text>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image has no alt prop */}
        {data.image ? <Image src={data.image} style={styles.image} /> : null}
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.location}>{data.location}</Text>
        <Text style={styles.price}>{data.price}</Text>
        <View style={styles.specRow}>
          <Text style={styles.spec}>{data.beds} bedrooms</Text>
          <Text style={styles.spec}>{data.baths} bathrooms</Text>
          <Text style={styles.spec}>{data.sqft.toLocaleString()} sqft</Text>
        </View>
        <Text style={styles.heading}>About this home</Text>
        <Text style={styles.body}>{data.description}</Text>
        {data.features.length ? (
          <>
            <Text style={styles.heading}>Features</Text>
            {data.features.map((f) => (
              <Text key={f} style={styles.feature}>
                • {f}
              </Text>
            ))}
          </>
        ) : null}
        <View style={styles.footer}>
          <Text>{data.agent ? `${data.agent.name} · ${data.agent.phone}` : "Grand City"}</Text>
          <Text>{data.agent?.email ?? "hello@grandcity.studio"}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generateBrochure(data: BrochureData): Promise<Blob> {
  return pdf(<Brochure data={data} />).toBlob();
}

/* ---------------- Company presentation ---------------- */

/**
 * The built-in Helvetica has no Cyrillic or CJK glyphs, so each language gets a
 * font that covers its script. Registration is lazy — the browser only fetches a
 * TTF when a presentation in that language is actually generated.
 */
const FONTS: Record<LanguageCode, { family: string; register: () => void }> = {
  en: { family: "DejaVuSans", register: registerDejaVu },
  ru: { family: "DejaVuSans", register: registerDejaVu },
  ky: { family: "DejaVuSans", register: registerDejaVu },
  zh: { family: "DroidSansFallback", register: registerDroid },
};

const registered = new Set<string>();

function registerDejaVu() {
  if (registered.has("DejaVuSans")) return;
  Font.register({
    family: "DejaVuSans",
    fonts: [
      { src: "/fonts/DejaVuSans.ttf", fontWeight: "normal" },
      { src: "/fonts/DejaVuSans-Bold.ttf", fontWeight: "bold" },
    ],
  });
  registered.add("DejaVuSans");
}

function registerDroid() {
  if (registered.has("DroidSansFallback")) return;
  // One weight only — the CJK file is large and bold is faked by the renderer.
  Font.register({ family: "DroidSansFallback", src: "/fonts/DroidSansFallbackFull.ttf" });
  // CJK has no spaces, so the default word-boundary hyphenation would never break
  // a line. Splitting per character lets the layout wrap.
  Font.registerHyphenationCallback((word) => (/[\u4e00-\u9fff]/.test(word) ? [...word] : [word]));
  registered.add("DroidSansFallback");
}

/** Entity-agnostic payload — the caller supplies already-translated copy. */
export interface PresentationData {
  lang: LanguageCode;
  company: string;
  tagline: string;
  intro: string;
  servicesHeading: string;
  stats: { value: string; label: string }[];
  services: { title: string; body: string }[];
  contact: { phone: string; email: string; address: string };
}

const pres = StyleSheet.create({
  cover: { padding: 48, fontSize: 11, color: "#0E0E0E" },
  brand: { fontSize: 10, letterSpacing: 3, color: "#BD8B00", marginBottom: 90 },
  company: { fontSize: 40, fontWeight: "bold", marginBottom: 10 },
  tagline: { fontSize: 14, color: "#777777", marginBottom: 34 },
  intro: { fontSize: 11, lineHeight: 1.7, color: "#333333", maxWidth: 420 },
  statRow: { flexDirection: "row", flexWrap: "wrap", gap: 28, marginTop: 44 },
  statValue: { fontSize: 22, fontWeight: "bold", color: "#2BB24C" },
  statLabel: { fontSize: 9, color: "#777777", marginTop: 3 },
  page: { padding: 48, fontSize: 11, color: "#0E0E0E" },
  heading: { fontSize: 9, letterSpacing: 2, color: "#777777", marginBottom: 16 },
  svcTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 4 },
  svcBody: { fontSize: 10.5, lineHeight: 1.6, color: "#444444", marginBottom: 20 },
  contact: {
    marginTop: 30,
    borderTop: "1px solid #E6E6E6",
    paddingTop: 14,
    fontSize: 10,
    color: "#555555",
    lineHeight: 1.7,
  },
});

function Presentation({ data }: { data: PresentationData }) {
  const fontFamily = FONTS[data.lang].family;
  return (
    <Document title={`${data.company} — ${data.lang}`} language={data.lang}>
      <Page size="A4" style={[pres.cover, { fontFamily }]}>
        <Text style={pres.brand}>{data.company.toUpperCase()}</Text>
        <Text style={pres.company}>{data.company}</Text>
        <Text style={pres.tagline}>{data.tagline}</Text>
        <Text style={pres.intro}>{data.intro}</Text>
        <View style={pres.statRow}>
          {data.stats.map((s) => (
            <View key={s.label}>
              <Text style={pres.statValue}>{s.value}</Text>
              <Text style={pres.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </Page>

      <Page size="A4" style={[pres.page, { fontFamily }]}>
        <Text style={pres.heading}>{data.servicesHeading.toUpperCase()}</Text>
        {data.services.map((s) => (
          <View key={s.title}>
            <Text style={pres.svcTitle}>{s.title}</Text>
            <Text style={pres.svcBody}>{s.body}</Text>
          </View>
        ))}
        <View style={pres.contact}>
          <Text>{data.contact.phone}</Text>
          <Text>{data.contact.email}</Text>
          <Text>{data.contact.address}</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generatePresentation(data: PresentationData): Promise<Blob> {
  FONTS[data.lang].register();
  return pdf(<Presentation data={data} />).toBlob();
}
