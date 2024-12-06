<script setup lang="ts">
import {onMounted, onUnmounted, Ref, ref} from "vue";
import label from '@/assets/json/game_label.json'
import Timer from "@/components/component/Timer.vue";
import operation from '@/assets/json/operation.json';
import global from '@/assets/json/global.json'
import StratagemsLayer from "@/components/component/StratagemsLayer.vue";
import {randomStratagems, Stratagem} from '@/assets/ts/random_stratagems.ts'

const round: Ref<number> = ref(global.round)
const score: Ref<number> = ref(global.score)
const time: Ref<number> = ref(global.time)
const perAddTime: Ref<number> = ref(global.perTime)
const isRoundStart: Ref<boolean> = ref(true)
const timer: any = ref(null)
const stratagemsLayer: any = ref(null)
const stratagems: Ref<Array<Stratagem>> = ref([])

const readyForRoundBegin = () => {
  isRoundStart.value = true
  round.value = round.value + 1
  time.value = global.time
  stratagems.value = randomStratagems(round.value)
  console.log(stratagems.value)
  setTimeout(() => {
    isRoundStart.value = false
  }, global.ready)
}

const timeUp = () => {
  console.log("时间耗尽")
}

const roundStratagemsRunOut = () => {

}

const checkInput = (event: KeyboardEvent) => {
  if (operation.includes(event.key)) {
    timer.value.addTime()

  }
}

onMounted(() => {
  readyForRoundBegin()
  window.addEventListener('keydown', checkInput)
})
onUnmounted(() => {
  window.removeEventListener('keydown', checkInput)
})
</script>

<template>
  <div class="game-container">
    <div class="top-line"></div>
    <div class="round-layer" v-if="isRoundStart==true">
      <div class="round-layer-title">{{ label.round.title }}</div>
      <div class="round-layer-label">
        <div class="round-layer-label-title">{{ label.round.subtitle }}</div>
        <div class="round-layer-label-index">{{ round }}</div>
      </div>
    </div>
    <div class="game-layer" v-else>
      <div class="game-side">
        <div class="game-side-label">{{ label.game.round }}</div>
        <div class="game-side-number">{{ round }}</div>
      </div>
      <div class="game-main">
        <div class="stratagems">
          <div class="stratagems-pointer">
            <StratagemsLayer
                :stratagems="stratagems"
                @clear-up="roundStratagemsRunOut"
                ref="stratagemsLayer">
            </StratagemsLayer>
          </div>
          <div class="stratagems-label">
            <span>测试文字</span>
          </div>
        </div>
        <div class="arrow-layer"></div>
        <Timer :time="time" :per-plus="perAddTime" @timeUp="timeUp" ref="timer"></Timer>
      </div>
      <div class="game-side">
        <div class="game-side-number">{{ score }}</div>
        <div class="game-side-label">{{ label.game.score }}</div>
      </div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<style scoped>
@import "@/assets/css/level.css";
</style>