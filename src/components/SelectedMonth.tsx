import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const today = new Date();

type Props = {
  handlePrevBtn: () => void;
  handleNextBtn: () => void;
  currentDate: Date;
};
export default function SelectedMonth({
  handlePrevBtn,
  handleNextBtn,
  currentDate,
}: Props) {
  return (
    <div>
      <p className="text-xs font-medium mb-1">📆날짜 선택</p>
      <div className="box flex items-center justify-center relative">
        <p className="font-bold text-base">{`${currentDate.getFullYear()}년 ${
          currentDate.getMonth() + 1
        }월 `}</p>
        <button
          className="absolute left-0 hover:bg-purple-100 rounded-full p-1"
          onClick={handlePrevBtn}
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute right-0 hover:bg-purple-100 rounded-full p-1"
          onClick={handleNextBtn}
        >
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
