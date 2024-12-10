import dbConnect from "@utils/database";
import Payments from "@models/payments";

export async function getPayments(perPage, page) {
  await dbConnect();

  try {
    if (perPage && page) {
      const payments = await Payments.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);

      // Преобразовываем каждый Mongoose Query в простой объект
      const items = payments.map((payment) => {
        return JSON.parse(JSON.stringify(payment));
      });

      const itemCount = await Payments.countDocuments({});

      return { items, itemCount };
    } else {
      const payments = await Payments.find({
        status: {
          $nin: [0],
        },
      }).lean();

      return payments.map((payment) => {
        return JSON.parse(JSON.stringify(payment));
      });
    }
  } catch (e) {
    throw new Error("Failed to fetch payments. Please try again later.");
  }
}
