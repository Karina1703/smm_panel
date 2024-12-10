import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AffiliatesClient from "@app/[locale]/dashboard/affiliates/AffiliatesClient";

const AffiliatesPage = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;

  if (!session) {
    redirect("/signin?callbackUrl=/dashboard/affiliates");
  }

  return (
    <>
      <AffiliatesClient email={userEmail} />
    </>
  );
};

export default AffiliatesPage;
