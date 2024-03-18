"use client";

import { SanityUser } from "@/types/user";
import { formatPriceToCurrency } from "@/utilities/common";
import { useEffect, useState } from "react";

export default function UserSetForm() {
  const [userData, setUserdata] = useState<SanityUser>({
    id: "",
    name: "",
    email: "",
    image: "",
    fixedIncome: "",
    dailySpendingLimit: "",
  });

  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
    }) //
      .then((res) => res.json())
      .then((res) => setUserdata(res[0]));
  }, []);

  return (
    <div className="w-full flex gap-2">
      <FixedIncome IntialfixedIncome={userData.fixedIncome} />
      <DailySpendingLimit
        InitialdailySpendingLimit={userData.dailySpendingLimit}
      />
    </div>
  );
}

type FixedIncomeProps = {
  IntialfixedIncome: string;
};

function FixedIncome({ IntialfixedIncome }: FixedIncomeProps) {
  const [fixedIncome, setFixedIncome] = useState("");
  const hasChanged =
    formatPriceToCurrency(fixedIncome) !==
    formatPriceToCurrency(IntialfixedIncome);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ title: "fixedIncome", data: fixedIncome }),
    }) //
      .then((res) => res.json());
  };

  useEffect(() => {
    setFixedIncome(IntialfixedIncome);
  }, [IntialfixedIncome]);

  return (
    <form className="relative" onSubmit={handleSubmit}>
      {hasChanged && (
        <button className="text-xs absolute right-0 top-0 bg-purple-200 rounded-xl px-2 py-[1px]">
          저장
        </button>
      )}
      <p className="text-xs font-medium mb-1">💰고정 수입</p>
      <div className="box flex items-center text-lg font-bold">
        <input
          id="fixedIncome"
          className="w-full outline-none cursor-pointer text-right"
          placeholder={fixedIncome ?? "-원"}
          onChange={(e) =>
            setFixedIncome(e.target.value.replace(/[^0-9]/g, ""))
          }
          value={formatPriceToCurrency(fixedIncome)}
        />
        <p>원</p>
      </div>
    </form>
  );
}

type DailySpendingLimitProps = {
  InitialdailySpendingLimit: string;
};

function DailySpendingLimit({
  InitialdailySpendingLimit,
}: DailySpendingLimitProps) {
  const [dailySpendingLimit, setDailySpendingLimit] = useState("");
  const hasChanged =
    formatPriceToCurrency(dailySpendingLimit) !==
    formatPriceToCurrency(InitialdailySpendingLimit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        title: "dailySpendingLimit",
        data: dailySpendingLimit,
      }),
    }) //
      .then((res) => res.json());
  };

  useEffect(() => {
    setDailySpendingLimit(InitialdailySpendingLimit);
  }, [InitialdailySpendingLimit]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      {hasChanged && (
        <button className="text-xs absolute right-0 top-0 bg-purple-200 rounded-xl px-2 py-[1px]">
          저장
        </button>
      )}
      <p className="text-xs font-medium mb-1">🤙일일 지출 한도</p>
      <div className="box flex items-center text-lg font-bold">
        <input
          id="dailySpendingLimit"
          className="w-full outline-none cursor-pointer text-right"
          placeholder={dailySpendingLimit || "-원"}
          onChange={(e) =>
            setDailySpendingLimit(e.target.value.replace(/[^0-9]/g, ""))
          }
          value={formatPriceToCurrency(dailySpendingLimit)}
        />
        <p>원</p>
      </div>
    </form>
  );
}
