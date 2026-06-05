"use client";

import { useTranslations } from "next-intl";
import { Youtube, ExternalLink, Eye } from "lucide-react";

export default function LiveSection() {
  const t = useTranslations("live");
  const home = useTranslations("home");

  return (
    <section className="section-padding bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="live-badge">
              <span className="live-dot" />
              LIVE
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">{home("live_darshan")}</h2>
          <p className="text-gray-400 mt-1">{t("darshan")}</p>
        </div>

        {/* Video Player Placeholder */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer shadow-xl">
              <Youtube size={36} />
            </div>
            <p className="text-xl font-bold mb-1">खारघरचा महाराजा</p>
            <p className="text-gray-400 text-sm">{t("no_live")}</p>
            <p className="text-gray-500 text-xs mt-1">{t("available")}</p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white text-sm">
              <Eye size={14} />
              <span>0 {t("watching")}</span>
            </div>
            <a
              href="https://www.youtube.com/@khargharChaMaharaja"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              <Youtube size={13} />
              @khargharChaMaharaja
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Platform Links */}
        <div className="mt-6">
          <p className="text-gray-400 text-sm text-center mb-3">{home("live_platform_links")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "YouTube", color: "bg-red-600 hover:bg-red-700", icon: "▶️", href: "https://www.youtube.com/@khargharChaMaharaja" },
              { name: "Instagram", color: "bg-pink-600 hover:bg-pink-700", icon: "📸", href: "https://www.instagram.com/kharghar_cha_maharaja" },
              { name: "Facebook", color: "bg-blue-600 hover:bg-blue-700", icon: "📘", href: "https://facebook.com" },
              { name: "Mobile App", color: "bg-saffron-500 hover:bg-saffron-600", icon: "📱", href: "#" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${platform.color} text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2`}
              >
                <span>{platform.icon}</span>
                {platform.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
