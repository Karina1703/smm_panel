const Meta = ({ title, description, siteName, url }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content="/assets/images/og-image.webp" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
};

export default Meta;
