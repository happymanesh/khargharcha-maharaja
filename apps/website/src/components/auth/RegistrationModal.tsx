"use client";

import { useState, useEffect } from "react";
import { useUser, UserProfile } from "@/context/UserContext";
import { X, User, Phone, Mail, MapPin, Heart, Globe, CheckCircle, Shield } from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Don't Know"];

const areas = [
  "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5",
  "Sector 6", "Sector 7", "Sector 8", "Sector 9", "Sector 10",
  "Sector 11", "Sector 12", "Sector 14", "Sector 15", "Sector 20",
  "Sector 21", "Sector 23", "Sector 25", "Sector 26", "Sector 27",
  "Sector 35", "Other Area",
];

const languages = [
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "English" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "bn", label: "বাংলা" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
];

const steps = ["details", "contact", "done"] as const;
type Step = (typeof steps)[number];

export default function RegistrationModal() {
  const { isModalOpen, closeModal, saveUser } = useUser();

  const [step, setStep] = useState<Step>("details");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    area: "",
    bloodGroup: "",
    language: "mr",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // Reset state when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setStep("details");
      setOtpSent(false);
      setOtpValue("");
      setOtpVerified(false);
      setErrors({});
    }
  }, [isModalOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const set = (field: keyof typeof form, val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const validateStep1 = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
    if (!form.area) e.area = "Please select your area";
    if (!form.bloodGroup) e.bloodGroup = "Please select blood group";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<typeof form> = {};
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendOtp = () => {
    if (!validateStep2()) return;
    // Future: actual OTP API call
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Future: actual OTP verification
    // For now, accept any 4-digit code (or auto-verify if empty for demo)
    setOtpVerified(true);
    setStep("done");
  };

  const handleSkipOtp = () => {
    if (!validateStep2()) return;
    // Allow skip for now — OTP will be mandatory in Phase 2
    setStep("done");
  };

  const handleSubmit = () => {
    saveUser(form as UserProfile);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-festival-gradient p-5 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              🙏
            </div>
            <div>
              <h2 id="reg-modal-title" className="font-bold text-lg leading-tight">
                Join Khargharcha Maharaja
              </h2>
              <p className="text-white/80 text-xs">Quick registration — takes 30 seconds</p>
            </div>
          </div>
          {/* Step indicator */}
          <div className="flex gap-1.5 mt-4">
            {["Your Details", "Contact", "Done"].map((label, i) => {
              const idx = steps.indexOf(step);
              return (
                <div key={label} className="flex-1">
                  <div className={`h-1 rounded-full transition-all ${i <= idx ? "bg-white" : "bg-white/30"}`} />
                  <p className={`text-xs mt-1 ${i <= idx ? "text-white" : "text-white/50"}`}>{label}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Step 1 — Personal Details */}
          {step === "details" && (
            <div className="space-y-4">
              <p className="text-gray-500 text-sm">Tell us a little about yourself</p>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your full name"
                    className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`}
                    autoComplete="name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Area / Sector in Kharghar <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={form.area}
                    onChange={(e) => set("area", e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none bg-white transition-colors appearance-none ${errors.area ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`}
                  >
                    <option value="">Select your area</option>
                    {areas.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
                {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {bloodGroups.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => set("bloodGroup", bg)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold border-2 transition-all ${
                        form.bloodGroup === bg
                          ? "bg-red-500 border-red-500 text-white"
                          : "border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
                      } ${bg === "Don't Know" ? "col-span-2" : ""}`}
                    >
                      <Heart size={10} className="inline mr-0.5" />
                      {bg}
                    </button>
                  ))}
                </div>
                {errors.bloodGroup && <p className="text-red-500 text-xs mt-1">{errors.bloodGroup}</p>}
              </div>

              {/* Language preference */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <Globe size={13} className="inline mr-1" />
                  Preferred Language
                </label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => set("language", lang.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                        form.language === lang.code
                          ? "bg-saffron-500 border-saffron-500 text-white"
                          : "border-gray-200 text-gray-600 hover:border-saffron-300"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { if (validateStep1()) setStep("contact"); }}
                className="w-full btn-saffron mt-2"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Contact */}
          {step === "contact" && (
            <div className="space-y-4">
              <p className="text-gray-500 text-sm">How can we reach you?</p>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-sm text-gray-600 shrink-0">
                    +91
                  </div>
                  <div className="relative flex-1">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit mobile"
                      maxLength={10}
                      className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.mobile ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`}
                      autoComplete="tel"
                    />
                  </div>
                </div>
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}

                {/* OTP Section */}
                {!otpSent ? (
                  <button
                    onClick={handleSendOtp}
                    className="mt-2 w-full py-2 border-2 border-saffron-400 text-saffron-600 font-semibold rounded-xl text-sm hover:bg-saffron-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Shield size={14} />
                    Send OTP (Verify Mobile)
                  </button>
                ) : (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="Enter OTP"
                        maxLength={6}
                        className="flex-1 border-2 border-gray-200 focus:border-saffron-400 rounded-xl px-4 py-2.5 text-sm outline-none text-center tracking-widest font-bold"
                      />
                      <button
                        onClick={handleVerifyOtp}
                        className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl text-sm transition-colors"
                      >
                        Verify
                      </button>
                    </div>
                    <p className="text-gray-400 text-xs text-center">
                      OTP sent to +91 {form.mobile} •{" "}
                      <button onClick={() => setOtpSent(false)} className="text-saffron-500 hover:underline">
                        Change
                      </button>
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-700 text-center">
                      🚧 OTP integration coming soon — skip for now
                    </div>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email <span className="text-gray-400 text-xs font-normal">(optional — for receipts)</span>
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full pl-9 pr-4 py-2.5 border-2 rounded-xl text-sm outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-saffron-400"}`}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep("details")}
                  className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSkipOtp}
                  className="flex-1 btn-saffron text-sm"
                >
                  Continue →
                </button>
              </div>

              <p className="text-gray-400 text-xs text-center flex items-center justify-center gap-1">
                <Shield size={11} />
                Your data stays private and is only used for event notifications
              </p>
            </div>
          )}

          {/* Step 3 — Done */}
          {step === "done" && (
            <div className="text-center py-4 space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Welcome, {form.name.split(" ")[0]}! 🎉
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  You&apos;re now part of the Khargharcha Maharaja community.
                </p>
              </div>

              <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-4 text-left space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-semibold text-gray-800">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobile</span>
                  <span className="font-semibold text-gray-800">+91 {form.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Area</span>
                  <span className="font-semibold text-gray-800">{form.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Blood Group</span>
                  <span className="font-semibold text-red-600">{form.bloodGroup}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors text-base"
              >
                🙏 Start Exploring
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
