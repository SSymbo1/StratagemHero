<script setup lang="ts">
import {computed, CSSProperties, onMounted, onUnmounted, Ref, ref} from "vue";
import label from '@/assets/json/game_label.json'
import Timer from "@/components/component/Timer.vue";
import operation from '@/assets/json/operation.json';
import global from '@/assets/json/global.json'
import StratagemsLayer from "@/components/component/StratagemsLayer.vue";
import {randomStratagems, Stratagem} from '@/assets/ts/random_stratagems.ts'
import router from "@/router";
import ArrowLayer from "@/components/component/ArrowLayer.vue";
import {useScore} from "@/store/base/score.ts";

const round: Ref<number> = ref(global.round)
const score: Ref<number> = ref(global.score)
const time: Ref<number> = ref(global.time)
const perAddTime: Ref<number> = ref(global.perTime)
const isRoundStart: Ref<boolean> = ref(true)
const isRoundResult: Ref<boolean> = ref(false)
const perfectRound: Ref<boolean> = ref(true)
const timer: any = ref(null)
const stratagemsLayer: any = ref(null)
const stratagems: Ref<Array<Stratagem>> = ref([])
const localStratagemName: Ref<string> = ref('')
const localStratagemArrow: Ref<Array<number>> = ref([])
const inputOperation: Ref<Array<number>> = ref([])
const perfectScore: Ref<number> = ref(0)
const timeScore: Ref<number> = ref(0)
const roundStratagemsCount: Ref<number> = ref(0)
const roundScore: Ref<number> = ref(0)
const roundResult: Ref<Array<RoundResult>> = ref(label.roundLabel)
const currentIndex: Ref<number> = ref(-1)
const showIndexes: Ref<Array<number>> = ref([])
const intervalId: any = ref(null)
const labelColor: Ref<string> = ref(global.ampleTimeColor)
const remainTime: Ref<boolean> = ref(true)

interface RoundResult {
  label: string
  score: number
}

const readyForRoundBegin = () => {
  perfectRound.value = true
  isRoundResult.value = false
  isRoundStart.value = true
  round.value++
  if (round.value >= global.difficultRound) {
    time.value = global.difficultTime
    perAddTime.value = global.difficultPerTime
  } else {
    time.value = global.time
  }
  stratagems.value = randomStratagems(round.value)
  roundStratagemsCount.value = stratagems.value.length
  inputOperation.value = []
  localStratagemName.value = stratagems.value[0].name
  localStratagemArrow.value = stratagems.value[0].operation
  setTimeout(() => {
    window.addEventListener('keydown', checkInput)
    isRoundStart.value = false
  }, global.ready)
}

const timeUp = () => {
  let useScoreStore = useScore()
  useScoreStore.setScore(null, null, score.value, round.value)
  router.push('/rank')
}

const roundStratagemsRunOut = () => {
  window.removeEventListener('keydown', checkInput)
  let remainTime: number = timer.value.getRemainTime()
  if (round.value <= global.difficultRound && perfectRound.value) {
    perfectScore.value = global.basePerfectScore
  } else if (round.value > global.difficultRound && perfectRound.value) {
    perfectScore.value = global.basePerfectScore + round.value
  } else if (!perfectRound.value) {
    perfectScore.value = 0
  }
  if (round.value <= global.difficultRound) {
    roundScore.value = global.baseRoundScore
  } else {
    roundScore.value = global.baseRoundDifficultScore
  }
  timeScore.value = remainTime * roundStratagemsCount.value
  score.value = score.value + perfectScore.value + timeScore.value + roundScore.value
  roundResult.value[0].score = roundScore.value
  roundResult.value[1].score = timeScore.value
  roundResult.value[2].score = perfectScore.value
  roundResult.value[3].score = score.value
  isRoundResult.value = true
  currentIndex.value = -1
  showIndexes.value = []
  intervalId.value = setInterval(() => {
    if (currentIndex.value < roundResult.value.length - 1) {
      currentIndex.value++
      showIndexes.value.push(currentIndex.value)
    } else {
      clearInterval(intervalId.value)
    }
  }, global.roundResultLabelWait)
  setTimeout(() => {
    readyForRoundBegin()
  }, global.roundResultWindowWait)
}

