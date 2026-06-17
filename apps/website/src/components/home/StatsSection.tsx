"use client";

import { useTranslations } from "next-intl";
import { Users, Heart, Calendar, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "890+", labelKey: "stats_members", color: "text-saffron-700", bg: "bg-saffron-50" },
  { icon: Heart, value: "₹60 Lakhs+", labelKey: "stats_donations", color: "text-red-700", bg: "bg-red-50" },
  { icon: Calendar, value: "10+", labelKey: "stats_events", color: "text-blue-700", bg: "bg-blue-50" },
  { icon: Award, value: "62", labelKey: "stats_volunteers", color: "text-green-700", bg: "bg-green-50" },
];

export default function StatsSection() {
  const t = useTranslations("home");

  return (
    <section className="py-14 px-4 bg-gradient-to-r from-saffron-50 via-white to-saffron-50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, labelKey, color, bg }) => (
            <div
              key={labelKey}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`${bg} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <Icon size={26} className={color} />
              </div>
              <div className={`text-2xl sm:text-3xl font-bold ${color} mb-1`}>{value}</div>
              <div className="text-gray-500 text-sm">
                {t(labelKey as "stats_members")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
