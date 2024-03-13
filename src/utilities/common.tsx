export const formatPriceToCurrency = (value: string) => {
  const numberValue = Number(value);
  return new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    currency: "KRW",
  }).format(numberValue);
};
