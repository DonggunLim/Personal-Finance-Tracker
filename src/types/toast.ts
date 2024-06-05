export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

export type Toasts = Toast[];

export type ToastState = {
  toasts: Toasts;
};

type AddToastAction = {
  type: "ADD_TOAST";
  payload: Toast;
};

type DeleteToastAction = {
  type: "DELETE_TOAST";
  payload: { id: number };
};

export type ToastReducerActionType = AddToastAction | DeleteToastAction;

export type ToastContextType = {
  success: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
  removeToast: (id: number) => void;
};
