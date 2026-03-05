import type { Transaction } from "@/entities/transaction/model/types";
import dayjs from "@/shared/config/dayjs/dayjs-config";

interface TransactionCardProps {
  transaction: Transaction;
  variant?: "month" | "week" | "day" | "full";
  className?: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  variant = "month",
  className,
}) => {
    const isIncome = transaction.type === "income"


    if (variant === "month") {
        return (
          <div
            className={`h-4 lg:h-7 p-[2px] rounded-xs lg:rounded-md flex items-center text-xs lg:text-sm gap-3 truncate 
                ${isIncome ? `bg-income-background text-income-dark` : `bg-expense-background text-expense-dark`}`}
          >
            <span className="">
              {isIncome ? "+" : "-"}
              {transaction.amount.toLocaleString()} ₽
            </span>
            <span className="truncate">{transaction.category}</span>
          </div>
        );
    }

    if (variant === "week") {
        return (
          <div
            className={`lg:min-h-12 p-[4px] rounded-xs lg:rounded-md text-xs lg:text-sm 
                ${isIncome ? `bg-income-background text-income-dark` : `bg-expense-background text-expense-dark`}`}
          >
            <div className="flex gap-2 truncate">
              <span>
                {isIncome ? "+" : "-"}
                {transaction.amount.toLocaleString()} ₽
              </span>
              <span className="truncate">{transaction.category}</span>
            </div>
            <span className="break-words">{transaction.title}</span>
          </div>
        );
    }
    if (variant === "day") {
        return (
          <div
            className={`min-h-[60px] p-3 w-full rounded-lg text-lg flex items-start gap-3
            ${isIncome ? "bg-income-background text-income-dark" : "bg-expense-background text-expense-dark"}`}
          >
            <div className="flex-shrink-0 w-28 text-nowrap">
              {isIncome ? "+" : "-"}
              {transaction.amount.toLocaleString()} ₽
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <span className="font-medium break-words">
                {transaction.category}
              </span>
              <span className="text-sm opacity-80 break-words">
                {transaction.title}
              </span>
            </div>
            <div className="flex-shrink-0  opacity-60">
              <span>{dayjs(transaction.date).format("HH:mm")}</span>
            </div>
          </div>
        );
    }
};