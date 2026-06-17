"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Heart, Shield, Receipt, ChevronRight } from "lucide-react";

const amounts = [501, 1001, 2100, 5100, 11000, 21000];

const categories = [
  { key: "ganesh_utsav", descKey: "cat_desc_ganesh", emoji: "🐘", color: "bg-saffron-100 border-saffron-300 text-saffron-800" },
  { key: "annadan",      descKey: "cat_desc_annadan", emoji: "🍱", color: "bg-green-100 border-green-300 text-green-800" },
  { key: "medical",      descKey: "cat_desc_medical", emoji: "🏥", color: "bg-red-100 border-red-300 text-red-800" },
  { key: "education",    descKey: "cat_desc_education", emoji: "📚", color: "bg-blue-100 border-blue-300 text-blue-800" },
  { key: "disaster_relief", descKey: "cat_desc_disaster", emoji: "🆘", color: "bg-orange-100 border-orange-300 text-orange-800" },
  { key: "general",      descKey: "cat_desc_general", emoji: "🙏", color: "bg-purple-100 border-purple-300 text-purple-800" },
];

export default function DonateSection() {
  const t = useTranslations("home");
  const d = useTranslations("donate");
  const [selectedAmount, setSelectedAmount] = useState(1001);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ganesh_utsav");

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;

  return (
    <section className="section-padding bg-gradient-to-br from-maroon-950 via-maroon-800 to-maroon-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/10 rounded-full -translate-y-32 translate-x-32" aria-hidden />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/10 rounded-full translate-y-24 -translate-x-24" aria-hidden />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-saffron-400 font-semibold text-sm uppercase tracking-wider mb-2">
            ❤️ {d("title")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {t("donate_section_title")}
          </h2>
          <p className="text-gray-300">{t("donate_section_subtitle")}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8">
          {/* Category selection */}
          <div className="mb-6">
            <p className="text-gray-300 text-sm mb-3">{t("donate_category_label")}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`p-3 rounded-xl border text-xs text-center transition-all duration-200 ${
                    selectedCategory === cat.key
                      ? cat.color + " scale-105 shadow-lg"
                      : "bg-white/10 border-white/20 text-gray-300 hover:bg-white/15"
                  }`}
                >
                  <div className="text-xl mb-1">{cat.emoji}</div>
                  {d(`categories.${cat.key}` as "categories.ganesh_utsav")}
                </button>
              ))}
            </div>
          </div>

          {/* Amount selection */}
          <div className="mb-6">
            <p className="text-gray-300 text-sm mb-3">{t("donate_amount_label")}</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  className={`py-2.5 px-2 rounded-lg text-sm font-bold border transition-all duration-200 ${
                    selectedAmount === amt && !customAmount
                      ? "bg-saffron-700 border-saffron-700 text-white shadow-lg"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder={`${d("custom_amount")} (₹)`}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-saffron-400 text-sm"
            />
          </div>

          {/* Summary + CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 bg-white/10 rounded-xl p-4 text-center sm:text-left">
              <p className="text-gray-600 text-xs mb-1">{d("total_amount")}</p>
              <p className="text-white text-3xl font-bold">
                ₹{activeAmount > 0 ? activeAmount.toLocaleString("en-IN") : "—"}
              </p>
            </div>
            <Link
              href={`/donate?amount=${activeAmount}&category=${selectedCategory}`}
              className="flex items-center gap-2 bg-saffron-700 hover:bg-saffron-800 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              <Heart size={18} />
              {d("donate_now")}
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600 text-xs">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-green-400" />
              <span>SSL Secured Payment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Receipt size={14} className="text-gold-400" />
              <span>{d("tax_benefit")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>📧</span>
              <span>{d("receipt_info")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
