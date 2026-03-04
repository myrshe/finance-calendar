import type { WeekDay } from "@/entities/calendar/model/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { useCalendar } from "@/features/calendar";

export const CalendarSettings = () => {
  const {
    view,
    setView,
    firstDayOfWeek,
    setFirstDayOfWeek,
    showIncomes,
    setShowIncomes,
    showExpenses,
    setShowExpenses,
    dayMaxTransaction,
    setDayMaxTransaction,
  } = useCalendar();
  return (
    <Card className="bg-card4 flex flex-col gap-4.25">
      <CardHeader>
        <CardTitle>Настройки календаря</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3.5">
        <Button
          className={`w-[146px] ${
            view === "month" ? "bg-primary" : "bg-input"
          }`}
          onClick={() => setView("month")}
        >
          Месяц
        </Button>
        <Button
          className={`w-[146px] ${
            view === "week" ? "bg-primary" : "bg-input"
          }`}
          onClick={() => {setView("week"); setDayMaxTransaction(1000)}}
        >
          Неделя
        </Button>
        <div>
          <label className="block text-normal text-left mb-1">
            Первый день недели
          </label>
          <Select
            onValueChange={(value) => setFirstDayOfWeek(value as WeekDay)}
            value={firstDayOfWeek}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите первый день недели" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Воскресенье">Воскресенье</SelectItem>
              <SelectItem value="Понедельник">Понедельник</SelectItem>
              <SelectItem value="Вторник">Вторник</SelectItem>
              <SelectItem value="Среда">Среда</SelectItem>
              <SelectItem value="Четверг">Четверг</SelectItem>
              <SelectItem value="Пятница">Пятница</SelectItem>
              <SelectItem value="Суббота">Суббота</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={showIncomes}
            id="customIncomes"
            onCheckedChange={() => setShowIncomes(!showIncomes)}
          />
          <label className="text-normal" htmlFor="customIncomes">
            Расходы
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={showExpenses}
            id="customIncomes"
            onCheckedChange={() => setShowExpenses(!showExpenses)}
          />
          <label className="text-normal" htmlFor="customIncomes">
            Доходы
          </label>
        </div>
        <div>
          <label className="block text-normal text-left mb-1">
            Максимум событий в день
          </label>
          <Select
            onValueChange={(value) =>
              setDayMaxTransaction(Number.parseInt(value, 10))
            }
            value={dayMaxTransaction?.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите максимальное число транзакций в день" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 транзакция</SelectItem>
              <SelectItem value="2">2 транзакции</SelectItem>
              <SelectItem value="3">3 транзакции</SelectItem>
              <SelectItem value="4">4 транзакции</SelectItem>
              <SelectItem value="5">5 транзакций</SelectItem>
              <SelectItem value="1000">без лимита</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
