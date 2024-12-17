import stratagems from '@/assets/json/stratagems.json'

export interface Stratagem {
    name: string,
    icon: string,
    operation: Array<number>
}

export const randomStratagems = (round: number): Array<Stratagem> => {
    let baseRoundStratagems: number = 5
    if (round > 5) {
        baseRoundStratagems = baseRoundStratagems + round
        if (baseRoundStratagems > 30) {
            baseRoundStratagems = 30
        }
    }
    const origin: Array<Stratagem> = stratagems
    for (let i = origin.length - 1; i >= 0; i--) {
        const index = Math.floor(Math.random() * (i + 1));
        [origin[i], origin[index]] = [origin[index], origin[i]];
    }
    return origin.slice(0, baseRoundStratagems)
}