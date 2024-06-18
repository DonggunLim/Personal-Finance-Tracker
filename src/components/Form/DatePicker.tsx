import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import CalendarIcon from "../Icons/CalendarIcon";

type Props = {
  onChange: (value: string, fieldName: "date") => void;
  initialValue?: string;
  title: string;
};

export default function DatePicker({ onChange, initialValue, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(initialValue || "");
  const datePickerRef = useRef<HTMLDivElement>(null);
  const handleClickDate = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onChange(value, "date");
  };

  useEffect(() => {
    const checkClickOuter = (e: MouseEvent) => {
      if (!datePickerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", checkClickOuter, true);
    return () => {
      document.removeEventListener("mousedown", checkClickOuter, true);
    };
  });

  return (
    <div className="datepicker">
      <label className="text-xs font-bold" htmlFor="datepicker-btn">
        {title}
      </label>
      <div className="relative" ref={datePickerRef}>
        <button
          type="button"
          className="flex w-full rounded-md px-2 py-2 text-left text-xs font-semibold ring-1 ring-neutral-400 focus:ring-1 focus:ring-purple-400 disabled:text-neutral-400"
          onClick={() => setIsOpen(!isOpen)}
          id="datepicker-btn"
        >
          <CalendarIcon />
          {selected || "YYYY-MM-DD"}
        </button>
        {isOpen && (
          <Calendar onClick={handleClickDate} initialValue={initialValue} />
        )}
      </div>
    </div>
  );
}
