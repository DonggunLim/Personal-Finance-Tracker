import { processGroupedRecordsToLineChartData } from "@/utilities/common";
import LineGraphe from "./LineGraphe";
import { useEffect, useState } from "react";
import { Record } from "@/types/record";
import { LineChartData } from "@/types/common";

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
    <LineGraphe data={chartData} dailySpendingLimit={dailySpendingLimit} />
  );
}
