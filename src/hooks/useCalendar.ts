import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function useCalendar() {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
    const arrayOfDate = [];

    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      arrayOfDate.push({ date: firstDateOfMonth.day(i), currentMonth: false });
    }

    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      arrayOfDate.push({ date: firstDateOfMonth.date(i), currentMonth: true });
    }

    const remaining = 42 - arrayOfDate.length;

    for (
      let i = lastDateOfMonth.date() + 1;
      i <= lastDateOfMonth.date() + remaining;
      i++
    ) {
      arrayOfDate.push({ date: lastDateOfMonth.date(i), currentMonth: false });
    }

    return arrayOfDate;
  };

  const handlePrevButton = () => {
    setToday(today.month(today.month() - 1));
  };
  const handleNextButton = () => {
    setToday(today.month(today.month() + 1));
  };
  const handleTodayButton = () => {
    setToday(currentDate);
  };
  const handleClickDate = (date: Dayjs) => {
    setSelectedDate(date);
  };

  return {
    today,
    currentDate,
    selectedDate,
    generateDate,
    handlePrevButton,
    handleNextButton,
    handleTodayButton,
    handleClickDate,
  };
}
