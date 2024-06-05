"use client";

import { createContext, useReducer } from "react";
import { toastReducer } from "@/reducers/toastReducer";
import ToastContainer from "@/components/UI/Toast/ToastContainer";
import { ToastContextType, ToastState, ToastType } from "@/types/toast";

type Props = {
  children: React.ReactNode;
};

const initialState: ToastState = {
  toasts: [],
};

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type: ToastType, message: string) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  };

  const removeToast = (id: number) => {
    dispatch({ type: "DELETE_TOAST", payload: { id } });
  };

  const success = (message: string) => {
    addToast("success", message);
  };

  const warning = (message: string) => {
    addToast("warning", message);
  };

  const info = (message: string) => {
    addToast("info", message);
  };

  const error = (message: string) => {
    addToast("error", message);
  };

  const value = { success, warning, info, error, removeToast };
  return (
    <ToastContext.Provider value={value}>
      <ToastContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
}
