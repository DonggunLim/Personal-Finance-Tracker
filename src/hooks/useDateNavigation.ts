"use client";

import { useState } from "react";

export const useDateNavigation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevBtn = () =>
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));

  const handleNextBtn = () =>
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

  return { currentDate, handlePrevBtn, handleNextBtn };
};
