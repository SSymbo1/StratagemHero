<script setup lang="ts">
import label from "@/assets/json/game_label.json"
import operation from '@/assets/json/operation.json'
import {onMounted, onUnmounted} from "vue";
import router from "@/router/index.ts";

const startGame = (event: KeyboardEvent) => {
  if (operation.includes(event.key)) {
    router.push('/level')
  }
}

onMounted(() => {
  window.addEventListener('keydown', startGame)
})

onUnmounted(() => {
  window.removeEventListener('keydown', startGame)
})
</script>

<template>
  <div class="home-container">
    <div class="top-line"></div>
    <div class="game-container">
      <div class="title">{{ label.home.title }}</div>
      <div class="subtitle">{{ label.home.subtitle }}</div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<style scoped>
@import "@/assets/css/home.css";
</style>