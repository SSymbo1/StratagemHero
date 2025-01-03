<script setup lang="ts">
import operation from "@/assets/json/operation.json";
import {onMounted, onUnmounted, Ref, ref} from "vue";
import {operationSoundCache} from "@/assets/ts/application_init.ts";
import router from "@/router/index.ts";
import Hammer from "hammerjs";

const hammerArea: Ref<HTMLElement | null> = ref(null)
const hammerInstance: Ref<HammerManager | null> = ref(null)

/**
 * 游戏开始
 * @param event 键盘事件或触控事件
 */
const startGame = (event: KeyboardEvent | HammerInput) => {
  if (event instanceof KeyboardEvent) {
    if (operation.keyboard.includes(event.key)) {
      operationSoundCache()
      router.replace("/level")
    }
  } else {
    if (operation.touch.includes(event.direction)) {
      operationSoundCache()
      router.replace("/level")
    }
  }
}

onMounted(() => {
  if (hammerArea.value) {
    hammerInstance.value = new Hammer(hammerArea.value)
    hammerInstance.value.get("swipe").set({direction: Hammer.DIRECTION_ALL});
    hammerInstance.value.on("swipe", startGame)
  }
  window.addEventListener("keydown", startGame)
})

onUnmounted(() => {
  window.removeEventListener("keydown", startGame)
  hammerInstance.value?.off("swipe", startGame)
})
</script>

<template>
  <div class="home-container" ref="hammerArea">
    <div class="game-container">
      <div class="title">{{ $t("home.title") }}</div>
      <div class="subtitle">{{ $t("home.subtitle") }}</div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/home.css";
</style>