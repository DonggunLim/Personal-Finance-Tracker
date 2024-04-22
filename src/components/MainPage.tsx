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
  cachedKey: string;
};

export default function MainPage({ initialRecords, cachedKey }: Props) {
  const { currentDate, handlePrevBtn, handleNextBtn } = useDateNavigation();
  const userData = useUserData();
  const {
    currentRecords,
    addNewFormRecordToPrevRecords,
    removeRecordsFromPrevRecords,
  } = useRecords(currentDate, initialRecords, cachedKey);

  return (
    <main className="mt-12 max-w-[1280px] mx-auto px-4 grid grid-cols-1 xl:grid-cols-[2fr_7fr_3fr] gap-x-16">
      <div className="order-1">
        {/* <ExpenseForm
          addNewFormRecordToPrevRecords={addNewFormRecordToPrevRecords}
          removeRecordsFromPrevRecords={removeRecordsFromPrevRecords}
        /> */}
      </div>
      <div className="order-3 xl:order-2">
        <SelectedMonth
          currentDate={currentDate}
          handlePrevBtn={handlePrevBtn}
          handleNextBtn={handleNextBtn}
        />
        <Records records={currentRecords} />
      </div>
      <div className="grid gird-cols-1 md:max-xl:grid-cols-2 auto-rows-min gap-8 order-2 xl:order-3">
        <UserSetForm userData={userData} />
        <DailyLimitExceeds
          records={currentRecords}
          dailySpendingLimit={userData.dailySpendingLimit}
        />
        <TagRank records={currentRecords} />
        <ExpenditureRank records={currentRecords} />
      </div>
    </main>
  );
}
