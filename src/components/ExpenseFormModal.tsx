import CommonModal from "./common/CommonModal";
import PaymentMenu from "./Menu/PaymentMenu";
import TagMenu from "./Menu/TagMenu";
import { useState } from "react";
import CloseButton from "./Buttons/CloseButton";
import PriceInput from "./Form/PriceInput";
import DatePicker from "./Form/DatePicker";
import CommentInput from "./Form/CommentInput";
import { Record } from "@/utilities/common";

type Props = {
  onClose: () => void;
  initialFormData?: FormData;
  addNewFormRecordToPrevRecords: (Record: Record) => void;
  removeRecordsFromPrevRecords: (Record: Record) => void;
};

export type FormData = Omit<Record, "_id">;
export type FormDataKeys = keyof FormData;

export default function ExpenseFormModal({
  onClose,
  initialFormData = {
    date: "",
    price: "",
    paymentMethod: "",
    tag: "",
    description: "",
  },
  addNewFormRecordToPrevRecords,
  removeRecordsFromPrevRecords,
}: Props) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const handleChange = (value: string, fieldName: FormDataKeys) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewFormRecordToPrevRecords(formData);
    fetch("/api/records", {
      method: "POST",
      body: JSON.stringify(formData),
    }) //
      .then((res) => {
        if (res.ok) console.log("formSubmit complited");
      })
      .catch((error) => {
        console.error(error);
        removeRecordsFromPrevRecords(formData);
      })
      .finally(() => {
        setFormData(initialFormData);
      });
  };

  return (
    <CommonModal>
      <section className="fixed top-0 left-0 w-full h-full bg-gray-900/30 backdrop-blur-sm flex justify-center items-center">
        <div className="relative bg-white w-fit p-4">
          <CloseButton onClose={onClose} />
          <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-around">
              <DatePicker onChange={handleChange} />
              <PaymentMenu onChange={handleChange} />
              <TagMenu onChange={handleChange} />
            </div>
            <PriceInput onChange={handleChange} />
            <CommentInput onChange={handleChange} />
            <button className="text-sm font-bold hover:text-purple-200">
              저장하기
            </button>
          </form>
        </div>
      </section>
    </CommonModal>
  );
}
