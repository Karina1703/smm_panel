import Affiliates from "@models/affiliates";

async function isCodeUnique(code) {
  const existingUser = await Affiliates.findOne({ code: code });
  return !existingUser;
}

export async function generateAffiliateCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code;

  do {
    code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters.charAt(randomIndex);
      code += randomCharacter;
    }
  } while (!(await isCodeUnique(code)));

  return code;
}
