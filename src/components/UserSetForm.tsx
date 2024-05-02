"use client";

import { SanityUser } from "@/types/user";
import UserEditableMoneyInput from "./UserEditableMoneyInput";

type Props = {
  userData: SanityUser;
};

export default function UserSetForm({ userData }: Props) {
  const handleSubmit = (title: string, data: string) => {
    console.log({ title, data }, "submit");
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        title,
        data,
      }),
    }) //
      .then((res) => res.json());
  };

  return (
    <div className="w-full flex gap-2">
      <UserEditableMoneyInput
        label="💰고정 수입"
        title="fixedIncome"
        initialValue={userData.fixedIncome}
        onSubmit={handleSubmit}
      />
      <UserEditableMoneyInput
        label="🤙일일 지출 한도"
        title="dailySpendingLimit"
        initialValue={userData.dailySpendingLimit}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
