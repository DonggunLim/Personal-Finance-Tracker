type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
};

export default function PeriodSelector({ onChange }: Props) {
  return (
    <div>
      <p className="text-xs font-medium mb-1">📆날짜 선택</p>
      <div className="box flex justify-around">
        <div className="flex items-center justify-center w-full">
          <p className="text-xs font-medium py-1 px-2">📌시작날</p>
          <input
            type="date"
            className="input outline-none"
            onChange={(e) => onChange(e, "startDate")}
          />
        </div>
        <p className="text-2xl font-bold">-</p>
        <div className="flex items-center justify-center w-full">
          <p className="text-xs font-medium py-1 px-2">📌마지막날</p>
          <input
            type="date"
            className="input outline-none"
            onChange={(e) => onChange(e, "endDate")}
          />
        </div>
      </div>
    </div>
  );
}
