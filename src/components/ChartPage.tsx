"use client";

import { useEffect, useState } from "react";
import PeriodSelector from "./PeriodSelector";
import ExpenditureTrendChart from "./ExpenditureTrendChart";
import { Record } from "@/utilities/common";
import { SanityUser } from "@/types/user";

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

  const handleDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => setPeriod((prev) => ({ ...prev, [type]: e.target.value }));

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

    fetch("/api/user", {
      method: "GET",
    }) //
      .then((res) => res.json())
      .then((res) => setUserdata(res[0]));
  }, [period]);

  return (
    <main className="max-w-5xl mx-auto px-4 gap-16 grid grid-cols-4">
      <div className="col-span-1 mt-12">
        <PeriodSelector onChange={handleDateInputChange} />
      </div>
      <div className="col-span-3 mt-12">
        <ExpenditureTrendChart
          records={records}
          dailySpendingLimit={userData.dailySpendingLimit}
        />
      </div>
    </main>
  );
}
