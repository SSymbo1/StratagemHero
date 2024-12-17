<script setup lang="ts">
import {onMounted, onUnmounted, ref, Ref} from "vue";
import {useScore} from "@/store/base/score.ts";
import label from '@/assets/json/game_label.json'
import global from "@/assets/json/global.json";
import router from "@/router";

interface RankResult {
  label: string
  score: number
}

interface Score {
  historyScore: number,
  historyRound: number,
  lastScore: number,
  lastRound: number
}

const rankResult: Ref<Array<RankResult>> = ref(label.rankLabel)
const currentIndex: Ref<number> = ref(-1)
const showIndexes: Ref<Array<number>> = ref([])
const intervalId: any = ref(null)
const score: Ref<Score> = ref({
  historyScore: 0,
  historyRound: 0,
  lastScore: 0,
  lastRound: 0
})

const calculateRoundData = () => {
  let useScoreStore = useScore()
  score.value = useScoreStore.score
  if (score.value.lastScore >= score.value.historyScore) {
    useScoreStore.setScore(score.value.lastScore, null, null, null)
  }
  if (score.value.lastRound >= score.value.historyRound) {
    useScoreStore.setScore(null, score.value.lastRound, null, null)
  }
  score.value = useScoreStore.score
  rankResult.value[0].score = score.value.historyScore
  rankResult.value[1].score = score.value.historyRound
  rankResult.value[2].score = score.value.lastScore
  rankResult.value[3].score = score.value.lastRound
  intervalId.value = setInterval(() => {
    if (currentIndex.value < rankResult.value.length - 1) {
      currentIndex.value++
      showIndexes.value.push(currentIndex.value)
    } else {
      showIndexes.value.push(-2)
      clearInterval(intervalId.value)
      window.addEventListener('keydown', checkInput)
    }
  }, global.roundResultLabelWait)
}

const checkInput = () => {
  router.push('/')
}

onMounted(() => {
  calculateRoundData()
})

onUnmounted(() => {
  window.removeEventListener('keydown', checkInput)
  clearInterval(intervalId.value)
})
</script>

<template>
  <div class="rank-container">
    <div class="top-line"></div>
    <div class="rank-container-padding">
      <div class="rank-container-layer">
        <div class="rank-result-layer"
             v-for="(res,index) in rankResult"
             :key="index"
             v-show="showIndexes.includes(index)">
          <span class="rank-item-label">{{ res.label }}</span>
          <span class="rank-score-label">{{ res.score }}</span>
        </div>
      </div>
      <div class="press-key" v-show="showIndexes.includes(-2)">{{ label.rank.press }}</div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<style scoped>
@import "@/assets/css/rank.css";
</style>