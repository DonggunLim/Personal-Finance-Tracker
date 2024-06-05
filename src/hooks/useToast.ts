import { ToastContext } from "@/context/ToastContext";
import { ToastContextType } from "@/types/toast";
import { useContext } from "react";

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("context is null");
  }
  return context;
};
