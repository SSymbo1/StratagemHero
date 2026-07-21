<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subtitle?: string
  meta?: string | number
  variant?: 'home' | 'ready'
}>(), {
  subtitle: undefined,
  meta: undefined,
  variant: 'home',
})
</script>

<template>
  <div
    class="flex h-full flex-col items-center justify-center"
    :class="variant === 'home' ? 'gap-[8vh]' : 'gap-[6vh] text-white'"
  >
    <div
      class="font-game font-bold"
      :class="variant === 'home'
        ? 'text-6xl tracking-[0.3rem] text-white md:text-8xl [text-shadow:0_0_0.4rem_white]'
        : 'text-5xl md:text-7xl'"
    >
      {{ title }}
    </div>
    <div
      v-if="subtitle"
      class="font-game font-bold"
      :class="variant === 'home'
        ? 'text-3xl tracking-[0.4rem] text-game-gold md:text-5xl [text-shadow:0_0_0.4rem_yellow]'
        : 'flex flex-col items-center gap-[1.5vh] text-2xl md:text-3xl'"
    >
      <span>{{ subtitle }}</span>
      <span v-if="meta !== undefined" class="text-game-gold">{{ meta }}</span>
    </div>
  </div>
</template>
