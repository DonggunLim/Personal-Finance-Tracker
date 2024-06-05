import { ToastReducerActionType, ToastState } from "@/types/toast";

export const toastReducer = (
  state: ToastState,
  action: ToastReducerActionType
): ToastState => {
  switch (action.type) {
    case "ADD_TOAST": {
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    }
    case "DELETE_TOAST": {
      const updatedToasts = state.toasts.filter(
        (toast) => toast.id !== action.payload.id
      );
      return {
        ...state,
        toasts: updatedToasts,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};
