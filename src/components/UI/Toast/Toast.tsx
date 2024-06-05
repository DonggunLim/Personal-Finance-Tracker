import { FaCheck, FaExclamation, FaInfo } from "react-icons/fa6";
import CloseIcon from "../../Icons/CloseIcon";
import { ToastType } from "@/types/toast";
import { useToast } from "@/hooks/useToast";
import { useCallback, useEffect, useRef } from "react";

type Props = {
  message: string;
  type: ToastType;
  id: number;
};

const ICONS = {
  success: {
    icon: (
      <FaCheck className="w-5 h-5 text-white bg-green-500 rounded-full p-0.5 flex-shrink-0" />
    ),
  },
  error: {
    icon: (
      <CloseIcon className="text-white bg-red-400 rounded-full flex-shrink-0" />
    ),
  },
  info: {
    icon: (
      <FaInfo className="w-5 h-5 text-white bg-blue-400 rounded-full p-0.5 flex-shrink-0" />
    ),
  },
  warning: {
    icon: (
      <FaExclamation className="w-5 h-5 text-white bg-orange-500 rounded-full p-0.5 flex-shrink-0" />
    ),
  },
};

export default function Toast({ message, type, id }: Props) {
  const { icon } = ICONS[type];
  const toast = useToast();
  const handleClose = useCallback(() => toast.removeToast(id), [id, toast]);
  const TimerID = useRef<number>();

  useEffect(() => {
    TimerID.current = window.setTimeout(() => {
      handleClose();
    }, 3000);

    return () => {
      clearTimeout(TimerID.current);
    };
  }, [handleClose]);

  return (
    <div role="alert" className="box flex items-center shadow-md bg-purple-100">
      <div>{icon}</div>
      <p className="ml-4 text-sm break-words flex-grow min-w-0">{message}</p>
    </div>
  );
}
