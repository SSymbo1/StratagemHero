<script setup lang="ts">
import type { CSSProperties, Ref } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { TimerLayer } from '@/constants/game.ts'

/**
 * 计时条组件，通过剩余时间驱动颜色和宽度变化。
 */
const props = withDefaults(defineProps<{
  width?: string
  time?: number
  perPlus?: number
}>(), {
  width: '50',
  time: 90,
  perPlus: 10,
})

const emit = defineEmits<{
  timeUp: []
  nearlyOver: []
  remainMany: []
}>()

const remainingTime: Ref<number> = ref(props.time)
const currentTransition: Ref<string> = ref('width 1s linear')
const timerColor: Ref<string> = ref(TimerLayer.SAFE_TIME)
let timer: ReturnType<typeof setInterval> | null = null

// 剩余时间占总时间的百分比，用于驱动进度条宽度。
const percentage = computed(() => (remainingTime.value / props.time) * 100)

const progressBarStyle = computed(() => {
  return {
    width: `${props.width}vw`,
    backgroundColor: 'gray',
    position: 'relative',
    height: '2vh',
    overflow: 'hidden',
  } as CSSProperties
})

const progressStyle = computed(() => {
  return {
    width: `${percentage.value}%`,
    height: '100%',
    backgroundColor: timerColor.value,
    transition: currentTransition.value,
  } as CSSProperties
})

watch(percentage, (newPercentage, oldPercentage = 0) => {
  // 加时后使用更快过渡，正常递减时保持平滑回落。
  currentTransition.value = newPercentage > oldPercentage ? 'width 0.1s linear' : 'width 1s linear'

  // 低于安全阈值时切换为危险色，并通知父组件。
  if (newPercentage <= 35) {
    timerColor.value = TimerLayer.DANGER_TIME
    emit('nearlyOver')
  }
  else {
    timerColor.value = TimerLayer.SAFE_TIME
    emit('remainMany')
  }
}, { immediate: true })

function startCountdown() {
  if (timer !== null) {
    clearInterval(timer)
  }

  // 每秒减少一次剩余时间，到零后通知父组件结算。
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    }
    else {
      if (timer !== null) {
        clearInterval(timer)
      }
      timer = null
      emit('timeUp')
    }
  }, 1000)
}

function addTime() {
  // 加时不能超过本回合总时长。
  if (remainingTime.value + props.perPlus >= props.time) {
    remainingTime.value = props.time
  }
  else {
    remainingTime.value += props.perPlus
  }
}

function getRemainTime(): number {
  return Math.ceil(remainingTime.value)
}

onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  if (timer !== null) {
    clearInterval(timer)
  }
})

defineExpose({
  addTime,
  getRemainTime,
})
</script>

<template>
  <div :style="progressBarStyle">
    <div :style="progressStyle" />
  </div>
</template>
