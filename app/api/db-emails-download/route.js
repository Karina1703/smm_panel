import { NextResponse } from "next/server";
import User from "@models/user";
import dbConnect from "@utils/database";

export async function GET(req) {
        try {
            await dbConnect();
            const users = await User.find({}, { email: 1, _id: 0 }); // Получаем только email, без _id
            const emails = users.map(user => user.email); // Извлекаем электронные адреса из результатов запроса
            return NextResponse.json({ emails: emails }); // Возвращаем отформатированные email на страницу в формате JSON
        } catch (e) {
            console.log(e.message);
            return NextResponse.json({ message: "Error" }, { status: 401 });

        }
}
