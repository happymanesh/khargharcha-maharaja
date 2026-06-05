import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import NextImage from "next/image";

const albums = [
  { id: 1, key: "g1", count: 85,  type: "photo", src: "/images/Ganesh1.jpeg" },
  { id: 2, key: "g2", count: 42,  type: "photo", src: "/images/Dahihandi1.jpeg" },
  { id: 3, key: "g3", count: 28,  type: "photo", src: "/images/bloodDonation1.jpeg" },
  { id: 4, key: "g4", count: 65,  type: "photo", src: "/images/IMG_9534.jpeg" },
  { id: 5, key: "g5", count: 33,  type: "photo", src: "/images/IMG_9535.jpeg" },
  { id: 6, key: "g6", count: 120, type: "photo", src: "/images/IMG_9536.jpeg" },
  { id: 7, key: "g7", count: 19,  type: "photo", src: "/images/IMG_9537.jpeg" },
  { id: 8, key: "g8", count: 8,   type: "photo", src: "/images/IMG_9570.jpeg" },
];

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo and video gallery of Khargharcha Maharaja Ganesh Utsav and community events.",
};

export default async function GalleryPage() {
  const t = await getTranslations("gallery");

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80">{t("subtitle")}</p>
        </div>

        <div className="bg-white border-b sticky top-[68px] z-30">
          <div className="max-w-7xl mx-auto px-4 flex gap-2 py-3">
            {[t("all"), t("photos"), t("videos")].map((tab) => (
              <button key={tab} className="px-5 py-1.5 rounded-full text-sm font-semibold border border-gray-200 hover:bg-saffron-50 hover:border-saffron-300 hover:text-saffron-600 transition-colors text-gray-600">
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <div key={album.id} className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square">
                  <NextImage
                    src={album.src}
                    alt={t(album.key as "g1")}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="bg-white p-3">
                  <h3 className="font-bold text-sm text-gray-900 truncate">{t(album.key as "g1")}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {album.count} {album.type === "video" ? t("videos_label") : t("photos_label")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
