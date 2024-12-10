import Orders from "@models/orders";
import axios from "axios";
import User from "@models/user";
import { NextResponse } from "next/server";
import dbConnect from "@utils/database";

export async function GET(request) {
  const url = new URL(request.url);
  const adminApiKey = url.searchParams.get("key");

  if (adminApiKey === process.env.SECRET_KEY) {
    try {
      await dbConnect();
      // Поиск всех заказов
      const orders = await Orders.find({
        status: {
          $nin: ["Выполнен", "Не оплачен", "Отменен", "Частично выполнен", "Ошибка"],
        },
      });
      // Создаем пустой массив для ID всех заказов
      const ordersIdList = [];
      // Наполняем массив ID всех заказов
      orders.map((order) => {
        ordersIdList.push(order.orderId);
      });
      // Отправляем POST запрос для получения статусов всех заказов
      const response = await axios.post(
        `${process.env.PROVIDER_URL}/?key=${process.env.PROVIDER_API_KEY}&action=status&orders=${ordersIdList}`
      );
      const statusData = response.data;
      // Synchronize orders in the database with the status and remains data from the response
      const updatedOrders = await Promise.all(
        orders.map(async (order) => {
          const orderId = order.orderId;
          let status =
            statusData[orderId].status === "Pending"
              ? "В ожидании"
              : statusData[orderId].status === "In progress"
              ? "Выполняется"
              : statusData[orderId].status === "Completed"
              ? "Выполнен"
              : statusData[orderId].status === "Partial"
              ? "Частично выполнен"
              : statusData[orderId].status === "Processing"
              ? "Обрабатывается"
              : statusData[orderId].status === "Canceled"
              ? "Отменен"
              : statusData[orderId].status === "Fail"
              ? "Ошибка"
              : statusData[orderId].status === "Error"
              ? "Ошибка"
              : statusData[orderId].status;
          const remains = statusData[orderId].remains;

          // Условие по возврату средств на баланс если заказ Canceled
          if (status === "Отменен") {
            const canceledOrder = await Orders.findOne({
              orderId: order.orderId,
            });

            await User.findOneAndUpdate(
              { email: canceledOrder.userEmail },
              {
                $inc: {
                  balance: canceledOrder.price,
                  spent: -canceledOrder.price,
                },
              },
              { new: true }
            );

            await canceledOrder.updateOne({
              $set: {
                price: 0,
              },
            });

            return {
              ...order.toObject(),
              status,
              remains,
            };
          }

          // Условие по частичному возврату средств если заказ Partial
          else if (status === "Частично выполнен") {
            const partialOrder = await Orders.findOne({
              orderId: order.orderId,
            });

            let partialPrice;

            if ((partialOrder.price / partialOrder.quantity) * statusData[orderId].remains < 0) {
                partialPrice = 0;
            } else {
              // partialPrice = (partialOrder.price / partialOrder.quantity) * statusData[orderId].remains
              partialPrice = 0
            }

            await User.findOneAndUpdate(
              { email: partialOrder.userEmail },
              {
                $inc: {
                  balance: partialPrice,
                  spent: -partialPrice,
                },
              },
              { new: true }
            );

            await partialOrder.updateOne({
              $set: {
                price: partialOrder.price - partialPrice,
              },
            });

            return {
              ...order.toObject(),
              status,
              remains,
            };
          } else {
            // Return the updated order object
            return {
              ...order.toObject(),
              status,
              remains,
            };
          }
        })
      );

      await Orders.bulkWrite(
        updatedOrders.map((order) => ({
          updateOne: {
            filter: { _id: order._id },
            update: { $set: { status: order.status, remains: order.remains } },
          },
        }))
      );

      // Retrieve the updated orders from the database
      const syncedOrders = await Orders.find({
        status: {
          $nin: ["Выполнен", "Не оплачен", "Отменен", "Частично выполнен", "Ошибка"],
        },
      });

      return NextResponse.json(
        {
          status: "success",
          results: syncedOrders.length,
          orders: syncedOrders,
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
