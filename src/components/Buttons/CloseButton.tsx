import CloseIcon from "../Icons/CloseIcon";

type Props = {
  onClose: () => void;
};

export default function CloseButton({ onClose }: Props) {
  return (
    <button
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
      }}
      className="absolute top-0 right-0 p-2"
    >
      <CloseIcon />
    </button>
  );
}
