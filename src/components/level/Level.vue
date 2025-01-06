<script setup lang="ts">
import {computed, CSSProperties, onMounted, onUnmounted, Ref, ref} from "vue";
import label from "@/assets/json/game_label.json";
import Timer from "@/components/component/Timer.vue";
import StratagemsLayer from "@/components/component/StratagemsLayer.vue";
import {randomStratagems, Stratagem} from "@/assets/ts/round_stratagems.ts";
import router from "@/router";
import ArrowLayer from "@/components/component/ArrowLayer.vue";
import {useScore} from "@/store/base/score.ts";
import {roundTimeCalculator} from "@/assets/ts/round_time.ts";
import {Component, Game, TimerLayer} from "@/assets/ts/global.ts";
import {Audio, MediaPlayer} from "@/assets/ts/media_player.ts";
import Hammer from "hammerjs";
import {Operation} from "@/assets/ts/operation.ts";

const round: Ref<number> = ref(Game.ROUND)
const score: Ref<number> = ref(Game.SCORE)
const time: Ref<number> = ref(Game.TIME)
const perAddTime: Ref<number> = ref(Game.PER_TIME)
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
const labelColor: Ref<string> = ref(Timer.SAFE_TIME)
const remainTime: Ref<boolean> = ref(true)
const backgroundHowl: Ref<Howl | undefined> = ref(undefined)
const roundCompleteHowl: Ref<MediaPlayer | undefined> = ref(undefined)
const hammerArea: Ref<HTMLElement | null> = ref(null)
const hammerInstance: Ref<HammerManager | null> = ref(null)

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
  new MediaPlayer(false, 0.5).audioPlay(Audio.GET_READY).play()
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
    if (hammerArea.value) {
      hammerInstance.value = new Hammer(hammerArea.value)
      hammerInstance.value.get("swipe").set({direction: Hammer.DIRECTION_ALL});
      hammerInstance.value.on("swipe", checkInput)
    }
    window.addEventListener("keydown", checkInput)
    isRoundStart.value = false
    if (backgroundHowl.value === undefined) {
      backgroundHowl.value = new MediaPlayer(true, 0.5).audioPlay(Audio.BACKGROUND)
      backgroundHowl.value.play()
    } else {
      backgroundHowl.value.play()
    }
  }, Component.READY_WAIT)
}

/**
 * 回合因倒计时终止而结束
 */
const timeUp = () => {
  if (backgroundHowl.value !== undefined) {
    backgroundHowl.value.stop()
  }
  let useScoreStore = useScore()
  useScoreStore.setScore(null, null, score.value, round.value)
  router.replace("/rank")
}

/**
 * 回合胜利进行数据处理
 */
const roundStratagemsRunOut = () => {
  if (backgroundHowl.value !== undefined) {
    backgroundHowl.value.stop()
  }
  window.removeEventListener("keydown", checkInput)
  hammerInstance.value?.off("swipe", checkInput)
  let remainTime: number = timer.value.getRemainTime()
  if (round.value <= Game.DIFFICULT_ROUND && perfectRound.value) {
    perfectScore.value = Game.PERFECT_SCORE
  } else if (round.value > Game.DIFFICULT_ROUND && perfectRound.value) {
    perfectScore.value = Game.PERFECT_SCORE + round.value * 2
  } else if (!perfectRound.value) {
    perfectScore.value = 0
  }
  if (round.value <= Game.DIFFICULT_ROUND) {
    roundScore.value = Game.ROUND_SCORE
  } else {
    roundScore.value = Game.DIFFICULT_SCORE
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
    if (currentIndex.value === -1) {
      if (roundCompleteHowl.value === undefined) {
        roundCompleteHowl.value = new MediaPlayer(false, 0.5)
        roundCompleteHowl.value.roundCompleteMusic().play()
      } else {
        roundCompleteHowl.value.roundCompleteMusic().play()
      }
    }
    if (currentIndex.value < roundResult.value.length - 1) {
      currentIndex.value++
      showIndexes.value.push(currentIndex.value)
    } else {
      clearInterval(intervalId.value)
    }
  }, Component.LABEL_SHOW)
  setTimeout(() => {
    readyForRoundBegin()
  }, Component.ROUND_RESULT_WAIT)
}

/**
 * 键盘输入检查
 * @param event 键盘事件或触控事件
 */
const checkInput = (event: KeyboardEvent | HammerInput) => {
  const operation = new Operation(event)
  if (operation.checkOPEffective()) {
    new MediaPlayer(false, 1).audioPlay(Audio.PRESS_KEY).play()
    inputOperation.value.push(operation.transformOP2Direction())
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
  score.value += Game.PER_SCORE
  inputOperation.value = []
  new MediaPlayer(false, 0.5).audioPlay(Audio.SUCCESS).play()
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
  labelColor.value = TimerLayer.DANGER_TIME
  remainTime.value = false
  dynamicLabelColor.value
}

/**
 * 回合时间充裕
 */
const ampleTime = () => {
  labelColor.value = TimerLayer.SAFE_TIME
  remainTime.value = true
  dynamicLabelColor.value
}

/**
 * 动态渲染label颜色
 * @return {CSSProperties} label的css样式表属性
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
  hammerInstance.value?.off("swipe", checkInput)
  clearInterval(intervalId.value)
  backgroundHowl.value?.stop()
  roundCompleteHowl.value?.roundCompleteMusic().stop()
})
</script>

<template>
  <div class="game-container" ref="hammerArea">
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
  </div>
</template>

<style scoped>
@import "@/assets/css/level.css";
</style>