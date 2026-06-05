import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";
import { Youtube, Eye, Bell } from "lucide-react";

export default async function LivePage() {
  const t = await getTranslations("live");

  const upcomingStreams = [
    { titleKey: "ganesh_aagman", date: "Aug 27, 2025 — 8:00 AM", platform: "YouTube" },
    { titleKey: "maha_aarti",    date: "Aug 27, 2025 — 7:00 PM", platform: "YouTube + Facebook" },
    { titleKey: "dahi_handi_live", date: "Aug 26, 2025 — 9:00 AM", platform: "YouTube" },
    { titleKey: "visarjan",      date: "Sep 7, 2025 — 8:00 AM",  platform: "All Platforms" },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-950 min-h-screen">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80">{t("darshan")}</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Main Player */}
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-8">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <a
                href="https://www.youtube.com/@khargharChaMaharaja"
                target="_blank"
                rel="noopener noreferrer"
                className="w-24 h-24 bg-red-600/80 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform shadow-2xl"
              >
                <Youtube size={42} />
              </a>
              <p className="text-xl font-bold mb-1">खारघरचा महाराजा</p>
              <p className="text-gray-400 text-sm">{t("no_live")}</p>
              <div className="flex items-center gap-2 text-gray-500 text-xs mt-3">
                <Eye size={13} />
                <span>{t("available")}</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { name: "YouTube",   color: "bg-red-600",  icon: "▶️", href: "https://www.youtube.com/@khargharChaMaharaja",          handle: "@khargharChaMaharaja" },
              { name: "Instagram", color: "bg-gradient-to-br from-pink-500 to-purple-600", icon: "📸", href: "https://www.instagram.com/kharghar_cha_maharaja", handle: "@kharghar_cha_maharaja" },
              { name: "Facebook",  color: "bg-blue-600", icon: "📘", href: "https://facebook.com",                                  handle: "/KhargharchaMaharaja" },
              { name: "App",       color: "bg-saffron-500", icon: "📱", href: "#",                                                  handle: "Download App" },
            ].map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                className={`${p.color} text-white rounded-xl p-4 text-center hover:opacity-90 transition-opacity block`}>
                <div className="text-2xl mb-1">{p.icon}</div>
                <div className="font-bold text-sm">{p.name}</div>
                <div className="text-white/70 text-xs mt-0.5 truncate">{p.handle}</div>
              </a>
            ))}
          </div>

          {/* Upcoming Streams */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Bell size={20} className="text-saffron-400" />
              <h2 className="text-white font-bold text-xl">{t("upcoming")}</h2>
            </div>
            <div className="space-y-3">
              {upcomingStreams.map((stream, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold">{t(stream.titleKey as "ganesh_aagman")}</h3>
                    <p className="text-gray-400 text-sm">{stream.date}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-gray-500 text-xs">{stream.platform}</span>
                    <button className="flex items-center gap-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs px-3 py-1.5 rounded-lg transition-colors">
                      <Bell size={11} />
                      {t("remind")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
