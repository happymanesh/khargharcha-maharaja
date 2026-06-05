"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { CheckCircle, Star } from "lucide-react";

export default function MembershipPage() {
  const t = useTranslations("membership");
  const [selected, setSelected] = useState("gold");

  const plans = [
    {
      type: "general",
      price: t("price_general"),
      color: "border-gray-300",
      badge: "bg-gray-100 text-gray-700",
      icon: "👤",
      features: [t("feat_digital_card"), t("feat_event_info"), t("feat_newsletter")],
    },
    {
      type: "silver",
      price: t("price_silver"),
      color: "border-gray-400",
      badge: "bg-gray-200 text-gray-800",
      icon: "🥈",
      features: [t("feat_digital_card"), t("feat_priority"), t("feat_volunteer")],
    },
    {
      type: "gold",
      price: t("price_gold"),
      color: "border-gold-400",
      badge: "bg-gold-100 text-gold-800",
      icon: "🥇",
      featured: true,
      features: [t("feat_vip"), t("feat_monthly"), t("feat_certificate"), t("feat_priority")],
    },
    {
      type: "platinum",
      price: t("price_platinum"),
      color: "border-saffron-400",
      badge: "bg-saffron-100 text-saffron-800",
      icon: "💎",
      features: [t("feat_committee"), t("feat_report"), t("feat_sponsor"), t("feat_vip")],
    },
    {
      type: "lifetime",
      price: t("price_lifetime"),
      color: "border-maroon-700",
      badge: "bg-maroon-100 text-maroon-800",
      icon: "🏆",
      features: [t("feat_lifetime_mem"), t("feat_honor"), t("feat_plaque"), t("feat_vip")],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80">{t("benefits")}</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-14">
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            {t("intro")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
            {plans.map((plan) => (
              <div
                key={plan.type}
                onClick={() => setSelected(plan.type)}
                className={`relative bg-white rounded-2xl p-5 border-2 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${plan.color} ${selected === plan.type ? "shadow-xl scale-105" : "shadow-sm"} ${plan.featured ? "ring-2 ring-gold-400 ring-offset-2" : ""}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={10} fill="white" />
                    {t("popular")}
                  </div>
                )}
                <div className="text-3xl mb-2">{plan.icon}</div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${plan.badge}`}>
                  {t(`types.${plan.type}` as "types.general")}
                </span>
                <p className="text-saffron-600 font-bold text-sm mt-2">{plan.price}</p>
                <ul className="mt-3 space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-gray-600 text-xs">
                      <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <div className="max-w-lg mx-auto bg-white border border-gray-100 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-maroon-950 mb-2">{t("register_title")}</h2>
            <p className="text-gray-500 text-sm mb-5">
              {t("selected_plan")}: <strong className="text-saffron-600">{t(`types.${selected}` as "types.general")}</strong>
            </p>
            <div className="space-y-3">
              <input placeholder={t("name_ph")} className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
              <input placeholder={t("mobile_ph")} className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
              <input placeholder={t("email_ph")} className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
              <input placeholder={t("address_ph")} className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
              <button className="w-full btn-saffron">
                {t("submit")} — {plans.find((p) => p.type === selected)?.price}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
