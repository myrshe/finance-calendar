import type { Transaction } from "@/entities/transaction/model/types";
import { useCalendar } from "../../model/context"
import dayjs from "@/shared/config/dayjs/dayjs-config";
import { TransactionCard } from "@/entities/transaction/ui/transaction";

interface DayCellProps {
    isCurrentMonth: boolean,
    date: dayjs.Dayjs,
    transactions: Transaction[]
}


export const DayCell: React.FC<DayCellProps> = ({
    isCurrentMonth, date, transactions
}) => {
    const { today, dayMaxTransaction, showIncomes, showExpenses, view } = useCalendar()

    const isToday = date.isSame(today, "day");
    const isWeekend = date.day() === 0 || date.day() === 6;
    const dayNumber = date.format("D");


    const transactionsFilter = transactions.filter(t => {
        const transactionDay = dayjs(t.date)
        const isSameDay = transactionDay.isSame(date, "day")
        if (!isSameDay) return false;
        if (t.type == "expense" && !showExpenses) return false;
        if (t.type == "income" && !showIncomes) return false;
        return true;
    })

    const displayedTransactions = transactionsFilter.slice(0, dayMaxTransaction)
    const hasMore = (transactions.length - dayMaxTransaction) > 0 
    const sumOfDay = transactions.reduce((acc, t) => {
      return t.type === "income" ? acc + t.amount : acc - t.amount;
    }, 0)

    const backgroundClass = () => {
        if (!isCurrentMonth) return "bg-card-non-incoming";
        if (isWeekend) return "bg-white";
        return "bg-card-calendar-item";
    };

    return (
      <div
        className={`min-w-16 min-h-27 p-0.5 lg:min-w-15 lg:min-h-44 rounded-md lg:rounded-2xl lg:p-2.75 flex flex-col ${backgroundClass()} ${view == "week"&&`h-[1000px]`}`}
      >
        <div className="flex justify-between truncate mb-1.5">
          <div
            className={`w-4 h-4 lg:w-8 lg:h-8 rounded-sm lg:rounded-lg flex items-center justify-center  text-base lg:text-2xl ${isToday && `bg-primary`} `}
          >
            {dayNumber}
          </div>
          {sumOfDay !== 0 && (
            <span
              className={`text-xs lg:text-xl truncate ${sumOfDay > 0 ? `text-income-background` : `text-expense-background`}`}
            >
              {sumOfDay > 0 ? "+" : "-"} {Math.abs(sumOfDay)}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 lg:gap-1.5">
          {displayedTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} variant={view} />
          ))}
        </div>
        <div className="w-[100%] mt-auto flex justify-center text-2xl">{hasMore && <span>...</span>}</div>
      </div>
    );
}