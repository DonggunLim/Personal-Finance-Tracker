import { SyncLoader } from "react-spinners";

type Props = {
  color?: string;
  size?: number;
};

export default function SyncSpinner({ color = "#f3e8ff", size = 10 }: Props) {
  return <SyncLoader color={color} size={size} />;
}
