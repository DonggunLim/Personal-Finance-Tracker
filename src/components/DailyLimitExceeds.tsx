import { Record } from "@/types/record";
import { countDaysOfExceeds } from "@/utilities/common";
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
      <p className="mb-1 text-xs font-medium">🚨일일 지출 한도 초과 횟수</p>
      <div className="box flex h-20 items-center justify-center bg-red-100">
        <p className="text-3xl font-medium">
          {exceedCount}/<span className="text-xl">31</span>
        </p>
      </div>
    </div>
  );
}
