<script setup lang="ts">
import type { Ref } from 'vue'
import Hammer from 'hammerjs'
import { onMounted, onUnmounted, ref } from 'vue'
import { operationSoundCache } from '@/assets/ts/application_init.ts'
import { Operation } from '@/assets/ts/operation.ts'
import router from '@/router/index.ts'

const hammerArea: Ref<HTMLElement | null> = ref(null)
const hammerInstance: Ref<HammerManager | null> = ref(null)

async function startGame(event: KeyboardEvent | HammerInput) {
  if (new Operation(event).checkOPEffective() && await operationSoundCache()) {
    await router.replace('/level')
  }
}

onMounted(() => {
  if (hammerArea.value) {
    hammerInstance.value = new Hammer(hammerArea.value)
    hammerInstance.value.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
    hammerInstance.value.on('swipe', startGame)
  }
  window.addEventListener('keydown', startGame)
})

onUnmounted(() => {
  window.removeEventListener('keydown', startGame)
  hammerInstance.value?.off('swipe', startGame)
})
</script>

<template>
  <div
    ref="hammerArea"
    class="relative flex h-full w-full flex-col bg-black p-0 before:absolute before:inset-0 before:bg-[url('/public/icons/background/super_earth.png')] before:bg-[length:30%] before:bg-center before:bg-no-repeat before:opacity-10 before:grayscale before:content-['']"
  >
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-[8vh]">
      <div class="font-game text-6xl font-bold tracking-[0.3rem] text-white md:text-8xl [text-shadow:0_0_0.4rem_white]">
        {{ $t("home.title") }}
      </div>
      <div class="font-game text-3xl font-bold tracking-[0.4rem] text-game-gold md:text-5xl [text-shadow:0_0_0.4rem_yellow]">
        {{ $t("home.subtitle") }}
      </div>
    </div>
  </div>
</template>
