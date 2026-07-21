import type { ScoreState } from '@/types/score.ts'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const SCORE_STORAGE_KEY = 'stratagem-hero-score'

/**
 * 分数默认值，确保本地存储缺失或损坏时仍可恢复。
 */
const DEFAULT_SCORE: ScoreState = {
  historyScore: 0,
  historyRound: 0,
  lastScore: 0,
  lastRound: 0,
}

/**
 * 从本地存储加载分数数据。
 */
function loadScore(): ScoreState {
  const rawScore = localStorage.getItem(SCORE_STORAGE_KEY)

  if (!rawScore) {
    return { ...DEFAULT_SCORE }
  }

  try {
    return {
      ...DEFAULT_SCORE,
      ...JSON.parse(rawScore),
    }
  }
  catch {
    return { ...DEFAULT_SCORE }
  }
}

/**
 * 管理历史分数、最近一次成绩与本地持久化。
 */
export const useScore = defineStore('score', () => {
  const score = ref<ScoreState>(loadScore())

  /**
   * 持久化当前分数状态。
   */
  function persistScore() {
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(score.value))
  }

  /**
   * 记录本局结束时的分数与回合数。
   */
  function setLastResult(lastScore: number, lastRound: number) {
    score.value.lastScore = lastScore
    score.value.lastRound = lastRound
    persistScore()
  }

  /**
   * 更新历史最高分与最高回合。
   */
  function updateHistory(historyScore: number, historyRound: number) {
    score.value.historyScore = historyScore
    score.value.historyRound = historyRound
    persistScore()
  }

  /**
   * 清空最近一次结算结果。
   */
  function resetLastResult() {
    score.value.lastScore = 0
    score.value.lastRound = 0
    persistScore()
  }

  return {
    score,
    setLastResult,
    updateHistory,
    resetLastResult,
  }
})
