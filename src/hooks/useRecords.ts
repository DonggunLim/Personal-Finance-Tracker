"use client";

import { Record, convertDateToYYYYMMDD } from "@/utilities/common";
import { useEffect, useState } from "react";

export const useRecords = (
  currentDate: Date,
  initialRecords: Record[],
  cachedKey: string
) => {
  const [records, setRecords] = useState<Record[]>(initialRecords);
  const currentKey = convertDateToYYYYMMDD(currentDate);

  useEffect(() => {
    if (currentKey === cachedKey && records.length > 0) return;
    fetch(`/api/records/${convertDateToYYYYMMDD(currentDate)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRecords)
      .catch((error) =>
        console.error("There was an error fetching record", error)
      );
  }, [currentDate, cachedKey, currentKey, records.length]);

  const addNewFormRecordToPrevRecords = (record: Record) =>
    setRecords((prev) => [...prev, { ...record, newAdded: true }]);

  const removeRecordsFromPrevRecords = () =>
    setRecords((prev) => prev.filter((r) => r._id));

  return {
    records,
    addNewFormRecordToPrevRecords,
    removeRecordsFromPrevRecords,
  };
};
