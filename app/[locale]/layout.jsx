import "@styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Providers } from "@app/[locale]/providers";
import GoogleAnalytics from "@components/GoogleAnalytics";
import GoogleTagManager from "@components/GoogleTagManager";
import LiveChat from "@components/LiveChat";
import "../fonts.js";
import { inter, roboto } from "@app/fonts";
import YandexMetrika from "@components/YandexMetrika";

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${roboto.variable} font-roboto ${inter.variable} scroll-smooth h-full`}
      suppressHydrationWarning
    >
      <body className={"h-full"}>
        {process.env.NODE_ENV === "production" ? (
          <>
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
            <GoogleTagManager gtm_id={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
            <LiveChat chatra_id={process.env.LIVE_CHAT_ID} />
            {process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ? (
              <>
                <YandexMetrika ym_id={process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID} />
              </>
            ) : null}
          </>
        ) : null}
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
