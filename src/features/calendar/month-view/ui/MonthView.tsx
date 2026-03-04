import { useCalendar } from "@/features/calendar";
import { CalendarHeader } from "../../calendar-header";
import { getMonthWeeks } from "@/shared/config/dayjs/date";
import type { Transaction } from "@/entities/transaction/model/types";
import dayjs from "@/shared/config/dayjs/dayjs-config"
import { DayCell } from "../../day-cell";

interface MonthViewProps {
  transactions: Transaction[]
}

export const MonthView: React.FC<MonthViewProps> = ({transactions}) => {
  const { currentDate, firstDayOfWeekNumber } = useCalendar();

  const weeks = getMonthWeeks(currentDate, firstDayOfWeekNumber);

  const weekDayLabels = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

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
      <div className="mt-2 flex flex-col gap-px lg:gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-px lg:gap-1">
            {week.map((day) => {
              const isCurrentMonth = day.isSame(currentDate, "month");

              // фильтрация транзакция конткретно для этого дня
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
        ))}
      </div>
    </div>
  );
};
