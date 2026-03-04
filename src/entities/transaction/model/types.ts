export type transactionType = "income" | "expense"

export interface Transaction {
    id: string,
    title: string,
    amount: number,
    type: transactionType,
    date: string,
    category?: string
}