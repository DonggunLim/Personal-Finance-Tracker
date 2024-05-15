"use client";

import { GroupedRecords, Record, groupRecordsByDate } from "@/utilities/common";
import { useEffect, useState } from "react";
import RecordCard from "./RecordCard";
import { RecordActionType } from "@/hooks/useRecords";

type Props = {
  records: Record[];
  manageRecord: (record: Record, action: RecordActionType) => void;
};

export default function Records({ records, manageRecord }: Props) {
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
      {Object.entries(groupedRecords).map(([date, recordsForDate]) => (
        <div key={date} className="flex my-2">
          <div className="flex flex-col relative mr-3 w-4 items-center">
            <div
              className="absolute top-0 mt-4 h-full w-0 
            border-0 border-l-4 border-dotted border-purple-400"
            ></div>
            <div className="left-0 mt-3 h-2 w-2 rounded-full bg-purple-400"></div>
          </div>
          <div className="w-full">
            <div>
              <h1 className="text-lg font-bold">{date}</h1>
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
      ))}
    </div>
  );
}
