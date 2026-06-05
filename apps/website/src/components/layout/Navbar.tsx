"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams, useRouter } from "next/navigation";
import { Menu, X, Globe, ChevronDown, User, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";

const localeLabels: Record<string, string> = {
  mr: "मराठी",
  hi: "हिंदी",
  en: "English",
  gu: "ગુજરાતી",
  bn: "বাংলা",
  pa: "ਪੰਜਾਬੀ",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isRegistered, openRegistration, clearUser } = useUser();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = () => { setLangOpen(false); setProfileOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/events", label: t("events") },
    { href: "/gallery", label: t("gallery") },
    { href: "/live", label: t("live") },
    { href: "/contact", label: t("contact") },
  ];

  const locales = ["mr", "hi", "en", "gu", "bn", "pa"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-maroon-950 shadow-xl shadow-maroon-950/30" : "bg-gradient-to-r from-maroon-950 via-maroon-800 to-maroon-950"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-saffron-500 text-white text-xs py-1 px-4 text-center">
        <span>🕉 गणपती बाप्पा मोरया | Ganpati Bappa Morya 🕉</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-lg">
              <span className="text-white font-display font-bold text-lg">ग</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-display font-bold text-base leading-tight group-hover:text-gold-300 transition-colors">
                खारघरचा महाराजा
              </p>
              <p className="text-saffron-300 text-xs">Navnirman Sevabhavi Sanstha</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === link.href ? "bg-saffron-500 text-white" : "text-gray-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { setLangOpen(!langOpen); setProfileOpen(false); }}
                className="flex items-center gap-1 text-gray-200 hover:text-white text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors"
                aria-label="Select language"
                aria-expanded={langOpen}
              >
                <Globe size={15} />
                <span className="hidden sm:inline">{localeLabels[locale]}</span>
                <ChevronDown size={13} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[130px]">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={pathname}
                      locale={loc as "mr" | "hi" | "en" | "gu" | "bn" | "pa"}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-saffron-50 transition-colors ${
                        loc === locale ? "text-saffron-600 font-semibold bg-saffron-50" : "text-gray-700"
                      }`}
                    >
                      {localeLabels[loc]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User / Register */}
            {isRegistered && user ? (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => { setProfileOpen(!profileOpen); setLangOpen(false); }}
                  className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                  aria-label="User menu"
                >
                  <div className="w-6 h-6 bg-saffron-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 w-48">
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                      <p className="text-gray-500 text-xs">+91 {user.mobile}</p>
                      <p className="text-xs text-red-500 font-semibold mt-0.5">{user.bloodGroup} ❤️</p>
                    </div>
                    <Link
                      href="/membership"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-saffron-50 transition-colors"
                    >
                      <User size={14} />
                      My Profile
                    </Link>
                    <button
                      onClick={() => { clearUser(); setProfileOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openRegistration()}
                className="hidden sm:flex items-center gap-1.5 bg-saffron-500 hover:bg-saffron-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                <User size={14} />
                Register
              </button>
            )}

            {/* Donate CTA */}
            <Link
              href="/donate"
              className="hidden sm:block bg-white text-maroon-950 hover:bg-gold-100 font-bold px-4 py-1.5 rounded-lg text-sm transition-colors"
            >
              {t("donate")}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 rounded-md hover:bg-white/10"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-white/10 py-3 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-md text-sm transition-colors ${
                  pathname === link.href ? "bg-saffron-500 text-white" : "text-gray-200 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isRegistered && (
              <button
                onClick={() => { openRegistration(); setIsOpen(false); }}
                className="block w-full text-left mx-0 mt-2 px-4 py-2.5 bg-white/10 text-white rounded-md text-sm"
              >
                Register / Join
              </button>
            )}
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-2 btn-saffron text-center text-sm"
            >
              {t("donate")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
