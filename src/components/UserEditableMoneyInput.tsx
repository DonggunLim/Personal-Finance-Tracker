import { formatPriceToCurrency } from "@/utilities/common";
import { useEffect, useState } from "react";

type MoneyInputProps = {
  label: string;
  title: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  onSubmit: (title: string, data: string) => void;
};

export default function UserEditableMoneyInput({
  label,
  title,
  initialValue = "",
  onChange,
  onSubmit,
}: MoneyInputProps) {
  const [localValue, setLocalValue] = useState(initialValue);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setLocalValue(initialValue);
    setHasChanged(false);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, "");
    setLocalValue(formattedValue);
    onChange?.(formattedValue);
    setHasChanged(formattedValue !== initialValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, localValue);
    setHasChanged(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      {hasChanged && (
        <button className="text-xs absolute right-0 top-0 bg-purple-200 rounded-xl px-2 py-[1px]">
          저장
        </button>
      )}
      <p className="text-xs font-medium mb-1">{label}</p>
      <div className="box flex items-center text-lg font-bold">
        <input
          className="w-full outline-none cursor-pointer text-right"
          placeholder={localValue || "-원"}
          onChange={handleChange}
          value={formatPriceToCurrency(localValue)}
        />
        <p>원</p>
      </div>
    </form>
  );
}
