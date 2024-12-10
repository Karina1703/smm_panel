import ServicesClient from "@app/[locale]/dashboard/services/ServicesClient";
import { getServerSession } from "@node_modules/next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "@node_modules/next/navigation";
import API_URL from "@lib/apiUrl";

async function fetchServices() {
  const res = await fetch(`${API_URL}/api/services`, {
    next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

const ServicesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/dashboard/services");
  }

  const services = await fetchServices();

  return (
    <>
      <ServicesClient services={services} />
    </>
  );
};

export default ServicesPage;
