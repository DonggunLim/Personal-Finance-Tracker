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
    <div className="min-w-[260px] bg-white p-2 absolute top-8 -left-[100px] z-50 shadow-md">
      <div className="flex flex-col gap-y-2 items-center">
        <p className="font-semibold">
          {MONTH[today.month()]}, {today.year()}
        </p>
        <div className="flex gap-10 items-center ">
          <ArrowLeftIcon onClick={handlePrevButton} />
          <h1
            className=" cursor-pointer hover:scale-105 transition-all"
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
                className={`grid place-content-center p-2 rounded-full ${
                  currentMonth && "hover:bg-purple-100 cursor-pointer"
                }
            ${
              selectedDate.toDate().toDateString() ===
              date.toDate().toDateString()
                ? "bg-red-400 text-white"
                : ""
            }
            `}
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
          }
        )}
      </div>
    </div>
  );
}
