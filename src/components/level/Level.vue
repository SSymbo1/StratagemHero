<script setup lang="ts">
import type { Howl } from 'howler'
import type { CSSProperties, Ref } from 'vue'
import type { Stratagem } from '@/assets/ts/round_stratagems.ts'
import Hammer from 'hammerjs'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Component, Game, TimerLayer } from '@/assets/ts/global.ts'
import { Audio, MediaPlayer } from '@/assets/ts/media_player.ts'
import { Operation } from '@/assets/ts/operation.ts'
import { randomStratagems } from '@/assets/ts/round_stratagems.ts'
import { roundTimeCalculator } from '@/assets/ts/round_time.ts'
import { GameLabelSetting } from '@/assets/ts/settings/game_label.ts'
import ArrowLayer from '@/components/component/ArrowLayer.vue'
import StratagemsLayer from '@/components/component/StratagemsLayer.vue'
import Timer from '@/components/component/Timer.vue'
import router from '@/router'
import { useScore } from '@/store/base/score.ts'

interface RoundResult {
  label: string
  score: number
}

function createRoundResult(): RoundResult[] {
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
const roundResult: Ref<RoundResult[]> = ref(createRoundResult())
const currentIndex: Ref<number> = ref(-1)
const showIndexes: Ref<number[]> = ref([])
const intervalId: Ref<ReturnType<typeof setInterval> | null> = ref(null)
const labelColor: Ref<string> = ref(TimerLayer.SAFE_TIME)
const remainTime: Ref<boolean> = ref(true)
const backgroundHowl: Ref<Howl | undefined> = ref(undefined)
const roundCompleteHowl: Ref<MediaPlayer | undefined> = ref(undefined)
const hammerArea: Ref<HTMLElement | null> = ref(null)
const hammerInstance: Ref<HammerManager | null> = ref(null)

const dynamicLabelColor = computed(() => {
  return {
    background: labelColor.value,
  } as CSSProperties
})

function checkInput(event: KeyboardEvent | HammerInput) {
  const operation = new Operation(event)

  if (operation.checkOPEffective()) {
    new MediaPlayer(false, 1).audioPlay(Audio.PRESS_KEY).play()
    inputOperation.value.push(operation.transformOP2Direction())
  }
}

function readyForRoundBegin() {
  new MediaPlayer(false, 0.5).audioPlay(Audio.GET_READY).play()
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
    if (hammerArea.value) {
      hammerInstance.value = new Hammer(hammerArea.value)
      hammerInstance.value.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
      hammerInstance.value.on('swipe', checkInput)
    }

    window.addEventListener('keydown', checkInput)
    isRoundStart.value = false

    if (backgroundHowl.value === undefined) {
      backgroundHowl.value = new MediaPlayer(true, 0.5).audioPlay(Audio.BACKGROUND)
      backgroundHowl.value.play()
    }
    else {
      backgroundHowl.value.play()
    }
  }, Component.READY_WAIT)
}

function timeUp() {
  backgroundHowl.value?.stop()

  const useScoreStore = useScore()
  useScoreStore.setScore(null, null, score.value, round.value)
  router.replace('/rank')
}

function roundStratagemsRunOut() {
  backgroundHowl.value?.stop()
  window.removeEventListener('keydown', checkInput)
  hammerInstance.value?.off('swipe', checkInput)

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
  currentIndex.value = -1
  showIndexes.value = []

  intervalId.value = setInterval(() => {
    if (currentIndex.value === -1) {
      if (roundCompleteHowl.value === undefined) {
        roundCompleteHowl.value = new MediaPlayer(false, 0.5)
      }
      roundCompleteHowl.value.roundCompleteMusic().play()
    }

    if (currentIndex.value < roundResult.value.length - 1) {
      currentIndex.value++
      showIndexes.value.push(currentIndex.value)
    }
    else if (intervalId.value) {
      clearInterval(intervalId.value)
    }
  }, Component.LABEL_SHOW)

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
  new MediaPlayer(false, 0.5).audioPlay(Audio.SUCCESS).play()
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
  readyForRoundBegin()
})

onUnmounted(() => {
  window.removeEventListener('keydown', checkInput)
  hammerInstance.value?.off('swipe', checkInput)

  if (intervalId.value) {
    clearInterval(intervalId.value)
  }

  backgroundHowl.value?.stop()
  roundCompleteHowl.value?.roundCompleteMusic().stop()
})
</script>

<template>
  <div
    ref="hammerArea"
    class="relative flex h-full w-full flex-col bg-black p-0 before:absolute before:inset-0 before:bg-[url('/public/icons/background/super_earth.png')] before:bg-[length:30%] before:bg-center before:bg-no-repeat before:opacity-10 before:grayscale before:content-['']"
  >
    <div
      v-if="isRoundStart && !isRoundResult"
      class="relative z-10 flex h-full flex-col items-center justify-center gap-[6vh] text-white"
    >
      <div class="font-game text-5xl font-bold md:text-7xl">
        {{ $t("round.title") }}
      </div>
      <div class="flex flex-col items-center gap-[1.5vh] font-bold">
        <div class="font-game text-2xl md:text-3xl">
          {{ $t("round.subtitle") }}
        </div>
        <div class="font-game text-2xl text-game-gold md:text-3xl">
          {{ round }}
        </div>
      </div>
    </div>

    <div
      v-if="!isRoundStart && !isRoundResult"
      class="relative z-10 flex h-full flex-row"
    >
      <div class="flex w-1/4 flex-col items-center pt-[4vh]">
        <div class="font-game text-2xl text-white md:text-4xl">
          {{ $t("game.round") }}
        </div>
        <div class="font-game text-3xl text-game-gold md:text-5xl">
          {{ round }}
        </div>
      </div>

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

      <div class="flex w-1/4 flex-col items-center pt-[4vh]">
        <div class="font-game text-3xl text-game-gold md:text-5xl">
          {{ score }}
        </div>
        <div class="font-game text-2xl text-white md:text-4xl">
          {{ $t("game.score") }}
        </div>
      </div>
    </div>

    <div
      v-if="!isRoundStart && isRoundResult"
      class="relative z-10 flex h-full flex-col items-center justify-center"
    >
      <div class="flex h-[50vh] flex-col items-center justify-start gap-[6vh]">
        <div
          v-for="(res, index) in roundResult"
          v-show="showIndexes.includes(index)"
          :key="index"
          class="grid grid-cols-2 gap-[29vw]"
        >
          <span class="font-game text-2xl font-bold text-white md:text-4xl [text-shadow:0_0_0.3rem_white]">
            {{ $t(`roundLabel.${res.label}`) }}
          </span>
          <span class="font-game text-2xl font-bold text-game-gold md:text-4xl [text-shadow:0_0_0.2rem_yellow]">
            {{ res.score }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
