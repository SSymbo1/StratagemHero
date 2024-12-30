<script setup lang="ts">
import {computed, CSSProperties, ref, watch} from "vue";

/**
 * @param arrow 当前战略配备指令
 * @param operation 玩家输入指令
 */
const props = defineProps({
  arrow: {
    type: Array<number>,
    default: []
  },
  operation: {
    type: Array<number>,
    default: []
  }
})
const emit = defineEmits(["success", "error"])

const stratagem = computed(() => props.arrow)
const input = computed(() => props.operation)
const errorIndex: any = ref([])

/**
 * 根据依次输入正确的指令按顺序填充箭头颜色
 * @param index 指令索引
 * @return CSSProperties 渲染箭头样式的css样式表属性
 */
const fillArrowColor = (index: number) => {
  if (input.value[index] === stratagem.value[index]) {
    return {
      fill: "gold"
    } as CSSProperties
  }
}

watch(input, (newVal) => {
  if (newVal.length > 0) {
    errorIndex.value = []
  }
  let flag: boolean = true
  const min = Math.min(stratagem.value.length, newVal.length);
  for (let i = 0; i < min; i++) {
    if (stratagem.value[i] !== newVal[i]) {
      flag = false
      for (let e = 0; e <= i; e++) {
        errorIndex.value.push(e)
      }
      setTimeout(() => {
        const svgElements = document.getElementsByTagName("path");
        for (let s = 0; s < svgElements.length; s++) {
          svgElements[s].style.fill = "#ffffff"
        }
      }, 100)
      const errorSound = new Audio("/StratagemHero/audio/key_press_fail.mp3")
      emit("error")
      errorSound.play()
      return
    }
  }
  if (flag && stratagem.value.length === newVal.length) {
    emit("success")
  }
}, {deep: true})
</script>

<template>
  <div class="arrow-layer">
    <div class="arrow-container" v-for="(obj,index) in stratagem" :key="index">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" v-if="obj === 1">
        <path :style="fillArrowColor(index)" :class="{ 'error-arrow': errorIndex.includes(index) }" fill="#ffffff"
              d="M78.016 49.132L51.961 12.714a2.516 2.516 0 0 0-2.043-1.051h-.006a2.52 2.52 0 0 0-2.048 1.059L21.977 49.14a2.513 2.513 0 0 0-.183 2.612a2.509 2.509 0 0 0 2.236 1.361h12.183l-.001 32.709a2.514 2.514 0 0 0 2.516 2.515l22.541-.001a2.515 2.515 0 0 0 2.516-2.517V53.114h12.187c.94 0 1.803-.53 2.237-1.367a2.513 2.513 0 0 0-.193-2.615"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" v-if="obj === 2">
        <path :style="fillArrowColor(index)" :class="{ 'error-arrow': errorIndex.includes(index) }" fill="#ffffff"
              d="m21.984 50.868l26.055 36.418a2.516 2.516 0 0 0 2.043 1.051h.006a2.52 2.52 0 0 0 2.048-1.059l25.887-36.417a2.513 2.513 0 0 0 .183-2.612a2.509 2.509 0 0 0-2.236-1.361H63.787l.001-32.709a2.514 2.514 0 0 0-2.516-2.515l-22.541.001a2.515 2.515 0 0 0-2.516 2.516v32.705H24.029c-.94 0-1.803.53-2.237 1.367a2.51 2.51 0 0 0 .192 2.615"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" v-if="obj === 3">
        <path :style="fillArrowColor(index)" :class="{ 'error-arrow': errorIndex.includes(index) }" fill="#ffffff"
              d="M49.132 21.984L12.714 48.039a2.516 2.516 0 0 0-1.051 2.043v.006a2.52 2.52 0 0 0 1.059 2.048L49.14 78.023a2.513 2.513 0 0 0 2.612.183a2.508 2.508 0 0 0 1.361-2.236V63.787l32.709.001a2.514 2.514 0 0 0 2.515-2.516l-.001-22.541a2.515 2.515 0 0 0-2.516-2.516H53.114V24.029c0-.94-.53-1.803-1.367-2.237a2.51 2.51 0 0 0-2.615.192"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" v-if="obj === 4">
        <path :style="fillArrowColor(index)" :class="{ 'error-arrow': errorIndex.includes(index) }" fill="#ffffff"
              d="m50.868 78.016l36.418-26.055a2.516 2.516 0 0 0 1.051-2.043v-.006a2.52 2.52 0 0 0-1.059-2.048L50.86 21.977a2.513 2.513 0 0 0-2.612-.183a2.509 2.509 0 0 0-1.361 2.236v12.183l-32.709-.001a2.514 2.514 0 0 0-2.515 2.516l.001 22.541a2.515 2.515 0 0 0 2.516 2.516h32.706v12.187c0 .94.53 1.803 1.366 2.237a2.512 2.512 0 0 0 2.616-.193"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/arrow_layer.css";

.error-arrow {
  fill: red;
}
</style>