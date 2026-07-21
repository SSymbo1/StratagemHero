<script setup lang="ts">
/**
 * 关卡页左右两侧的分数或回合展示面板。
 */
defineProps<{
  label: string
  value: string | number
  valueFirst?: boolean
}>()
</script>

<template>
  <div class="flex w-1/4 flex-col items-center pt-[4vh]">
    <template v-if="valueFirst">
      <div class="font-game text-3xl text-game-gold md:text-5xl">
        {{ value }}
      </div>
      <div class="font-game text-2xl text-white md:text-4xl">
        {{ label }}
      </div>
    </template>
    <template v-else>
      <div class="font-game text-2xl text-white md:text-4xl">
        {{ label }}
      </div>
      <div class="font-game text-3xl text-game-gold md:text-5xl">
        {{ value }}
      </div>
    </template>
  </div>
</template>
