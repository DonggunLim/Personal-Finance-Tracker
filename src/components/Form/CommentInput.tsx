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
    <div className="w-full">
      <label className="text-xs font-bold">코멘트</label>
      <div className="text-wrap">
        <CommonContentEditable
          className="flex min-h-28 w-full overflow-hidden whitespace-pre-wrap break-words rounded-md px-2 py-2 text-xs font-semibold outline-none ring-1 ring-neutral-400 focus:ring-1 focus:ring-purple-400"
          placeholder="코멘트는 생략 가능합니다."
          onChange={handleChange}
          initialValue={initialValue}
        />
      </div>
    </div>
  );
}
