<!-- 全局游戏页面外壳，统一背景和内容叠层。 -->
<template>
  <div class="relative h-full w-full bg-black before:absolute before:inset-0 before:bg-[url('/public/icons/background/super_earth.png')] before:bg-[length:30%] before:bg-center before:bg-no-repeat before:opacity-10 before:grayscale before:content-['']">
    <div class="relative z-10 h-full w-full">
      <slot />
    </div>
  </div>
</template>
