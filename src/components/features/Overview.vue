<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-vue-next'
import OverviewCard from './OverviewCard.vue'
import { getTotalAmount } from '../../store/transactions'
import { TYPES } from '@/types'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
const stats = {
  title: 'Balance',
  value: getTotalAmount(TYPES.INCOME) - getTotalAmount(TYPES.EXPENSE)
}
</script>

<template>
  <div class="container flex flex-wrap items-end justify-between gap-2 py-6 px-0 mx-auto">
    <h2 class="w-full text-3xl font-bold">Overview</h2>
  </div>

  <div class="container flex flex-col lg:flex-row items-center justify-between gap-2 px-0 mx-auto">
    <OverviewCard :formatter="formatter" title="Income" :value="getTotalAmount(TYPES.INCOME)">
      <template #icon>
        <TrendingUp
          class="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10"
        /> </template
    ></OverviewCard>
    <OverviewCard :formatter="formatter" title="Expenses" :value="getTotalAmount(TYPES.EXPENSE)">
      <template #icon>
        <TrendingDown
          class="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10"
        /> </template
    ></OverviewCard>
    <OverviewCard :formatter="formatter" :title="stats.title" :value="stats.value">
      <template #icon>
        <Wallet
          class="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10"
        /> </template
    ></OverviewCard>
    <!-- <CategoriesStats /> -->
  </div>
</template>

<style scoped></style>
