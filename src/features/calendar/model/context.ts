import type { CalendarView, WeekDay } from '@/entities/calendar/model/types';

import  dayjs  from "@/shared/config/dayjs/dayjs-config"
import { createContext, useContext } from "react";



export interface CalendarContextType {
  view: CalendarView;
  firstDayOfWeek: WeekDay;
  firstDayOfWeekNumber: number;
  dayMaxTransaction: number;
  showIncomes: boolean;
  showExpenses: boolean;

  currentDate: dayjs.Dayjs;
  today: dayjs.Dayjs;

  setView: (view: CalendarView) => void;
  setFirstDayOfWeek: (day: WeekDay) => void;
  setDayMaxTransaction: (count: number) => void;
  setShowIncomes: (show: boolean) => void;
  setShowExpenses: (show: boolean) => void;
  setCurrentDate: (date: dayjs.Dayjs) => void;
  navigatePrev: () => void;
  navigateNext: () => void;
  goToday: () => void;
  goToMonth: (month: number) => void;
  goToYear: (year: number) => void;
  goToWeek: (weekStart: dayjs.Dayjs) => void;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within CalendarProvider");
  }
  return context;
};
