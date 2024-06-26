"use client";

import { useEffect, useState } from "react";
import PeriodSelector from "./PeriodSelector";
import ExpenditureTrendChart from "./ExpenditureTrendChart";
import { SanityUser } from "@/types/user";
import TagRatioTrendChart from "./TagRatioTrendChart";
import Records from "./Records";
import { Record } from "@/types/record";

export default function ChartPage() {
  const [period, setPeriod] = useState({ startDate: "", endDate: "" });
  const [records, setRecords] = useState<Record[]>([]);
  const [userData, setUserdata] = useState<SanityUser>({
    id: "",
    name: "",
    email: "",
    image: "",
    fixedIncome: "",
    dailySpendingLimit: "",
  });

  const handleStartDate = (startDate: string) =>
    setPeriod({ ...period, startDate });
  const handleEndDate = (endDate: string) => setPeriod({ ...period, endDate });

  useEffect(() => {
    if (!period.endDate || !period.startDate) return;

    fetch(`/api/records/period/${period.startDate}~${period.endDate}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRecords)
      .catch((error) => console.error("There was an error!", error));
  }, [period.startDate, period.endDate]);

  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
    }) //
      .then((res) => res.json())
      .then((res) => setUserdata(res[0]));
  }, []);

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-4 px-4">
      <div className="mt-12">
        <PeriodSelector
          handleStartDate={handleStartDate}
          handleEndDate={handleEndDate}
        />
      </div>
      {records.length > 0 && (
        <div className="flex w-full flex-wrap gap-2">
          <div className="box w-fit">
            <ExpenditureTrendChart
              records={records}
              dailySpendingLimit={userData.dailySpendingLimit}
            />
          </div>
          <div className="box w-fit">
            <TagRatioTrendChart records={records} />
          </div>
        </div>
      )}
      <div>
        <Records records={records} userData={userData} />
      </div>
    </main>
  );
}
