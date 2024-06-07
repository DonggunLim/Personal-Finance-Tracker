import { paymentItems } from "@/data/data";
import { FormDataKeys } from "../ExpenseFormModal";
import DropdownMenu from "./DropdownMenu";

type Props = {
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
};

export default function PaymentMenu({ onChange, initialValue }: Props) {
  return (
    <div className="flex justify-start py-1 px-2 rounded-md w-20">
      <DropdownMenu
        items={paymentItems}
        placeholder="지불방식"
        fieldName="paymentMethod"
        onChange={onChange}
        initialValue={initialValue}
      />
    </div>
  );
}
