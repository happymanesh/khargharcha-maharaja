"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Play } from "lucide-react";
import NextImage from "next/image";

const galleryItems = [
  { id: 1, key: "g1", type: "photo", src: "/images/Ganesh1.jpeg" },
  { id: 2, key: "g2", type: "photo", src: "/images/Dahihandi1.jpeg" },
  { id: 3, key: "g3", type: "photo", src: "/images/bloodDonation1.jpeg" },
  { id: 4, key: "g4", type: "photo", src: "/images/IMG_9534.jpeg", wide: true },
  { id: 5, key: "g5", type: "photo", src: "/images/IMG_9535.jpeg" },
  { id: 6, key: "g6", type: "photo", src: "/images/IMG_9536.jpeg" },
];

export default function GalleryPreview() {
  const t = useTranslations("home");
  const g = useTranslations("gallery");

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <p className="text-saffron-700 font-semibold text-sm uppercase tracking-wider mb-1">
              📸 {t("gallery_title")}
            </p>
            <h2 className="text-3xl font-bold text-maroon-950">{g("title")}</h2>
          </div>
          <Link href="/gallery" className="mt-4 sm:mt-0 flex items-center gap-1 text-saffron-700 hover:text-saffron-600 font-semibold text-sm group">
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
              <div className="relative aspect-square">
                <NextImage
                  src={item.src}
                  alt={g(item.key as "g1")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                    <Play size={20} className="text-white ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {g(item.key as "g1")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
