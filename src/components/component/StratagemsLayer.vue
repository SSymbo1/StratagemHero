<script setup lang="ts">
import type { CSSProperties, Ref } from 'vue'
import type { Stratagem } from '@/types/stratagem.ts'
import { computed, ref, watch } from 'vue'

/**
 * 展示当前回合战备图标，并根据剩余进度调整高亮效果。
 */
const props = withDefaults(defineProps<{
  stratagems?: readonly Stratagem[]
  ampleTime?: boolean
}>(), {
  stratagems: () => [],
  ampleTime: true,
})

const emit = defineEmits<{
  clearUp: []
  nowStratagem: [stratagem: Stratagem]
}>()

const stratagems: Ref<Stratagem[]> = ref([...props.stratagems])
const showLabel = computed(() => stratagems.value.slice(0, 4))
const filterStyle: Ref<CSSProperties> = ref({})

function removeFirstStratagem() {
  // 当前战备完成后，移除首项并在耗尽时通知父组件。
  stratagems.value.shift()
  if (stratagems.value.length === 0) {
    emit('clearUp')
  }
}

function stratagemsLayerFilter(percent: number) {
  // 根据输入完成度逐步增强滤镜强度。
  if (percent <= 0) {
    filterStyle.value = {}
  }
  else if (percent <= 0.25) {
    filterStyle.value = { filter: 'sepia(20%) drop-shadow(0 0 0.2vw yellow)' }
  }
  else if (percent <= 0.5) {
    filterStyle.value = { filter: 'sepia(30%) drop-shadow(0 0 0.3vw yellow)' }
  }
  else if (percent <= 0.75) {
    filterStyle.value = { filter: 'sepia(40%) drop-shadow(0 0 0.4vw yellow)' }
  }
  else {
    filterStyle.value = { filter: 'sepia(50%) drop-shadow(0 0 0.5vw yellow)' }
  }
}

watch(showLabel, (newValue) => {
  // 让父组件始终拿到当前展示区的首个战备。
  if (newValue.length > 0) {
    emit('nowStratagem', newValue[0])
  }
  else {
    emit('clearUp')
  }
})

defineExpose({
  stratagemsLayerFilter,
  removeFirstStratagem,
})
</script>

<template>
  <div
    v-for="(obj, index) in showLabel"
    :key="index"
    class="m-0 h-full w-[12.3vw]"
  >
    <div
      class="h-[22.8vh] w-[12vw] saturate-[5] brightness-100"
      :class="{
        'border-[0.3vw] border-game-gold': index === 0 && ampleTime,
        'border-[0.3vw] border-game-red': index === 0 && !ampleTime,
      }"
    >
      <img
        :src="obj.icon"
        alt=""
        class="h-full w-full"
        :style="index === 0 ? filterStyle : undefined"
      >
    </div>
  </div>
</template>
