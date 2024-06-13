import { Record, calculateTotalExpense } from "@/utilities/common";

type Props = {
  records: Record[];
};

export default function TotalExpense({ records }: Props) {
  return (
    <div>
      <p className="text-xs font-medium mb-1">👛이번 달 총지출</p>
      <div className="box ">
        <p className="text-center font-bold text-xl">
          {calculateTotalExpense(records)}원
        </p>
      </div>
    </div>
  );
}
