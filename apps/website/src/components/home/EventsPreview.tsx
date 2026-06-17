"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useGatedAction } from "@/hooks/useGatedAction";
import { useRouter } from "next/navigation";

const events = [
  {
    id: 1, titleKey: "ganesh_utsav",   date: "14 Sep 2026, Friday",  time: "10:00 AM", venue: "Sector 20, Kharghar",
    color: "bg-saffron-500", emoji: "🐘", registered: 1240, image: "/images/Ganesh1.jpeg",
  },
  {
    id: 2, titleKey: "dahi_handi",     date: "05 Sep 2026, Saturday", time: "09:00 AM", venue: "Kharghar Central Park",
    color: "bg-blue-600", emoji: "🏺", registered: 856, image: "/images/Dahihandi1.jpeg",
  },
  {
    id: 3, titleKey: "blood_donation", date: "TBD 2026",              time: "08:00 AM", venue: "Community Hall, Sector 12",
    color: "bg-red-600", emoji: "❤️", registered: 320, image: "/images/bloodDonation1.jpeg",
  },
  {
    id: 4, titleKey: "medical_camp",   date: "TBD 2026",              time: "09:00 AM", venue: "Sector 7, Kharghar",
    color: "bg-green-600", emoji: "🏥", registered: 210, image: "/images/medicalcamp.jpeg",
  },
];

export default function EventsPreview() {
  const t = useTranslations("home");
  const ev = useTranslations("events");
  const gate = useGatedAction();
  const router = useRouter();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
          <div>
            <p className="text-saffron-700 font-semibold text-sm uppercase tracking-wider mb-1">
              📅 {t("upcoming_events")}
            </p>
            <h2 className="text-3xl font-bold text-maroon-950">{t("upcoming_events")}</h2>
          </div>
          <Link href="/events" className="mt-4 sm:mt-0 flex items-center gap-1 text-saffron-700 hover:text-saffron-600 font-semibold text-sm group">
            {t("view_all")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => gate(() => router.push(`/events/${event.id}`))}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer"
            >
              <div className={`relative ${event.image ? "" : event.color} h-40 overflow-hidden`}>
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={ev(event.titleKey as "ganesh_utsav")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className={`${event.color} w-full h-full flex items-center justify-center text-5xl`}>
                    {event.emoji}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">
                      {ev(event.titleKey as "ganesh_utsav")}
                    </h3>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs inline-block mt-1">
                      {event.registered} {t("register_count")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar size={14} className="text-saffron-700 shrink-0" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={14} className="text-saffron-700 shrink-0" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={14} className="text-saffron-700 shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
