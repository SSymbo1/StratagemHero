<script setup lang="ts">
import type { CSSProperties, Ref } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { TimerLayer } from '@/constants/game.ts'

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
  currentTransition.value = newPercentage > oldPercentage ? 'width 0.1s linear' : 'width 1s linear'

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
