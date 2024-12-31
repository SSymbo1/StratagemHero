<script setup lang="ts">
import {computed, CSSProperties, onBeforeUnmount, onMounted, Ref, ref} from "vue";
import {TimerLayer} from "@/assets/ts/global.ts";

/**
 * @param width 进度条长度
 * @param time 初始倒计时时间
 * @param perPlus 每次增加的时间
 */
const props = defineProps({
  width: {
    type: String,
    default: "50"
  },
  time: {
    type: Number,
    default: 90
  },
  perPlus: {
    type: Number,
    default: 10
  }
})
const emit = defineEmits(["timeUp", "nearlyOver", "remainMany"])

const remainingTime: Ref<number> = ref(props.time)
let timer: number | NodeJS.Timeout | null = null
let lastPercentage: number = 0

/**
 * 进度条基底
 */
const progressBarStyle = computed(() => {
  return {
    width: `${props.width}vw`,
    backgroundColor: "gray",
    position: "relative",
    height: "20px",
    overflow: "hidden"
  } as CSSProperties
})

/**
 * 更新进度条的样式(动态)
 */
const progressStyle = computed(() => {
  const percentage = (remainingTime.value / props.time) * 100;
  let timerColor: string
  let currentTransition: string
  if (percentage <= 35) {
    emit("nearlyOver")
    timerColor = TimerLayer.DANGER_TIME
  } else {
    emit("remainMany")
    timerColor = TimerLayer.SAFE_TIME
  }
  if (percentage > lastPercentage) {
    currentTransition = "width 0.1s linear"
  } else {
    currentTransition = "width 1s linear"
  }
  lastPercentage = percentage
  return {
    width: `${percentage}%`,
    height: "100%",
    backgroundColor: timerColor,
    transition: currentTransition
  } as CSSProperties
})

/**
 * 开始倒计时
 */
const startCountdown = () => {
  if (timer !== null) clearInterval(timer);
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timer as number);
      timer = null;
      emit("timeUp");
    }
  }, 1000);
}

/**
 * 延长时间
 */
const addTime = () => {
  if (remainingTime.value + props.perPlus >= props.time) {
    remainingTime.value = props.time
  } else {
    remainingTime.value += props.perPlus
  }
}

/**
 * 获取倒计时进度条剩余时间
 * @return {number} 剩余时间
 */
const getRemainTime = (): number => {
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
  getRemainTime
})
</script>

<template>
  <div :style="progressBarStyle">
    <div :style="progressStyle"></div>
  </div>
</template>

<style scoped>
</style>