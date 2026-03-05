
import { CalendarProvider } from "@/features/calendar";
import { CalendarSettings } from "@/features/calendar/calendar-settings";
import { useCalendar } from "@/features/calendar";
import { MonthView, WeekView } from "@/features/calendar";
import type { Transaction } from "@/entities/transaction/model/types";

const Transactions: Transaction[] = [
  {
    id: "1",
    title: "Зарплата",
    amount: 50000,
    type: "income",
    date: "2026-03-04T14:30:00",
    category: "Перевод",
  },
  {
    id: "2",
    title: "Продукты",
    amount: 500,
    type: "expense",
    date: "2026-03-04T14:31:00",
    category: "Супермаркетыыыыыыы",
  },
  {
    id: "3",
    title: "Продуктыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы",
    amount: 500,
    type: "expense",
    date: "2026-03-04T15:30:00",
    category: "Супермаркеты",
  },
  {
    id: "4",
    title: "Продукты",
    amount: 500,
    type: "expense",
    date: "2026-03-04T15:40:00",
    category: "Супермаркеты",
  },
  {
    id: "5",
    title: "Продукты",
    amount: 500,
    type: "expense",
    date: "2026-03-04T16:30:00",
    category: "Супермаркеты",
  },
  {
    id: "6",
    title: "Продукты",
    amount: 500,
    type: "expense",
    date: "2026-03-04T23:30:00",
    category: "Супермаркеты",
  },
];


export function CalendarPage() {
  return (
    <CalendarProvider
      initialView="month"
      initialDate={new Date()}
      firstDayOfWeek="Понедельник"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_343px] gap-3">
        <section className="bg-card2 rounded-2xl">
          <CalendarViewRenderer />
        </section>
        <aside className="flex flex-col gap-3">
          <CalendarSettings />
        </aside>
      </div>
    </CalendarProvider>
  );
}
const CalendarViewRenderer = () => {
  const { view } = useCalendar();

  switch (view) {
    case "month":
      return <MonthView transactions={Transactions}/>;
    case "week":
      return <WeekView transactions={Transactions}/>;
    default:
      return <MonthView transactions={Transactions} />;
  }
};