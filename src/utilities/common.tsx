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

export type TagSummary = {
  tag: string;
  count: number;
  total_price: number;
};

export type PriceSummary = {
  tag: string;
  description: string;
  price: string;
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

export const orderByTag = (records: Record[]) => {
  const tagUsage: { [key: string]: number } = {};
  const tagPrices: { [key: string]: number } = {};

  records.forEach((record) => {
    const { tag, price } = record;
    if (tag in tagUsage) {
      tagUsage[tag] += 1;
      tagPrices[tag] += parseInt(price, 10);
    } else {
      tagUsage[tag] = 1;
      tagPrices[tag] = parseInt(price, 10);
    }
  });

  const sortedTags = Object.keys(tagUsage).sort((a, b) => {
    if (tagUsage[b] - tagUsage[a] === 0) {
      return tagPrices[b] - tagPrices[a];
    }
    return tagUsage[b] - tagUsage[a];
  });

  const result = sortedTags.map((tag) => ({
    tag: tag,
    count: tagUsage[tag],
    total_price: tagPrices[tag],
  }));

  return result;
};

export const orderByPrice = (records: Record[]) => {
  return records
    .sort((a, b) => parseInt(b.price, 10) - parseInt(a.price, 10))
    .slice(0, 5);
};

export const countDaysOfExceeds = (
  records: Record[],
  dailySpendingLimit: number
) => {
  const dailySums: { [key: string]: number } = {};

  records.forEach((record) => {
    const { date, price } = record;
    const amount = parseInt(price, 10);

    if (dailySums[date]) {
      dailySums[date] += amount;
    } else {
      dailySums[date] = amount;
    }
  });

  const daysExceedingLimit = Object.values(dailySums) //
    .filter((sum) => sum > dailySpendingLimit).length;

  return daysExceedingLimit;
};
