import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Youtube, Instagram } from "lucide-react";

export default function LivePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-950 min-h-screen">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
          <h1 className="text-4xl font-bold font-display mb-2">खारघरचा महाराजा — Live</h1>
          <p className="text-white/80">गणपती बाप्पाचे थेट प्रसारण</p>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-400 text-sm mb-10">
            आमच्या YouTube आणि Instagram चॅनेलवर थेट प्रसारण पाहा.<br />
            Follow &amp; Subscribe to get live notifications.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <a
              href="https://www.youtube.com/@khargharChaMaharaja"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl p-8 transition-colors group"
            >
              <Youtube size={48} className="group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-bold text-xl">YouTube</p>
                <p className="text-white/80 text-sm mt-1">@khargharChaMaharaja</p>
              </div>
              <span className="bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                Subscribe &amp; Watch Live ▶
              </span>
            </a>

            <a
              href="https://www.instagram.com/kharghar_cha_maharaja"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 bg-gradient-to-br from-pink-500 to-purple-600 hover:opacity-90 text-white rounded-2xl p-8 transition-opacity group"
            >
              <Instagram size={48} className="group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-bold text-xl">Instagram</p>
                <p className="text-white/80 text-sm mt-1">@kharghar_cha_maharaja</p>
              </div>
              <span className="bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                Follow &amp; Watch Reels 📸
              </span>
            </a>
          </div>

          <p className="text-gray-600 text-xs mt-10">
            गणेश उत्सव व दही हंडी 2026 — September 2026 मध्ये थेट प्रसारण सुरू होईल.<br />
            Live streaming of Ganesh Utsav &amp; Dahi Handi — coming September 2026.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
