"use client";

import { useTranslations } from "next-intl";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useGatedAction } from "@/hooks/useGatedAction";
import { useRouter } from "next/navigation";

const allEvents = [
  { id: 1,  emoji: "🐘", type: "Ganesh Utsav",    color: "bg-saffron-500",  name: "गणेश उत्सव",           nameEn: "Ganesh Utsav",           date: "14 Sep 2026, Friday",   time: "All Day",            venue: "Sector 20, Kharghar",       desc: "खारघरच्या महाराजाचे भव्य गणेश उत्सव — 21 दिवसांचा उत्सव, आरती, सांस्कृतिक कार्यक्रम व मिरवणूक.", image: "/images/Ganesh1.jpeg" },
  { id: 2,  emoji: "🏺", type: "Dahi Handi",       color: "bg-blue-600",    name: "दही हंडी",              nameEn: "Dahi Handi",             date: "05 Sep 2026, Saturday", time: "09:00 AM",           venue: "Sector 20, Kharghar",       desc: "उत्साहात साजरी होणारी गोविंदा दही हंडी — थरांवर थर रचत श्रीकृष्ण जन्माचा आनंद.", image: "/images/Dahihandi1.jpeg" },
  { id: 3,  emoji: "🌈", type: "Festival",         color: "bg-pink-500",    name: "होळी",                  nameEn: "Holi",                   date: "Mar 2027",              time: "All Day",            venue: "Kharghar Ground",           desc: "रंगांचा उत्सव — होळी पौर्णिमेनिमित्त सामूहिक होळी व रंगपंचमी कार्यक्रम.", image: null },
  { id: 4,  emoji: "🇮🇳", type: "National",        color: "bg-green-600",   name: "स्वातंत्र्य दिन",       nameEn: "Independence Day",       date: "15 Aug 2026",           time: "08:00 AM",           venue: "Sector 20, Kharghar",       desc: "भारताच्या स्वातंत्र्याचा 79वा वर्धापन दिन — ध्वजारोहण, प्रभात फेरी व सांस्कृतिक कार्यक्रम.", image: null },
  { id: 5,  emoji: "🏅", type: "National",         color: "bg-blue-700",    name: "प्रजासत्ताक दिन",      nameEn: "Republic Day",           date: "26 Jan 2027",           time: "08:00 AM",           venue: "Sector 20, Kharghar",       desc: "प्रजासत्ताक दिनानिमित्त ध्वजारोहण, मार्चपास्ट व प्रतिज्ञा कार्यक्रम.", image: null },
  { id: 6,  emoji: "🌾", type: "Cultural",         color: "bg-yellow-600",  name: "आगरी कोळी महोत्सव",    nameEn: "Agri Koli Mohotsav",     date: "TBD 2026",              time: "All Day",            venue: "Kharghar",                  desc: "स्थानिक आगरी-कोळी संस्कृतीचा उत्सव — पारंपरिक नृत्य, संगीत, पोशाख व खाद्यपदार्थ.", image: null },
  { id: 7,  emoji: "📚", type: "Social Welfare",   color: "bg-indigo-600",  name: "शालेय पुस्तक वाटप",    nameEn: "School Book Donation",   date: "Jun 2026",              time: "10:00 AM",           venue: "Kharghar Schools",          desc: "नवीन शैक्षणिक वर्षाच्या सुरुवातीला गरजू विद्यार्थ्यांना मोफत पाठ्यपुस्तके वाटप.", image: null },
  { id: 8,  emoji: "🏥", type: "Medical",          color: "bg-green-700",   name: "वैद्यकीय शिबीर",       nameEn: "Medical Camp",           date: "TBD 2026",              time: "09:00 AM – 4:00 PM", venue: "Sector 20, Kharghar",       desc: "मोफत आरोग्य तपासणी शिबीर — रक्तदाब, साखर, डोळे, दात व सामान्य तपासणी.", image: null },
  { id: 9,  emoji: "❤️", type: "Social Welfare",   color: "bg-red-600",     name: "रक्तदान शिबीर",        nameEn: "Blood Donation",         date: "TBD 2026",              time: "08:00 AM – 2:00 PM", venue: "Community Hall, Kharghar",  desc: "जीवन वाचवणारे रक्तदान शिबीर — स्वयंसेवकांसाठी प्रमाणपत्र व सन्मान.", image: "/images/bloodDonation1.jpeg" },
  { id: 10, emoji: "📣", type: "Social Welfare",   color: "bg-purple-600",  name: "सामाजिक जनजागृती",     nameEn: "Social Awareness",       date: "TBD 2026",              time: "All Day",            venue: "Kharghar",                  desc: "पर्यावरण, स्वच्छता, महिला सुरक्षा व आरोग्य विषयांवर जनजागृती मोहीम.", image: null },
];

export default function EventsPage() {
  const t = useTranslations("events");
  const gate = useGatedAction();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80">नवनिर्माण सेवाभावी संस्थेचे उपक्रम व कार्यक्रम</p>
        </div>

        <div className="bg-white border-b sticky top-[68px] z-30">
          <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto py-3">
            {[t("filter_all"), "Ganesh Utsav", "Social Welfare", "Medical", "Cultural", "National"].map((cat) => (
              <button key={cat} className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200 hover:bg-saffron-50 hover:border-saffron-300 hover:text-saffron-600 transition-colors text-gray-600">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => (
              <article key={event.id} onClick={() => gate(() => router.push(`/events/${event.id}`))} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.nameEn}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className={`${event.color} w-full h-full flex items-center justify-center text-6xl`}>
                      {event.emoji}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">{event.type}</span>
                      <h2 className="font-bold text-white text-xl mt-1">{event.name}</h2>
                      <p className="text-white/70 text-xs">{event.nameEn}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.desc}</p>

                  <div className="space-y-2 mb-5 text-sm text-gray-500">
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-saffron-500" />{event.date}</div>
                    <div className="flex items-center gap-2"><Clock size={14} className="text-saffron-500" />{event.time}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-saffron-500" />{event.venue}</div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
