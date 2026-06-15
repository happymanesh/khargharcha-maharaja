import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter, Yatra_One } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import RegistrationModal from "@/components/auth/RegistrationModal";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-display-devanagari",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const title = `${t("title")} | Navnirman Sevabhavi Sanstha`;
  const description =
    locale === "mr"
      ? "खारघर, नवी मुंबईचा सर्वात मोठा गणेश उत्सव. नवनिर्माण सेवाभावी संस्था — देणगी, उपक्रम, थेट दर्शन, स्वयंसेवक नोंदणी."
      : locale === "hi"
      ? "खारघर, नवी मुंबई का सबसे बड़ा गणेश उत्सव. दान, कार्यक्रम, लाइव दर्शन, स्वयंसेवक पंजीकरण."
      : "Kharghar, Navi Mumbai's grandest Ganesh Utsav. Donate, register for events, watch live darshan — Navnirman Sevabhavi Sanstha.";

  const url = `https://website-pi-ruddy-23.vercel.app/${locale}`;

  return {
    title: {
      default: title,
      template: `%s | Khargharcha Maharaja`,
    },
    description,
    keywords: [
      "Khargharcha Maharaja",
      "Ganesh Utsav Kharghar",
      "Navnirman Sevabhavi Sanstha",
      "Ganesh Festival Navi Mumbai",
      "Dahi Handi Kharghar",
      "Kharghar Ganpati",
      "Online Donation Ganesh",
      "Kharghar Events 2025",
    ],
    authors: [{ name: "Navnirman Sevabhavi Sanstha" }],
    creator: "Navnirman Sevabhavi Sanstha",
    publisher: "Navnirman Sevabhavi Sanstha",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      locale: locale === "mr" ? "mr_IN" : locale === "hi" ? "hi_IN" : "en_IN",
      url,
      siteName: "Khargharcha Maharaja",
      title,
      description,
      images: [
        {
          url: `https://website-pi-ruddy-23.vercel.app/images/Ganesh1.jpeg`,
          width: 1200,
          height: 630,
          alt: "Khargharcha Maharaja Ganesh Utsav",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://website-pi-ruddy-23.vercel.app/images/Ganesh1.jpeg`],
    },
    alternates: {
      canonical: url,
      languages: {
        "mr-IN": `https://website-pi-ruddy-23.vercel.app/mr`,
        "hi-IN": `https://website-pi-ruddy-23.vercel.app/hi`,
        "en-IN": `https://website-pi-ruddy-23.vercel.app/en`,
        "gu-IN": `https://website-pi-ruddy-23.vercel.app/gu`,
        "bn-IN": `https://website-pi-ruddy-23.vercel.app/bn`,
        "pa-IN": `https://website-pi-ruddy-23.vercel.app/pa`,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    metadataBase: new URL("https://website-pi-ruddy-23.vercel.app"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "mr" | "hi" | "en" | "gu" | "bn" | "pa" | "ta" | "te" | "ml" | "kn")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Cinzel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Navnirman Sevabhavi Sanstha",
              alternateName: "Khargharcha Maharaja",
              url: "https://website-pi-ruddy-23.vercel.app",
              logo: "https://website-pi-ruddy-23.vercel.app/images/Ganesh1.jpeg",
              description:
                "Navnirman Sevabhavi Sanstha — Kharghar, Navi Mumbai's premier social and cultural organisation organising Ganesh Utsav and community welfare activities.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kharghar",
                addressRegion: "Navi Mumbai",
                postalCode: "410210",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.instagram.com/kharghar_cha_maharaja",
                "https://www.youtube.com/@khargharChaMaharaja",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "navnirmansevabhavisanstha2018@gmail.com",
                availableLanguage: ["Marathi", "Hindi", "English", "Gujarati", "Bengali", "Punjabi", "Tamil", "Telugu", "Malayalam", "Kannada"],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${yatraOne.variable} bg-cream`}>
        <NextIntlClientProvider messages={messages}>
          <UserProvider>
            {children}
            <RegistrationModal />
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
