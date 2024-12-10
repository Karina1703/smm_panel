import API_URL from "@lib/apiUrl";

export async function requestPaymentLink(paymentData, gateway, setIsLoading) {
  const paymentGate = gateway.toLowerCase();

  const res = await fetch(`${API_URL}/api/pay/${paymentGate}/create`, {
    method: "POST",
    body: JSON.stringify(paymentData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  if (response) {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    window.location.href = response.link;
  }
}
