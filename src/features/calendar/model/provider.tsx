import { useState, useMemo, useCallback } from "react";
import {
  CalendarContext,
  type CalendarContextType,
} from "./context";
import type { WeekDay, CalendarView } from "@/entities/calendar/model/types";

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
  const [dayMaxTransaction, setDayMaxTransaction] = useState(3);
  const [showIncomes, setShowIncomes] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  // состояние
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const today = useMemo(() => new Date(), []);

  // навигация
  const navigatePrev = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (view === "month") {
        newDate.setMonth(prev.getMonth() - 1);
      } else if (view === "week") {
        newDate.setDate(prev.getDate() - 7);
      }
      return newDate;
    });
  }, [view]);

  const navigateNext = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (view === "month") {
        newDate.setMonth(prev.getMonth() + 1);
      } else if (view === "week") {
        newDate.setDate(prev.getDate() + 7);
      } 
      return newDate;
    });
  }, [view]);

  const goToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // значение контекста
  const value = useMemo<CalendarContextType>(
    () => ({
      view,
      firstDayOfWeek: firstDayOfWeekState,
      dayMaxTransaction,
      showIncomes,
      showExpenses,
      currentDate,
      today,
      setView,
      setFirstDayOfWeek: setFirstDayOfWeekState,
      setDayMaxTransaction,
      setShowIncomes,
      setShowExpenses,
      setCurrentDate,
      navigatePrev,
      navigateNext,
      goToday,
    }),
    [
      view,
      firstDayOfWeekState,
      dayMaxTransaction,
      showIncomes,
      showExpenses,
      currentDate,
      today,
      navigatePrev,
      navigateNext,
      goToday,
    ],
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
