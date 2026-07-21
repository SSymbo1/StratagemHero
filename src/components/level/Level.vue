<script setup lang="ts">
import type { CSSProperties, Ref } from 'vue'
import type { ResultItem } from '@/types/result.ts'
import type { Stratagem } from '@/types/stratagem.ts'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GameTitle from '@/components/common/GameTitle.vue'
import ResultRevealList from '@/components/common/ResultRevealList.vue'
import ArrowLayer from '@/components/component/ArrowLayer.vue'
import StratagemsLayer from '@/components/component/StratagemsLayer.vue'
import Timer from '@/components/component/Timer.vue'
import GamePage from '@/components/layout/GamePage.vue'
import ScorePanel from '@/components/level/ScorePanel.vue'
import { Audio } from '@/constants/audio.ts'
import { Component, Game, TimerLayer } from '@/constants/game.ts'
import { GameLabelSetting } from '@/constants/labels.ts'
import { useAudio } from '@/hooks/use-audio.ts'
import { useGameInput } from '@/hooks/use-game-input.ts'
import { useResultReveal } from '@/hooks/use-result-reveal.ts'
import router from '@/router'
import { useScore } from '@/store/base/score.ts'
import { Operation } from '@/utils/operation-parser.ts'
import { roundTimeCalculator } from '@/utils/round-time.ts'
import { randomStratagems } from '@/utils/stratagem-random.ts'

function createRoundResult(): ResultItem[] {
  return GameLabelSetting.roundLabel.map(item => ({ ...item }))
}

const round: Ref<number> = ref(Game.ROUND)
const score: Ref<number> = ref(Game.SCORE)
const time: Ref<number> = ref(Game.TIME)
const perAddTime: Ref<number> = ref(Game.PER_TIME)
const isRoundStart: Ref<boolean> = ref(true)
const isRoundResult: Ref<boolean> = ref(false)
const perfectRound: Ref<boolean> = ref(true)
const timer: Ref<InstanceType<typeof Timer> | null> = ref(null)
const stratagemsLayer: Ref<InstanceType<typeof StratagemsLayer> | null> = ref(null)
const stratagems: Ref<Stratagem[]> = ref([])
const localStratagemName: Ref<string> = ref('')
const localStratagemArrow: Ref<readonly number[]> = ref([])
const inputOperation: Ref<number[]> = ref([])
const perfectScore: Ref<number> = ref(0)
const timeScore: Ref<number> = ref(0)
const roundStratagemsCount: Ref<number> = ref(0)
const roundScore: Ref<number> = ref(0)
const roundResult: Ref<ResultItem[]> = ref(createRoundResult())
const labelColor: Ref<string> = ref(TimerLayer.SAFE_TIME)
const remainTime: Ref<boolean> = ref(true)

const {
  playEffect,
  playBackground,
  stopBackground,
  playRoundComplete,
  stopRoundComplete,
} = useAudio()
const { showIndexes, resetReveal, startReveal, stopReveal } = useResultReveal(Component.LABEL_SHOW)
const { targetRef, startListening, stopListening } = useGameInput(checkInput)

const dynamicLabelColor = computed(() => {
  return {
    background: labelColor.value,
  } as CSSProperties
})

function checkInput(event: KeyboardEvent | HammerInput) {
  const operation = new Operation(event)

  if (operation.checkOPEffective()) {
    playEffect(Audio.PRESS_KEY, 1)
    inputOperation.value.push(operation.transformOP2Direction())
  }
}

function readyForRoundBegin() {
  playEffect(Audio.GET_READY)
  perfectRound.value = true
  isRoundResult.value = false
  isRoundStart.value = true
  round.value++
  stratagems.value = randomStratagems(round.value)

  const roundTime = roundTimeCalculator(stratagems.value, round.value)
  time.value = roundTime.time
  perAddTime.value = roundTime.plus
  roundStratagemsCount.value = stratagems.value.length
  inputOperation.value = []
  localStratagemName.value = stratagems.value[0].name
  localStratagemArrow.value = stratagems.value[0].operation

  setTimeout(() => {
    startListening()
    isRoundStart.value = false
    playBackground()
  }, Component.READY_WAIT)
}

function timeUp() {
  stopBackground()

  const useScoreStore = useScore()
  useScoreStore.setLastResult(score.value, round.value)
  router.replace('/rank')
}

