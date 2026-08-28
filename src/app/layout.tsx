import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/cormorant-garamond/700-italic.css";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { I18nProvider } from "@/shared/i18n";
import { getLang } from "@/shared/i18n/server";
import { env } from "@/shared/config/env";
import { appConfig } from "@/shared/config/app.config";

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: `${appConfig.name} · ${appConfig.tagline}`,
    template: `%s · ${appConfig.name}`,
  },
  description: appConfig.description,
  keywords: [
    "Portland real estate",
    "boutique property",
    "homes for sale",
    "lettings",
    "Grand City",
  ],
  openGraph: {
    type: "website",
    title: `${appConfig.name} · ${appConfig.tagline}`,
    description: appConfig.description,
    siteName: appConfig.name,
    url: env.SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <I18nProvider initialLang={lang}>{children}</I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
