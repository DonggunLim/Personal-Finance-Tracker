import { Toasts } from "@/types/toast";
import Toast from "./Toast";

type Props = {
  toasts: Toasts;
};

export default function ToastContainer({ toasts }: Props) {
  return (
    <div
      className="fixed top-0 right-1/2 transform translate-x-1/2 mt-4 z-50
     flex flex-col gap-y-2 w-72"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
