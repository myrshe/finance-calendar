import { useCalendar } from "@/features/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
import {
  formatWeekRange,
  getMonthWeeksList,
} from "@/shared/config/dayjs/date";
import dayjs from "@/shared/config/dayjs/dayjs-config"

export const CalendarHeader = () => {
  const {
    currentDate,
    view,
    firstDayOfWeekNumber,
    navigatePrev,
    navigateNext,
    goToday,
    goToMonth,
    goToYear,
    goToWeek
  } = useCalendar();

  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const years = Array.from({ length: 11 }, (_, i) => currentYear - 10 + i);

  const weekRangeLabel = formatWeekRange(currentDate, firstDayOfWeekNumber);

  const monthWeeks = getMonthWeeksList(currentDate, firstDayOfWeekNumber);

  const currentWeekStart = currentDate.startOf("week").day(firstDayOfWeekNumber);

  return (
    <div className="flex gap-3">
      <Select
        value={currentMonth.toString()}
        onValueChange={(value) => goToMonth(Number(value))}
      >
        <SelectTrigger className="w-27 rounded-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((month, index) => (
            <SelectItem key={month} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={currentYear.toString()}
        onValueChange={(value) => goToYear(Number(value))}
      >
        <SelectTrigger className="w-21 rounded-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
        <div className="flex gap-1.5 items-center">
          <Button size="icon" className="rounded-lg" onClick={navigatePrev}>
            <ArrowLeftIcon />
          </Button>
          <Button variant="outline" className="rounded-lg" onClick={goToday}>
            Сегодня
          </Button>
          <Button size="icon" className="rounded-lg" onClick={navigateNext}>
            <ArrowRightIcon />
          </Button>
        </div>
      </Select>
      {view === "week" && (
        <Select
          value={currentWeekStart.toISOString()}
          onValueChange={(value) => goToWeek(dayjs(value))}>
          <SelectTrigger className="rounded-lg">
            <SelectValue placeholder={weekRangeLabel} />
          </SelectTrigger>
          <SelectContent>
            {monthWeeks.map((week) => (
              <SelectItem
                key={week.start.toISOString()}
                value={week.start.toISOString()}
              >
                {week.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
      
      }
    </div>
  );
};
