"use client";

import {
  GroupedRecords,
  Record,
  calculateTotalExpense,
  groupRecordsByDate,
} from "@/utilities/common";
import { useEffect, useState } from "react";
import RecordCard from "./RecordCard";
import { RecordActionType } from "@/hooks/useRecords";
import Tooltip from "./UI/Tooltip";
import { SanityUser } from "@/types/user";

type Props = {
  records: Record[];
  manageRecord: (record: Record, action: RecordActionType) => void;
  userData: SanityUser;
};

export default function Records({ records, manageRecord, userData }: Props) {
  const [groupedRecords, setGroupedRecords] = useState<GroupedRecords>({});
  useEffect(() => {
    setGroupedRecords(groupRecordsByDate(records));
  }, [records]);

  return (
    <div className="w-full flex flex-col">
      {records.length === 0 && (
        <div className="flex items-center justify-center py-28">
          <p className="font-bold">지출 내역이 없습니다.</p>
        </div>
      )}
      {Object.entries(groupedRecords).map(([date, recordsForDate]) => {
        const totalExpense = calculateTotalExpense(recordsForDate);
        return (
          <div key={date} className="flex my-2">
            <div className="flex flex-col relative mr-3 w-4 items-center">
              <div
                className={`absolute top-0 mt-4 h-full w-0 
              border-0 border-l-4 border-dotted ${
                totalExpense > userData.dailySpendingLimit
                  ? "border-red-400"
                  : "border-purple-400"
              } `}
              ></div>
              <div
                className={`left-0 mt-3 h-2 w-2 rounded-full ${
                  totalExpense > userData.dailySpendingLimit
                    ? "bg-red-400"
                    : "bg-purple-400"
                }`}
              ></div>
            </div>
            <div className="w-full">
              <div>
                <div className="flex gap-x-4">
                  <h1 className="text-lg font-bold">{date.slice(-2) + "일"}</h1>
                  {totalExpense > userData.dailySpendingLimit && (
                    <Tooltip text={`일일 지출 한도 초과. ${totalExpense}원`}>
                      <div>❗</div>
                    </Tooltip>
                  )}
                </div>
                {recordsForDate.map((record, index) => (
                  <RecordCard
                    key={index}
                    record={record}
                    manageRecord={manageRecord}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
