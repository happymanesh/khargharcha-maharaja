"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Mail, X } from "lucide-react";

const adRates = [
  { label: "मुख्य प्रवेशद्वार (Main Gate)", size: "40 ft × 16 ft", price: "₹3,50,000", highlight: true },
  { label: "प्रवेशद्वार क्र. 1 (Gate No. 1)", size: "40 ft × 16 ft", price: "₹3,25,000", highlight: false },
  { label: "प्रवेशद्वार क्र. 2 (Gate No. 2)", size: "40 ft × 15 ft", price: "₹3,25,000", highlight: false },
  { label: "प्रवेशद्वार क्र. 3 (Gate No. 3)", size: "40 ft × 15 ft", price: "₹3,25,000", highlight: false },
  { label: "प्रवेशद्वार क्र. 4 (Gate No. 4)", size: "25 ft × 16 ft", price: "₹2,50,000", highlight: false },
  { label: "प्रवेशद्वार क्र. 5 (Gate No. 5)", size: "25 ft × 16 ft", price: "₹2,50,000", highlight: false },
  { label: "प्रवेशद्वार क्र. 6 (Gate No. 6)", size: "25 ft × 16 ft", price: "₹2,25,000", highlight: false },
  { label: "रोड होर्डिंग — मोठे (Road Hoarding L)", size: "8 ft × 15 ft (10 होर्डिंग)", price: "₹2,00,000", highlight: false },
  { label: "रोड होर्डिंग — लहान (Road Hoarding S)", size: "8 ft × 10 ft (10 होर्डिंग)", price: "₹1,00,000", highlight: false },
];

export default function AdvertisementSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-maroon-950 to-maroon-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block bg-gold-400/20 text-gold-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-gold-400/30">
            जाहिरात दरपत्रक
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Advertisement Rates</h2>
          <p className="text-gold-300 text-sm mt-1">
            गणेश उत्सव व दही हंडी • 5 सप्टेंबर ते 25 सप्टेंबर 2026
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-5 py-3.5 text-white transition-colors mb-3"
        >
          <span className="font-semibold">जाहिरात दर पहा / View Ad Rates</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isOpen && (
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl mb-4">
            <div className="bg-maroon-800 px-5 py-3">
              <p className="text-gold-300 text-xs font-medium">
                नोंद: कालावधी 5 सप्टेंबर ते 25 सप्टेंबर 2026 • धनादेश — नवनिर्माण सेवाभावी संस्था
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {adRates.map((rate) => (
                <div
                  key={rate.label}
                  className={`flex items-center justify-between px-5 py-3.5 ${rate.highlight ? "bg-saffron-50" : "bg-white"} hover:bg-gray-50 transition-colors`}
                >
                  <div>
                    <p className={`font-semibold text-sm ${rate.highlight ? "text-maroon-800" : "text-gray-800"}`}>
                      {rate.highlight && <span className="inline-block bg-saffron-500 text-white text-xs px-1.5 py-0.5 rounded mr-2">PRIME</span>}
                      {rate.label}
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
            जाहिरातीसाठी संपर्क करा
          </button>
          <a
            href="mailto:navnirmansevabhavisanstha2018@gmail.com"
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl py-3 font-semibold transition-colors"
          >
            <Mail size={16} />
            ई-मेल करा
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
                <h3 className="text-gray-900 font-bold text-lg">जाहिरातीसाठी संपर्क</h3>
                <p className="text-gray-500 text-sm">Contact for Advertisement</p>
              </div>
              <div className="bg-saffron-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-saffron-600 font-semibold uppercase tracking-wide mb-1">संस्थापक अध्यक्ष / Founding President</p>
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
              <p className="text-center text-gray-400 text-xs mt-3">
                कालावधी: 5 सप्टेंबर ते 25 सप्टेंबर 2026
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: "संस्थापक अध्यक्ष", name: "प्रसाद प्र. परब" },
            { label: "सचिव", name: "यलुशा गि. कुंबळे" },
            { label: "खजिनदार", name: "प्रकाश दि. वाघ" },
            { label: "कार्याध्यक्ष", name: "मितेश मि. केदारे" },
          ].map((m) => (
            <div key={m.label} className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
              <p className="text-white font-semibold text-sm">{m.name}</p>
              <p className="text-gold-300 text-xs mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
