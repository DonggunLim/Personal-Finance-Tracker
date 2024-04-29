"use client";

import { useState } from "react";
import ExpenseFormModal from "../ExpenseFormModal";
import AddIconButton from "./AddIconButton";
import { Record } from "@/utilities/common";
type Props = {
  addNewFormRecordToPrevRecords: (Record: Record) => void;
  removeRecordsFromPrevRecords: (Record: Record) => void;
};
export default function FormFloatingButton({
  addNewFormRecordToPrevRecords,
  removeRecordsFromPrevRecords,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <div
      className="fixed bottom-6 right-6 cursor-pointer"
      onClick={(e: React.MouseEvent) => setIsOpen(true)}
    >
      <AddIconButton size="large" />
      {isOpen && (
        <ExpenseFormModal
          onClose={onClose}
          addNewFormRecordToPrevRecords={addNewFormRecordToPrevRecords}
          removeRecordsFromPrevRecords={removeRecordsFromPrevRecords}
        />
      )}
    </div>
  );
}
