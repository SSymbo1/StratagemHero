<script setup lang="ts">
import type { ResultItem } from '@/types/result.ts'

defineProps<{
  items: ResultItem[]
  showIndexes: number[]
  labelPrefix: 'roundLabel' | 'resultLabel'
}>()
</script>

<template>
  <div class="flex h-[50vh] flex-col items-center justify-start gap-[6vh]">
    <div
      v-for="(res, index) in items"
      v-show="showIndexes.includes(index)"
      :key="index"
      class="grid grid-cols-2 gap-[29vw]"
    >
      <span class="font-game text-2xl font-bold text-white md:text-4xl [text-shadow:0_0_0.3rem_white]">
        {{ $t(`${labelPrefix}.${res.label}`) }}
      </span>
      <span class="font-game text-2xl font-bold text-game-gold md:text-4xl [text-shadow:0_0_0.2rem_yellow]">
        {{ res.score }}
      </span>
    </div>
  </div>
</template>
