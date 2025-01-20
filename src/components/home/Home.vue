<script setup lang="ts">
import {onMounted, onUnmounted, Ref, ref} from "vue";
import {operationSoundCache} from "@/assets/ts/application_init.ts";
import router from "@/router/index.ts";
import Hammer from "hammerjs";
import {Operation} from "@/assets/ts/operation.ts";

const hammerArea: Ref<HTMLElement | null> = ref(null)
const hammerInstance: Ref<HammerManager | null> = ref(null)

/**
 * 游戏开始
 * @param event 键盘事件或触控事件
 */
const startGame = async (event: KeyboardEvent | HammerInput) => {
  if (new Operation(event).checkOPEffective() && await operationSoundCache()) {
    await router.replace("/level")
  }
}

onMounted(() => {
  if (hammerArea.value) {
    hammerInstance.value = new Hammer(hammerArea.value)
    hammerInstance.value.get("swipe").set({direction: Hammer.DIRECTION_ALL})
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