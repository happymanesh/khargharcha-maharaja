"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { Shield, Receipt, Heart, CheckCircle } from "lucide-react";

const amounts = [501, 1001, 2100, 5100, 11000, 21000, 51000, 101000];

const paymentMethods = [
  { id: "upi",        icon: "📱" },
  { id: "card",       icon: "💳" },
  { id: "netbanking", icon: "🏦" },
  { id: "wallet",     icon: "👛" },
];

const categories = [
  { key: "ganesh_utsav",   descKey: "cat_desc_ganesh",    emoji: "🐘" },
  { key: "annadan",        descKey: "cat_desc_annadan",   emoji: "🍱" },
  { key: "medical",        descKey: "cat_desc_medical",   emoji: "🏥" },
  { key: "education",      descKey: "cat_desc_education", emoji: "📚" },
  { key: "disaster_relief",descKey: "cat_desc_disaster",  emoji: "🆘" },
  { key: "general",        descKey: "cat_desc_general",   emoji: "🙏" },
];

const paymentLabels: Record<string, string> = {
  upi: "UPI / QR Code",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
  wallet: "Paytm / PhonePe",
};

export default function DonatePage() {
  const t = useTranslations("donate");
  const [selectedAmount, setSelectedAmount] = useState(1001);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ganesh_utsav");
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="bg-festival-gradient text-white py-14 px-4 text-center">
          <div className="text-5xl mb-3">🙏</div>
          <h1 className="text-4xl font-bold font-display mb-2">{t("title")}</h1>
          <p className="text-white/80 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Trust Strip */}
        <div className="bg-green-50 border-b border-green-200">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-6 text-sm text-green-700">
            <div className="flex items-center gap-1.5"><Shield size={14} /> SSL Secured</div>
            <div className="flex items-center gap-1.5"><Receipt size={14} /> {t("receipt_info")}</div>
            <div className="flex items-center gap-1.5"><CheckCircle size={14} /> {t("tax_benefit")}</div>
            <div className="flex items-center gap-1.5"><Heart size={14} /> Transparent Fund Use</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Form */}
            <div className="md:col-span-3 space-y-6">
              {/* Category */}
              <div>
                <h3 className="font-bold text-maroon-950 mb-3">{t("category_label")}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button key={cat.key} onClick={() => setSelectedCategory(cat.key)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${selectedCategory === cat.key ? "border-saffron-500 bg-saffron-50" : "border-gray-200 hover:border-saffron-300"}`}>
                      <div className="text-2xl mb-1">{cat.emoji}</div>
                      <div className="font-semibold text-xs text-gray-900">{t(`categories.${cat.key}` as "categories.ganesh_utsav")}</div>
                      <div className="text-gray-500 text-xs">{t(cat.descKey as "cat_desc_ganesh")}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <h3 className="font-bold text-maroon-950 mb-3">{t("amount_label")}</h3>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {amounts.map((amt) => (
                    <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={`py-2.5 px-2 rounded-lg text-sm font-bold border-2 transition-all ${selectedAmount === amt && !customAmount ? "border-saffron-500 bg-saffron-50 text-saffron-700" : "border-gray-200 hover:border-saffron-300 text-gray-700"}`}>
                      ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder={`${t("custom_amount")} (₹)`} value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
              </div>

              {/* Donor Details */}
              <div>
                <h3 className="font-bold text-maroon-950 mb-3">{t("donor_info")}</h3>
                <div className="space-y-3">
                  <input type="text" placeholder={`${t("full_name")} *`} value={donorName} onChange={(e) => setDonorName(e.target.value)}
                    className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
                  <input type="tel" placeholder={`${t("mobile")} *`} value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
                  <input type="email" placeholder="Email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none" />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-bold text-maroon-950 mb-3">{t("payment_methods")}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => (
                    <button key={method.id} onClick={() => setSelectedPayment(method.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${selectedPayment === method.id ? "border-saffron-500 bg-saffron-50" : "border-gray-200 hover:border-saffron-300"}`}>
                      <span className="text-xl">{method.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{paymentLabels[method.id]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="md:col-span-2">
              <div className="sticky top-24 bg-maroon-950 text-white rounded-2xl p-6 shadow-2xl">
                <h3 className="font-bold text-lg mb-5 text-gold-300">{t("donation_summary")}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t("category_selected")}</span>
                    <span className="font-semibold">{t(`categories.${selectedCategory}` as "categories.ganesh_utsav")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{t("payment_selected")}</span>
                    <span className="font-semibold">{paymentLabels[selectedPayment]}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="text-gray-400 font-semibold">{t("total_amount")}</span>
                    <span className="text-2xl font-bold text-saffron-400">
                      ₹{finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "0"}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  {t("donate_now")} 🙏
                </button>

                <p className="text-gray-500 text-xs text-center mt-4">{t("receipt_info")}</p>

                {selectedPayment === "upi" && (
                  <div className="mt-5 p-4 bg-white rounded-xl text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center text-gray-400 text-xs">QR Code</div>
                    <p className="text-gray-600 text-xs font-semibold">{t("upi_id")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
