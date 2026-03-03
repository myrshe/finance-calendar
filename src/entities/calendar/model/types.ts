export type WeekDay =
  | "Понедельник"
  | "Вторник"
  | "Среда"
  | "Четверг"
  | "Пятница"
  | "Суббота"
  | "Воскресенье";

export type CalendarView = "month" | "week";

export const WEEK_DAY_TO_NUMBER: Record<WeekDay, 0 | 1 | 2 | 3 | 4 | 5 | 6> = {
  Воскресенье: 0,
  Понедельник: 1,
  Вторник: 2,
  Среда: 3,
  Четверг: 4,
  Пятница: 5,
  Суббота: 6,
};