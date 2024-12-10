import axios from "axios";
import { NextResponse } from "next/server";
import dbConnect from "@utils/database";
import Services from "@models/services";
import { getCurrencyRate } from "@lib/getCurrencyRate";

export async function GET(request) {
  const url = new URL(request.url);
  const adminApiKey = url.searchParams.get("key");

  const USDRate = await getCurrencyRate("USD");
  const minServicePrice = USDRate * process.env.MINIMUM_SERVICE_PRICE;

  if (adminApiKey === process.env.SECRET_KEY) {
    try {
      await dbConnect();

      const response = await axios.post(
        `${process.env.PROVIDER_URL}/?key=${process.env.PROVIDER_API_KEY}&action=services`
      );
      const servicesData = response.data;

      let newServicesCount = 0;
      let updatedServicesCount = 0;
      let disabledServicesCount = 0;

      // Find all existing services in the database
      const existingServices = await Services.find({}, { serviceId: 1 });

      // Update existing services and mark them as disabled
      await Promise.all(
        existingServices.map(async (existingService) => {
          const service = servicesData.find((data) => Number(data.service) === existingService.serviceId);
          if (service) {
            let servicePrice;

            if (service.rate < minServicePrice) {
              servicePrice = minServicePrice;
            } else {
              servicePrice = Math.ceil(service.rate);
            }

            // Update existing service
            existingService.rate1K = servicePrice;
            existingService.rate = (servicePrice / 1000).toFixed(3);
            existingService.min = service.min;
            existingService.max = service.max;
            existingService.enabled = true; // Mark as enabled
            await existingService.save();
            updatedServicesCount++;
          } else {
            // Mark existing service as disabled
            await Services.findOneAndUpdate({ serviceId: existingService.serviceId }, { enabled: false });
            disabledServicesCount++;
          }
        })
      );

      // Create new services and mark them as enabled
      await Promise.all(
        servicesData.map(async (data) => {
          const existingService = await Services.findOne({
            serviceId: data.service,
          });
          if (!existingService) {
            let servicePrice;

            if (data.rate < minServicePrice) {
              servicePrice = minServicePrice;
            } else {
              servicePrice = Math.ceil(data.rate);
            }

            // Create new service
            const service = new Services({
              serviceId: data.service,
              category: data.category,
              name: data.name,
              type: data.type,
              rate1K: servicePrice,
              rate: (servicePrice / 1000).toFixed(3),
              min: data.min,
              max: data.max,
              name_en: data.name,
              enabled: true, // Mark as enabled
            });
            await service.save();
            newServicesCount++;
          }
        })
      );

      return NextResponse.json(
        {
          status: "success",
          newServices: newServicesCount,
          updatedServices: updatedServicesCount,
          disabledServices: disabledServicesCount,
        },
        { status: 200 }
      );
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return NextResponse.json("Access Denied", { status: 403 });
  }
}
