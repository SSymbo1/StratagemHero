<script setup lang="ts">
import { onMounted } from 'vue'
import { initApplicationLayout, initApplicationMode } from '@/utils/application.ts'

onMounted(() => {
  // 仅在应用启动时判断环境与设备布局。
  initApplicationLayout()
  initApplicationMode()
})
</script>

<template>
  <!-- 上中下三段式布局，中间区域承载路由页面。 -->
  <div class="flex h-screen w-screen flex-col bg-black p-0">
    <div class="h-[15vh] w-screen shrink-0 border-b-[0.6vh] border-white" />
    <router-view class="h-[70vh] w-screen overflow-hidden" />
    <div class="h-[15vh] w-screen shrink-0 border-t-[0.6vh] border-white" />
  </div>
</template>
