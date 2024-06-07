"use client";

import { useState } from "react";
import { FormDataKeys } from "../ExpenseFormModal";

type MenuItem = { icon: string; title: string };

type Props = {
  items: MenuItem[];
  placeholder: string;
  fieldName: string;
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
};

export default function DropdownMenu({
  items,
  placeholder,
  fieldName,
  onChange,
  initialValue,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue || placeholder);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      e.relatedTarget instanceof Element &&
      e.relatedTarget.tagName.toLowerCase() === "button"
    ) {
      return;
    }
    setIsOpen(false);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.title || "";
    setSelected(value);
    onChange(value, fieldName as FormDataKeys);
    setIsOpen(false);
  };
  return (
    <div className="w-full relative">
      <div
        className={`w-full text-sm font-semibold hover:opacity-100 ${
          selected === placeholder ? "opacity-40" : "opacity-100"
        }`}
      >
        <input
          onClick={toggleDropdown}
          onBlur={handleBlur}
          placeholder={selected}
          readOnly={isOpen}
          className="w-full outline-none cursor-pointer caret-transparent text-center"
        />
      </div>
      {isOpen && (
        <div
          className="absolute -left-2 mt-2 bg-white shadow-md rounded-md
        max-h-40  min-w-20 
        scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-white overflow-y-auto"
        >
          {items &&
            items.map(({ icon, title }, index) => (
              <button
                className="w-full flex flex-col  justify-center items-center px-4 py-2 
                text-xs text-gray-700 hover:bg-gray-100"
                key={index}
                onClick={handleClick}
                data-title={title}
              >
                <span>{icon}</span>
                <p>{title}</p>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
