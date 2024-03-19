import {
  LineChartData,
  Record,
  processGroupedRecordsToLineChartData,
} from "@/utilities/common";
import LineGraphe from "./LineGraphe";
import { useEffect, useState } from "react";

type Props = {
  records: Record[];
  dailySpendingLimit: string;
};

export default function ExpenditureTrendChart({
  records,
  dailySpendingLimit,
}: Props) {
  const [chartData, setChartData] = useState<LineChartData[]>([]);

  useEffect(() => {
    setChartData(processGroupedRecordsToLineChartData(records));
  }, [records]);

  return (
    <div className="box">
      <LineGraphe data={chartData} dailySpendingLimit={dailySpendingLimit} />
    </div>
  );
}
