type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
};

export default function PeriodSelector({ onChange }: Props) {
  return (
    <div>
      <p className="text-xs font-medium mb-1">📆날짜 선택</p>
      <div className="box">
        <p className="text-xs font-medium py-1">시작날</p>
        <input
          type="date"
          className="input w-full outline-none"
          onChange={(e) => onChange(e, "startDate")}
        />
        <p className="text-xs font-medium py-1">마지막날</p>
        <input
          type="date"
          className="input w-full outline-none"
          onChange={(e) => onChange(e, "endDate")}
        />
      </div>
    </div>
  );
}
