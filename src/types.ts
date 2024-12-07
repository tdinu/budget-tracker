export enum TYPES {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export type Transaction = {
  category?: string
  description: string
  amount: number
  date: string
}
