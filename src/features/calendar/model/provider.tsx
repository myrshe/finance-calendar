import { useState, useMemo, useCallback } from "react";
import {
  CalendarContext,
  type CalendarContextType,
} from "./context";
import {
  type WeekDay,
  type CalendarView,
  WEEK_DAY_TO_NUMBER
} from "@/entities/calendar/model/types";
import dayjs from "@/shared/config/dayjs/dayjs-config";

interface CalendarProviderProps {
  children: React.ReactNode;
  initialView?: CalendarView;
  initialDate?: Date;
  firstDayOfWeek?: WeekDay;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  initialView = "month",
  initialDate = new Date(),
  firstDayOfWeek = "Понедельник",
}) => {
  // настройки
  const [view, setView] = useState<CalendarView>(initialView);
  const [firstDayOfWeekState, setFirstDayOfWeekState] =
    useState<WeekDay>(firstDayOfWeek);
  const [dayMaxTransaction, setDayMaxTransaction] = useState(2);
  const [showIncomes, setShowIncomes] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  // состояние
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    dayjs.isDayjs(initialDate) ? initialDate : dayjs(initialDate),
  );
  const today = useMemo(() => dayjs(), []);

  // навигация
  const navigatePrev = useCallback(() => {
    setCurrentDate((prev) => {
      if (view === "month") {
        return prev.subtract(1, "month");
      } else if (view === "week") {
        return prev.subtract(1, "week");
      }
      return prev;
    });
  }, [view]);

  const navigateNext = useCallback(() => {
    setCurrentDate((prev) => {
      if (view === "month") {
        return prev.add(1, "month");
      } else if (view === "week") {
        return prev.add(1, "week");
      }
      return prev;
    });
  }, [view]);

  const goToday = useCallback(() => {
    setCurrentDate(dayjs());
  }, []);

  const goToMonth = useCallback((month: number) => {
    setCurrentDate((prev) => prev.month(month));
  }, []);

  const goToYear = useCallback((year: number) => {
    setCurrentDate((prev) => prev.year(year));
  }, []);

  const goToWeek = useCallback((weekStart: dayjs.Dayjs) => {
    setCurrentDate(weekStart);
  }, []);

  const firstDayOfWeekNumber = useMemo(
    () => WEEK_DAY_TO_NUMBER[firstDayOfWeekState],
    [firstDayOfWeekState],
  );

  // значения контекста
  const value = useMemo<CalendarContextType>(
    () => ({
      view,
      firstDayOfWeek: firstDayOfWeekState,
      showIncomes,
      showExpenses,
      dayMaxTransaction,
      currentDate,
      today,
      firstDayOfWeekNumber,
      setView,
      setFirstDayOfWeek: setFirstDayOfWeekState,
      setShowIncomes,
      setShowExpenses,
      setDayMaxTransaction,
      setCurrentDate,
      navigatePrev,
      navigateNext,
      goToday,
      goToMonth,
      goToYear,
      goToWeek
    }),
    [
      view,
      firstDayOfWeekState,
      firstDayOfWeekNumber,
      showIncomes,
      showExpenses,
      dayMaxTransaction,
      currentDate,
      today,
      navigatePrev,
      navigateNext,
      goToday,
      goToMonth,
      goToYear,
      goToWeek
    ],
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
