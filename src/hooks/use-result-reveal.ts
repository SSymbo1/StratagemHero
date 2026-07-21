import type { Ref } from 'vue'
import { ref } from 'vue'

interface RevealOptions {
  completeMarker?: number
  onFirstReveal?: () => void
  onComplete?: () => void
}

export function useResultReveal(interval: number) {
  const currentIndex: Ref<number> = ref(-1)
  const showIndexes: Ref<number[]> = ref([])
  const intervalId: Ref<ReturnType<typeof setInterval> | null> = ref(null)

  function stopReveal() {
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }

  function resetReveal() {
    stopReveal()
    currentIndex.value = -1
    showIndexes.value = []
  }

  function startReveal(total: number, options: RevealOptions = {}) {
    resetReveal()

    intervalId.value = setInterval(() => {
      if (currentIndex.value === -1) {
        options.onFirstReveal?.()
      }

      if (currentIndex.value < total - 1) {
        currentIndex.value++
        showIndexes.value.push(currentIndex.value)
        return
      }

      if (options.completeMarker !== undefined) {
        showIndexes.value.push(options.completeMarker)
      }
      stopReveal()
      options.onComplete?.()
    }, interval)
  }

  return {
    currentIndex,
    showIndexes,
    resetReveal,
    startReveal,
    stopReveal,
  }
}
