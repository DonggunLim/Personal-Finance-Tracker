import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  $target?: HTMLElement;
};

export default function CommonModal({
  children,
  $target = document.body,
}: Props) {
  return createPortal(children, $target);
}
