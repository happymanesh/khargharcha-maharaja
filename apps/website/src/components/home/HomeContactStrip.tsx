"use client";

import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export default function HomeContactStrip() {
  return (
    <section className="bg-maroon-950 text-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-saffron-400 text-xs font-semibold uppercase tracking-widest mb-2">Get in Touch</p>
          <h2 className="text-3xl font-bold font-display">Contact Us</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <a
            href="https://maps.app.goo.gl/55zKZ2RJbtZvJ8M26"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-center transition-colors group"
          >
            <div className="w-12 h-12 bg-saffron-500 group-hover:bg-saffron-400 rounded-full flex items-center justify-center transition-colors">
              <MapPin size={22} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Our Office</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Shop No.14, Sai Srushti CHS Ltd,<br />
                Plot No.15, Sector 20, Kharghar,<br />
                Navi Mumbai — 410210
              </p>
            </div>
          </a>

          <a
            href="tel:+919773801884"
            className="flex flex-col items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-center transition-colors group"
          >
            <div className="w-12 h-12 bg-saffron-500 group-hover:bg-saffron-400 rounded-full flex items-center justify-center transition-colors">
              <Phone size={22} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Phone</p>
              <p className="text-saffron-300 text-sm font-semibold">+91 9773801884</p>
              <p className="text-gray-500 text-xs mt-0.5">Prasad P. Parab — Founding President</p>
            </div>
          </a>

          <a
            href="mailto:navnirmansevabhavisanstha2018@gmail.com"
            className="flex flex-col items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 text-center transition-colors group"
          >
            <div className="w-12 h-12 bg-saffron-500 group-hover:bg-saffron-400 rounded-full flex items-center justify-center transition-colors">
              <Mail size={22} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Email</p>
              <p className="text-saffron-300 text-xs break-all">navnirmansevabhavisanstha2018@gmail.com</p>
            </div>
          </a>
        </div>

        {/* Reg details + Social */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
          <div className="text-center sm:text-left">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1.5">Registration Details</p>
            <p className="text-gray-300 text-xs">Reg. No. महाराष्ट्र / १४६/२०१७ / रायगड</p>
            <p className="text-gray-300 text-xs">80G No. AACTN6650RF20241</p>
          </div>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
              <Facebook size={17} />
            </a>
            <a href="https://www.instagram.com/kharghar_cha_maharaja" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
              <Instagram size={17} />
            </a>
            <a href="https://www.youtube.com/@khargharChaMaharaja" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
              className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
              <Youtube size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
