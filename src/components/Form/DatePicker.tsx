import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar";
import CalendarIcon from "../Icons/CalendarIcon";

type Props = {
  onChange: (value: string, fieldName: "date") => void;
  initialValue?: string;
};

export default function DatePicker({ onChange, initialValue }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(initialValue || "");
  const datePickerRef = useRef<HTMLLabelElement>(null);
  const toggleDatePicker = () => setIsOpen(!isOpen);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
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
    <div className="w-full relative">
      <label ref={datePickerRef} className="relative">
        <div
          className={`flex items-center gap-x-1 text-sm font-semibold hover:opacity-100 ${
            !!selected ? "opacity-100" : "opacity-20"
          }`}
        >
          <CalendarIcon />
          <span className="cursor-pointer">{selected || "날짜"}</span>
        </div>
        <input onClick={toggleDatePicker} className="hidden" />
        {isOpen && <Calendar onClick={handleClickDate} />}
      </label>
    </div>
  );
}
