import type { CalendarView, WeekDay } from '@/entities/calendar/model/types';


import { createContext, useContext } from "react";



export interface CalendarContextType {
  view: CalendarView;
  firstDayOfWeek: WeekDay;
  dayMaxTransaction: number;
  showIncomes: boolean;
  showExpenses: boolean;

  currentDate: Date;
  today: Date;

  setView: (view: CalendarView) => void;
  setFirstDayOfWeek: (day: WeekDay) => void;
  setDayMaxTransaction: (count: number) => void;
  setShowIncomes: (show: boolean) => void;
  setShowExpenses: (show: boolean) => void;
  setCurrentDate: (date: Date) => void;
  navigatePrev: () => void;
  navigateNext: () => void;
  goToday: () => void;
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