const checkInput = (event: KeyboardEvent) => {
  if (operation.includes(event.key)) {
    const errorSound = new Audio('/StratagemHero/audio/key_press.mp3')
    if (event.key == 'ArrowUp' || event.key == 'W' || event.key == 'w') {
      inputOperation.value.push(1)
    } else if (event.key == 'ArrowDown' || event.key == 'S' || event.key == 's') {
      inputOperation.value.push(2)
    } else if (event.key == 'ArrowLeft' || event.key == 'A' || event.key == 'a') {
      inputOperation.value.push(3)
    } else if (event.key == 'ArrowRight' || event.key == 'D' || event.key == 'd') {
      inputOperation.value.push(4)
    }
    errorSound.play()
  }
}

const currentStratagem = (stratagem: Stratagem) => {
  localStratagemName.value = stratagem.name
  localStratagemArrow.value = stratagem.operation
}

const arrowCheckSuccess = () => {
  timer.value.addTime()
  stratagemsLayer.value.removeFirstStratagem()
  score.value += global.perScore
  inputOperation.value = []
}

const arrowCheckError = () => {
  inputOperation.value = []
  perfectRound.value = false
}

const timeNearlyRunOut = () => {
  labelColor.value = global.dangerTimeColor
  remainTime.value = false
  dynamicLabelColor.value
}

const ampleTime = () => {
  labelColor.value = global.ampleTimeColor
  remainTime.value = true
  dynamicLabelColor.value
}

const dynamicLabelColor = computed(() => {
  return {
    background: labelColor.value
  } as CSSProperties
})

onMounted(() => {
  readyForRoundBegin()
})
onUnmounted(() => {
  window.removeEventListener('keydown', checkInput)
  clearInterval(intervalId.value)
})
</script>

<template>
  <div class="game-container">
    <div class="top-line"></div>
    <div class="round-layer" v-if="isRoundStart && !isRoundResult">
      <div class="round-layer-title">{{ label.round.title }}</div>
      <div class="round-layer-label">
        <div class="round-layer-label-title">{{ label.round.subtitle }}</div>
        <div class="round-layer-label-index">{{ round }}</div>
      </div>
    </div>
    <div class="game-layer" v-if="!isRoundStart && !isRoundResult">
      <div class="game-side">
        <div class="game-side-label">{{ label.game.round }}</div>
        <div class="game-side-number">{{ round }}</div>
      </div>
      <div class="game-main">
        <div class="stratagems">
          <div class="stratagems-pointer">
            <StratagemsLayer
                :stratagems="stratagems"
                :ample-time="remainTime"
                @clear-up="roundStratagemsRunOut"
                @now-stratagem="currentStratagem"
                ref="stratagemsLayer">
            </StratagemsLayer>
          </div>
          <div class="stratagems-label" :style="dynamicLabelColor">
            <span>{{ localStratagemName }}</span>
          </div>
        </div>
        <div class="arrow-layer">
          <ArrowLayer
              :arrow="localStratagemArrow"
              :operation="inputOperation"
              @success="arrowCheckSuccess"
              @error="arrowCheckError">
          </ArrowLayer>
        </div>
        <Timer
            :time="time"
            :per-plus="perAddTime"
            @timeUp="timeUp"
            @remain-many="ampleTime"
            @nearly-over="timeNearlyRunOut"
            ref="timer">
        </Timer>
      </div>
      <div class="game-side">
        <div class="game-side-number">{{ score }}</div>
        <div class="game-side-label">{{ label.game.score }}</div>
      </div>
    </div>
    <div class="round-result" v-if="!isRoundStart && isRoundResult">
      <div class="round-result-container">
        <div class="round-result-layer"
             v-for="(res,index) in roundResult"
             :key="index"
             v-show="showIndexes.includes(index)">
          <span class="result-item-label">{{ res.label }}</span>
          <span class="result-score-label">{{ res.score }}</span>
        </div>
      </div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<style scoped>
@import "@/assets/css/level.css";
</style>