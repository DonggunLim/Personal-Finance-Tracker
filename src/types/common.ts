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
