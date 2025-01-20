<script setup lang="ts">
import {Stratagem} from "@/assets/ts/round_stratagems.ts";
import {computed, CSSProperties, Ref, ref, watch} from "vue";

/**
 * @param stratagems 战略配备数组
 * @param ampleTime 回合剩余时间是否充裕
 */
const props = defineProps({
  stratagems: {
    type: Array<Stratagem>,
    default: []
  },
  ampleTime: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(["clearUp", "nowStratagem"])

const stratagems: Ref<Array<Stratagem>> = ref(props.stratagems)
const showLabel = computed(() => stratagems.value.slice(0, 4))
const filterStyle: Ref<CSSProperties> = ref({})

/**
 * 移除layer里第一个战略配备
 */
const removeFirstStratagem = () => {
  stratagems.value.shift()
  if (stratagems.value.length === 0) {
    emit("clearUp")
  }
}

/**
 * 当前战略配备光效滤镜
 * @param percent 当前战略配备指令完成百分比
 */
const stratagemsLayerFilter = (percent: number) => {
  if (percent <= 0) {
    filterStyle.value = {}
  } else if (percent > 0 && percent <= 0.25) {
    filterStyle.value = {filter: "sepia(20%) drop-shadow(0 0 0.2vw yellow)"}
  } else if (percent > 0.25 && percent <= 0.5) {
    filterStyle.value = {filter: "sepia(30%) drop-shadow(0 0 0.3vw yellow)"}
  } else if (percent > 0.5 && percent <= 0.75) {
    filterStyle.value = {filter: "sepia(40%) drop-shadow(0 0 0.4vw yellow)"}
  } else if (percent > 0.75) {
    filterStyle.value = {filter: "sepia(50%) drop-shadow(0 0 0.5vw yellow)"}
  }
}

watch(showLabel, (newValue) => {
  if (newValue.length > 0) {
    emit("nowStratagem", newValue[0])
  } else {
    emit("clearUp")
  }
})

defineExpose({
  stratagemsLayerFilter,
  removeFirstStratagem
})
</script>

<template>
  <div class="stratagems-container" v-for="(obj,index) in showLabel" :key="index">
    <div
        class="stratagems-label stratagems-svg-default"
        :class="{'yellow-border': index === 0 && ampleTime, 'red-border': index === 0 && !ampleTime}">
      <img :src="obj.icon"
           alt=""
           :style="index===0?filterStyle:''"/>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/stratagems_layer.css";

.yellow-border {
  border: 0.3vw solid gold;
}

.red-border {
  border: 0.3vw solid red;
}
</style>