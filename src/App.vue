<script setup lang="ts">
import {onMounted} from "vue";
import {initApplicationLayout, initApplicationMode} from "@/assets/ts/application_init.ts";

onMounted(() => {
  initApplicationLayout()
  initApplicationMode()
})
</script>

<template>
  <div class="app-container">
    <div class="top-border"></div>
    <router-view class="game"></router-view>
    <div class="bottom-border"></div>
  </div>
</template>

<style>
@import "@/assets/css/app.css";
</style>
