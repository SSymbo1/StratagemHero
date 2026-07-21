import DisableDevtool from 'disable-devtool'
import { MediaPlayer } from '@/utils/audio-player.ts'

export function initApplicationMode() {
  if (import.meta.env.MODE === 'production') {
    DisableDevtool()
  }
}

export function initApplicationLayout() {
  return /Android|webOS|iPhone|iPad|Opera Mini/i.test(navigator.userAgent)
}

export function operationSoundCache(): Promise<boolean> {
  return new MediaPlayer(false, 0).audioFilePreload()
}
