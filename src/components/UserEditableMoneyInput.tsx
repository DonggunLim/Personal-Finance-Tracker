import { SanityUser } from "@/types/user";
import { formatPriceToCurrency } from "@/utilities/common";
import { useEffect, useState } from "react";

type MoneyInputProps = {
  label: string;
  name: keyof SanityUser;
  initialValue?: string;
  onChange?: (value: string) => void;
  onSubmit: (name: keyof SanityUser, data: string, label: string) => void;
};

export default function UserEditableMoneyInput({
  label,
  name,
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
    onSubmit(name, localValue, label);
    setHasChanged(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      {hasChanged && (
        <button className="absolute right-0 top-0 rounded-xl bg-purple-200 px-2 py-[1px] text-xs">
          저장
        </button>
      )}
      <p className="mb-1 text-xs font-medium">{label}</p>
      <div className="box flex items-center text-lg font-bold">
        <input
          className="w-full cursor-pointer text-right outline-none"
          placeholder={localValue || "-원"}
          onChange={handleChange}
          value={formatPriceToCurrency(localValue)}
        />
        <p>원</p>
      </div>
    </form>
  );
}
