import type { Howl } from 'howler'
import type { AudioValue } from '@/constants/audio.ts'
import { ref } from 'vue'
import { Audio } from '@/constants/audio.ts'
import { MediaPlayer } from '@/utils/audio-player.ts'

/**
 * 统一封装背景音、特效音与回合结束音效。
 */
export function useAudio() {
  const backgroundHowl = ref<Howl>()
  const roundCompleteHowl = ref<Howl>()
  const roundCompletePlayer = ref<MediaPlayer>()

  /**
   * 预加载全部音频资源，降低首轮播放延迟。
   */
  function preloadAudio(): Promise<boolean> {
    return new MediaPlayer(false, 0).audioFilePreload()
  }

  /**
   * 播放一次性音效。
   */
  function playEffect(audio: AudioValue, volume = 0.5) {
    new MediaPlayer(false, volume).audioPlay(audio).play()
  }

  /**
   * 播放循环背景音乐。
   */
  function playBackground() {
    if (!backgroundHowl.value) {
      backgroundHowl.value = new MediaPlayer(true, 0.5).audioPlay(Audio.BACKGROUND)
    }
    backgroundHowl.value.play()
  }

  function stopBackground() {
    backgroundHowl.value?.stop()
  }

  /**
   * 播放回合完成音效，按顺序轮换素材。
   */
  function playRoundComplete() {
    if (!roundCompletePlayer.value) {
      roundCompletePlayer.value = new MediaPlayer(false, 0.5)
    }
    roundCompleteHowl.value = roundCompletePlayer.value.roundCompleteMusic()
    roundCompleteHowl.value.play()
  }

  function stopRoundComplete() {
    roundCompleteHowl.value?.stop()
  }

  return {
    preloadAudio,
    playEffect,
    playBackground,
    stopBackground,
    playRoundComplete,
    stopRoundComplete,
  }
}
