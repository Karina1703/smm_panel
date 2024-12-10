import { requestPaymentLink } from "@lib/requestPaymentLink";
import API_URL from "@lib/apiUrl";
import { getCurrencyRate } from "@lib/getCurrencyRate";
import { setCookie } from "cookies-next";

async function checkUserExists(email) {
  const res = await fetch(`${API_URL}/api/user/exists?email=${email}`, {
    cache: "no-store",
    next: { revalidate: 5 },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

const handleQuickOrderSubmit = async (
  t,
  selectedService,
  link,
  quantity,
  price,
  email,
  selectedPaymentGateway,
  setIsLoading,
  mrrType,
  selectedType,
  balance,
  currency
) => {
  const USDRate = await getCurrencyRate("USD");

  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 1);

  setCookie("user_email", email, {
    expires: expirationDate,
  });

  if (price < 0) {
    setIsLoading(false);
    alert(t("quickOrder.Order price less than") + " $0.00");
    return;
  }

  if (selectedPaymentGateway.apiName === "balance") {
    if (balance < price) {
      setIsLoading(false);
      alert(t("quickOrder.Not enough funds on balance"));
      return;
    }
  }

  if (selectedPaymentGateway.apiName !== "balance") {
    if (price < USDRate) {
      setIsLoading(false);
      alert(t("quickOrder.For selected payment method, order must be $1 or more"));
      return;
    }
  }

  await checkUserExists(email);

  const newQuantity = mrrType !== "one-time" ? Number(quantity) + Number(quantity) * 0.1 : Number(quantity);

  const newStatus = selectedPaymentGateway.apiName === "balance" ? "В ожидании" : "Не оплачен";

  const orderData = {
    user: email,
    serviceId: selectedService.serviceId,
    serviceName: selectedService.name,
    serviceCategory: selectedService.category,
    serviceType: selectedService.type,
    quantity: newQuantity,
    status: newStatus,
    link,
    price,
  };

  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();

  if (response) {
    const numPrice = Number(price).toFixed(2);
    const priceInUSD = (numPrice / USDRate).toFixed(2);
    const gateway = selectedPaymentGateway.apiName;
    let paymentData = {
      amount: priceInUSD,
      rubAmount: numPrice,
      email: email,
      type: mrrType, // Здесь было ранее "Order", но теперь будет тип платежа (one-time, 7-days, 30-days)
      orderId: response.orderId,
      currency: currency === "RUB" ? "RUB" : "USD",
    };

    // if (gateway === "Transaction") {
    //   paymentData.quantity = quantity;
    //   paymentData.category = selectedService.category; // Добавляем свойство service к объекту paymentData
    //   paymentData.subCategory = selectedType.name; // Добавляем свойство service к объекту paymentData
    //   paymentData.link = link;
    // }

    if (gateway === "balance") {
      window.location.href = `/payments/success`;
      return;
    }

    requestPaymentLink(paymentData, gateway, setIsLoading);
    return paymentData;
  }
};

export default handleQuickOrderSubmit;
