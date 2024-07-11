"use client";

import Records from "./Records";
import TagRank from "./TagRank";
import UserSetForm from "./UserSetForm";
import ExpenditureRank from "./ExpenditureRank";
import DailyLimitExceeds from "./DailyLimitExceeds";
import SelectedMonth from "./SelectedMonth";
import { useDateNavigation } from "@/hooks/useDateNavigation";
import { useUserData } from "@/hooks/useUserData";
import { useCurrentMonthReocrds } from "@/hooks/useCurrentMonthRecords";
import FormFloatingButton from "./Buttons/FormFloatingButton";
import TotalExpense from "./TotalExpense";
import { Record } from "@/types/record";

type Props = {
  initialRecords: Record[];
  cachedKey: string;
};

export default function MainPage({ initialRecords, cachedKey }: Props) {
  const { currentDate, handlePrevBtn, handleNextBtn } = useDateNavigation();
  const { userData, manageUserData } = useUserData();
  const { currentRecords, manageRecord } = useCurrentMonthReocrds(
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
      <div className="gird-cols-1 top-24 order-2 grid h-fit auto-rows-min gap-8 md:max-xl:grid-cols-2 xl:sticky xl:order-3">
        <FormFloatingButton manageRecord={manageRecord} />
        <TotalExpense records={currentRecords} title="👛이번 달 총지출" />
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
