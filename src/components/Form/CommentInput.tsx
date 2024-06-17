import CommonContentEditable from "../common/CommonContentEditable";
import { FormDataKeys } from "../ExpenseFormModal";
type Props = {
  onChange: (value: string, fieldName: FormDataKeys) => void;
  initialValue?: string;
};
export default function CommentInput({ onChange, initialValue }: Props) {
  const handleChange = (text: string) => {
    onChange(text, "description");
  };

  return (
    <CommonContentEditable
      className={`box-border min-h-32 w-full rounded-md px-1 outline-none ring-1 ring-neutral-400 focus:ring-1 focus:ring-purple-400`}
      placeholder="코멘트는 생략 가능합니다."
      onChange={handleChange}
      initialValue={initialValue}
    />
  );
}
