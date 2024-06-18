import useCalendar from "@/hooks/useCalendar";
import ArrowLeftIcon from "./Icons/ArrowLeftIcon";
import ArrowRightIcon from "./Icons/ArrowRightIcon";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTH = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

type Props = {
  onClick: (date: string) => void;
};

export default function Calendar({ onClick }: Props) {
  const {
    today,
    currentDate,
    selectedDate,
    generateDate,
    handlePrevButton,
    handleNextButton,
    handleTodayButton,
    handleClickDate,
  } = useCalendar();

  return (
    <div className="absolute z-50 mt-2 w-full rounded-md bg-slate-500 shadow-md">
      <div className="flex flex-col items-center gap-y-2">
        <p className="font-semibold">
          {MONTH[today.month()]}, {today.year()}
        </p>
        <div className="flex items-center gap-10">
          <ArrowLeftIcon onClick={handlePrevButton} />
          <h1
            className="cursor-pointer transition-all hover:scale-105"
            onClick={handleTodayButton}
          >
            Today
          </h1>
          <ArrowRightIcon onClick={handleNextButton} />
        </div>
      </div>
      <div className="grid grid-cols-7">
        {DAYS.map((day, index) => (
          <div key={index} className="grid place-content-center p-2">
            <p className="text-sm font-bold">{day}</p>
          </div>
        ))}
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth }, index) => {
            return (
              <div
                key={index}
                className={`grid place-content-center rounded-full p-2 ${
                  currentMonth && "cursor-pointer hover:bg-purple-100"
                } ${
                  selectedDate.toDate().toDateString() ===
                  date.toDate().toDateString()
                    ? "bg-red-400 text-white"
                    : ""
                } `}
                onClick={() => {
                  handleClickDate(date);
                  onClick(date.format("YYYY-MM-DD"));
                }}
              >
                <p
                  className={`text-sm font-bold ${
                    currentMonth || "text-gray-200"
                  }`}
                >
                  {date.date()}
                </p>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
