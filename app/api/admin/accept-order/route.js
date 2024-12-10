import axios from "axios";
import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Services from "@models/services";
import User from "@models/user";
import Orders from "@models/orders";
import { checkUserReferrer } from "@lib/checkUserReferrer";

export async function GET(request) {
  const url = new URL(request.url);
  const adminApiKey = url.searchParams.get("key");
  const orderId = url.searchParams.get("order");

  if (adminApiKey === process.env.SECRET_KEY) {
    try {
      await dbConnect();

      const orderData = await Orders.findOne({ orderId: orderId });
      const user = await User.findOne({ email: orderData.userEmail });

      const newOrderData = {
        service: orderData.serviceId,
        link: orderData.link,
        quantity: orderData.quantity,
      };

      const response = await axios.post(
        `${process.env.PROVIDER_URL}/?key=${process.env.PROVIDER_API_KEY}&action=add`,
        newOrderData
      );

      if (response.data.order) {
        // Меняем заказу ID на реальный ID с ax-api и меняем статус с "Не оплачен" на "В ожидании"
        await orderData.updateOne({
          $set: {
            orderId: response.data.order,
            status: "В ожидании",
          },
        });
        // Добавляем пользователю +1 заказ и стоимость заказа в "потрачено на услуги"
        await user.updateOne({
          $set: {
            orders: user.orders + 1,
            spent: user.spent + orderData.price,
          },
        });
      }

      return NextResponse.json(
        {
          status: "success",
          message: "Сделано, капитан!",
          newOrderId: response.data.order,
        },
        { status: 200 }
      );
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return NextResponse.json("Access Denied", { status: 403 });
  }
}
