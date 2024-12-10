import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ApiClient from "@app/[locale]/dashboard/api/ApiClient";

const APIPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?callbackUrl=/dashboard/api");
  }

  return (
    <>
      <ApiClient />
    </>
  );
};

export default APIPage;
