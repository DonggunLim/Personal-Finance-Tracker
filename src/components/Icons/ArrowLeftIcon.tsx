import { FaArrowLeft } from "react-icons/fa6";

type Props = {
  onClick: () => void;
};

export default function ArrowLeftIcon({ onClick }: Props) {
  return <FaArrowLeft className="w-3 h-3 cursor-pointer" onClick={onClick} />;
}
