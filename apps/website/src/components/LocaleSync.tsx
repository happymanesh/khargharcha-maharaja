"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";

const VALID_LOCALES = ["mr", "hi", "en", "gu", "bn", "pa", "ta", "te", "ml", "kn"];

export default function LocaleSync() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  useEffect(() => {
    // On every locale change, save to localStorage
    localStorage.setItem("km_locale", currentLocale);
  }, [currentLocale]);

  useEffect(() => {
    // On first load, check if saved locale differs from current URL locale
    const redirected = sessionStorage.getItem("km_locale_redirected");
    if (redirected) return;

    const saved = localStorage.getItem("km_locale");
    if (saved && saved !== currentLocale && VALID_LOCALES.includes(saved)) {
      sessionStorage.setItem("km_locale_redirected", "1");
      router.replace(`/${saved}${pathname}`);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
