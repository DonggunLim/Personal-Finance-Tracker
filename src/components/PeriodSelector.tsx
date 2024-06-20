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
      <p className="mb-1 text-xs font-medium">📆날짜 선택</p>
      <div className="box flex justify-around">
        <div className="flex w-full items-center justify-center">
          <p className="px-2 py-1 text-xs font-medium">시작날</p>
          <DatePicker onChange={handleStartDate} />
        </div>
        <p className="text-2xl font-bold">-</p>
        <div className="flex w-full items-center justify-center">
          <p className="px-2 py-1 text-xs font-medium">마지막날</p>
          <DatePicker onChange={handleEndDate} />
        </div>
      </div>
    </div>
  );
}
