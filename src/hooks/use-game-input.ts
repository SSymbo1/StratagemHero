import type { Ref } from 'vue'
import Hammer from 'hammerjs'
import { onUnmounted, ref } from 'vue'

type GameInputHandler = (event: KeyboardEvent | HammerInput) => void

/**
 * 统一监听键盘和滑动输入，并在卸载时自动清理。
 */
export function useGameInput(handler: GameInputHandler) {
  const targetRef: Ref<HTMLElement | null> = ref(null)
  let hammerInstance: HammerManager | null = null
  let listening = false

  /**
   * 开始绑定输入事件，重复调用时直接忽略。
   */
  function startListening() {
    if (listening) {
      return
    }

    if (targetRef.value) {
      hammerInstance = new Hammer(targetRef.value)
      hammerInstance.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
      hammerInstance.on('swipe', handler)
    }

    window.addEventListener('keydown', handler)
    listening = true
  }

  /**
   * 停止绑定输入事件，释放 Hammer 实例。
   */
  function stopListening() {
    if (!listening) {
      return
    }

    window.removeEventListener('keydown', handler)
    hammerInstance?.off('swipe', handler)
    hammerInstance?.destroy()
    hammerInstance = null
    listening = false
  }

  onUnmounted(() => {
    stopListening()
  })

  return {
    targetRef,
    startListening,
    stopListening,
  }
}
