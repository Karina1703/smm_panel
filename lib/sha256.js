import crypto from "crypto";

export function sha256(arr) {
  return crypto
    .createHash("sha256")
    .update(arr.join(":"))
    .digest("hex")
    .toUpperCase();
}
