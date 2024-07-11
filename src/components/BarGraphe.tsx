import { COLORS } from "@/data/data";
import { TagSummary } from "@/types/common";
import { Record } from "@/types/record";
import { formatPriceToCurrency, orderByTag } from "@/utilities/common";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
} from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { ValueType } from "tailwindcss/types/config";

type Props = {
  records: Record[];
  setSelectedRecords: Dispatch<SetStateAction<Record[]>>;
};
export default function BarGraphe({ records, setSelectedRecords }: Props) {
  const [grapheData, setGrapheData] = useState<TagSummary[]>([]);
  const handleClick = (entry: TagSummary) =>
    setSelectedRecords(records.filter((r) => r.tag === entry.tag));

  useEffect(() => {
    setGrapheData(orderByTag(records));
  }, [records]);
  return (
    <ResponsiveContainer>
      <BarChart width={150} height={40} data={grapheData} barSize={30}>
        <Bar dataKey="total_price" fill="#8884d8">
          {grapheData.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={COLORS[index % COLORS.length]}
              key={`cell-${index}`}
              onClick={() => handleClick(entry)}
            />
          ))}
        </Bar>
        <XAxis dataKey="tag" scale="point" padding={{ left: 60, right: 60 }} />
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
