import NewOrderClient from "@app/[locale]/dashboard/new/NewOrderClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "@components/dashboard/Sidebar";

const NewOrderPage = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;

  if (!session) {
    redirect("/signin?callbackUrl=/dashboard/new");
  }

  return (
    <>
      <NewOrderClient email={userEmail} />
    </>
  );
};
export default NewOrderPage;
