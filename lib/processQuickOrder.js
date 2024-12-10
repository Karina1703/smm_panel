import User from "@models/user";
import Orders from "@models/orders";
import { checkUserReferrer } from "@lib/checkUserReferrer";
import axios from "axios";

export async function processQuickOrder(payment) {
  await payment.updateOne({
    $set: {
      status: 1,
    },
  });

  const user = await User.findOne({ email: payment.email });
  const orderData = await Orders.findOne({ orderId: payment.orderId });
  const newOrderData = {
    service: orderData.serviceId,
    link: orderData.link,
    quantity: orderData.quantity,
  };

  console.log("orderData.serviceId: ", orderData.serviceId);
  console.log("newOrderData: ", newOrderData);

  const response = await axios.post(
    `${process.env.PROVIDER_URL}/?key=${process.env.PROVIDER_API_KEY}&action=add`,
    newOrderData
  );

  console.log(response.data);

  if (response.data.order) {
    // Меняем ID заказа в платеже на реальный ID с ax-api
    await payment.updateOne({
      $set: {
        orderId: response.data.order,
      },
    });
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

    // Check if user has referrer
    await checkUserReferrer(user, payment);
  }
}
