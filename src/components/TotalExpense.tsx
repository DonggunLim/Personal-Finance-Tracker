import { Record, formatPriceToCurrency } from "@/utilities/common";

type Props = {
  records: Record[];
};

export default function TotalExpense({ records }: Props) {
  const totalExpense = records.reduce((total, record) => {
    const amount = Number(record.price);
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);

  return (
    <div>
      <p className="text-xs font-medium mb-1">👛이번 달 총지출</p>
      <div className="box ">
        <p className="text-center font-bold text-xl">
          {formatPriceToCurrency(totalExpense)}원
        </p>
      </div>
    </div>
  );
}
