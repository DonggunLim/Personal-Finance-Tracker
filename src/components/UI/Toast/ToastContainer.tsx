import { Toasts } from "@/types/toast";
import Toast from "./Toast";

type Props = {
  toasts: Toasts;
};

export default function ToastContainer({ toasts }: Props) {
  return (
    <div className="fixed right-1/2 top-10 z-[100] mt-4 flex w-72 translate-x-1/2 transform flex-col gap-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
