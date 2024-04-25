import { FaArrowRight } from "react-icons/fa6";

type Props = {
  onClick: () => void;
};

export default function ArrowRightIcon({ onClick }: Props) {
  return <FaArrowRight className="w-3 h-3 cursor-pointer" onClick={onClick} />;
}
