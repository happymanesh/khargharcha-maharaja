"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock } from "lucide-react";

const newsItems = [
  { id: 1, titleKey: "n1_title", excerptKey: "n1_excerpt", date: "14 Sep 2026",  category: "Announcement", color: "border-l-saffron-500" },
  { id: 2, titleKey: "n2_title", excerptKey: "n2_excerpt", date: "TBD 2026",     category: "Social",        color: "border-l-red-500" },
  { id: 3, titleKey: "n3_title", excerptKey: "n3_excerpt", date: "TBD 2026",     category: "Medical",       color: "border-l-green-500" },
  { id: 4, titleKey: "n4_title", excerptKey: "n4_excerpt", date: "14 Sep 2026",  category: "Volunteer",     color: "border-l-blue-500" },
];

export default function NewsSection() {
  const t = useTranslations("home");
  const n = useTranslations("news");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <p className="text-saffron-700 font-semibold text-sm uppercase tracking-wider mb-1">
              📰 {t("news_title")}
            </p>
            <h2 className="text-3xl font-bold text-maroon-950">
              {n("section_title")}
            </h2>
          </div>
          <Link
            href="/news"
            className="mt-4 sm:mt-0 flex items-center gap-1 text-saffron-700 hover:text-saffron-600 font-semibold text-sm group"
          >
            {n("view_all")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className={`block bg-white rounded-xl p-5 border border-gray-100 border-l-4 ${item.color} hover:shadow-lg transition-all duration-200 group`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-semibold">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-gray-400 text-xs shrink-0">
                  <Clock size={12} />
                  {item.date}
                </div>
              </div>
              <h3 className="font-bold text-maroon-950 text-base mb-1 group-hover:text-saffron-600 transition-colors">
                {n(item.titleKey as "n1_title")}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {n(item.excerptKey as "n1_excerpt")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
