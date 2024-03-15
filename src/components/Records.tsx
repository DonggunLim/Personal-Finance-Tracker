"use client";

import { GroupedRecords } from "@/utilities/common";
import { useEffect, useState } from "react";
import RecordCard from "./RecordCard";

export default function Records() {
  const [records, setRecords] = useState<GroupedRecords>({});

  useEffect(() => {
    fetch("/api/records", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
      })
      .catch((error) => console.error("There was an error!", error));
  }, []);

  return (
    <div className="w-full flex flex-col">
      {Object.entries(records).map(([date, recordsForDate]) => (
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
                <RecordCard key={index} record={record} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
