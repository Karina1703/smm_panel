import { useTranslations } from "next-intl";
import ServiceLandingComponent from "@components/landing/ServiceLandingComponent";
import Meta from "@components/Meta";

const DiscordPage = () => {
  const t = useTranslations("DiscordPage");
  return (
    <>
      <Meta
        title={t("Seo.title")}
        description={t("Seo.description")}
        siteName={t("Seo.siteName")}
        url={t("Seo.url")}
      />
      <ServiceLandingComponent t={t} service={"discord"} />
    </>
  );
};

export default DiscordPage;
