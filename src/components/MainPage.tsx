"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import Records from "./Records";
import TagRank from "./TagRank";
import UserSetForm from "./UserSetForm";
import { Record } from "@/utilities/common";
import ExpenditureRank from "./ExpenditureRank";

export default function MainPage() {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    fetch("/api/records", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRecords)
      .catch((error) => console.error("There was an error!", error));
  }, []);

  return (
    <main className="max-w-[1280px] mx-auto px-4 grid grid-cols-[2fr_7fr_3fr] gap-16">
      <div className="mt-12"></div>
      <div className="mt-12">
        <ExpenseForm />
        <Records records={records} />
      </div>
      <div className="flex flex-col gap-8 mt-12">
        <UserSetForm />
        <TagRank records={records} />
        <ExpenditureRank records={records} />
      </div>
    </main>
  );
}
