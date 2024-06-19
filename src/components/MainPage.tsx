"use client";

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
import FormFloatingButton from "./Buttons/FormFloatingButton";
import TotalExpense from "./TotalExpense";

type Props = {
  initialRecords: Record[];
  cachedKey: string;
};

export default function MainPage({ initialRecords, cachedKey }: Props) {
  const { currentDate, handlePrevBtn, handleNextBtn } = useDateNavigation();
  const { userData, manageUserData } = useUserData();
  const { currentRecords, manageRecord } = useRecords(
    currentDate,
    initialRecords,
    cachedKey,
  );
  return (
    <main className="relative mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-x-16 px-4 xl:grid-cols-[2fr_7fr_3fr]">
      <div className=""></div>
      <div className="order-3 xl:order-2">
        <SelectedMonth
          currentDate={currentDate}
          handlePrevBtn={handlePrevBtn}
          handleNextBtn={handleNextBtn}
        />
        <Records
          records={currentRecords}
          manageRecord={manageRecord}
          userData={userData}
        />
      </div>
      <div className="gird-cols-1 order-2 grid auto-rows-min gap-8 md:max-xl:grid-cols-2 xl:order-3">
        <FormFloatingButton manageRecord={manageRecord} />
        <TotalExpense records={currentRecords} />
        <UserSetForm userData={userData} manageUserData={manageUserData} />
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
