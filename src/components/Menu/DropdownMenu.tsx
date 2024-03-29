"use client";

import { useState } from "react";

type MenuItem = { icon: string; title: string };

type Props = {
  items: MenuItem[];
  placeholder: string;
  fieldName: string;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    fieldName: string
  ) => void;
};

export default function DropdownMenu({
  items,
  placeholder,
  fieldName,
  handleChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);

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
    setSelected(e.currentTarget.dataset.title || "");
    handleChange(e, fieldName);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">
      <div className="w-full text-xs cursor-pointer">
        <input
          onClick={toggleDropdown}
          onBlur={handleBlur}
          placeholder={selected}
          readOnly={isOpen}
          className="w-full outline-none bg-neutral-100"
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
