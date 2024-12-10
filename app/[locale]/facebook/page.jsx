import { useTranslations } from "next-intl";
import ServiceLandingComponent from "@components/landing/ServiceLandingComponent";
import Meta from "@components/Meta";

const FacebookPage = () => {
  const t = useTranslations("FacebookPage");
  return (
    <>
      <Meta
        title={t("Seo.title")}
        description={t("Seo.description")}
        siteName={t("Seo.siteName")}
        url={t("Seo.url")}
      />
      <ServiceLandingComponent t={t} service={"facebook"} />
    </>
  );
};

export default FacebookPage;
