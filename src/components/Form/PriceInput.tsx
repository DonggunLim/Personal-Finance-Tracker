import { formatPriceToCurrency } from "@/utilities/common";
import { useState } from "react";

type Props = {
  onChange: (value: string, fieldName: string) => void;
};

export default function PriceInput({ onChange }: Props) {
  const [price, setPrice] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPrice(value);

    onChange?.(value, "price");
  };

  return (
    <label className="flex items-center">
      <div className="flex items-center text-sm font-semibold max-w-[180px]">
        <input
          className="w-full outline-none cursor-pointer text-right"
          placeholder="0"
          value={formatPriceToCurrency(price)}
          onChange={handleChange}
        />
        <span>원</span>
      </div>
    </label>
  );
}
