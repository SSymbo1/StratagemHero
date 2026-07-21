export const Component = {
  READY_WAIT: 3000,
  ROUND_RESULT_WAIT: 6000,
  LABEL_SHOW: 1000,
} as const

export type ComponentValue = (typeof Component)[keyof typeof Component]

export const Game = {
  TIME: 15,
  PER_TIME: 2,
  SCORE: 0,
  ROUND: 0,
  STRATAGEMS: 5,
  PER_SCORE: 15,
  PERFECT_SCORE: 100,
  DIFFICULT_SCORE: 150,
  DIFFICULT_ROUND: 3,
  ROUND_SCORE: 100,
} as const

export type GameValue = (typeof Game)[keyof typeof Game]

export const TimerLayer = {
  SAFE_TIME: 'gold',
  DANGER_TIME: 'red',
} as const

export type TimerLayerValue = (typeof TimerLayer)[keyof typeof TimerLayer]
