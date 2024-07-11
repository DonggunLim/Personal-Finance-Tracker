import DatePicker from "./Form/DatePicker";

type Props = {
  handleDateChange: (field: "startDate" | "endDate") => (value: string) => void;
};

export default function PeriodSelector({ handleDateChange }: Props) {
  return (
    <div>
      <p className="mb-1 self-start text-xs font-medium">📆날짜 선택</p>
      <div className="box flex items-center justify-evenly">
        <DatePicker onChange={handleDateChange("startDate")} />
        <span className="mx-4 block h-1 w-4 bg-black"></span>
        <DatePicker onChange={handleDateChange("endDate")} />
      </div>
    </div>
  );
}
