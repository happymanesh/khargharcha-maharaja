"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, ChevronUp, Phone, Mail, X } from "lucide-react";

const adRates = [
  { labelMr: "मुख्य प्रवेशद्वार", labelEn: "Main Gate",          size: "40 ft × 16 ft",           price: "₹3,50,000", highlight: true },
  { labelMr: "प्रवेशद्वार क्र. 1",  labelEn: "Gate No. 1",         size: "40 ft × 16 ft",           price: "₹3,25,000", highlight: false },
  { labelMr: "प्रवेशद्वार क्र. 2",  labelEn: "Gate No. 2",         size: "40 ft × 15 ft",           price: "₹3,25,000", highlight: false },
  { labelMr: "प्रवेशद्वार क्र. 3",  labelEn: "Gate No. 3",         size: "40 ft × 15 ft",           price: "₹3,25,000", highlight: false },
  { labelMr: "प्रवेशद्वार क्र. 4",  labelEn: "Gate No. 4",         size: "25 ft × 16 ft",           price: "₹2,50,000", highlight: false },
  { labelMr: "प्रवेशद्वार क्र. 5",  labelEn: "Gate No. 5",         size: "25 ft × 16 ft",           price: "₹2,50,000", highlight: false },
  { labelMr: "प्रवेशद्वार क्र. 6",  labelEn: "Gate No. 6",         size: "25 ft × 16 ft",           price: "₹2,25,000", highlight: false },
  { labelMr: "रोड होर्डिंग — मोठे", labelEn: "Road Hoarding (L)",  size: "8 ft × 15 ft (10 nos.)", price: "₹2,00,000", highlight: false },
  { labelMr: "रोड होर्डिंग — लहान", labelEn: "Road Hoarding (S)",  size: "8 ft × 10 ft (10 nos.)", price: "₹1,00,000", highlight: false },
];

const committee = [
  { nameMr: "प्रसाद प्र. परब",    nameEn: "Prasad P. Parab",    roleKey: "founding_president" as const },
  { nameMr: "यलुशा गि. कुंबळे",  nameEn: "Yalusha G. Kumble",  roleKey: "secretary" as const },
  { nameMr: "प्रकाश दि. वाघ",     nameEn: "Prakash D. Wagh",    roleKey: "treasurer" as const },
  { nameMr: "मितेश मि. केदारे",   nameEn: "Mitesh M. Kedare",   roleKey: "working_president" as const },
];

export default function AdvertisementSection() {
  const t = useTranslations("ads");
  const locale = useLocale();
  const isMr = locale === "mr";
  const [isOpen, setIsOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-maroon-950 to-maroon-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block bg-gold-400/20 text-gold-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-gold-400/30">
            {t("badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{t("title")}</h2>
          <p className="text-gold-300 text-sm mt-1">{t("subtitle")}</p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-5 py-3.5 text-white transition-colors mb-3"
        >
          <span className="font-semibold">{t("view_rates_btn")}</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isOpen && (
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl mb-4">
            <div className="bg-maroon-800 px-5 py-3">
              <p className="text-gold-300 text-xs font-medium">{t("note")}</p>
            </div>
            <div className="divide-y divide-gray-100">
              {adRates.map((rate) => (
                <div
                  key={rate.labelEn}
                  className={`flex items-center justify-between px-5 py-3.5 ${rate.highlight ? "bg-saffron-50" : "bg-white"} hover:bg-gray-50 transition-colors`}
                >
                  <div>
                    <p className={`font-semibold text-sm ${rate.highlight ? "text-maroon-800" : "text-gray-800"}`}>
                      {rate.highlight && (
                        <span className="inline-block bg-saffron-500 text-white text-xs px-1.5 py-0.5 rounded mr-2">
                          {t("prime_label")}
                        </span>
                      )}
                      {isMr ? rate.labelMr : rate.labelEn}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{rate.size}</p>
                  </div>
                  <span className={`font-bold text-base ${rate.highlight ? "text-saffron-600" : "text-maroon-700"}`}>
                    {rate.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={() => setShowContact(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl py-3 font-semibold transition-colors"
          >
            <Phone size={16} />
            {t("contact_btn")}
          </button>
          <a
            href="mailto:navnirmansevabhavisanstha2018@gmail.com"
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl py-3 font-semibold transition-colors"
          >
            <Mail size={16} />
            {t("email_btn")}
          </a>
        </div>

        {/* Contact Popup */}
        {showContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowContact(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone size={24} className="text-saffron-600" />
                </div>
                <h3 className="text-gray-900 font-bold text-lg">{t("popup_title")}</h3>
                <p className="text-gray-500 text-sm">{t("popup_subtitle")}</p>
              </div>
              <div className="bg-saffron-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-saffron-600 font-semibold uppercase tracking-wide mb-1">
                  {t("founding_president")}
                </p>
                <p className="text-gray-900 font-bold text-lg">प्रसाद प्र. परब</p>
                <p className="text-gray-600 text-sm mb-3">Prasad P. Parab</p>
                <a href="tel:+919773801884" className="flex items-center gap-3 bg-saffron-500 text-white rounded-xl px-4 py-3 hover:bg-saffron-600 transition-colors">
                  <Phone size={18} />
                  <span className="font-semibold">+91 9773801884</span>
                </a>
              </div>
              <a
                href="mailto:navnirmansevabhavisanstha2018@gmail.com"
                className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-saffron-600 transition-colors"
              >
                <Mail size={15} />
                navnirmansevabhavisanstha2018@gmail.com
              </a>
              <p className="text-center text-gray-400 text-xs mt-3">{t("period_label")}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {committee.map((m) => (
            <div key={m.nameEn} className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
              <p className="text-white font-semibold text-sm">{isMr ? m.nameMr : m.nameEn}</p>
              <p className="text-gold-300 text-xs mt-0.5">{t(m.roleKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
