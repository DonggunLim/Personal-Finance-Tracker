import { Record, TagSummary, orderByTag } from "@/utilities/common";
import PieGraphe from "./PieGraphe";
import { useEffect, useState } from "react";

type Props = {
  records: Record[];
};

export default function TagRatioTrendChart({ records }: Props) {
  const [pieChartData, setPieChartData] = useState<TagSummary[]>([]);

  useEffect(() => {
    setPieChartData(orderByTag(records));
  }, [records]);

  return <PieGraphe data={pieChartData} />;
}
