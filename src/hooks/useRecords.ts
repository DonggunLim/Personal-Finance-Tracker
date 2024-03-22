"use client";

import { Record, convertDateToYYYYMMDD } from "@/utilities/common";
import { useEffect, useState } from "react";

export const useRecords = (currentDate: Date, initialRecords: Record[]) => {
  const [records, setRecords] = useState<Record[]>(initialRecords);

  useEffect(() => {
    fetch(`/api/records/${convertDateToYYYYMMDD(currentDate)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRecords)
      .catch((error) =>
        console.error("There was an error fetching records!", error)
      );
  }, [currentDate]);

  return records;
};
