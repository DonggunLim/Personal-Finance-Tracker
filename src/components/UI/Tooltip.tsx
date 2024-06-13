import { useState } from "react";

type Props = {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom";
};

export default function Tooltip({
  children,
  text,
  position = "bottom",
}: Props) {
  const [visible, setVisible] = useState(false);
  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);
  return (
    <div
      role="tooltip"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="inline-block relative cursor-pointer"
    >
      {children}
      {visible && (
        <div
          className={`absolute bg-neutral-600 shadow-md
         text-white text-xs px-2 py-2 rounded-lg z-50 whitespace-nowrap ${getPosition(
           position
         )}`}
        >
          {text}
          <div className={`${getArrowPosition(position)}`} />
        </div>
      )}
    </div>
  );
}

function getPosition(position: "top" | "bottom") {
  switch (position) {
    case "top":
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    case "bottom":
    default:
      return "top-full left-1/2 transform -translate-x-1/2 mt-2";
  }
}

function getArrowPosition(position: "top" | "bottom") {
  switch (position) {
    case "top":
      return `after:content-[''] after:absolute after:top-full after:left-1/2 
      after:-translate-x-1/2 after:border-8 after:border-transparent 
      after:border-t-neutral-600`;
    case "bottom":
    default:
      return `after:content-[''] after:absolute after:bottom-full after:left-1/2 
      after:-translate-x-1/2 after:border-8 
      after:border-transparent after:border-b-neutral-600`;
  }
}
