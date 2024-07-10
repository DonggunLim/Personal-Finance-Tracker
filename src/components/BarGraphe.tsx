import { TagSummary } from "@/types/common";
import { Record } from "@/types/record";
import { formatPriceToCurrency, orderByTag } from "@/utilities/common";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
} from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { ValueType } from "tailwindcss/types/config";

type Props = {
  records: Record[];
};

export default function BarGraphe({ records }: Props) {
  const [grapheData, setGrapheData] = useState<TagSummary[]>([]);

  useEffect(() => {
    setGrapheData(orderByTag(records));
  }, [records]);
  return (
    <ResponsiveContainer>
      <BarChart width={150} height={40} data={grapheData} barSize={30}>
        <Bar dataKey="total_price" fill="#8884d8" />
        <XAxis dataKey="tag" scale="point" padding={{ left: 30, right: 30 }} />
        <Tooltip content={<CustomTooltip />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-neutral-900 px-2 py-1 text-white">
        <p className="text-xs font-medium">지출</p>
        <p className="text-base font-bold">{`${formatPriceToCurrency(
          payload[0].value as string,
        )}원`}</p>
      </div>
    );
  }

  return null;
};
