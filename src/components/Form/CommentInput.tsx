import { useState } from "react";
import CommonContentEditable from "../common/CommonContentEditable";

export default function CommentInput() {
  const [text, setText] = useState<string>();
  const handleChange = (text: string) => {
    setText(text);
  };
  return (
    <CommonContentEditable
      className={`outline-none box-border max-w-60 min-h-32`}
      placeholder="코멘트는 생략 가능합니다."
      onChange={handleChange}
    />
  );
}
