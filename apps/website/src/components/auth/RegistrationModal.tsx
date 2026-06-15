"use client";

import { useState, useEffect } from "react";
import { useUser, UserProfile } from "@/context/UserContext";
import { X, User, Phone, Mail, MapPin, CheckCircle, Shield, Home } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

const steps = ["details", "address", "contact", "done"] as const;
type Step = (typeof steps)[number];

export default function RegistrationModal() {
  const { isModalOpen, closeModal, saveUser } = useUser();

  const [step, setStep] = useState<Step>("details");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    language: "mr",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  useEffect(() => {
    if (isModalOpen) {
      setStep("details");
      setOtpSent(false);
      setOtpValue("");
      setErrors({});
    }
  }, [isModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const set = (field: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const validateStep1 = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<typeof form> = {};
    if (!form.addressLine1.trim()) e.addressLine1 = "Required";
    if (!form.addressLine2.trim()) e.addressLine2 = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Partial<typeof form> = {};
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const stepLabels = ["Your Details", "Address", "Contact", "Done"];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} aria-hidden="true" />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-festival-gradient p-5 text-white relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🙏</div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Join Khargharcha Maharaja</h2>
              <p className="text-white/80 text-xs">Quick registration — takes 1 minute</p>
            </div>
          </div>
          <div className="flex gap-1.5 mt-4">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-1 rounded-full transition-all ${i <= stepIndex ? "bg-white" : "bg-white/30"}`} />
                <p className={`text-xs mt-1 truncate ${i <= stepIndex ? "text-white" : "text-white/50"}`}>{label}</p>
              </div>
            ))}
          </div>
          <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">

          {/* Step 1 — Name */}
          {step === "details" && (
            <div className="space-y-4">
              <p className="text-gray-500 text-sm">Tell us your name</p>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                    placeholder="Your full name"
                    className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`}
                    autoComplete="name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <button onClick={() => { if (validateStep1()) setStep("address"); }} className="w-full btn-saffron mt-2">
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Address */}
          {step === "address" && (
            <div className="space-y-3">
              <p className="text-gray-500 text-sm">Your residential address</p>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">House / Flat / Building No. <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Home size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={form.addressLine1} onChange={(e) => set("addressLine1", e.target.value)}
                    placeholder="e.g. Flat 4B, Sai Srushti CHS"
                    className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.addressLine1 ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`} />
                </div>
                {errors.addressLine1 && <p className="text-red-500 text-xs mt-0.5">{errors.addressLine1}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Street / Area / Locality <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={form.addressLine2} onChange={(e) => set("addressLine2", e.target.value)}
                    placeholder="e.g. Sector 20, Kharghar"
                    className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.addressLine2 ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`} />
                </div>
                {errors.addressLine2 && <p className="text-red-500 text-xs mt-0.5">{errors.addressLine2}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Landmark <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="text" value={form.addressLine3} onChange={(e) => set("addressLine3", e.target.value)}
                  placeholder="e.g. Near Central Park"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-saffron-400 rounded-xl text-sm outline-none transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                  <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)}
                    placeholder="e.g. Navi Mumbai"
                    className={`w-full px-3 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.city ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`} />
                  {errors.city && <p className="text-red-500 text-xs mt-0.5">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode <span className="text-red-500">*</span></label>
                  <input type="tel" value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="410210" maxLength={6}
                    className={`w-full px-3 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.pincode ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`} />
                  {errors.pincode && <p className="text-red-500 text-xs mt-0.5">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                <select value={form.state} onChange={(e) => set("state", e.target.value)}
                  className={`w-full px-3 py-2.5 border-2 rounded-xl text-sm outline-none bg-white transition-colors appearance-none ${errors.state ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`}>
                  <option value="">Select State</option>
                  {indianStates.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex gap-2 pt-1">
                <button onClick={() => setStep("details")} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors">← Back</button>
                <button onClick={() => { if (validateStep2()) setStep("contact"); }} className="flex-1 btn-saffron text-sm">Continue →</button>
              </div>
            </div>
          )}

          {/* Step 3 — Contact */}
          {step === "contact" && (
            <div className="space-y-4">
              <p className="text-gray-500 text-sm">How can we reach you?</p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-sm text-gray-600 shrink-0">+91</div>
                  <div className="relative flex-1">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={form.mobile}
                      onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile" maxLength={10}
                      className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.mobile ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`}
                      autoComplete="tel" />
                  </div>
                </div>
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}

                {!otpSent ? (
                  <button onClick={() => { if (validateStep3()) setOtpSent(true); }}
                    className="mt-2 w-full py-2 border-2 border-saffron-400 text-saffron-600 font-semibold rounded-xl text-sm hover:bg-saffron-50 transition-colors flex items-center justify-center gap-2">
                    <Shield size={14} /> Send OTP (Verify Mobile)
                  </button>
                ) : (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <input type="text" value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="Enter OTP" maxLength={6}
                        className="flex-1 border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none text-center tracking-widest font-bold" />
                      <button onClick={() => setStep("done")} className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl text-sm transition-colors">Verify</button>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-700 text-center">
                      🚧 OTP integration coming soon — skip for now
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`}
                    autoComplete="email" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep("address")} className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors">← Back</button>
                <button onClick={() => { if (validateStep3()) setStep("done"); }} className="flex-1 btn-saffron text-sm">Continue →</button>
              </div>

              <p className="text-gray-400 text-xs text-center flex items-center justify-center gap-1">
                <Shield size={11} /> Your data stays private and is only used for event notifications
              </p>
            </div>
          )}

          {/* Step 4 — Done */}
          {step === "done" && (
            <div className="text-center py-4 space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Welcome, {form.name.split(" ")[0]}! 🎉</h3>
                <p className="text-gray-500 text-sm mt-1">You&apos;re now part of the Khargharcha Maharaja community.</p>
              </div>
              <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-4 text-left space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-semibold text-gray-800">{form.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Mobile</span><span className="font-semibold text-gray-800">+91 {form.mobile}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">City</span><span className="font-semibold text-gray-800">{form.city}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Pincode</span><span className="font-semibold text-gray-800">{form.pincode}</span></div>
              </div>
              <button onClick={() => saveUser(form as UserProfile)} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors text-base">
                🙏 Start Exploring
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
