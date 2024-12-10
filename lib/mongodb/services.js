import clientPromise from "@lib/mongodb/client";
import Services from "@models/services";

export default async function getServices() {
  try {
    const client = await clientPromise;

    return await Services.find({}).sort({ serviceId: 1 }).limit(5);
  } catch (e) {
    console.log(e.message);
  }
}
