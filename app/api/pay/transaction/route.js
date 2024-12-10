import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Payments from "@models/payments";
import Subscriptions from "@models/subscriptions";
import { processQuickOrder } from "@lib/processQuickOrder";
import Orders from "@models/orders";

export async function POST(request) {
  // const contentType = request.headers.get("content-type");
  const ipAddress = request.headers.get("x-forwarded-for");
  // console.log(ipAddress); // TransactionCloud IP address
  // console.log(contentType); // application/json
  console.log("================== TRANSACTION CLOUD POSTBACK START ==================");
  const productionIP = "3.211.123.73";
  const sandboxIP = "5.161.71.107";
  if (ipAddress === productionIP || ipAddress === sandboxIP) {
    const req = await request.json();
    // Текущая дата
    const currentDate = new Date();
    // Дата через день
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    // Дата через неделю
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    // Дата через месяц
    const nextMonth = new Date(currentDate);
    nextMonth.setDate(currentDate.getDate() + 30);

    const paymentIdFromPayload = Number(req.payload);

    try {
      await dbConnect();

      const payment = await Payments.findOne({
        paymentId: paymentIdFromPayload,
      });

      // Создание заказа при одноразовой оплате
      if (req.webhookType === "ONETIME_PAID" && req.transactionStatus === "ONE_TIME_PAYMENT_STATUS_PAID") {
        console.log("====== NEW [ONE-TIME] ORDER ======");
        console.log(req);

        // Защита от повторных созданий заказа при многократных уведомлениях
        // Проверка: Если статус платежа 0, то создаем заказ и меняем статус платежа на 1.
        // Если статус платежа уже 1, то просто возвращаем код 200
        if (payment.status !== 1) {
          await processQuickOrder(payment);
        }

        console.log("================== TRANSACTION CLOUD POSTBACK END ==================");
        return NextResponse.json({ message: "OK" }, { status: 200 });

        // Обработка постбэка при первом и последующих платежах по подписке
      } else if (req.transactionType === "SUBSCRIPTION" && req.webhookType === "CHARGE") {
        console.log(`====== SUBSCRIPTION CHARGE ======`);
        console.log(req);

        // Выполняется создание заказа как при первом, так и последующих списаниях по подписке
        await processQuickOrder(payment);

        console.log("================== TRANSACTION CLOUD POSTBACK END ==================");
        return NextResponse.json({ message: "OK" }, { status: 200 });

        // Создание подписки при первом успешном платеже по подписке
      } else if (req.webhookType === "SUBSCRIPTION_ACTIVATED" && req.transactionStatus === "SUBSCRIPTION_STATUS_ACTIVE") {
        const orderData = await Orders.findOne({ orderId: payment.orderId });

        console.log(`====== NEW [${req.chargeFrequency}] SUBSCRIPTION ACTIVATED ======`);
        console.log(req);

        const newSubscriptionId = (await Subscriptions.countDocuments()) + 1;
        await Subscriptions.create({
          subscriptionId: newSubscriptionId,
          associatedPayment: paymentIdFromPayload,
          type: req.chargeFrequency,
          email: req.email,
          charge: req.income,
          status: req.transactionStatus === "SUBSCRIPTION_STATUS_ACTIVE" ? "Active" : "Canceled",
          createDate: currentDate.toISOString(),
          nextCharge: req.chargeFrequency === "WEEKLY" ? nextWeek.toISOString() : req.chargeFrequency === "MONTHLY" ? nextMonth.toISOString() : nextDay.toISOString(),
          serviceId: orderData.serviceId,
          quantity: orderData.quantity,
          link: orderData.link,
        });

        console.log("================== TRANSACTION CLOUD POSTBACK END ==================");
        return NextResponse.json({ message: "OK" }, { status: 200 });

        // Отмена подписки в базе данных
      } else if (req.webhookType === "SUBSCRIPTION_CANCELLED" && req.transactionStatus === "SUBSCRIPTION_STATUS_CANCELLED") {
        console.log(`====== SUBSCRIPTION CANCELED (PAYMENT: #${paymentIdFromPayload}) ======`);
        console.log(req);

        const subscription = await Subscriptions.findOne({
          associatedPayment: paymentIdFromPayload,
        });
        await subscription.updateOne({
          $set: {
            status: "Canceled",
          },
        });

        console.log("================== TRANSACTION CLOUD POSTBACK END ==================");
        return NextResponse.json({ message: "OK" }, { status: 200 });
      }

      return NextResponse.json({ message: "OK" }, { status: 200 });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    console.log(`Transaction Cloud Webhook URL - Hacking attempt from ${ipAddress}`);
    return NextResponse.json("Hacking attempt!", { status: 403 });
  }
}
