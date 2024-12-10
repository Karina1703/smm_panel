export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/payments/success"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}
