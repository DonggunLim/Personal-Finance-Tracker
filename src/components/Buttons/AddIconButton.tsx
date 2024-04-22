import { IoAddOutline } from "react-icons/io5";

type Props = {
  size?: "small" | "medium" | "large";
};

export default function AddIconButton({ size = "medium" }: Props) {
  return (
    <button className="bg-purple-100 rounded-lg p-1 hover:bg-purple-200">
      <IoAddOutline className={getSize(size)} />
    </button>
  );
}

const getSize = (size: string) => {
  switch (size) {
    case "small": {
      return `w-6 h-6`;
    }
    case "medium": {
      return `w-8 h-8`;
    }
    case "large": {
      return `w-10 h-10`;
    }
  }
};
