<script setup lang="ts">
import {computed, CSSProperties, onMounted, onUnmounted, Ref, ref} from "vue";
import label from "@/assets/json/game_label.json";
import Timer from "@/components/component/Timer.vue";
import operation from "@/assets/json/operation.json";
import StratagemsLayer from "@/components/component/StratagemsLayer.vue";
import {randomStratagems, Stratagem} from "@/assets/ts/round_stratagems.ts";
import router from "@/router";
import ArrowLayer from "@/components/component/ArrowLayer.vue";
import {useScore} from "@/store/base/score.ts";
import {roundTimeCalculator} from "@/assets/ts/round_time.ts";
import {COMPONENT, GAME, TIMER} from "@/assets/ts/global.ts";

const round: Ref<number> = ref(GAME.ROUND)
const score: Ref<number> = ref(GAME.SCORE)
const time: Ref<number> = ref(GAME.TIME)
const perAddTime: Ref<number> = ref(GAME.PER_TIME)
const isRoundStart: Ref<boolean> = ref(true)
const isRoundResult: Ref<boolean> = ref(false)
const perfectRound: Ref<boolean> = ref(true)
const timer: any = ref(null)
const stratagemsLayer: any = ref(null)
const stratagems: Ref<Array<Stratagem>> = ref([])
const localStratagemName: Ref<string> = ref("")
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
const labelColor: Ref<string> = ref(TIMER.SAFE_TIME)
const remainTime: Ref<boolean> = ref(true)

/**
 * @param label 标签
 * @param score 分数
 */
interface RoundResult {
  label: string
  score: number
}

/**
 * 每回合开始前进行数据处理
 */
const readyForRoundBegin = () => {
  perfectRound.value = true
  isRoundResult.value = false
  isRoundStart.value = true
  round.value++
  stratagems.value = randomStratagems(round.value)
  let roundTime = roundTimeCalculator(stratagems.value, round.value)
  time.value = roundTime.time
  perAddTime.value = roundTime.plus
  roundStratagemsCount.value = stratagems.value.length
  inputOperation.value = []
  localStratagemName.value = stratagems.value[0].name
  localStratagemArrow.value = stratagems.value[0].operation
  setTimeout(() => {
    window.addEventListener("keydown", checkInput)
    isRoundStart.value = false
  }, COMPONENT.READY_WAIT)
}

/**
 * 回合因倒计时终止而结束
 */
const timeUp = () => {
  let useScoreStore = useScore()
  useScoreStore.setScore(null, null, score.value, round.value)
  router.replace("/rank")
}

/**
 * 回合胜利进行数据处理
 */
const roundStratagemsRunOut = () => {
  window.removeEventListener("keydown", checkInput)
  let remainTime: number = timer.value.getRemainTime()
  if (round.value <= GAME.DIFFICULT_ROUND && perfectRound.value) {
    perfectScore.value = GAME.PERFECT_SCORE
  } else if (round.value > GAME.DIFFICULT_ROUND && perfectRound.value) {
    perfectScore.value = GAME.PERFECT_SCORE + round.value
  } else if (!perfectRound.value) {
    perfectScore.value = 0
  }
  if (round.value <= GAME.DIFFICULT_ROUND) {
    roundScore.value = GAME.ROUND_SCORE
  } else {
    roundScore.value = GAME.DIFFICULT_SCORE
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
  }, COMPONENT.LABEL_SHOW)
  setTimeout(() => {
    readyForRoundBegin()
  }, COMPONENT.ROUND_RESULT_WAIT)
}

/**
 * 键盘输入检查
 * @param event 键盘事件
 */
const checkInput = (event: KeyboardEvent) => {
  if (operation.includes(event.key)) {
    const errorSound = new Audio("/StratagemHero/audio/key_press.mp3")
    if (event.key === "ArrowUp" || event.key === "W" || event.key === "w") {
      inputOperation.value.push(1)
    } else if (event.key === "ArrowDown" || event.key === "S" || event.key === "s") {
      inputOperation.value.push(2)
    } else if (event.key === "ArrowLeft" || event.key === "A" || event.key === "a") {
      inputOperation.value.push(3)
    } else if (event.key === "ArrowRight" || event.key === "D" || event.key === "d") {
      inputOperation.value.push(4)
    }
    errorSound.play()
  }
}

/**
 * 获取当前战略配备
 * @param stratagem 战略配备
 */
const currentStratagem = (stratagem: Stratagem) => {
  localStratagemName.value = stratagem.name
  localStratagemArrow.value = stratagem.operation
}

/**
 * 战略配备指令输入成功
 */
const arrowCheckSuccess = () => {
  timer.value.addTime()
  stratagemsLayer.value.removeFirstStratagem()
  score.value += GAME.PER_SCORE
  inputOperation.value = []
}

/**
 * 战略配备指令输入错误
 */
const arrowCheckError = () => {
  inputOperation.value = []
  perfectRound.value = false
}

/**
 * 回合时间将要耗尽
 */
const timeNearlyRunOut = () => {
  labelColor.value = TIMER.DANGER_TIME
  remainTime.value = false
  dynamicLabelColor.value
}

/**
 * 回合时间充裕
 */
const ampleTime = () => {
  labelColor.value = TIMER.SAFE_TIME
  remainTime.value = true
  dynamicLabelColor.value
}

/**
 * 动态渲染label颜色
 * @return CSSProperties label的css样式表属性
 */
const dynamicLabelColor = computed(() => {
  return {
    background: labelColor.value
  } as CSSProperties
})

onMounted(() => {
  readyForRoundBegin()
})
onUnmounted(() => {
  window.removeEventListener("keydown", checkInput)
  clearInterval(intervalId.value)
})
</script>

<template>
  <div class="game-container">
    <div class="top-line"></div>
    <div class="round-layer" v-if="isRoundStart && !isRoundResult">
      <div class="round-layer-title">{{ $t("round.title") }}</div>
      <div class="round-layer-label">
        <div class="round-layer-label-title">{{ $t("round.subtitle") }}</div>
        <div class="round-layer-label-index">{{ round }}</div>
      </div>
    </div>
    <div class="game-layer" v-if="!isRoundStart && !isRoundResult">
      <div class="game-side">
        <div class="game-side-label">{{ $t("game.round") }}</div>
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
            <span>{{ $t(`stratagems.${localStratagemName}`) }}</span>
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
        <div class="game-side-label">{{ $t("game.score") }}</div>
      </div>
    </div>
    <div class="round-result" v-if="!isRoundStart && isRoundResult">
      <div class="round-result-container">
        <div class="round-result-layer"
             v-for="(res,index) in roundResult"
             :key="index"
             v-show="showIndexes.includes(index)">
          <span class="result-item-label">{{ $t(`roundLabel.${res.label}`) }}</span>
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