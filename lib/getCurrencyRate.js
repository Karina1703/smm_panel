import API_URL from "@lib/apiUrl";

export async function getCurrencyRate(currency) {
  if (currency === "RUB") {
    return 1;
  }

  const res = await fetch(
    `${API_URL}/api/currencies/rate?currency=${currency}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    console.error(`HTTP error: ${res.status} ${res.statusText}`);
    return;
  }

  return await res?.json();
}
