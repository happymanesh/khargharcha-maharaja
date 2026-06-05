import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";

const allEvents = [
  { id: 1, titleKey: "ganesh_utsav",   descKey: "description_ganesh",     date: "Aug 27 – Sep 7, 2025",   time: "All Day",           venue: "Sector 20, Kharghar",         type: "Ganesh Utsav",    emoji: "🐘", color: "bg-saffron-500", registered: 1240, capacity: 5000 },
  { id: 2, titleKey: "dahi_handi",     descKey: "description_dahi",       date: "Aug 26, 2025",            time: "09:00 AM",          venue: "Kharghar Central Park",       type: "Dahi Handi",      emoji: "🏺", color: "bg-blue-600",   registered: 856,  capacity: 2000 },
  { id: 3, titleKey: "blood_donation", descKey: "description_blood",      date: "Jul 15, 2025",            time: "08:00 AM – 2:00 PM",venue: "Community Hall, Sector 12",   type: "Social Welfare",  emoji: "❤️", color: "bg-red-600",    registered: 320,  capacity: 500  },
  { id: 4, titleKey: "medical_camp",   descKey: "description_medical",    date: "Jul 20, 2025",            time: "09:00 AM – 4:00 PM",venue: "Sector 7 Ground, Kharghar",   type: "Medical",         emoji: "🏥", color: "bg-green-600",  registered: 210,  capacity: 1000 },
  { id: 5, titleKey: "cultural",       descKey: "description_cultural",   date: "Sep 5, 2025",             time: "06:00 PM",          venue: "Kharghar Auditorium",         type: "Cultural",        emoji: "🎭", color: "bg-purple-600", registered: 680,  capacity: 1500 },
  { id: 6, titleKey: "social_welfare", descKey: "description_educational",date: "Aug 10, 2025",            time: "10:00 AM",          venue: "Sector 15, Kharghar",         type: "Educational",     emoji: "📚", color: "bg-indigo-600", registered: 145,  capacity: 500  },
];

export default async function EventsPage() {
  const t = await getTranslations("events");

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80">Upcoming Events & Programs</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border-b sticky top-[68px] z-30">
          <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto py-3">
            {[t("filter_all"), "Ganesh Utsav", "Social Welfare", "Medical", "Cultural", "Educational"].map((cat) => (
              <button key={cat} className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-saffron-50 hover:border-saffron-300 hover:text-saffron-600 border-gray-200 text-gray-600">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => {
              const pct = Math.round((event.registered / event.capacity) * 100);
              return (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className={`${event.color} p-6 text-white`}>
                    <div className="flex items-start justify-between">
                      <div className="text-4xl">{event.emoji}</div>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{event.type}</span>
                    </div>
                    <h3 className="font-bold text-xl mt-3 leading-tight">
                      {t(event.titleKey as "ganesh_utsav")}
                    </h3>
                  </div>

                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {t(event.descKey as "description_ganesh")}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm"><Calendar size={14} className="text-saffron-500" />{event.date}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm"><Clock size={14} className="text-saffron-500" />{event.time}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm"><MapPin size={14} className="text-saffron-500" />{event.venue}</div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="flex items-center gap-1"><Users size={11} /> {event.registered} {t("registrations")}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${event.color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    <Link href={`/events/${event.id}`} className="block text-center btn-saffron py-2.5 text-sm">
                      {t("register_now")}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
