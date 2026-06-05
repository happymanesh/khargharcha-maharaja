"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import NextImage from "next/image";

const galleryItems = [
  { id: 1, key: "g1", type: "photo", bg: "from-saffron-400 to-saffron-600", isReal: true },
  { id: 2, key: "g2", type: "photo", bg: "from-blue-400 to-blue-600", isReal: false },
  { id: 3, key: "g3", type: "photo", bg: "from-red-400 to-red-600", isReal: false },
  { id: 4, key: "g4", type: "video", bg: "from-purple-400 to-purple-600", isReal: false, wide: true },
  { id: 5, key: "g5", type: "photo", bg: "from-green-400 to-green-600", isReal: false },
  { id: 6, key: "g6", type: "photo", bg: "from-gold-400 to-gold-600", isReal: false },
];

export default function GalleryPreview() {
  const t = useTranslations("home");
  const g = useTranslations("gallery");

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <p className="text-saffron-500 font-semibold text-sm uppercase tracking-wider mb-1">
              📸 {t("gallery_title")}
            </p>
            <h2 className="text-3xl font-bold text-maroon-950">
              {g("title")}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="mt-4 sm:mt-0 flex items-center gap-1 text-saffron-500 hover:text-saffron-600 font-semibold text-sm group"
          >
            {t("view_all")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${item.wide ? "col-span-2" : ""}`}
            >
              {item.isReal ? (
                <div className="relative aspect-square">
                  <NextImage
                    src="/images/Ganesh1.jpeg"
                    alt={g(item.key as "g1")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ) : (
                <div className={`bg-gradient-to-br ${item.bg} aspect-square flex flex-col items-center justify-center`}>
                  <ImageIcon size={32} className="text-white/60 mb-2" />
                  <p className="text-white/80 text-xs text-center px-2">{g(item.key as "g1")}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-center px-2">
                  <p className="text-white font-bold text-sm">{g(item.key as "g1")}</p>
                  <p className="text-white/70 text-xs capitalize">{item.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
