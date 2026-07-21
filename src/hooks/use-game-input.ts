import type { Ref } from 'vue'
import Hammer from 'hammerjs'
import { onUnmounted, ref } from 'vue'

type GameInputHandler = (event: KeyboardEvent | HammerInput) => void

export function useGameInput(handler: GameInputHandler) {
  const targetRef: Ref<HTMLElement | null> = ref(null)
  let hammerInstance: HammerManager | null = null
  let listening = false

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
