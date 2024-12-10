import Features from "@components/homepage/Features";
import Services from "@components/homepage/Services";
import Stats from "@components/homepage/Stats";
import Testimonials from "@components/homepage/Testimonials";
import Faqs from "@components/homepage/Faqs";
import Cta from "@components/homepage/Cta";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { getTranslations } from "next-intl/server";
import Hero from "@components/homepage/Hero";
import QuickOrderServer from "@components/quickOrder/QuickOrderServer";
import ReviewsServer from "@components/homepage/reviews/ReviewsServer";
import BrandLogos from "@components/homepage/BrandLogos";
import API_URL from "@lib/apiUrl";


export async function generateMetadata() {
  const t = await getTranslations("Index");
  return {
    title: t("Seo.title"),
    description: t("Seo.description"),
    metadataBase: new URL(API_URL),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        de: "/de",
        es: "/es",
        fr: "/fr",
      },
    },
  };
}

const Index = async () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuickOrderServer />
        <BrandLogos />
        <ReviewsServer />
        <Services />
        <Features />
        <Testimonials />
        <Stats />
        <Faqs />
        <Cta />
      </main>
      <Footer />
    </>
  );
};

export default Index;
