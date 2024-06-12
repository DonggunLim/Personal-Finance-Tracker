import { formatPriceToCurrency } from "@/utilities/common";
import { useRef, useState } from "react";
import { FormDataKeys } from "../ExpenseFormModal";

type Props = {
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
};

export default function PriceInput({ onChange, initialValue }: Props) {
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
    <label>
      <div className="flex items-center px-2">
        <input
          ref={inputRef}
          className="w-full outline-none cursor-pointer text-lg font-semibold text-right "
          value={formatPriceToCurrency(price)}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <span>원</span>
      </div>
    </label>
  );
}
