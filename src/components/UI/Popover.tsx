import { useEffect, useRef } from "react";

type PopoverProps = {
  children: React.ReactNode;
  className: string;
  onClose: () => void;
};

export default function Popover({
  children,
  className,
  onClose,
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkClickOuter = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) onClose();
    };

    window.addEventListener("click", checkClickOuter, true);

    return () => {
      window.removeEventListener("click", checkClickOuter, true);
    };
  });

  return (
    <div className={className} ref={popoverRef}>
      {children}
    </div>
  );
}
