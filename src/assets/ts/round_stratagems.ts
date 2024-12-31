import stratagems from "@/assets/json/stratagems.json";
import {Game} from "@/assets/ts/global.ts";

/**
 * 战略配备
 * @param name 战略配备名称
 * @param icon 战略配备图标
 * @param operation 战略配备指令
 */
export interface Stratagem {
    name: string,
    icon: string,
    operation: Array<number>
}

/**
 * 根据回合数返回当前回合随机到的指定难度数量的战略配备数组
 * @param round 回合数
 * @return {Array<Stratagem>} 随机战略配备数组
 */
export const randomStratagems = (round: number): Array<Stratagem> => {
    let baseRoundStratagems: number = Game.STRATAGEMS
    if (round > Game.DIFFICULT_ROUND) {
        baseRoundStratagems = baseRoundStratagems + round
    }
    const origin: Array<Stratagem> = stratagems
    for (let i = origin.length - 1; i >= 0; i--) {
        const index = Math.floor(Math.random() * (i + 1));
        [origin[i], origin[index]] = [origin[index], origin[i]];
    }
    return origin.slice(0, baseRoundStratagems)
}