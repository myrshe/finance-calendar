import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useCalendar } from "@/features/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { CalendarHeader } from "../../calendar-header";

export const MonthView = () => {
  const { view } = useCalendar();
  return (
    <div className="py-5 px-10">
      <CalendarHeader />
    </div>
  );
};
