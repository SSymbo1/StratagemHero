<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
  let agent: RegExpMatchArray | null = navigator.userAgent.match(/Android|webOS|iPhone|iPad|Opera Mini/i)
  if (agent != null) {

  }
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
