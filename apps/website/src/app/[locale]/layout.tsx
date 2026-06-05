import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "खारघरचा महाराजा | Khargharcha Maharaja",
  description:
    "Navnirman Sevabhavi Sanstha - Official Digital Platform for Khargharcha Maharaja. Ganesh Utsav, Events, Donations, Live Darshan.",
  keywords: ["Khargharcha Maharaja", "Ganesh Utsav", "Kharghar", "Navnirman", "Ganpati"],
  openGraph: {
    title: "खारघरचा महाराजा | Khargharcha Maharaja",
    description: "Official Digital Platform of Navnirman Sevabhavi Sanstha",
    type: "website",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "mr" | "hi" | "en" | "gu" | "bn" | "pa")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Cinzel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-cream`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
