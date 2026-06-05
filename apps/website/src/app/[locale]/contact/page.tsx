"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Send, Facebook, Instagram, Youtube } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80">{t("send_message")}</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-maroon-950 mb-6">{t("info_title")}</h2>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-saffron-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t("address_label")}</h3>
                    <p className="text-gray-600 text-sm">{t("address")}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-saffron-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+919999999999" className="text-saffron-600 hover:text-saffron-700 text-sm">+91 99999 99999</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-saffron-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@khargharmaharaja.org" className="text-saffron-600 hover:text-saffron-700 text-sm">info@khargharmaharaja.org</a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-8">
                <h3 className="font-bold text-maroon-950 mb-4">{t("social_title")}</h3>
                <div className="flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="bg-blue-600 text-white w-11 h-11 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Facebook size={18} />
                  </a>
                  <a href="https://www.instagram.com/kharghar_cha_maharaja" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="bg-pink-600 text-white w-11 h-11 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Instagram size={18} />
                  </a>
                  <a href="https://www.youtube.com/@khargharChaMaharaja" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                    className="bg-red-600 text-white w-11 h-11 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-gray-100 rounded-2xl h-52 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-400">
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p className="text-sm">{t("map_label")}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-maroon-950 mb-6">{t("send_message")}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("name")} *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none"
                    placeholder={t("name_placeholder")} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("phone")}</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none"
                    placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("email")}</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none"
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("message")} *</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                    placeholder={t("message_placeholder")} />
                </div>
                <button className="w-full btn-saffron flex items-center justify-center gap-2">
                  <Send size={16} />
                  {t("send")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
