import { CalendarHeader } from "../../calendar-header";
import type { Transaction } from "@/entities/transaction/model/types";
import { useCalendar } from "@/features/calendar";
import { getWeekDays } from "@/shared/config/dayjs/date";
import dayjs from "@/shared/config/dayjs/dayjs-config";
import { DayCell } from "../../day-cell";

interface WeekViewProps {
  transactions: Transaction[];
}

export const WeekView: React.FC<WeekViewProps> = ({ transactions }) => {
  const { currentDate, firstDayOfWeekNumber } = useCalendar();

  const days = getWeekDays(currentDate, firstDayOfWeekNumber);

  const weekDayLabels = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const weekDayLabelsShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const orderedLabels = [
    ...weekDayLabels.slice(firstDayOfWeekNumber),
    ...weekDayLabels.slice(0, firstDayOfWeekNumber),
  ];

  const orderedShortLabels = [
    ...weekDayLabelsShort.slice(firstDayOfWeekNumber),
    ...weekDayLabelsShort.slice(0, firstDayOfWeekNumber),
  ];

  return (
    <div className="px-1 py-2.5 lg:py-5 lg:px-10">
      <CalendarHeader />
      <div className="grid grid-cols-7 mt-3 sticky top-[72px] z-10">
        {orderedLabels.map((day, index) => {
          const shortDay = orderedShortLabels[index];
          return (
            <div className="flex justify-center">
              <div
                key={day}
                className="bg-card2 w-35 rounded-xl text-center text-normal py-2"
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{shortDay}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-px lg:gap-1">
        {days.map((day) => {
          const isCurrentMonth = day.isSame(currentDate, "month");
          const dayTransactions = transactions.filter((t) =>
            dayjs(t.date).isSame(day, "day"),
          );
          return (
            <DayCell
              key={day.toISOString()}
              date={day}
              isCurrentMonth={isCurrentMonth}
              transactions={dayTransactions}
            />
          );
        })}
      </div>
    </div>
  );
};
