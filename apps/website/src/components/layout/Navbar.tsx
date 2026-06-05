"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
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
        scrolled
          ? "bg-maroon-950 shadow-xl shadow-maroon-950/30"
          : "bg-gradient-to-r from-maroon-950 via-maroon-800 to-maroon-950"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-saffron-500 text-white text-xs py-1 px-4 text-center font-devanagari">
        <span>🕉 गणपती बाप्पा मोरया | Ganpati Bappa Morya 🕉</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center shadow-lg animate-pulse-glow">
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
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 font-devanagari ${
                  pathname === link.href
                    ? "bg-saffron-500 text-white"
                    : "text-gray-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-gray-200 hover:text-white text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors"
              >
                <Globe size={15} />
                <span className="font-devanagari">{localeLabels[locale]}</span>
                <ChevronDown size={13} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[120px]">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={pathname}
                      locale={loc as "mr" | "hi" | "en" | "gu" | "bn" | "pa"}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2 text-sm font-devanagari hover:bg-saffron-50 transition-colors ${
                        loc === locale
                          ? "text-saffron-600 font-semibold bg-saffron-50"
                          : "text-gray-700"
                      }`}
                    >
                      {localeLabels[loc]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Donate CTA */}
            <Link
              href="/donate"
              className="hidden sm:block btn-saffron text-sm py-2 px-4 font-devanagari"
            >
              {t("donate")}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 rounded-md hover:bg-white/10"
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
                className={`block px-4 py-2.5 rounded-md text-sm font-devanagari transition-colors ${
                  pathname === link.href
                    ? "bg-saffron-500 text-white"
                    : "text-gray-200 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-3 btn-saffron text-center text-sm font-devanagari"
            >
              {t("donate")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
