import DatePicker from "./Form/DatePicker";

type Props = {
  handleStartDate: (value: string) => void;
  handleEndDate: (value: string) => void;
};

export default function PeriodSelector({
  handleStartDate,
  handleEndDate,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <div>
        <p className="mb-1 self-start text-xs font-medium">📆날짜 선택</p>
        <div className="box flex w-fit items-center justify-center">
          <DatePicker onChange={handleStartDate} />
          <span className="mx-4 block h-1 w-4 bg-black"></span>
          <DatePicker onChange={handleEndDate} />
        </div>
      </div>
    </div>
  );
}
