import { memo, useEffect, useRef } from "react";

type Props = {
  className: string;
  placeholder?: string;
  onChange: (text: string) => void;
  initialValue?: string;
};

export default memo(function CommonContentEditable({
  className,
  placeholder = "입력",
  onChange,
  initialValue,
}: Props) {
  const $initialValueRef = useRef(initialValue);
  const $editableRef = useRef<HTMLDivElement>(null);
  const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    const text = e.target.innerText;
    if (onChange) {
      onChange(text);
      $editableRef.current?.setAttribute(
        "data-placeholder",
        text ? "" : placeholder
      );
    }
  };

  useEffect(() => {
    if (!$editableRef.current) return;
    $editableRef.current.setAttribute("data-placeholder", placeholder);
  }, [placeholder]);

  useEffect(() => {
    if (!$editableRef.current) return;
    if ($initialValueRef.current && $editableRef.current.innerText === "") {
      $editableRef.current.innerText = $initialValueRef.current;
    }
  }, []);

  return (
    <div
      ref={$editableRef}
      contentEditable
      className={className}
      onInput={handleInput}
      data-placeholder={placeholder}
    />
  );
});
