export type Record = {
  date: string;
  price: string;
  description: string;
  paymentMethod: string;
  tag: string;
};

export type GroupedRecords = {
  [key: string]: Record[];
};

export const formatPriceToCurrency = (value: string) => {
  const numberValue = Number(value);
  return new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    currency: "KRW",
  }).format(numberValue);
};

export const groupRecordsByDate = (records: Record[]) => {
  return records.reduce<GroupedRecords>((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {});
};
