import type { Stratagem } from '@/types/stratagem.ts'
import { Game } from '@/constants/game.ts'
import { StratagemSetting } from '@/constants/stratagems.ts'

/**
 * 根据回合数打乱并抽取当轮战备列表。
 */
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
