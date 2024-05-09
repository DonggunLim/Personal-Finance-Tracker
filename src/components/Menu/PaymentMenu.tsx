import { FormDataKeys } from "../ExpenseFormModal";
import DropdownMenu from "./DropdownMenu";

type Props = {
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
};

export default function PaymentMenu({ onChange, initialValue }: Props) {
  const items = [
    { icon: "💰", title: "현금" },
    { icon: "💳", title: "카드" },
  ];

  return (
    <div className="flex justify-start py-1 px-2 rounded-md w-20">
      <DropdownMenu
        items={items}
        placeholder="지불방식"
        fieldName="paymentMethod"
        onChange={onChange}
        initialValue={initialValue}
      />
    </div>
  );
}
