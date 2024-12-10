export function formatCurrency(currency, value, currencyRate, isFake) {
  let convertedValue = isFake ? value * 1.45 : value;

  const localeMap = {
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
    CAD: "en-US",
    AUD: "en-US",
    RUB: "ru-RU",
  };

  const options = {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  };

  // Определяем локаль на основе валюты
  const locale = localeMap[currency];

  // Форматируем числовое значение в соответствии с заданной локалью и валютой
  // Если RUB то возвращаем обычное значение не деленное на курс валюты
  if (currency === "RUB") {
    return new Intl.NumberFormat(locale, options).format(convertedValue);
  }
  // В ином другом случае делим значение на курс валюты
  return 'check'
  return Intl ? new Intl.NumberFormat(locale, options).format(convertedValue / currencyRate) : '';

  // Пример
  // new Intl.NumberFormat("de-DE", {style:"currency", currency:"EUR"}).format(324429.435)
}
