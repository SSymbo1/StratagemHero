<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, computed, CSSProperties} from "vue";

const props = defineProps({
  width: {
    type: String,
    default: '50'
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
const emit = defineEmits(['timeUp'])

const remainingTime = ref(props.time)
let timer: number | NodeJS.Timeout | null = null

// 更新进度条的样式(初始化)
const progressBarStyle = computed(() => {
  return {
    width: `${props.width}vw`,
    backgroundColor: 'gray',
    position: 'relative',
    height: '20px',
    overflow: 'hidden'
  } as CSSProperties
})

// 更新进度条的样式(动态)
const progressStyle = computed(() => {
  const percentage = (remainingTime.value / props.time) * 100;
  return {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: 'yellow',
    transition: 'width 0.1s linear'
  } as CSSProperties
})

// 倒计时函数
const startCountdown = () => {
  if (timer !== null) clearInterval(timer);
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timer as number);
      timer = null;
      emit('timeUp');
    }
  }, 1000);
}

// 外部组件可以调用此方法续时
const addTime = () => {
  if (remainingTime.value + props.perPlus >= props.time) {
    remainingTime.value = props.time
  } else {
    remainingTime.value += props.perPlus
  }
}

const getRemainTime = () => {
  return remainingTime.value
}

// 初始化时开始倒计时
onMounted(() => {
  startCountdown()
})

// 组件卸载时清除定时器
onBeforeUnmount(() => {
  if (timer !== null) clearInterval(timer);
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