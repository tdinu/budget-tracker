<template>
  <RouterLink to="/" class="flex items-center gap-2 cursor-pointer">
    <HandCoins class="stroke h-11 w-11 stroke-violet-500 stroke-[1.5] hidden md:block" />
    <p
      class="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent"
    >
      BudgetTracker
    </p>
  </RouterLink>
</template>

<script setup>
import { HandCoins } from 'lucide-vue-next'
</script>
