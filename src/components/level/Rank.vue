<script setup lang="ts">
import {onMounted, onUnmounted, ref, Ref} from "vue";
import {useScore} from "@/store/base/score.ts";
import label from "@/assets/json/game_label.json";
import router from "@/router";
import {Component} from "@/assets/ts/global.ts";
import {Audio, MediaPlayer} from "@/assets/ts/media_player.ts";
import Hammer from "hammerjs";

const hammerArea: Ref<HTMLElement | null> = ref(null)
const hammerInstance: Ref<HammerManager | null> = ref(null)

/**
 * @param label 标签
 * @param score 分数
 */
interface RankResult {
  label: string
  score: number
}

/**
 * @param historyScore 历史最高分
 * @param historyRound 历史最高回合
 * @param lastScore 本轮得分
 * @param lastRound 本轮回合
 */
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

/**
 * 计算本轮游戏数据
 */
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
    if (currentIndex.value === -1) {
      new MediaPlayer(false, 0.5).audioPlay(Audio.GAME_OVER).play()
    }
    if (currentIndex.value < rankResult.value.length - 1) {
      currentIndex.value++
      showIndexes.value.push(currentIndex.value)
    } else {
      showIndexes.value.push(-2)
      clearInterval(intervalId.value)
      window.addEventListener("keydown", checkInput)
      if (hammerArea.value) {
        hammerInstance.value = new Hammer(hammerArea.value)
        hammerInstance.value.get("swipe").set({direction: Hammer.DIRECTION_ALL})
        hammerInstance.value.on("swipe", checkInput)
      }
    }
  }, Component.LABEL_SHOW)
}

/**
 * 监听键盘事件
 */
const checkInput = () => {
  router.replace("/")
}

onMounted(() => {
  calculateRoundData()
})

onUnmounted(() => {
  window.removeEventListener("keydown", checkInput)
  hammerInstance.value?.off("swipe", checkInput)
  clearInterval(intervalId.value)
})
</script>

<template>
  <div class="rank-container" ref="hammerArea">
    <div class="rank-container-padding">
      <div class="rank-container-layer">
        <div class="rank-result-layer"
             v-for="(res,index) in rankResult"
             :key="index"
             v-show="showIndexes.includes(index)">
          <span class="rank-item-label">{{ $t(`resultLabel.${res.label}`) }}</span>
          <span class="rank-score-label">{{ res.score }}</span>
        </div>
      </div>
      <div class="press-key" v-show="showIndexes.includes(-2)">{{ $t("rank.press") }}</div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/rank.css";
</style>