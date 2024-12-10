// import { NextResponse } from "next/server";
// import Services from "@models/services";
// import User from "@models/user";
// import dbConnect from "@utils/database";
// import axios from "axios";
// import Orders from "@models/orders";
//
// // export async function POST(request) {
// // }
//
// export async function GET(request) {
//   const url = new URL(request.url);
//   const key = url.searchParams.get("key");
//   const action = url.searchParams.get("action");
//
//   await dbConnect();
//   const apiKeyUser = await User.findOne({ api_key: key });
//
//   if (apiKeyUser) {
//     try {
//       if (action === "services") {
//         const servicesList = await Services.find({
//           enabled: true,
//         })
//           .lean()
//           .sort({
//             serviceId: 1,
//           });
//
//         const filteredServicesList = servicesList.map((service) => {
//           const {
//             __v,
//             _id,
//             createdAt,
//             updatedAt,
//             enabled,
//             ...filteredService
//           } = service;
//           return filteredService;
//         });
//
//         return NextResponse.json(filteredServicesList);
//       }
//       if (action === "add") {
//         const service = url.searchParams.get("service");
//         const link = url.searchParams.get("link");
//         const quantity = url.searchParams.get("quantity");
//
//         if (!service || !link || !quantity) {
//           return NextResponse.json(
//             { message: "Please provide correct service, link and quantity" },
//             { status: 400 }
//           );
//         }
//
//         const serviceData = await Services.findOne({ serviceId: service });
//
//         if (!serviceData) {
//           return NextResponse.json(
//             { message: `Incorrect service` },
//             { status: 400 }
//           );
//         }
//
//         if (quantity < serviceData.min || quantity > serviceData.max) {
//           return NextResponse.json(
//             {
//               message: `Quantity less than ${serviceData.min} or more than ${serviceData.max}`,
//             },
//             { status: 400 }
//           );
//         }
//
//         if (link.length < 5) {
//           return NextResponse.json(
//             { message: `Incorrect link` },
//             { status: 400 }
//           );
//         }
//
//         // Получить стоимость заказа
//         const orderPrice = serviceData.rate * quantity;
//
//         // Проверить достаточно ли денег на балансе пользовтеля
//         const isEnoughMoney = apiKeyUser.balance - orderPrice;
//
//         // Если достаточно, то создаем заказ и минусуем средства с баланса
//         if (isEnoughMoney >= 0) {
//           const response = await axios.post(
//             `https://ax-api.ru/api/v2/?key=${process.env.PANEL_API_KEY}&action=add&service=${service}&link=${link}&quantity=${quantity}`
//           );
//           if (response.data.order) {
//             // Списываем средства с баланса пользователя
//             await apiKeyUser.updateOne({
//               $set: {
//                 balance: isEnoughMoney,
//                 orders: apiKeyUser.orders + 1,
//                 spent: apiKeyUser.spent + orderPrice,
//               },
//             });
//
//             // Добавляем заказ в коллекцию orders в MongoDB
//             await Orders.create({
//               orderId: response.data.order,
//               createdBy: "API",
//               orderType: serviceData.type,
//               userEmail: apiKeyUser.email,
//               serviceId: service,
//               name: serviceData.name,
//               name_en: serviceData.name_en,
//               category: serviceData.category,
//               quantity: quantity,
//               price: orderPrice,
//               link: link,
//               status: "В ожидании",
//               remains: quantity,
//               customComments: "",
//               mentionsHashtag: "",
//             });
//
//             return NextResponse.json(
//               { order: response.data.order },
//               { status: 200 }
//             );
//           } else {
//             return NextResponse.json(
//               {
//                 message:
//                   "General Error, please contact our support team at support@smmstats.com",
//               },
//               { status: 400 }
//             );
//           }
//         } else {
//           // Если недостаточно, то выводим ошибку "Not enough funds"
//           return NextResponse.json(
//             { message: "Not enough funds" },
//             { status: 400 }
//           );
//         }
//       }
//       if (action === "status") {
//         const order = url.searchParams.get("order");
//         const orders = url.searchParams.get("orders");
//
//         // Проверяем заказы API пользователя
//         if (order && !orders) {
//           const orderData = await Orders.findOne({
//             orderId: order,
//             userEmail: apiKeyUser.email,
//           });
//           if (orderData) {
//             const response = await axios.post(
//               `https://ax-api.ru/api/v2/?key=${process.env.PANEL_API_KEY}&action=status&order=${order}`
//             );
//             if (response.data) {
//               return NextResponse.json(response.data, { status: 200 });
//             }
//           }
//           return NextResponse.json(
//             { message: "Incorrect order ID" },
//             { status: 400 }
//           );
//         }
//         if (orders && !order) {
//           const ordersArray = orders.split(","); // Преобразование строки в массив
//           const ordersData = await Promise.all(
//             ordersArray.map((order) => {
//               return Orders.find({
//                 orderId: order,
//                 userEmail: apiKeyUser.email,
//               }).lean();
//             })
//           );
//
//           // Объединяем вложенные массивы в один массив
//           const flattenedOrdersData = ordersData.flat();
//
//           // Извлекаем значения orderId из каждого объекта
//           const orderIds = flattenedOrdersData.map((order) => order.orderId);
//
//           if (ordersData) {
//             const response = await axios.post(
//               `https://ax-api.ru/api/v2/?key=${process.env.PANEL_API_KEY}&action=status&orders=${orderIds}`
//             );
//             if (response.data) {
//               return NextResponse.json(response.data, { status: 200 });
//             }
//           }
//           return NextResponse.json(
//             { message: "Incorrect order ID" },
//             { status: 400 }
//           );
//         }
//         return NextResponse.json(
//           { message: "Specify only order or orders!" },
//           { status: 400 }
//         );
//       }
//       if (action === "balance") {
//         return NextResponse.json(
//           { balance: apiKeyUser.balance, currency: "RUB" },
//           { status: 200 }
//         );
//       }
//
//       return NextResponse.json(
//         { message: "Incorrect action" },
//         { status: 400 }
//       );
//     } catch (e) {
//       console.log(e.message);
//     }
//   } else {
//     return NextResponse.json({ message: "Access Denied" }, { status: 401 });
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("API temporarily disabled", { status: 405 });
}
