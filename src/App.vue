<script setup lang="ts">
import {onMounted} from "vue";
import {
  initApplicationLayout,
  initApplicationMode,
} from "@/assets/ts/application_init.ts";

onMounted(() => {
  initApplicationLayout()
  initApplicationMode()
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
body:hover {
  cursor: none;
}
</style>
