import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard/orders/all");
  } else {
    redirect("/signin?callbackUrl=/dashboard/orders/all");
  }
}
