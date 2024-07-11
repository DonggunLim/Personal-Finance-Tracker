import { Record, RecordActionType } from "@/types/record";
import { useEffect, useRef, useState } from "react";

export type Range = { startDate?: string; endDate?: string };
export const useRangeRecords = (range: Range) => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    if (!range.endDate || !range.startDate) return;
    fetch(`/api/records/period/${range.startDate}~${range.endDate}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRecords)
      .catch((error) => console.error("There was an error!", error));
  }, [range.startDate, range.endDate]);

  const manageRecord = (record: Record, action: RecordActionType) => {
    setRecords((prev) => {
      switch (action) {
        case "add": {
          return { ...prev, record };
        }
        case "delete": {
          return {
            ...prev.filter((r) => r._id !== record._id),
          };
        }
        case "update": {
          return {
            ...prev.map((r) => (r._id === record._id ? record : r)),
          };
        }
      }
    });
  };

  return {
    rangeRecords: records,
    manageRecord,
  };
};
