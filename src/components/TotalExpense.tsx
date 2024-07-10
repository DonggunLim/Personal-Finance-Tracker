import { Record } from "@/types/record";
import {
  calculateTotalExpense,
  formatPriceToCurrency,
} from "@/utilities/common";

type Props = {
  records: Record[];
  title?: string;
};

export default function TotalExpense({ records, title }: Props) {
  return (
    <div>
      {title && <p className="mb-1 text-xs font-medium">{title}</p>}
      <div className="box min-w-72">
        <p className="text-center text-xl font-bold">
          {formatPriceToCurrency(calculateTotalExpense(records))}원
        </p>
      </div>
    </div>
  );
}
