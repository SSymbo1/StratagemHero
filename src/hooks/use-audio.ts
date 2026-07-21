import type { Howl } from 'howler'
import type { AudioValue } from '@/constants/audio.ts'
import { ref } from 'vue'
import { Audio } from '@/constants/audio.ts'
import { MediaPlayer } from '@/utils/audio-player.ts'

export function useAudio() {
  const backgroundHowl = ref<Howl>()
  const roundCompleteHowl = ref<Howl>()
  const roundCompletePlayer = ref<MediaPlayer>()

  function preloadAudio(): Promise<boolean> {
    return new MediaPlayer(false, 0).audioFilePreload()
  }

  function playEffect(audio: AudioValue, volume = 0.5) {
    new MediaPlayer(false, volume).audioPlay(audio).play()
  }

  function playBackground() {
    if (!backgroundHowl.value) {
      backgroundHowl.value = new MediaPlayer(true, 0.5).audioPlay(Audio.BACKGROUND)
    }
    backgroundHowl.value.play()
  }

  function stopBackground() {
    backgroundHowl.value?.stop()
  }

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
