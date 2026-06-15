import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["mr", "hi", "en", "gu", "bn", "pa", "ta", "te", "ml", "kn"],
  defaultLocale: "mr",
  localePrefix: "always",
});
