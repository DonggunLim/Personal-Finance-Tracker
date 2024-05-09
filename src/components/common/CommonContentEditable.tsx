import { useEffect, useRef } from "react";

type Props = {
  className: string;
  placeholder?: string;
  onChange: (text: string) => void;
  initialValue?: string;
};

export default function CommonContentEditable({
  className,
  placeholder = "입력",
  onChange,
  initialValue,
}: Props) {
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
    if (initialValue) {
      $editableRef.current.innerText = initialValue;
    } else {
      $editableRef.current.setAttribute("data-placeholder", placeholder);
    }
  }, [placeholder, initialValue]);

  return (
    <div
      ref={$editableRef}
      contentEditable
      className={className}
      onInput={handleInput}
      data-placeholder={placeholder}
    />
  );
}
