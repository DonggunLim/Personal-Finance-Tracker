import { CgClose } from "react-icons/cg";

type Props = {
  onClose?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
};

export default function CloseIcon({
  onClose,
  className,
  size = "small",
}: Props) {
  return (
    <div className={className} onClick={onClose}>
      <CgClose className={getSize(size)} />
    </div>
  );
}

const getSize = (size: string) => {
  switch (size) {
    case "small": {
      return `w-5 h-5 p-0.5`;
    }
    case "medium": {
      return `w-8 h-8`;
    }
    case "large": {
      return `w-11 h-11`;
    }
  }
};
