import type { Stratagem } from '@/types/stratagem.ts'
import { Game } from '@/constants/game.ts'
import { StratagemSetting } from '@/constants/stratagems.ts'

export function randomStratagems(round: number): Stratagem[] {
  let baseRoundStratagems = Game.STRATAGEMS

  if (round > Game.DIFFICULT_ROUND) {
    baseRoundStratagems += round
  }

  const origin: Stratagem[] = [...StratagemSetting]

  for (let i = origin.length - 1; i >= 0; i--) {
    const index = Math.floor(Math.random() * (i + 1))
    ;[origin[i], origin[index]] = [origin[index], origin[i]]
  }

  return origin.slice(0, baseRoundStratagems)
}
