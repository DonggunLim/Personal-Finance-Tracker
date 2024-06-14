import { tagItems } from "@/data/data";
import { FormDataKeys } from "../ExpenseFormModal";
import DropdownMenu from "../UI/DropdownMenu";

type Props = {
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
};

export default function TagMenu({ onChange, initialValue }: Props) {
  return (
    <div className="flex justify-start py-1 px-2 rounded-md w-20">
      <DropdownMenu
        items={tagItems}
        title="태그"
        fieldName="tag"
        onChange={onChange}
        initialValue={initialValue}
      />
    </div>
  );
}
