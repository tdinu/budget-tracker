<script setup lang="ts">
import { ref, computed } from 'vue'
import CountUp from 'vue-countup-v3'
import type { CountUpOptions } from 'vue-countup-v3'
import { Card } from '@/components/ui/card'

defineProps({
  formatter: {
    type: Object as () => Intl.NumberFormat,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})

// CountUp still to improve
const options: CountUpOptions = {
  decimal: '.',
  decimalPlaces: '2',
  separator: '.'
}

const formatFn = computed(() => {
  return (value: number) => props.formatter.format(value)
})
</script>

<template>
  <Card class="flex h-24 w-full items-center gap-2 p-4">
    <slot name="icon" />
    <div class="flex flex-col items-start gap-0">
      <p class="text-muted-foreground">{{ title }}</p>
      <CountUp
        :startVal="0"
        :endVal="value"
        :formattingFn="formatFn"
        :duration="2"
        :decimal-places="2"
        :options="options"
        :prefix="'€'"
        preserve-value
        redraw="false"
        class="text-2xl"
      />
    </div>
  </Card>
</template>
