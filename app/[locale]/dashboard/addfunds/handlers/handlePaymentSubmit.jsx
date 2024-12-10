import { requestPaymentLink } from "@lib/requestPaymentLink";
import { getCurrencyRate } from "@lib/getCurrencyRate";

const handlePaymentSubmit = async (
  t,
  amount,
  currency,
  userEmail,
  alertWindow,
  setAlertWindow,
  selectedPaymentGateway,
  setAlertTitle,
  setAlertMessage,
  setIsLoading
) => {
  const USDRate = await getCurrencyRate("USD");
  // Ниже проверка, если валюта юзера RUB то указанная сумма в поле делится на курс доллара
  const paymentAmount = Number(currency === "RUB" ? amount / USDRate : amount).toFixed(2);

  if (paymentAmount > 0) {
    const gateway = selectedPaymentGateway.title;
    const paymentData = {
      amount: paymentAmount,
      rubAmount: currency === "RUB" ? amount : null,
      email: userEmail,
      type: "Add Funds",
      currency: currency === "RUB" ? "RUB" : "USD",
    };

    if (gateway === "Cardlink" && paymentAmount > 250 && currency !== "RUB") {
      setAlertWindow(true);
      setAlertTitle(`${t("Wrong amount")}!`);
      setAlertMessage(t("Maximum payment amount for Cardlink is 250"));
    } else if (gateway === "Binance Pay") {
      console.log("Open Binance Pay Modal Window");
    } else {
      alertWindow && setAlertWindow(false);
      setIsLoading(true);
      requestPaymentLink(paymentData, gateway, setIsLoading);
    }
  } else {
    setAlertWindow(true);
    setAlertTitle(`${t("Wrong amount")}!`);
    setAlertMessage(t("Specify the amount from 1 to 15000"));
  }
};

export default handlePaymentSubmit;