function roundStratagemsRunOut() {
  stopBackground()
  stopListening()

  const remainTimeValue = timer.value?.getRemainTime() ?? 0

  if (round.value <= Game.DIFFICULT_ROUND && perfectRound.value) {
    perfectScore.value = Game.PERFECT_SCORE
  }
  else if (round.value > Game.DIFFICULT_ROUND && perfectRound.value) {
    perfectScore.value = Game.PERFECT_SCORE + round.value * 2
  }
  else {
    perfectScore.value = 0
  }

  roundScore.value = round.value <= Game.DIFFICULT_ROUND
    ? Game.ROUND_SCORE
    : Game.DIFFICULT_SCORE
  timeScore.value = remainTimeValue * roundStratagemsCount.value
  score.value += perfectScore.value + timeScore.value + roundScore.value

  roundResult.value[0].score = roundScore.value
  roundResult.value[1].score = timeScore.value
  roundResult.value[2].score = perfectScore.value
  roundResult.value[3].score = score.value
  isRoundResult.value = true

  startReveal(roundResult.value.length, {
    onFirstReveal: playRoundComplete,
  })

  setTimeout(() => {
    readyForRoundBegin()
  }, Component.ROUND_RESULT_WAIT)
}

function currentStratagem(stratagem: Stratagem) {
  localStratagemName.value = stratagem.name
  localStratagemArrow.value = stratagem.operation
}

function arrowCheckSuccess() {
  timer.value?.addTime()
  stratagemsLayer.value?.removeFirstStratagem()
  score.value += Game.PER_SCORE
  inputOperation.value = []
  playEffect(Audio.SUCCESS)
}

function arrowCheckError() {
  inputOperation.value = []
  perfectRound.value = false
}

function deliverCommandPercent(percent: number) {
  stratagemsLayer.value?.stratagemsLayerFilter(percent)
}

function timeNearlyRunOut() {
  labelColor.value = TimerLayer.DANGER_TIME
  remainTime.value = false
}

function ampleTime() {
  labelColor.value = TimerLayer.SAFE_TIME
  remainTime.value = true
}

onMounted(() => {
  resetReveal()
  readyForRoundBegin()
})

onUnmounted(() => {
  stopListening()
  stopReveal()
  stopBackground()
  stopRoundComplete()
})
</script>

<template>
  <GamePage>
    <div ref="targetRef" class="h-full w-full">
      <GameTitle
        v-if="isRoundStart && !isRoundResult"
        variant="ready"
        :title="$t('round.title')"
        :subtitle="$t('round.subtitle')"
        :meta="round"
      />

      <div
        v-if="!isRoundStart && !isRoundResult"
        class="flex h-full flex-row"
      >
        <ScorePanel :label="$t('game.round')" :value="round" />

        <div class="flex w-1/2 flex-col items-center justify-center gap-[3vh]">
          <div class="flex h-[27vh] w-full flex-col gap-[3vh] justify-self-center">
            <div class="m-0 flex h-[22vh] w-full flex-row justify-start gap-0 p-0">
              <StratagemsLayer
                ref="stratagemsLayer"
                :stratagems="stratagems"
                :ample-time="remainTime"
                @clear-up="roundStratagemsRunOut"
                @now-stratagem="currentStratagem"
              />
            </div>
            <div
              class="font-game flex h-[11vh] w-full flex-col items-center justify-center text-2xl leading-[6.5vh] md:text-4xl"
              :style="dynamicLabelColor"
            >
              <span>{{ $t(`stratagems.${localStratagemName}`) }}</span>
            </div>
          </div>

          <div class="mt-[1.1vh] h-[13vh] w-full gap-0 p-0">
            <ArrowLayer
              :arrow="localStratagemArrow"
              :operation="inputOperation"
              @percent="deliverCommandPercent"
              @success="arrowCheckSuccess"
              @error="arrowCheckError"
            />
          </div>

          <Timer
            ref="timer"
            :time="time"
            :per-plus="perAddTime"
            @time-up="timeUp"
            @remain-many="ampleTime"
            @nearly-over="timeNearlyRunOut"
          />
        </div>

        <ScorePanel :label="$t('game.score')" :value="score" value-first />
      </div>

      <div
        v-if="!isRoundStart && isRoundResult"
        class="flex h-full flex-col items-center justify-center"
      >
        <ResultRevealList
          :items="roundResult"
          :show-indexes="showIndexes"
          label-prefix="roundLabel"
        />
      </div>
    </div>
  </GamePage>
</template>
