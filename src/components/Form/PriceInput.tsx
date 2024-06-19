import { formatPriceToCurrency } from "@/utilities/common";
import { useRef, useState } from "react";
import { FormDataKeys } from "../ExpenseFormModal";

type Props = {
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
  error?: string;
};

export default function PriceInput({ onChange, initialValue, error }: Props) {
  const [price, setPrice] = useState(initialValue || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPrice(value);
    onChange?.(value, "price");
  };

  const handleFocus = () => {
    setTimeout(() => {
      if (inputRef.current) {
        const length = inputRef.current.value.length;
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          length;
      }
    }, 0);
  };

  return (
    <div>
      <label className="text-xs font-bold">금액</label>
      <div className="">
        <input
          ref={inputRef}
          className={`flex w-full rounded-md px-2 py-2 text-left text-xs font-semibold outline-none ring-1 ring-neutral-400 focus:ring-1 focus:ring-purple-400 ${error && "ring-1 ring-red-400"}`}
          value={formatPriceToCurrency(price)}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
    </div>
  );
}
