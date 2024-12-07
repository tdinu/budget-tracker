<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { VisuallyHidden } from 'radix-vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'
import { TYPES } from '@/types'
import { categories } from '@/constants'
import { expenses, incomes } from '../store/transactions'

const props = defineProps({
  type: {
    type: String,
    default: 'expense'
  }
})

const open = ref(false)

const formSchema = toTypedSchema(
  z.object({
    amount: z.coerce.number().positive().multipleOf(0.01).optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    category: z.string().optional(),
    type: z.union([z.literal('income'), z.literal('expense')]).optional()
  })
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  if (props.type === TYPES.EXPENSE) {
    expenses.value.unshift({
      category: values.category ?? '',
      amount: values.amount ?? 0,
      description: values.description ?? '',
      date: new Date().toLocaleDateString()
    })
  } else if (props.type === TYPES.INCOME) {
    incomes.value.unshift({
      amount: values.amount ?? 0,
      description: values.description ?? '',
      date: new Date().toLocaleDateString()
    })
  }
  open.value = false
})

// const transactionType = ref<TYPES>(TYPES.EXPENSE);
const description = ref('')
const category = ref(categories[0].name)
const amount = ref(0)
const date = ref('')

function handleOpenChange(isOpen: boolean) {
  open.value = isOpen
}
</script>

<template>
  <Dialog v-model:open="open" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button
        variant="outline"
        size="lg"
        :class="
          cn(
            'text-white hover:text-white',
            type === TYPES.INCOME
              ? 'bg-green-500 hover:bg-green-700 border-green-500'
              : 'bg-rose-500 hover:bg-rose-700 border-rose-500'
          )
        "
      >
        New {{ type }} {{ type === TYPES.EXPENSE ? '😤' : '🤑' }}
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Create an {{ props.type }} transaction </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <VisuallyHidden>Description goes here</VisuallyHidden>
      </DialogDescription>
      <form class="w-2/3 space-y-6" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="description" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="description"
                v-bind="componentField"
                v-model="description"
              />
            </FormControl>
            <FormDescription
              ><VisuallyHidden> Transaction description. </VisuallyHidden></FormDescription
            >
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="amount" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input type="number" placeholder="amount" v-bind="componentField" v-model="amount" />
            </FormControl>
            <FormDescription>
              <VisuallyHidden> Transaction amount. </VisuallyHidden>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-if="type === TYPES.EXPENSE"
          v-slot="{ componentField }"
          name="category"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup v-model="category">
                  <SelectItem
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.name"
                  >
                    {{ category.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription>
              <VisuallyHidden> Transaction category. </VisuallyHidden>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="date" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input type="text" placeholder="date" v-bind="componentField" v-model="date" />
            </FormControl>
            <FormDescription>
              <VisuallyHidden> Transaction date. </VisuallyHidden>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit"> Submit </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
