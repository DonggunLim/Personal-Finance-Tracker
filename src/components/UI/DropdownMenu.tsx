"use client";

import { useEffect, useRef, useState } from "react";
import { FormDataKeys } from "../ExpenseFormModal";

type MenuItem = { icon: string; title: string };
type SelectedItem = { title?: string; icon?: string };
type Props = {
  items: MenuItem[];
  title: string;
  fieldName: string;
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
};

export default function DropdownMenu({
  items,
  title,
  fieldName,
  onChange,
  initialValue,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelected] = useState<SelectedItem>({
    title: initialValue || title,
    icon: items.filter((i) => i.title === initialValue)[0]?.icon,
  });
  const dropDownRef = useRef<HTMLDivElement>(null);
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
    const icon = e.currentTarget.dataset.icon || "";
    setSelected({ title: value, icon });
    onChange(value, fieldName as FormDataKeys);
    setIsOpen(false);
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
    <div className="w-full relative" ref={dropDownRef}>
      <label
        className={`text-sm font-semibold cursor-pointer hover:opacity-100 ${
          initialValue ? "opacity-100" : "opacity-20"
        }`}
      >
        {initialValue ? (
          <div className="flex items-center justify-start text-nowrap">
            <span>{selectedItem.icon}</span>
            <span className="ml-2">{selectedItem.title}</span>
          </div>
        ) : (
          selectedItem.title
        )}
        <input
          onClick={toggleDropdown}
          onBlur={handleBlur}
          className="hidden"
        />
      </label>
      {isOpen && (
        <div
          className="z-50 absolute -left-2 mt-2 bg-white shadow-md rounded-md max-h-40  min-w-20 
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
                data-icon={icon}
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
