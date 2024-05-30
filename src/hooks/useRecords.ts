"use client";

import {
  GroupedRecords,
  Record,
  convertDateToYYYYMMDD,
} from "@/utilities/common";
import { useEffect, useRef, useState } from "react";

export type RecordActionType = "delete" | "update" | "add";

export const useRecords = (
  currentDate: Date,
  initialRecords: Record[],
  cachedKey: string
) => {
  const currentKey = convertDateToYYYYMMDD(currentDate).slice(0, 7);
  const [records, setRecords] = useState<GroupedRecords>({
    [currentKey]: initialRecords,
  });
  const cachedKeyList = useRef<string[]>([cachedKey]);

  useEffect(() => {
    if (cachedKeyList.current.includes(currentKey)) {
      console.log(`Using cached records for key: ${currentKey}`);
      return;
    }
    console.log(`Fetching records for key: ${currentKey}`);
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
        console.error(
          `There was an error fetching record in ${currentKey}`,
          error
        )
      );
  }, [currentDate, currentKey]);

  const manageRecord = (record: Record, action: RecordActionType) => {
    setRecords((prev) => {
      const dateKey = record.date.slice(0, 7);
      const recordsForDateKey = prev[dateKey] || [];
      switch (action) {
        case "add": {
          return { ...prev, [dateKey]: [...recordsForDateKey, record] };
        }

        case "delete": {
          return {
            ...prev,
            [dateKey]: recordsForDateKey.filter((r) => r._id !== record._id),
          };
        }

        case "update": {
          return {
            ...prev,
            [dateKey]: recordsForDateKey.map((r) =>
              r._id === record._id ? record : r
            ),
          };
        }
      }
    });
  };
  return {
    currentRecords: records[currentKey] || [],
    manageRecord,
  };
};
