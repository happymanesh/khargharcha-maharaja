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
                    <p className="text-gray-600 text-sm">
                      Navnirman Sevabhavi Sanstha<br />
                      Shop No.14, Sai Srushti CHS Ltd,<br />
                      Plot No.15, Sector 20, Kharghar,<br />
                      Navi Mumbai — 410210
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-saffron-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+919773801884" className="text-saffron-600 hover:text-saffron-700 text-sm font-semibold">+91 9773801884</a>
                    <p className="text-gray-500 text-xs mt-0.5">Prasad P. Parab — Founding President</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-saffron-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:navnirmansevabhavisanstha2018@gmail.com" className="text-saffron-600 hover:text-saffron-700 text-sm break-all">navnirmansevabhavisanstha2018@gmail.com</a>
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

              {/* Google Map */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.0!2d73.0697!3d19.0330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSai+Srushti+CHS+Ltd+Plot+15+Sector+20+Kharghar+Navi+Mumbai!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Navnirman Sevabhavi Sanstha Location"
                />
                <a
                  href="https://maps.app.goo.gl/55zKZ2RJbtZvJ8M26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-saffron-50 hover:bg-saffron-100 text-saffron-700 text-xs font-semibold py-2.5 transition-colors"
                >
                  <MapPin size={13} />
                  Open in Google Maps
                </a>
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
