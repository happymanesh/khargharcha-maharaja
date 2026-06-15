"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Heart, Calendar } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const t = useTranslations("hero");
  const { isRegistered, openRegistration } = useUser();
  const router = useRouter();

  const handleDonate = () => {
    if (isRegistered) {
      router.push("/donate");
    } else {
      openRegistration(() => router.push("/donate"));
    }
  };

  const handleVolunteer = () => {
    if (isRegistered) {
      router.push("/volunteer");
    } else {
      openRegistration(() => router.push("/volunteer"));
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/Ganesh1.jpeg"
        alt="Khargharcha Maharaja Ganesh Utsav"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/80 via-saffron-600/60 to-maroon-950/90" aria-hidden />

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

<div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-28 pb-16">
        {/* Tagline badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 mb-5 animate-fade-in">
          <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">{t("tagline")}</span>
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-8xl mb-1 animate-slide-up leading-tight"
          style={{
            fontFamily: "'Yatra One', serif",
            color: "#FF2200",
            WebkitTextStroke: "2px #FFD700",
            textShadow: "3px 3px 0 #8B0000, 5px 5px 0 rgba(0,0,0,0.4)",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
          }}
        >
          {t("title")}
        </h1>
        <p className="text-gold-300 text-lg sm:text-xl mb-1 animate-slide-up drop-shadow-lg" style={{ animationDelay: "0.1s" }}>
          {t("subtitle")}
        </p>
        {/* Reg. No. + 80G strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-2 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1 rounded-full">
            रजि. नं. महाराष्ट्र / १४६/२०१७ / रायगड
          </span>
          <span className="bg-black/30 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1 rounded-full">
            80G No. AACTN6650RF20241
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 my-5 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="h-px w-16 bg-gold-400/50" />
          <span className="text-gold-400 text-2xl">🕉</span>
          <div className="h-px w-16 bg-gold-400/50" />
        </div>

        <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up drop-shadow" style={{ animationDelay: "0.3s" }}>
          {t("description")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={handleDonate}
            className="flex items-center gap-2 bg-white text-maroon-950 hover:bg-gold-100 font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <Heart size={18} className="text-red-500" />
            {t("cta_donate")}
          </button>
          <Link
            href="/live"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {t("cta_live")}
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-2 border-2 border-white/70 text-white hover:bg-white/15 font-bold px-8 py-4 rounded-xl text-base transition-all duration-200"
          >
            <Calendar size={18} />
            {t("cta_events")}
          </Link>
        </div>


      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
        <span className="text-xs">↓</span>
      </div>
    </section>
  );
}
