import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

const committee = [
  { name: "श्री. प्रसाद प्र. परब", nameEn: "Prasad P. Parab", role: "संस्थापक अध्यक्ष / Founding President", initial: "प" },
  { name: "श्रीमती. यलुशा गि. कुंबळे", nameEn: "Yalusha G. Kumble", role: "सचिव / Secretary", initial: "य" },
  { name: "श्री. प्रकाश दि. वाघ", nameEn: "Prakash D. Wagh", role: "खजिनदार / Treasurer", initial: "प्र" },
  { name: "श्री. मितेश मि. केदारे", nameEn: "Mitesh M. Kedare", role: "कार्याध्यक्ष / Working President", initial: "मि" },
];

const events = [
  { emoji: "🐘", name: "गणेश उत्सव", nameEn: "Ganesh Utsav" },
  { emoji: "🏺", name: "दही हंडी", nameEn: "Dahi Handi" },
  { emoji: "🌈", name: "होळी", nameEn: "Holi" },
  { emoji: "🇮🇳", name: "स्वातंत्र्य दिन", nameEn: "Independence Day" },
  { emoji: "🏅", name: "प्रजासत्ताक दिन", nameEn: "Republic Day" },
  { emoji: "🌾", name: "आगरी कोळी महोत्सव", nameEn: "Agri Koli Mohotsav" },
  { emoji: "📚", name: "शालेय पुस्तक वाटप", nameEn: "School Book Donation" },
  { emoji: "🏥", name: "वैद्यकीय शिबीर", nameEn: "Medical Camp" },
  { emoji: "❤️", name: "रक्तदान शिबीर", nameEn: "Blood Donation" },
  { emoji: "📣", name: "सामाजिक जनजागृती", nameEn: "Social Awareness" },
];

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <div className="bg-festival-gradient text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80">Navnirman Sevabhavi Sanstha</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-14 space-y-14">
          {/* History + Stats */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-maroon-950 mb-4">{t("history_title")}</h2>
              <p className="text-gray-600 leading-relaxed mb-3">{t("history_p1")}</p>
              <p className="text-gray-600 leading-relaxed">{t("history_p2")}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-saffron-50 border border-saffron-200 text-saffron-700 px-3 py-1 rounded-full font-medium">
                  स्थापना वर्ष: 2017
                </span>
                <span className="bg-saffron-50 border border-saffron-200 text-saffron-700 px-3 py-1 rounded-full font-medium">
                  Reg. No: NSS/2018/KGR
                </span>
                <span className="bg-saffron-50 border border-saffron-200 text-saffron-700 px-3 py-1 rounded-full font-medium">
                  80G Exemption
                </span>
              </div>
            </div>
            <div className="bg-saffron-50 rounded-2xl p-6 border-2 border-saffron-100">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Founded", value: "2017" },
                  { label: "Members", value: "890+" },
                  { label: "Active Volunteers", value: "62" },
                  { label: "Event Types", value: "10+" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-saffron-700">{item.value}</div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center bg-white rounded-xl p-3">
                <div className="text-2xl font-bold text-saffron-700">₹60 Lakhs+</div>
                <div className="text-xs text-gray-500">Donations (Last 3 Years)</div>
              </div>
            </div>
          </div>

          {/* Mission + Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-maroon-950 text-white rounded-2xl p-8">
              <div className="text-3xl mb-3">🎯</div>
              <h2 className="text-xl font-bold mb-3">{t("mission_title")}</h2>
              <p className="text-gray-300 leading-relaxed text-sm">{t("mission_text")}</p>
            </div>
            <div className="bg-saffron-500 text-white rounded-2xl p-8">
              <div className="text-3xl mb-3">🌟</div>
              <h2 className="text-xl font-bold mb-3">{t("vision_title")}</h2>
              <p className="text-white/90 leading-relaxed text-sm">{t("vision_text")}</p>
            </div>
          </div>

          {/* Committee */}
          <div>
            <h2 className="text-2xl font-bold text-maroon-950 mb-6 text-center">{t("committee_title")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {committee.map((member) => (
                <div key={member.nameEn} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-14 h-14 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-saffron-600 font-bold text-lg">{member.initial}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{member.nameEn}</p>
                  <p className="text-saffron-600 text-xs font-semibold mt-2">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <h2 className="text-2xl font-bold text-maroon-950 mb-6 text-center">आमचे उपक्रम / Our Activities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {events.map((ev) => (
                <div key={ev.nameEn} className="bg-saffron-50 border border-saffron-100 rounded-xl p-4 text-center hover:bg-saffron-100 transition-colors">
                  <div className="text-3xl mb-2">{ev.emoji}</div>
                  <p className="font-semibold text-gray-800 text-sm">{ev.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{ev.nameEn}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Banner */}
          <div className="bg-maroon-950 rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">आमच्याशी संपर्क साधा</h2>
            <p className="text-gray-300 text-sm mb-5">Shop No.14, Sai Srushti CHS Ltd, Plot No.15, Sector 20, Kharghar, Navi Mumbai — 410210</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+919773801884" className="inline-flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                📞 +91 9773801884
              </a>
              <a href="mailto:navnirmansevabhavisanstha2018@gmail.com" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                ✉️ navnirmansevabhavisanstha2018@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
