import type { Ref } from 'vue'
import { ref } from 'vue'

/**
 * 逐条展示结果列表的参数配置。
 */
interface RevealOptions {
  completeMarker?: number
  onFirstReveal?: () => void
  onComplete?: () => void
}

/**
 * 按固定间隔逐项揭示结果，适合回合结算与排行榜。
 */
export function useResultReveal(interval: number) {
  const currentIndex: Ref<number> = ref(-1)
  const showIndexes: Ref<number[]> = ref([])
  const intervalId: Ref<ReturnType<typeof setInterval> | null> = ref(null)

  /**
   * 停止当前揭示任务。
   */
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

  /**
   * 按顺序显示结果项，并在完成后触发回调。
   */
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
