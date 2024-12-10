import crypto from "crypto";
import User from "@models/user";

export async function generateApiKey() {
  const apiKeyLength = 32;
  let apiKey;

  do {
    const randomBytes = crypto.randomBytes(apiKeyLength);
    apiKey = randomBytes.toString("base64url").slice(0, apiKeyLength);

    const existingApiKey = await User.findOne({ api_key: apiKey });

    if (!existingApiKey) {
      return apiKey;
    }
  } while (true); // Продолжаем генерацию, пока не найдем уникальный API-ключ
}
