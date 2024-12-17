import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useScore = defineStore(
    'score',
    () => {
        const score = ref({
            historyScore: 0,
            historyRound: 0,
            lastScore: 0,
            lastRound: 0,
        })
        const setScore = (updateHScore: number | null,
                          updateHRound: number | null,
                          updateLScore: number | null,
                          updateLRound: number | null) => {
            if (updateHScore != null) {
                score.value.historyScore = updateHScore
            }
            if (updateHRound != null) {
                score.value.historyRound = updateHRound
            }
            if (updateLScore != null) {
                score.value.lastScore = updateLScore
            }
            if (updateLRound != null) {
                score.value.lastRound = updateLRound
            }
        }
        return {score, setScore}
    }, {
        persist: true
    }
)