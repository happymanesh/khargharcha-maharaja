"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const quickLinks = [
    { href: "/about", label: nav("about") },
    { href: "/events", label: nav("events") },
    { href: "/gallery", label: nav("gallery") },
    { href: "/donate", label: nav("donate") },
    { href: "/volunteer", label: nav("volunteer") },
    { href: "/membership", label: nav("membership") },
    { href: "/live", label: nav("live") },
    { href: "/contact", label: nav("contact") },
  ];

  const socials = [
    {
      icon: Facebook,
      href: "https://facebook.com",
      label: "Facebook",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/kharghar_cha_maharaja",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@khargharChaMaharaja",
      label: "YouTube",
      color: "hover:text-red-400",
    },
    {
      icon: Twitter,
      href: "https://x.com",
      label: "X (Twitter)",
      color: "hover:text-sky-400",
    },
  ];

  return (
    <footer className="bg-maroon-950 text-gray-300">
      {/* Decorative top border */}
      <div className="h-1 bg-saffron-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-saffron-gradient flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">ग</span>
              </div>
              <div>
                <p className="text-white font-display font-bold text-sm leading-tight">
                  खारघरचा महाराजा
                </p>
                <p className="text-saffron-400 text-xs">Khargharcha Maharaja</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t("tagline")}
            </p>
            <p className="text-saffron-400 text-sm font-semibold">
              {t("motto")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("quick_links")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-saffron-400 text-sm transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <address className="not-italic space-y-1 text-gray-400 text-sm">
              <p className="text-gray-300 font-medium">Navnirman Sevabhavi Sanstha</p>
              <p>Shop No.14, Sai Srushti CHS Ltd,</p>
              <p>Plot No.15, Sector 20, Kharghar,</p>
              <p>Navi Mumbai — 410210</p>
              <a
                href="tel:+919773801884"
                className="block hover:text-saffron-400 transition-colors mt-3"
              >
                📞 +91 9773801884
              </a>
              <a
                href="mailto:navnirmansevabhavisanstha2018@gmail.com"
                className="block hover:text-saffron-400 transition-colors mt-1 break-all"
              >
                ✉️ navnirmansevabhavisanstha2018@gmail.com
              </a>
            </address>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              {t("follow_us")}
            </h3>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all ${color}`}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} {t("organization")}. {t("rights")}.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-saffron-400 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-saffron-400 transition-colors">
              {t("terms")}
            </Link>
            <Link href="/refund" className="hover:text-saffron-400 transition-colors">
              {t("refund")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
