"use client";

import { useState } from "react";
import { FormData } from "../ExpenseFormModal";
import ExpenseFormModal from "../ExpenseFormModal";
import AddIconButton from "./AddIconButton";
import { Record } from "@/utilities/common";
import { RecordActionType } from "@/hooks/useRecords";
import { useToast } from "@/hooks/useToast";
type Props = {
  manageRecord: (record: Record, action: RecordActionType) => void;
};
export default function FormFloatingButton({ manageRecord }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const toast = useToast();
  const handleAddReocrdSubmit = (formData: FormData) => {
    fetch("/api/records", {
      method: "POST",
      body: JSON.stringify(formData),
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
        manageRecord(data, "add");
        toast.success("기록이 추가 되었습니다.");
      })
      .catch((error) => {
        console.error(error);
        manageRecord(formData, "delete");
        toast.success(`${error.message}`);
      })
      .finally(() => {
        onClose();
      });
  };
  return (
    <div
      className="fixed bottom-6 right-6 cursor-pointer"
      onClick={(e: React.MouseEvent) => setIsOpen(true)}
    >
      <AddIconButton size="large" />
      {isOpen && (
        <ExpenseFormModal onClose={onClose} onSubmit={handleAddReocrdSubmit} />
      )}
    </div>
  );
}
