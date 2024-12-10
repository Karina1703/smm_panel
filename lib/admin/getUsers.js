import dbConnect from "@utils/database";
import User from "@models/user";

export async function getUsers(perPage, page) {
  await dbConnect();

  try {
    if (perPage && page) {
      const users = await User.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage);

      // Преобразовываем каждый Mongoose Query в простой объект
      const items = users.map((user) => {
        return JSON.parse(JSON.stringify(user));
      });

      const itemCount = await User.countDocuments({});

      return { items, itemCount };
    } else {
      const users = await User.find().lean();

      // Преобразовать каждого пользователя в простой объект
      return users.map((user) => {
        return JSON.parse(JSON.stringify(user));
      });
    }
  } catch (e) {
    throw new Error("Failed to fetch users. Please try again later.");
  }
}
