"use client";

import ExpenseForm from "./ExpenseForm";
import Records from "./Records";
import TagRank from "./TagRank";
import UserSetForm from "./UserSetForm";
import { Record } from "@/utilities/common";
import ExpenditureRank from "./ExpenditureRank";
import DailyLimitExceeds from "./DailyLimitExceeds";
import SelectedMonth from "./SelectedMonth";
import { useDateNavigation } from "@/hooks/useDateNavigation";
import { useUserData } from "@/hooks/useUserData";
import { useRecords } from "@/hooks/useRecords";

type Props = {
  initialRecords: Record[];
};

export default function MainPage({ initialRecords }: Props) {
  const { currentDate, handlePrevBtn, handleNextBtn } = useDateNavigation();
  const userData = useUserData();
  const records = useRecords(currentDate, initialRecords);

  return (
    <main className="max-w-[1280px] mx-auto px-4 grid grid-cols-[2fr_7fr_3fr] gap-16">
      <div className="mt-12">
        <SelectedMonth
          currentDate={currentDate}
          handlePrevBtn={handlePrevBtn}
          handleNextBtn={handleNextBtn}
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
