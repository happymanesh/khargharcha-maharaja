"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { Heart, Users, Award, Clock } from "lucide-react";

export default function VolunteerPage() {
  const t = useTranslations("volunteer");
  const [form, setForm] = useState({ name: "", phone: "", email: "", area: "", group: "", skills: [] as string[] });

  const volunteerGroups = [
    { key: "g_security", emoji: "🛡️", countKey: "120" },
    { key: "g_medical",  emoji: "🏥", countKey: "45" },
    { key: "g_welcome",  emoji: "🙏", countKey: "80" },
    { key: "g_food",     emoji: "🍱", countKey: "60" },
    { key: "g_decor",    emoji: "🎨", countKey: "35" },
    { key: "g_tech",     emoji: "💻", countKey: "25" },
    { key: "g_media",    emoji: "📸", countKey: "30" },
    { key: "g_clean",    emoji: "🧹", countKey: "50" },
  ];

  const skillKeys = ["sk_management","sk_medical","sk_tech","sk_arts","sk_education","sk_driving","sk_computer","sk_other"];

  const toggleSkill = (s: string) =>
    setForm((f) => ({ ...f, skills: f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s] }));

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <div className="text-5xl mb-3">🙏</div>
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80">{t("subtitle")}</p>
        </div>

        {/* Stats */}
        <div className="bg-saffron-50 border-b">
          <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Users,   value: "1,000+", labelKey: "stat_volunteers", color: "text-saffron-700" },
              { icon: Heart,   value: "15+",    labelKey: "stat_years",      color: "text-red-500" },
              { icon: Award,   value: "200+",   labelKey: "stat_events",     color: "text-gold-500" },
              { icon: Clock,   value: "50,000+",labelKey: "stat_hours",      color: "text-green-500" },
            ].map(({ icon: Icon, value, labelKey, color }) => (
              <div key={labelKey} className="text-center">
                <Icon size={22} className={`${color} mx-auto mb-1`} />
                <div className={`text-xl font-bold ${color}`}>{value}</div>
                <div className="text-gray-500 text-xs">{t(labelKey as "stat_volunteers")}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Groups */}
            <div>
              <h2 className="text-2xl font-bold text-maroon-950 mb-5">{t("groups_title")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {volunteerGroups.map((g) => (
                  <div key={g.key} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-1">{g.emoji}</div>
                    <div className="font-semibold text-sm text-gray-900">{t(g.key as "g_security")}</div>
                    <div className="text-saffron-700 text-xs font-semibold mt-1">{g.countKey} {t("stat_volunteers")}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-lg">
              <h2 className="text-xl font-bold text-maroon-950 mb-5">{t("form_title")}</h2>
              <div className="space-y-3">
                <input placeholder={t("name_ph")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
                <input placeholder={t("mobile_ph")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
                <input placeholder={t("email_ph")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
                <input placeholder={t("area_ph")} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
                <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}
                  className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none bg-white">
                  <option value="">{t("group_ph")}</option>
                  {volunteerGroups.map((g) => (
                    <option key={g.key} value={g.key}>{t(g.key as "g_security")}</option>
                  ))}
                </select>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{t("skills_label")}</p>
                  <div className="flex flex-wrap gap-2">
                    {skillKeys.map((sk) => (
                      <button key={sk} onClick={() => toggleSkill(sk)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          form.skills.includes(sk) ? "bg-saffron-500 border-saffron-500 text-white" : "border-gray-300 text-gray-600 hover:border-saffron-300"
                        }`}>
                        {t(sk as "sk_management")}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full btn-saffron flex items-center justify-center gap-2 mt-2">
                  <Heart size={16} />
                  {t("submit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
