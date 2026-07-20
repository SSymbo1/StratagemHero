import type { Stratagem } from '@/assets/ts/round_stratagems.ts'
import { Game } from '@/assets/ts/global.ts'

export interface RoundTime {
  time: number
  plus: number
}

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
