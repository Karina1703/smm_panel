import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

// First DB adapter
import User from "@models/user";
import dbConnect from "@utils/database";

// Second (Main) DB adapter
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@lib/mongodb/client";
import Affiliates from "@models/affiliates";
import { generateApiKey } from "@lib/generateApiKey";
import { generateAffiliateCode } from "@lib/generateAffiliateCode";
import { createUser } from "@lib/createUser";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  pages: {
    signIn: "/signin",
    signOut: "/",
    verifyRequest: "/signin/verify",
    newUser: "/dashboard/orders/all",
  },

  // session: {
  //   strategy: "jwt",
  // },

  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      await dbConnect();
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.role = sessionUser.role;

      return session;
    },

    async signIn({ account, profile, user, email, credentials }) {
      // console.log("ACCOUNT DATA START");
      // console.log(account);
      // console.log("ACCOUNT DATA END");
      // console.log("==============================================");
      //
      // console.log("PROFILE DATA START");
      // console.log(profile);
      // console.log("PROFILE DATA END");
      // console.log("==============================================");
      //
      // console.log("USER DATA START");
      // console.log(user);
      // console.log("USER DATA END");
      // console.log("==============================================");
      //
      // console.log("EMAIL DATA START");
      // console.log(email);
      // console.log("EMAIL DATA END");
      // console.log("==============================================");

      try {
        await createUser(user, profile);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
