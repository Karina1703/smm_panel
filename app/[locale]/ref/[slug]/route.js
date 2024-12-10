import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Affiliates from "@models/affiliates";
import dbConnect from "@utils/database";
import API_URL from "@lib/apiUrl";

const REDIRECT_URL = API_URL;

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const refCode = params.slug;
  const cookieStore = cookies();
  const ref = cookieStore.get("REF_CODE");
  let response = NextResponse.redirect(REDIRECT_URL);

  if (!ref) {
    await dbConnect();
    const affiliate = await Affiliates.findOne({ code: refCode });
    if (affiliate) {
      const newVisits = affiliate.visits + 1;
      await affiliate.updateOne({
        $set: {
          visits: newVisits,
        },
      });

      response.cookies.set({
        name: "REF_CODE",
        value: refCode,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        path: "/",
      });
    }
    return response;
  } else {
    console.log("Cookies already set! " + ref.value);
    return response;
  }
}
