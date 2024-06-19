"use client";

import { SanityUser } from "@/types/user";
import UserEditableMoneyInput from "./UserEditableMoneyInput";
import { useToast } from "@/hooks/useToast";

type Props = {
  userData: SanityUser;
  manageUserData: (data: SanityUser) => void;
};

export default function UserSetForm({ userData, manageUserData }: Props) {
  const toast = useToast();
  const handleSubmit = (
    name: keyof SanityUser,
    data: string,
    label: string,
  ) => {
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name,
        data,
      }),
    }) //
      .then((res) => {
        if (!res.ok) {
          res.json().then((error) => {
            throw new Error(
              error.message || "서버에서 응답이 올바르지 않습니다.",
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        manageUserData(data);
        toast.success(`${label}을 수정하였습니다.`);
      })
      .catch((error) => {
        toast.error(error);
        console.error(error);
      });
  };

  return (
    <div className="flex w-full gap-2">
      <UserEditableMoneyInput
        label="💰고정 수입"
        name="fixedIncome"
        initialValue={userData.fixedIncome}
        onSubmit={handleSubmit}
      />
      <UserEditableMoneyInput
        label="🤙일일 지출 한도"
        name="dailySpendingLimit"
        initialValue={userData.dailySpendingLimit}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
