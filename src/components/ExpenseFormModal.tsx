import CommonModal from "./common/CommonModal";
import { useEffect, useRef, useState } from "react";
import PriceInput from "./Form/PriceInput";
import DatePicker from "./Form/DatePicker";
import CommentInput from "./Form/CommentInput";
import { Record } from "@/utilities/common";
import SyncSpinner from "./Spinners/SyncSpinner";
import DropdownMenu from "./UI/DropdownMenu";
import { installmentItem, paymentItems, tagItems } from "@/data/data";

type Props = {
  onClose: () => void;
  initialFormData?: FormData;
  onSubmit: (formData: FormData) => void;
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
    installment: "",
  },
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (value: string, name: FormDataKeys) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // onSubmit(formData);
  };

  useEffect(() => {
    const checkClickOuter = (e: MouseEvent) => {
      if (!formRef.current?.contains(e.target as Node)) onClose();
    };
    window.addEventListener("click", checkClickOuter, true);
    return () => {
      window.removeEventListener("click", checkClickOuter, true);
    };
  });

  return (
    <CommonModal>
      <section className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900/30 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="Inner relative w-fit bg-white p-4"
          ref={formRef}
        >
          <div className="flex flex-col items-center gap-y-4">
            <div className="flex w-full flex-col gap-4">
              <DatePicker
                onChange={handleChange}
                initialValue={formData.date}
              />
              <div className="">
                <DropdownMenu
                  options={tagItems}
                  title="태그"
                  name="tag"
                  onChange={handleChange}
                  initialValue={formData.tag}
                />
                <DropdownMenu
                  options={paymentItems}
                  title="지불방식"
                  name="paymentMethod"
                  onChange={handleChange}
                  initialValue={formData.paymentMethod}
                />
                <DropdownMenu
                  options={installmentItem}
                  title="할부개월"
                  name="installment"
                  onChange={handleChange}
                  initialValue={formData.installment}
                  disabled={formData.paymentMethod === "현금"}
                />
              </div>
            </div>
            <PriceInput onChange={handleChange} initialValue={formData.price} />
            <CommentInput
              onChange={handleChange}
              initialValue={formData.description}
            />
            <button className="w-fit rounded-md bg-purple-400 px-2 py-1 text-sm font-bold text-white">
              {isLoading ? <SyncSpinner /> : "저장하기"}
            </button>
          </div>
        </form>
      </section>
    </CommonModal>
  );
}
