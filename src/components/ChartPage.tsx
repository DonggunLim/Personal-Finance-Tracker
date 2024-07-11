"use client";

import { useEffect, useState } from "react";
import PeriodSelector from "./PeriodSelector";
import { SanityUser } from "@/types/user";
import { Record } from "@/types/record";
import TotalExpense from "./TotalExpense";
import GrapheMenu from "./GrapheMenu";
import BarGraphe from "./BarGraphe";
import PieGraphe from "./PieGraphe";
import LineGraphe from "./LineGraphe";
import RecordCard from "./RecordCard";
import { Range, useRangeRecords } from "@/hooks/useRangeRecords";
import { useUserData } from "@/hooks/useUserData";

export default function ChartPage() {
  const [range, setRange] = useState<Range>({});
  const [selectedMenu, setSelectedMenu] = useState("bar");
  const [selectedRecords, setSelectedRecords] = useState<Record[]>([]);
  const { userData } = useUserData();
  const { rangeRecords } = useRangeRecords(range);
  const handleDateChange = (field: "startDate" | "endDate") => (date: string) =>
    setRange((prevRange) => ({ ...prevRange, [field]: date }));

  return (
    <main className="relative mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-x-16 px-4 xl:grid-cols-[2fr_8fr_1fr]">
      <div className="">
        <TotalExpense records={rangeRecords} title="💰합계 지출" />
      </div>
      <div className="flex flex-col gap-y-2">
        <PeriodSelector handleDateChange={handleDateChange} />
        <GrapheMenu selected={selectedMenu} setSelected={setSelectedMenu} />
        {rangeRecords.length > 0 && (
          <div className="flex w-full flex-wrap gap-2">
            {selectedMenu === "bar" && (
              <div className="box h-96 w-full">
                <BarGraphe
                  records={rangeRecords}
                  setSelectedRecords={setSelectedRecords}
                />
              </div>
            )}
            {selectedMenu === "pie" && (
              <div className="box h-96 w-full">
                <PieGraphe
                  records={rangeRecords}
                  setSelectedRecords={setSelectedRecords}
                />
              </div>
            )}
            {selectedMenu === "line" && (
              <div className="box h-96 w-full">
                <LineGraphe
                  records={rangeRecords}
                  dailySpendingLimit={userData.dailySpendingLimit}
                  setSelectedRecords={setSelectedRecords}
                />
              </div>
            )}
          </div>
        )}
        {!!selectedRecords.length && (
          <div>
            {selectedRecords.map((record, index) => (
              <RecordCard record={record} key={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
