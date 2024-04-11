"use client";

import {
  GroupedRecords,
  Record,
  convertDateToYYYYMMDD,
} from "@/utilities/common";
import { useEffect, useRef, useState } from "react";

export const useRecords = (
  currentDate: Date,
  initialRecords: Record[],
  cachedKey: string
) => {
  const currentKey = convertDateToYYYYMMDD(currentDate).slice(0, 7);
  const [records, setRecords] = useState<GroupedRecords>({
    [currentKey]: initialRecords,
  });
  const cachedKeyList = useRef<string[]>([]);

  useEffect(() => {
    if (cachedKeyList.current.includes(currentKey)) return;
    fetch(`/api/records/${convertDateToYYYYMMDD(currentDate)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRecords((prev) => ({ ...prev, [currentKey]: res }));
        cachedKeyList.current.push(currentKey);
      })
      .catch((error) =>
        console.error("There was an error fetching record", error)
      );
  }, [currentDate, cachedKey, currentKey]);

  const addNewFormRecordToPrevRecords = (record: Record) => {
    setRecords((prev) => {
      const dateKey = record.date.slice(0, 7);
      const recordsForDateKey = prev[dateKey] || [];
      return { ...prev, [dateKey]: [...recordsForDateKey, record] };
    });
  };

  const removeRecordsFromPrevRecords = (record: Record) => {
    setRecords((prev) => {
      const dateKey = record.date.slice(0, 7);
      const recordsForDateKey = prev[dateKey];
      return { ...prev, [dateKey]: recordsForDateKey.filter((r) => r._id) };
    });
  };

  return {
    currentRecords: records[currentKey] || [],
    addNewFormRecordToPrevRecords,
    removeRecordsFromPrevRecords,
  };
};
