/**
 * 组件级等待与展示时长配置。
 */
export const Component = {
  READY_WAIT: 3000,
  ROUND_RESULT_WAIT: 6000,
  LABEL_SHOW: 1000,
} as const

/**
 * 组件时长配置字面量类型。
 */
export type ComponentValue = (typeof Component)[keyof typeof Component]

/**
 * 核心游戏数值配置。
 */
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

/**
 * 游戏配置字面量类型。
 */
export type GameValue = (typeof Game)[keyof typeof Game]

/**
 * 计时条颜色常量。
 */
export const TimerLayer = {
  SAFE_TIME: 'gold',
  DANGER_TIME: 'red',
} as const

/**
 * 计时条颜色字面量类型。
 */
export type TimerLayerValue = (typeof TimerLayer)[keyof typeof TimerLayer]
