<script setup lang="ts">
import type { Ref } from 'vue'
import Hammer from 'hammerjs'
import { onMounted, onUnmounted, ref } from 'vue'
import { Component } from '@/assets/ts/global.ts'
import { Audio, MediaPlayer } from '@/assets/ts/media_player.ts'
import { GameLabelSetting } from '@/assets/ts/settings/game_label.ts'
import router from '@/router'
import { useScore } from '@/store/base/score.ts'

interface RankResult {
  label: string
  score: number
}

interface Score {
  historyScore: number
  historyRound: number
  lastScore: number
  lastRound: number
}

function createRankResult(): RankResult[] {
  return GameLabelSetting.rankLabel.map(item => ({ ...item }))
}

const hammerArea: Ref<HTMLElement | null> = ref(null)
const hammerInstance: Ref<HammerManager | null> = ref(null)
const rankResult: Ref<RankResult[]> = ref(createRankResult())
const currentIndex: Ref<number> = ref(-1)
const showIndexes: Ref<number[]> = ref([])
const intervalId: Ref<ReturnType<typeof setInterval> | null> = ref(null)
const score: Ref<Score> = ref({
  historyScore: 0,
  historyRound: 0,
  lastScore: 0,
  lastRound: 0,
})

function checkInput() {
  router.replace('/')
}

function calculateRoundData() {
  const useScoreStore = useScore()
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
    }
    else {
      showIndexes.value.push(-2)
      if (intervalId.value) {
        clearInterval(intervalId.value)
      }
      window.addEventListener('keydown', checkInput)
      if (hammerArea.value) {
        hammerInstance.value = new Hammer(hammerArea.value)
        hammerInstance.value.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
        hammerInstance.value.on('swipe', checkInput)
      }
    }
  }, Component.LABEL_SHOW)
}

onMounted(() => {
  calculateRoundData()
})

onUnmounted(() => {
  window.removeEventListener('keydown', checkInput)
  hammerInstance.value?.off('swipe', checkInput)

  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<template>
  <div
    ref="hammerArea"
    class="relative flex h-full w-full flex-col bg-black p-0 before:absolute before:inset-0 before:bg-[url('/public/icons/background/super_earth.png')] before:bg-[length:30%] before:bg-center before:bg-no-repeat before:opacity-10 before:grayscale before:content-['']"
  >
    <div class="relative z-10 flex h-full flex-col items-center justify-center">
      <div class="flex h-[50vh] flex-col items-center justify-start gap-[6vh]">
        <div
          v-for="(res, index) in rankResult"
          v-show="showIndexes.includes(index)"
          :key="index"
          class="grid grid-cols-2 gap-[29vw]"
        >
          <span class="font-game text-2xl font-bold text-white md:text-4xl [text-shadow:0_0_0.3rem_white]">
            {{ $t(`resultLabel.${res.label}`) }}
          </span>
          <span class="font-game text-2xl font-bold text-game-gold md:text-4xl [text-shadow:0_0_0.2rem_yellow]">
            {{ res.score }}
          </span>
        </div>
      </div>
      <div
        v-show="showIndexes.includes(-2)"
        class="font-game text-3xl font-bold tracking-[0.2rem] text-game-gold md:text-5xl [text-shadow:0_0_0.2rem_yellow]"
      >
        {{ $t("rank.press") }}
      </div>
    </div>
  </div>
</template>
