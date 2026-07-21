import type { Stratagem } from '@/types/stratagem.ts'
import { Game } from '@/constants/game.ts'

/**
 * 单回合时间与加时计算结果。
 */
export interface RoundTime {
  time: number
  plus: number
}

/**
 * 按当前回合与战备长度计算本回合基础时间和加时。
 */
export function roundTimeCalculator(stratagems: Stratagem[], round: number): RoundTime {
  if (round < Game.DIFFICULT_ROUND) {
    return {
      time: Game.TIME,
      plus: Game.PER_TIME,
    }
  }

  const lengthArray = stratagems.map(stratagem => stratagem.operation.length)
  const roundTime = lengthArray.filter(length => length >= 7).length * 0.3 + Game.TIME
  let plusTime = 1 + Math.random() * 0.5

  if (lengthArray.filter(length => length >= 6).length >= lengthArray.length / 3) {
    plusTime = Math.random() * 0.4 + 0.8
  }

  return {
    time: Math.ceil(roundTime),
    plus: plusTime,
  }
}
