"use client";

import { useState } from "react";
import ExpenseFormModal, { FormData } from "../ExpenseFormModal";
import AddIconButton from "./AddIconButton";
import { Record } from "@/utilities/common";
import { RecordActionType } from "@/hooks/useRecords";
type Props = {
  manageRecord: (record: Record, action: RecordActionType) => void;
};
export default function FormFloatingButton({ manageRecord }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const handleAddReocrdSubmit = (formData: FormData) => {
    fetch("/api/records", {
      method: "POST",
      body: JSON.stringify(formData),
    }) //
      .then((res) => {
        if (res.ok) {
          manageRecord(formData, "add");
        }
      })
      .catch((error) => {
        console.error(error);
        manageRecord(formData, "delete");
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
