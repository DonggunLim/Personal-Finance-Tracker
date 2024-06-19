"use client";

import { LineChartData } from "@/types/common";
import { formatPriceToCurrency } from "@/utilities/common";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  ReferenceLine,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type Props = {
  data: LineChartData[];
  dailySpendingLimit: string;
};

type CustomTooltipExtends = TooltipProps<ValueType, NameType> & {
  limit: string;
};

export default function LineGraphe({ data, dailySpendingLimit }: Props) {
  return (
    <LineChart width={300} height={200} data={data}>
      <ReferenceLine
        y={parseInt(dailySpendingLimit)}
        label="Max"
        stroke="red"
      />
      <XAxis dataKey="name" />
      <Tooltip content={<CustomTooltip limit={dailySpendingLimit} />} />
      <Line
        type="monotone"
        dataKey="totalExpense"
        stroke="#8884d8"
        strokeWidth={3}
      />
    </LineChart>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
  limit,
}: CustomTooltipExtends) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-neutral-900 px-2 py-1 text-white">
        <p className="text-xs font-medium">{label}</p>
        <p className="text-base font-bold">{`${formatPriceToCurrency(
          payload[0].value as string,
        )}원`}</p>
        {parseInt(payload[0].value as string) > parseInt(limit) && (
          <p className="text-red-500">일일 지출 한도 초과</p>
        )}
      </div>
    );
  }

  return null;
};
