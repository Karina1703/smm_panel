import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es", "de", "fr", "ru", "hi", "zh", "jp", "kr"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
