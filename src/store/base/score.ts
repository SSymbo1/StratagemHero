import type { ScoreState } from '@/types/score.ts'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const SCORE_STORAGE_KEY = 'stratagem-hero-score'

const DEFAULT_SCORE: ScoreState = {
  historyScore: 0,
  historyRound: 0,
  lastScore: 0,
  lastRound: 0,
}

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

export const useScore = defineStore('score', () => {
  const score = ref<ScoreState>(loadScore())

  function persistScore() {
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(score.value))
  }

  function setLastResult(lastScore: number, lastRound: number) {
    score.value.lastScore = lastScore
    score.value.lastRound = lastRound
    persistScore()
  }

  function updateHistory(historyScore: number, historyRound: number) {
    score.value.historyScore = historyScore
    score.value.historyRound = historyRound
    persistScore()
  }

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
