import { COLORS } from "@/data/data";
import { TagSummary } from "@/types/common";
import { CustomPayload } from "@/types/recharts";
import { Record } from "@/types/record";
import { formatPriceToCurrency, orderByTag } from "@/utilities/common";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Cell,
  Legend,
  LegendProps,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

type Props = {
  records: Record[];
  setSelectedRecords: Dispatch<SetStateAction<Record[]>>;
};

export default function PieGraphe({ records, setSelectedRecords }: Props) {
  const [pieGrapheData, setPieGrapheData] = useState<TagSummary[]>([]);
  const handleClick = (entry: TagSummary) =>
    setSelectedRecords(records.filter((r) => r.tag === entry.tag));

  useEffect(() => {
    setPieGrapheData(orderByTag(records));
  }, [records]);
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={pieGrapheData}
          cx="40%"
          cy="50%"
          labelLine={false}
          innerRadius={90}
          outerRadius={150}
          dataKey="total_price"
          paddingAngle={3}
        >
          {pieGrapheData.map((entry, index) => (
            <Cell
              cursor="pointer"
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              onClick={() => handleClick(entry)}
            />
          ))}
        </Pie>
        <Legend
          content={<CustomLegend />}
          verticalAlign="middle"
          layout="vertical"
          wrapperStyle={{ right: "40px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

const CustomLegend = (props: LegendProps) => {
  const { payload } = props;
  return (
    <ul className="flex flex-col gap-y-2">
      {(payload as CustomPayload[])?.map((entry: CustomPayload, index) => (
        <li key={`item-${index}`} className="w-48 font-bold">
          <div className="flex items-center justify-between">
            <div className="flex">
              <div
                className="mr-3 h-3 w-3 rounded-full"
                style={{ backgroundColor: `${entry.color}` }}
              ></div>
              <p>{entry.payload?.tag}</p>
              <p>{`${Math.round(entry.payload?.percent * 100)}%`}</p>
            </div>
            <p>{formatPriceToCurrency(entry.payload?.total_price!)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
