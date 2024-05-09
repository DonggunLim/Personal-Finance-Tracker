import { formatPriceToCurrency } from "@/utilities/common";
import { useState } from "react";
import { FormDataKeys } from "../ExpenseFormModal";

type Props = {
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
};

export default function PriceInput({ onChange, initialValue }: Props) {
  const [price, setPrice] = useState(initialValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPrice(value);

    onChange?.(value, "price");
  };

  return (
    <label>
      <div className="flex items-center px-2">
        <input
          className="w-full outline-none cursor-pointer text-lg font-semibold text-right "
          placeholder="0"
          value={formatPriceToCurrency(price)}
          onChange={handleChange}
        />
        <span>원</span>
      </div>
    </label>
  );
}
