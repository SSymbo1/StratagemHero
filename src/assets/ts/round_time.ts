import {Stratagem} from "@/assets/ts/round_stratagems.ts";
import {GAME} from "@/assets/ts/global.ts";

/**
 * @param time 本回合时间
 * @param plus 本回合校验通过加时
 */
export interface RoundTime {
    time: number,
    plus: number
}

/**
 * 根据每回合战略配备和回合数计算本回合总时间和加时时间
 * @param stratagems 战略配备数组
 * @param round 回合数
 */
export const roundTimeCalculator = (stratagems: Array<Stratagem>, round: number): RoundTime => {
    if (round < GAME.DIFFICULT_ROUND) {
        return {
            time: GAME.TIME,
            plus: GAME.PER_TIME
        }
    } else {
        let lengthArray: Array<number> = []
        stratagems.forEach(stratagem => {
            lengthArray.push(stratagem.operation.length)
        })
        let roundTime = lengthArray.filter(length => length >= 7).length * 0.3 + GAME.TIME
        let plusTime = 1 + Math.random() * 0.5
        if (lengthArray.filter(length => length >= 6).length >= lengthArray.length / 3) {
            plusTime = Math.random() * 0.4 + 0.8
        }
        return {
            time: Math.ceil(roundTime),
            plus: plusTime
        }
    }
}