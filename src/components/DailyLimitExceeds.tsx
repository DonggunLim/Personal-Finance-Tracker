import { Record, countDaysOfExceeds } from "@/utilities/common";
import { useEffect, useState } from "react";

type Props = {
  records: Record[];
  dailySpendingLimit: string;
};

export default function DailyLimitExceeds({
  records,
  dailySpendingLimit,
}: Props) {
  const [exceedCount, setExceedCount] = useState(0);

  useEffect(() => {
    setExceedCount(countDaysOfExceeds(records, parseInt(dailySpendingLimit)));
  }, [records, dailySpendingLimit]);

  return (
    <div>
      <p className="text-xs font-medium mb-1">🚨일일 지출 한도 초과 횟수</p>
      <div className="box bg-red-100 h-20 flex items-center justify-center">
        <p className="text-3xl font-medium">
          {exceedCount}/<span className="text-xl">31</span>
        </p>
      </div>
    </div>
  );
}
