"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

const events = [
  { id: 1, titleKey: "ganesh_utsav", date: "Aug 27, 2025", time: "10:00 AM", venue: "Sector 20, Kharghar", color: "bg-saffron-500", emoji: "🐘", registered: 1240 },
  { id: 2, titleKey: "dahi_handi",   date: "Aug 26, 2025", time: "09:00 AM", venue: "Kharghar Central Park", color: "bg-blue-600", emoji: "🏺", registered: 856 },
  { id: 3, titleKey: "blood_donation", date: "Jul 15, 2025", time: "08:00 AM", venue: "Community Hall, Sector 12", color: "bg-red-600", emoji: "❤️", registered: 320 },
  { id: 4, titleKey: "medical_camp", date: "Jul 20, 2025", time: "09:00 AM", venue: "Sector 7, Kharghar", color: "bg-green-600", emoji: "🏥", registered: 210 },
];

export default function EventsPreview() {
  const t = useTranslations("home");
  const ev = useTranslations("events");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
          <div>
            <p className="text-saffron-500 font-semibold text-sm uppercase tracking-wider mb-1">
              📅 {t("upcoming_events")}
            </p>
            <h2 className="text-3xl font-bold text-maroon-950">
              {t("upcoming_events")}
            </h2>
          </div>
          <Link
            href="/events"
            className="mt-4 sm:mt-0 flex items-center gap-1 text-saffron-500 hover:text-saffron-600 font-semibold text-sm transition-colors group"
          >
            {t("view_all")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className={`${event.color} p-5 text-white relative`}>
                <div className="text-4xl mb-2">{event.emoji}</div>
                <h3 className="font-bold text-lg leading-tight">
                  {ev(event.titleKey as "ganesh_utsav")}
                </h3>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs">
                  {event.registered} {t("register_count")}
                </div>
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar size={14} className="text-saffron-500 shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={14} className="text-saffron-500 shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={14} className="text-saffron-500 shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="mt-3 block text-center btn-saffron py-2 text-sm"
                >
                  {ev("register_now")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
