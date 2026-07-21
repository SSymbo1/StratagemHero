<script setup lang="ts">
import type { Ref } from 'vue'
import type { ResultItem } from '@/types/result.ts'
import { onMounted, ref } from 'vue'
import ResultRevealList from '@/components/common/ResultRevealList.vue'
import GamePage from '@/components/layout/GamePage.vue'
import { Audio } from '@/constants/audio.ts'
import { Component } from '@/constants/game.ts'
import { GameLabelSetting } from '@/constants/labels.ts'
import { useAudio } from '@/hooks/use-audio.ts'
import { useGameInput } from '@/hooks/use-game-input.ts'
import { useResultReveal } from '@/hooks/use-result-reveal.ts'
import router from '@/router'
import { useScore } from '@/store/base/score.ts'

/**
 * 创建排行榜展示数据，结构与回合结算保持一致。
 */
function createRankResult(): ResultItem[] {
  return GameLabelSetting.rankLabel.map(item => ({ ...item }))
}

const rankResult: Ref<ResultItem[]> = ref(createRankResult())
const { playEffect } = useAudio()
const { showIndexes, startReveal } = useResultReveal(Component.LABEL_SHOW)

function backHome() {
  router.replace('/')
}

const { targetRef, startListening } = useGameInput(backHome)

function calculateRoundData() {
  // 先刷新历史分数，再把本局与历史结果写入展示列表。
  const scoreStore = useScore()
  const nextHistoryScore = Math.max(scoreStore.score.lastScore, scoreStore.score.historyScore)
  const nextHistoryRound = Math.max(scoreStore.score.lastRound, scoreStore.score.historyRound)

  scoreStore.updateHistory(nextHistoryScore, nextHistoryRound)
  rankResult.value[0].score = scoreStore.score.historyScore
  rankResult.value[1].score = scoreStore.score.historyRound
  rankResult.value[2].score = scoreStore.score.lastScore
  rankResult.value[3].score = scoreStore.score.lastRound

  startReveal(rankResult.value.length, {
    completeMarker: -2,
    onFirstReveal: () => playEffect(Audio.GAME_OVER),
    onComplete: startListening,
  })
}

onMounted(() => {
  calculateRoundData()
})
</script>

<template>
  <GamePage>
    <div ref="targetRef" class="flex h-full w-full flex-col items-center justify-center">
      <ResultRevealList
        :items="rankResult"
        :show-indexes="showIndexes"
        label-prefix="resultLabel"
      />
      <div
        v-show="showIndexes.includes(-2)"
        class="font-game text-3xl font-bold tracking-[0.2rem] text-game-gold md:text-5xl [text-shadow:0_0_0.2rem_yellow]"
      >
        {{ $t("rank.press") }}
      </div>
    </div>
  </GamePage>
</template>
