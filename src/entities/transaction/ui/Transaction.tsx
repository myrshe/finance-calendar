import type { Transaction } from "@/entities/transaction/model/types";

interface TransactionCardProps {
  transaction: Transaction;
  variant?: "month" | "week" | "full";
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
            className={`h-4 lg:h-7 p-[2px] rounded-xs lg:rounded-md flex items-center text-xs lg:text-sm gap-3 truncate ${isIncome ? `bg-income-background text-income-dark` : `bg-expense-background text-expense-dark`}`}
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
            className={`lg:min-h-12 p-[4px] rounded-xs lg:rounded-md text-xs lg:text-sm ${isIncome ? `bg-income-background text-income-dark` : `bg-expense-background text-expense-dark`}`}
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
};