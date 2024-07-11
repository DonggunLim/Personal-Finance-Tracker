import { Dispatch, SetStateAction } from "react";
import { MdOutlineBarChart, MdPieChart, MdLineAxis } from "react-icons/md";

const Items = [
  {
    icon: <MdOutlineBarChart className="h-6 w-6" />,
    type: "bar",
  },
  {
    icon: <MdPieChart className="h-6 w-6" />,
    type: "pie",
  },
  {
    icon: <MdLineAxis className="h-6 w-6" />,
    type: "line",
  },
];

type Props = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export default function GrapheMenu({ selected, setSelected }: Props) {
  return (
    <ul className="box flex justify-around px-1 py-1">
      {Items.map((i, index) => (
        <li
          key={index}
          className={`${selected === i.type && "bg-neutral-200"} flex w-full cursor-pointer justify-center rounded-lg p-2 hover:bg-neutral-100`}
          onClick={() => setSelected(i.type)}
        >
          {i.icon}
        </li>
      ))}
    </ul>
  );
}
