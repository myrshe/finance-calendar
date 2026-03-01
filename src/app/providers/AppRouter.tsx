import { Routes, Route } from "react-router-dom";
import { CalendarPage } from "@/pages/calendar"

export function AppRouter() {
  return (
    <Routes>
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}
