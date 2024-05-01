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
    <div>
      <p className="text-xs font-medium mb-1">📆날짜 선택</p>
      <div className="box flex justify-around">
        <div className="flex items-center justify-center w-full">
          <p className="text-xs font-medium py-1 px-2">시작날</p>
          <DatePicker onChange={handleStartDate} />
        </div>
        <p className="text-2xl font-bold">-</p>
        <div className="flex items-center justify-center w-full">
          <p className="text-xs font-medium py-1 px-2">마지막날</p>
          <DatePicker onChange={handleEndDate} />
        </div>
      </div>
    </div>
  );
}
