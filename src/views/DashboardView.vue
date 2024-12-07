<template>
  <div className="h-full bg-background">
    <div className="border-b bg-card">
      <div
        className="container px-4 md:px-8 flex flex-wrap items-center justify-center md:justify-between gap-6 py-8"
      >
        <p className="text-3xl font-bold">Hi there!</p>
        <div className="flex items-center gap-3">
          <CreateTransactionDialog :type="TYPES.INCOME" />
          <CreateTransactionDialog :type="TYPES.EXPENSE" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateTransactionDialog from '@/components/CreateTransactionDialog.vue'
import { TYPES } from '@/types'
</script>
