<script setup lang="ts">
import operation from "@/assets/json/operation.json";
import {onMounted, onUnmounted} from "vue";
import router from "@/router/index.ts";
import {operationSoundCache} from "@/assets/ts/application_init.ts";

/**
 * 游戏开始
 * @param event 键盘事件
 */
const startGame = (event: KeyboardEvent) => {
  if (operation.includes(event.key)) {
    operationSoundCache()
    router.replace("/level")
  }
}

onMounted(() => {
  window.addEventListener("keydown", startGame)
})

onUnmounted(() => {
  window.removeEventListener("keydown", startGame)
})
</script>

<template>
  <div class="home-container">
    <div class="top-line"></div>
    <div class="game-container">
      <div class="title">{{ $t("home.title") }}</div>
      <div class="subtitle">{{ $t("home.subtitle") }}</div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<style scoped>
@import "@/assets/css/home.css";
</style>