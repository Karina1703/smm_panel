import API_URL from "@lib/apiUrl";

const onSubmitOrder = (
  event,
  t,
  email,
  price,
  balance,
  quantity,
  link,
  customComments,
  mentionsHashtag,
  mentionsWithHashtags,
  mentionsWithHashtagsUsernames,
  mentionsCustomList,
  mentionsUserFollowers,
  customCommentsPackage,
  selectedService,
  currency,
  currencyRate,
  setQuantity,
  setPrice,
  setCustomComments,
  setMentionsHashtag,
  setMentionsWithHashtags,
  setMentionsWithHashtagsUsernames,
  setMentionsCustomList,
  setMentionsUserFollowers,
  setCustomCommentsPackage,
  setAlertWindow,
  setAlertError,
  setAlertTitle,
  setAlertMessage,
  setIsLoading,
  setNewOrderButtonDisabled,
  setUpdateBalance,
  updateBalance,
  formatLocale
) => {
  // console.log("Price: " + price);
  // console.log("Balance: " + balance);
  event.preventDefault();

  if (balance < price) {
    let convertedPrice, convertedBalance;
    convertedPrice = currency !== "RUB" ? price / currencyRate : price;
    convertedBalance = currency !== "RUB" ? balance / currencyRate : balance;
    const formatter = new Intl.NumberFormat(formatLocale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    });
    const formattedPrice = formatter.format(convertedPrice - convertedBalance);
    setAlertWindow(true);
    setAlertError(true);
    setAlertTitle(t("alert.insufficient-funds"));
    setAlertMessage(`${t("alert.top-up-sum")} ${formattedPrice}`);
  } else {
    if (quantity < selectedService.min || !Number.isInteger(Number(quantity))) {
      setAlertWindow(true);
      setAlertError(true);
      setAlertTitle(t("alert.invalid-quantity"));
      setAlertMessage(`${t("alert.specify-quantity")} ${selectedService.min} 
              ${t("alert.specify-quantity-2")} ${selectedService.max}`);
    } else {
      if (link.length < 5) {
        setAlertWindow(true);
        setAlertError(true);
        setAlertTitle(t("alert.invalid-link"));
        setAlertMessage(
          `${t("alert.format-link")} ${selectedService.linkExample}`
        );
      } else {
        setIsLoading(true);
        setNewOrderButtonDisabled(true);
        const orderData = {
          user: email,
          serviceId: selectedService.serviceId,
          serviceName: selectedService.name,
          serviceName_en: selectedService.name_en,
          serviceCategory: selectedService.category,
          serviceType: selectedService.type,
          quantity: Number(quantity),
          link,
          price,
          customComments,
          mentionsHashtag,
          mentionsWithHashtagsUsernames,
          mentionsWithHashtags,
          mentionsCustomList,
          mentionsUserFollowers,
          customCommentsPackage,
        };

        console.log(orderData);

        async function sendOrder() {
          const res = await fetch(`${API_URL}/api/orders`, {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const response = await res.json();
          if (response) {
            setAlertWindow(true);
            setAlertError(false);
            setAlertTitle(t("alert.order-created"));
            setAlertMessage(`${t("alert.order-id")} ${response.orderId}`);
            setQuantity("");
            setPrice(0);
            setCustomComments("");
            setMentionsHashtag("");
            setMentionsCustomList("");
            setMentionsUserFollowers("");
            setCustomCommentsPackage("");
            setTimeout(() => {
              setNewOrderButtonDisabled(false);
              setIsLoading(false);
            }, 2000);
          }

          setUpdateBalance(updateBalance !== true);
        }

        sendOrder();
      }
    }
  }
};

export default onSubmitOrder;
