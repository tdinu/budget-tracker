import { useLocalStorage } from '@vueuse/core'
import { TYPES, type Transaction } from '../types'

export const expenses = useLocalStorage<Transaction[]>(TYPES.EXPENSE, [])
export const incomes = useLocalStorage<Transaction[]>(TYPES.INCOME, [])
