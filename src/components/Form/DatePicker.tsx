import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import CalendarIcon from "../Icons/CalendarIcon";
import { FormEvent } from "../ExpenseForm";

type Props = {
  onChange: (value: string, fieldName: string) => void;
};

export default function DatePicker({ onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>();
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (labelRef.current && !labelRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleClickDate = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onChange(value, "date");
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => handleClickOutside(event);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <label
      ref={labelRef}
      className="min-w-20 relative flex justify-center"
      onClick={() => setIsOpen(true)}
    >
      <div
        className={`flex items-center gap-x-1 text-sm font-semibold hover:opacity-100 ${
          !!selected ? "opacity-100" : "opacity-20"
        }`}
      >
        <CalendarIcon />
        <span className="cursor-pointer">{selected || "날짜"}</span>
      </div>
      {isOpen && <Calendar onClick={handleClickDate} />}
    </label>
  );
}
