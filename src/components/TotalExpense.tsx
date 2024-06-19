import {
  Record,
  calculateTotalExpense,
  formatPriceToCurrency,
} from "@/utilities/common";

type Props = {
  records: Record[];
};

export default function TotalExpense({ records }: Props) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium">👛이번 달 총지출</p>
      <div className="box">
        <p className="text-center text-xl font-bold">
          {formatPriceToCurrency(calculateTotalExpense(records))}원
        </p>
      </div>
    </div>
  );
}
