<template>
  <div className="bg-background">
    <div class="border-b bg-card">
      <div
        class="container px-4 md:px-8 flex flex-wrap items-center justify-center md:justify-between gap-6 py-8"
      >
        <p class="text-3xl font-bold">Hi there!</p>
        <div class="flex items-center gap-3">
          <CreateTransactionDialog :type="TYPES.INCOME" />
          <CreateTransactionDialog :type="TYPES.EXPENSE" />
        </div>
      </div>
      <div class="container flex flex-wrap items-end justify-between gap-2 py-6 mx-auto">
        <Overview />
        <!-- <History /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateTransactionDialog from '../components/features/CreateTransactionDialog.vue'
import Overview from '../components/features/Overview.vue'
import { TYPES } from '@/types'
</script>
