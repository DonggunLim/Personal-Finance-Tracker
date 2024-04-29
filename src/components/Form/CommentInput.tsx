import CommonContentEditable from "../common/CommonContentEditable";
import { FormDataKeys } from "../ExpenseFormModal";
type Props = {
  onChange: (value: string, fieldName: FormDataKeys) => void;
};
export default function CommentInput({ onChange }: Props) {
  const handleChange = (text: string) => {
    onChange(text, "description");
  };

  return (
    <CommonContentEditable
      className={`outline-none box-border max-w-60 min-h-32`}
      placeholder="코멘트는 생략 가능합니다."
      onChange={handleChange}
    />
  );
}
