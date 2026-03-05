import { TransactionCard } from "@/entities/transaction";
import type { Transaction } from "@/entities/transaction/model/types"
import dayjs from "@/shared/config/dayjs/dayjs-config"
import { useEffect } from "react";

interface DayModalProps {
    date: dayjs.Dayjs,
    transactions: Transaction[],
    onClose: () => void
}

export const DayModal: React.FC<DayModalProps> = ({
    date, transactions, onClose
}) => {

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const transactionsByHour = hours.reduce(
      (acc, hour) => {
        acc[hour] = transactions.filter((t) => {
          const transactionTime = dayjs(t.date).hour();
          return transactionTime === hour;
        });
        return acc;},
      {} as Record<number, Transaction[]>,
    );


    useEffect(() => { 
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
    };
    }, []);



    return (
      <div className="fixed inset-0 z-50 flex p-4 items-center justify-center">
        {/* затемненный и размытый фон */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center "
          onClick={onClose}
        />

        <div className="z-51 w-[30.5rem] lg:w-[37.5rem] max-h-[85vh] rounded-3xl bg-card overflow-hidden flex flex-col">
          <div className="h-25 flex items-center justify-center">
            <span className="text-2xl">{date.format("dddd DD MMMM YYYY")}</span>
          </div>
          <div className="py-5 px-8 overflow-y-auto flex flex-col gap-6">
            {hours.map((hour) => {
              const hourTransactions = transactionsByHour[hour] || null;

              return (
                <div>
                  {/* горизонтальная линия со временем */}
                  <div className="flex items-end justify-between">
                    <span>{hour < 10 ? "0" + hour : hour}:00</span>
                    <div className="h-px w-120 bg-foreground mb-2"></div>
                  </div>
                  {/* контейнер с транзакциями, если они существуют */}
                  <div className="flex flex-col gap-2">
                    {hourTransactions && hourTransactions.map((t) => (
                        <TransactionCard 
                        variant="day" 
                        transaction={t}/>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="flex items-end justify-end mt-5">
              <div className="h-px w-88 lg:w-120 bg-foreground"/>
            </div>
          </div>
        </div>
      </div>
    );
}