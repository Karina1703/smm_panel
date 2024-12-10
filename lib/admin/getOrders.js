import dbConnect from "@utils/database";
import Orders from "@models/orders";

export async function getOrders(perPage, page, userEmail) {
  await dbConnect();

  try {
    if (perPage && page) {
      if (!userEmail) {
        const orders = await Orders.find({})
          .sort({ createdAt: -1 })
          .skip(perPage * (page - 1))
          .limit(perPage);

        // Преобразовываем каждый Mongoose Query в простой объект
        const items = orders.map((order) => {
          return JSON.parse(JSON.stringify(order));
        });

        const itemCount = await Orders.countDocuments({});

        return { items, itemCount };
      } else {
        const orders = await Orders.find({ userEmail })
          .sort({ createdAt: -1 })
          .skip(perPage * (page - 1))
          .limit(perPage);

        // Преобразовываем каждый Mongoose Query в простой объект
        const items = orders.map((order) => {
          return JSON.parse(JSON.stringify(order));
        });

        const itemCount = await Orders.countDocuments({ userEmail });

        return { items, itemCount };
      }
    } else {
      const orders = await Orders.find({
        status: {
          $nin: ["Не оплачен"],
        },
      }).lean();

      return orders.map((order) => {
        return JSON.parse(JSON.stringify(order));
      });
    }
  } catch (e) {
    throw new Error("Failed to fetch orders. Please try again later.");
  }
}
