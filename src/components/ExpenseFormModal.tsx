import CommonModal from "./common/CommonModal";
import { useEffect, useRef, useState } from "react";
import PriceInput from "./Form/PriceInput";
import DatePicker from "./Form/DatePicker";
import CommentInput from "./Form/CommentInput";
import { Record } from "@/utilities/common";
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
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (value: string, name: FormDataKeys) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => {
      const newErrors = { ...prev, [name]: "" };
      if (name === "paymentMethod" && value === "현금") {
        newErrors.installment = "";
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit(formData);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.date) newErrors.date = "날짜를 입력해주세요.";
    if (!formData.paymentMethod)
      newErrors.paymentMethod = "지불방식을 선택해주세요.";
    if (formData.paymentMethod === "카드" && !formData.installment)
      newErrors.installment = "할부개월을 선택해주세요.";
    if (!formData.price) newErrors.price = "금액을 입력해주세요.";
    if (!formData.tag) newErrors.tag = "태그를 선택해주세요.";
    return newErrors;
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
          className="relative w-80 rounded-md bg-white p-4 shadow-md"
          ref={formRef}
        >
          <div className="flex flex-col gap-y-4">
            <DatePicker
              onChange={handleChange}
              initialValue={formData.date}
              title="지출일"
              error={errors.date}
            />
            <DropdownMenu
              options={tagItems}
              title="태그"
              name="tag"
              onChange={handleChange}
              initialValue={formData.tag}
              error={errors.tag}
            />
            <DropdownMenu
              options={paymentItems}
              title="지불방식"
              name="paymentMethod"
              onChange={handleChange}
              initialValue={formData.paymentMethod}
              error={errors.paymentMethod}
            />
            <DropdownMenu
              options={installmentItem}
              title="할부개월"
              name="installment"
              onChange={handleChange}
              initialValue={formData.installment}
              disabled={formData.paymentMethod !== "카드"}
              error={errors.installment}
            />
            <PriceInput
              onChange={handleChange}
              initialValue={formData.price}
              error={errors.price}
            />
            <CommentInput
              onChange={handleChange}
              initialValue={formData.description}
            />
            <button className="rounded-md bg-purple-400 px-2 py-1 text-sm font-bold text-white">
              저장하기
            </button>
          </div>
        </form>
      </section>
    </CommonModal>
  );
}
