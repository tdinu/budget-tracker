import { useLocalStorage } from '@vueuse/core'
import { TYPES, type Transaction } from '../types'

export const expenses = useLocalStorage<Transaction[]>(TYPES.EXPENSE, [])
export const incomes = useLocalStorage<Transaction[]>(TYPES.INCOME, [])
export const getTotalAmount = (type: string) => {
    let total = 0;
  
    if (type === TYPES.EXPENSE) {
      total = expenses.value.reduce((acc, expense) => acc + expense.amount, 0);
    } else if (type === TYPES.INCOME) {
      total = incomes.value.reduce((acc, income) => acc + income.amount, 0);
    }
  
    return total;
  };
  