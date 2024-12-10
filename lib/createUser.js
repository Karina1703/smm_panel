import dbConnect from "@utils/database";
import User from "@models/user";
import { generateApiKey } from "@lib/generateApiKey";
import { generateAffiliateCode } from "@lib/generateAffiliateCode";
import Affiliates from "@models/affiliates";
import { cookies } from "next/headers";

function getRefCookie() {
  const cookieStore = cookies();
  return cookieStore.get("REF_CODE");
}

export async function createUser(user, profile, email) {
  try {
    await dbConnect();

    const userEmail = user ? user.email : email;

    const userExists = await User.findOne({
      email: userEmail,
    });

    if (!userExists) {
      const refCookie = getRefCookie();
      const newUserId = (await User.countDocuments()) + 1;
      const uniqueApiKey = await generateApiKey();
      const uniqueAffiliateCode = await generateAffiliateCode(5);

      if (refCookie) {
        console.log(`Registration with REF_CODE: ${refCookie.value}`);

        const referrer = await Affiliates.findOne({
          code: refCookie.value,
        });

        const userData = {
          userNumber: newUserId,
          email: userEmail,
          api_key: uniqueApiKey,
          referrer: referrer.email,
        };

        if (profile) {
          if (profile.name) {
            userData.username = profile.name;
          }

          if (profile.picture) {
            userData.image = profile.picture;
          }
        }

        await User.create(userData);

        await referrer.updateOne({
          $set: {
            referrals: referrer.referrals + 1,
          },
        });
      } else {
        const userData = {
          userNumber: newUserId,
          email: userEmail,
          api_key: uniqueApiKey,
        };

        if (profile) {
          if (profile.name) {
            userData.username = profile.name;
          }

          if (profile.picture) {
            userData.image = profile.picture;
          }
        }

        await User.create(userData);
      }

      await Affiliates.create({
        userNumber: newUserId,
        email: userEmail,
        code: uniqueAffiliateCode,
      });
    } else {
      if (profile) {
        await userExists.updateOne({
          $set: {
            username: profile.name,
            image: profile.picture,
          },
        });
      }
    }
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
}
