export type Record = {
  date: string;
  price: string;
  description: string;
  paymentMethod: string;
  tag: string;
  installment: string;
  installmentDetails: InstallmentDetails;
  _id?: string;
};

export type InstallmentDetails = {
  isInstallment: boolean;
  installmentString: string;
  installmentPeriod?: number;
  installmentAmount?: number;
  firstPaymentDate?: string;
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

export type LineChartData = {
  name: string;
  totalExpense: number;
};

export const formatPriceToCurrency = (value: string | number) => {
  const numberValue = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    currency: "KRW",
  }).format(numberValue);
};

export const groupRecordsByDate = (records: Record[]) => {
  const grouped = records.reduce<GroupedRecords>((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {});

  const sortedEntries = Object.entries(grouped).sort((a, b) => {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
  });

  return Object.fromEntries(sortedEntries);
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
  dailySpendingLimit: number,
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

export const getStartEndDate = (date: string) => {
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const nextMonth =
    parseInt(month) === 12
      ? "01"
      : (parseInt(month) + 1).toString().padStart(2, "0");
  const nextYear =
    parseInt(month) === 12 ? (parseInt(year) + 1).toString() : year;

  const startDate = `${year}-${month}-01`;
  const endDate = `${nextYear}-${nextMonth}-01`;

  return { startDate, endDate };
};

export const convertDateToYYYYMMDD = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const processGroupedRecordsToLineChartData = (records: Record[]) => {
  const groupedRecords = groupRecordsByDate(records);
  const chartData: LineChartData[] = [];

  Object.entries(groupedRecords).forEach(([date, records]) => {
    const totalExpense = records.reduce(
      (sum, record) => sum + parseInt(record.price, 10),
      0,
    );
    chartData.push({
      name: date,
      totalExpense,
    });
  });

  chartData.sort((a, b) => a.name.localeCompare(b.name));

  return chartData;
};

export const calculateTotalExpense = (records: Record[]) => {
  const expense = records.reduce((total, record) => {
    const amount = Number(record.price);
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);
  return formatPriceToCurrency(expense);
};
