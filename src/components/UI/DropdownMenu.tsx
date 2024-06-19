"use client";

import { useEffect, useRef, useState } from "react";
import { FormDataKeys } from "../ExpenseFormModal";

type Option = { icon?: string; title: string };
type SelectedItem = { title: string; icon?: string };
type Props = {
  options: Option[];
  title: string;
  name: FormDataKeys;
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
  disabled?: boolean;
  error?: string;
};
export default function DropdownMenu<T>({
  options,
  title,
  name,
  onChange,
  initialValue,
  disabled = false,
  error,
}: Props) {
  const [select, setSelect] = useState<SelectedItem>({
    title: initialValue || "",
    icon: options.find((o) => o.title === initialValue)?.icon,
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const handleClick = (item: SelectedItem) => {
    setSelect(item);
    setIsOpen(false);
    onChange(item.title, name);
  };

  useEffect(() => {
    const checkClickOuter = (e: MouseEvent) => {
      if (!dropDownRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    window.addEventListener("click", checkClickOuter, true);
    return () => {
      window.removeEventListener("click", checkClickOuter, true);
    };
  });
  return (
    <div className="dropdown">
      <label
        className={`${disabled && "text-neutral-400"} text-xs font-bold`}
        aria-disabled={disabled}
        htmlFor="dropdown-btn"
      >
        {title}
      </label>
      <div className="relative" ref={dropDownRef}>
        <button
          id="dropdown-btn"
          type="button"
          className={`w-full rounded-md px-2 py-2 text-left text-xs font-semibold ring-1 ring-neutral-400 focus:ring-1 focus:ring-purple-400 disabled:text-neutral-400 ${error && "ring-1 ring-red-400"}`}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          {initialValue
            ? `${select.icon} ${select.title}`
            : `${title}을 선택하세요.`}
        </button>
        {isOpen && (
          <ul className="absolute z-50 mt-2 max-h-40 w-full min-w-20 overflow-y-auto rounded-md bg-white shadow-md scrollbar-thin scrollbar-track-white scrollbar-thumb-neutral-400">
            {options.map(({ icon, title }, index) => (
              <li
                className="flex w-full cursor-pointer px-4 py-2 text-xs hover:bg-gray-100"
                key={index}
                onClick={() => handleClick({ title, icon: icon || "" })}
              >
                {icon}
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
