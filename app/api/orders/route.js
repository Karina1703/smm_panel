import { NextResponse } from "next/server";
import Orders from "@models/orders";
import User from "@models/user";
import dbConnect from "@utils/database";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Payments from "@models/payments";

export async function POST(request) {
  const orderData = await request.json();
  const session = await getServerSession(authOptions);

  // if (session) {
  try {
    await dbConnect();
    if (orderData.status !== "Не оплачен") {
      const newOrderData = {
        service: orderData.serviceId,
        link: orderData.link,
        quantity:
          orderData.customComments || orderData.mentionsCustomList || orderData.customCommentsPackage
            ? null
            : orderData.quantity,
        comments: orderData.customComments || orderData.customCommentsPackage,
        hashtag: orderData.mentionsHashtag,
        usernames: orderData.mentionsWithHashtagsUsernames || orderData.mentionsCustomList,
        hashtags: orderData.mentionsWithHashtags,
        username: orderData.mentionsUserFollowers,
      };

      const response = await axios.post(
        `${process.env.PROVIDER_URL}/?key=${process.env.PROVIDER_API_KEY}&action=add`,
        newOrderData
      );

      if (response.data.order) {
        const user = await User.findOne({ email: orderData.user });

        const newBalance = user.balance - orderData.price;

        // Списываем средства с баланса пользователя
        await user.updateOne({
          $set: {
            balance: newBalance,
            orders: user.orders + 1,
            spent: user.spent + orderData.price,
          },
        });

        // Add order to MongoDB orders collection
        await Orders.create({
          orderId: response.data.order,
          orderType: orderData.serviceType,
          userEmail: orderData.user,
          serviceId: orderData.serviceId,
          name: orderData.serviceName,
          name_en: orderData.serviceName_en,
          category: orderData.serviceCategory,
          quantity: orderData.quantity,
          price: orderData.price,
          link: orderData.link,
          status: "В ожидании",
          remains: orderData.quantity,
          customComments: orderData.customComments || "",
          mentionsHashtag: orderData.mentionsHashtag || "",
          mentionsWithHashtagsUsernames: orderData.mentionsWithHashtagsUsernames || "",
          mentionsWithHashtags: orderData.mentionsWithHashtags || "",
          mentionsCustomList: orderData.mentionsCustomList || "",
          mentionsUserFollowers: orderData.mentionsUserFollowers || "",
          customCommentsPackage: orderData.customCommentsPackage || "",
        });

        return NextResponse.json({ orderId: response.data.order }, { status: 200 });
      } else {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
      }
    } else {
      const unpaidOrderId = "S" + ((await Orders.countDocuments()) + 1) + "E";
      await Orders.create({
        orderId: unpaidOrderId,
        orderType: orderData.serviceType,
        userEmail: orderData.user,
        serviceId: orderData.serviceId,
        name: orderData.serviceName,
        name_en: orderData.serviceName_en,
        category: orderData.serviceCategory,
        quantity: orderData.quantity,
        price: orderData.price,
        link: orderData.link,
        status: orderData.status,
        remains: orderData.quantity,
        customComments: orderData.customComments || "",
        mentionsHashtag: orderData.mentionsHashtag || "",
        mentionsWithHashtagsUsernames: orderData.mentionsWithHashtagsUsernames || "",
        mentionsWithHashtags: orderData.mentionsWithHashtags || "",
        mentionsCustomList: orderData.mentionsCustomList || "",
        mentionsUserFollowers: orderData.mentionsUserFollowers || "",
        customCommentsPackage: orderData.customCommentsPackage || "",
      });

      return NextResponse.json({ orderId: unpaidOrderId }, { status: 200 });
    }
  } catch (e) {
    console.log(e.message);
  }
  // } else {
  //   return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  // }
}

export async function GET(request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      await dbConnect();
      const orders = await Orders.find({ userEmail: email });
      if (!orders) {
        return NextResponse.json({ message: "No orders" }, { status: 404 });
      }
      return NextResponse.json({ status: "success", results: orders.length, orders }, { status: 200 });
    } catch (err) {
      console.log(err.message);
      return NextResponse.json({ message: `Error : ${err.message}` }, { status: 404 });
    }
  } else {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }
}
