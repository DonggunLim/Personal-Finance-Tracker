"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import Records from "./Records";
import TagRank from "./TagRank";
import UserSetForm from "./UserSetForm";
import { Record, convertDateToYYYYMMDD } from "@/utilities/common";
import ExpenditureRank from "./ExpenditureRank";
import DailyLimitExceeds from "./DailyLimitExceeds";
import { SanityUser } from "@/types/user";
import SelectedMonth from "./SelectedMonth";

type Props = {
  initialRecords: Record[];
};

export default function MainPage({ initialRecords }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState<Record[]>(initialRecords);
  const [userData, setUserdata] = useState<SanityUser>({
    id: "",
    name: "",
    email: "",
    image: "",
    fixedIncome: "",
    dailySpendingLimit: "",
  });
  useEffect(() => {
    fetch(`/api/records/${convertDateToYYYYMMDD(currentDate)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRecords)
      .catch((error) => console.error("There was an error!", error));

    fetch("/api/user", {
      method: "GET",
    }) //
      .then((res) => res.json())
      .then((res) => setUserdata(res[0]));
  }, [currentDate]);

  const handlePrevBtn = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextBtn = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <main className="max-w-[1280px] mx-auto px-4 grid grid-cols-[2fr_7fr_3fr] gap-16">
      <div className="mt-12">
        <SelectedMonth
          handlePrevBtn={handlePrevBtn}
          handleNextBtn={handleNextBtn}
          currentDate={currentDate}
        />
      </div>
      <div className="mt-12">
        <ExpenseForm />
        <Records records={records} />
      </div>
      <div className="flex flex-col gap-8 mt-12">
        <UserSetForm userData={userData} />
        <DailyLimitExceeds
          records={records}
          dailySpendingLimit={userData.dailySpendingLimit}
        />
        <TagRank records={records} />
        <ExpenditureRank records={records} />
      </div>
    </main>
  );
}
