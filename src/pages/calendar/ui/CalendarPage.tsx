
import { CalendarProvider } from "@/features/calendar";
import { CalendarSettings } from "@/features/calendar/calendar-settings";
import { useCalendar } from "@/features/calendar";
import { MonthView, WeekView } from "@/features/calendar";

export function CalendarPage() {
  return (
    <CalendarProvider
      initialView="month"
      initialDate={new Date()}
      firstDayOfWeek="Понедельник"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_343px] gap-3">
        <CalendarSettings />
        <CalendarSettings />
        <CalendarViewRenderer />
      </div>
    </CalendarProvider>
  );
}
const CalendarViewRenderer = () => {
  const { view } = useCalendar();

  switch (view) {
    case "month":
      return <MonthView />;
    case "week":
      return <WeekView />;
    default:
      return <MonthView />;
  }
};