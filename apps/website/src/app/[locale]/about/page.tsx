import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");

  const committee = [
    { name: "श्री. रामचंद्र पाटील", role: "अध्यक्ष / President", years: "2023-25" },
    { name: "श्री. सुरेश देशमुख", role: "उपाध्यक्ष / Vice President", years: "2023-25" },
    { name: "श्रीमती. सुनंदा जोशी", role: "सचिव / Secretary", years: "2023-25" },
    { name: "श्री. महेश कुलकर्णी", role: "खजिनदार / Treasurer", years: "2023-25" },
    { name: "श्री. विनोद शिंदे", role: "संयुक्त सचिव / Joint Secretary", years: "2023-25" },
    { name: "श्रीमती. प्रिया मोरे", role: "सदस्य / Member", years: "2023-25" },
  ];

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
          {/* History */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-maroon-950 mb-4">{t("history_title")}</h2>
              <p className="text-gray-600 leading-relaxed mb-3">{t("history_p1")}</p>
              <p className="text-gray-600 leading-relaxed">{t("history_p2")}</p>
            </div>
            <div className="bg-saffron-50 rounded-2xl p-6 border-2 border-saffron-100">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { labelKey: "founded", value: "2009" },
                  { labelKey: "members", value: "50,000+" },
                  { labelKey: "volunteers", value: "1,000+" },
                  { labelKey: "events", value: "200+" },
                ].map((item) => (
                  <div key={item.labelKey} className="text-center p-3 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-saffron-500">{item.value}</div>
                    <div className="text-xs text-gray-500">{t(item.labelKey as "founded")}</div>
                  </div>
                ))}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {committee.map((member) => (
                <div key={member.name} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="w-14 h-14 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-saffron-600 font-bold text-xl">{member.name.charAt(5)}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                  <p className="text-saffron-600 text-xs font-semibold mt-1">{member.role}</p>
                  <p className="text-gray-400 text-xs mt-1">{member.years}</p>
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
