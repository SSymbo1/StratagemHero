import type { AudioValue } from '@/constants/audio.ts'
import { Howl } from 'howler'
import { Audio } from '@/constants/audio.ts'

export class MediaPlayer {
  private readonly loop: boolean

  private readonly volume: number

  private completeIndex: number

  constructor(loop: boolean, volume: number) {
    this.loop = loop
    this.volume = volume
    this.completeIndex = 0
  }

  audioFilePreload = (): Promise<boolean> => {
    return new Promise((resolve) => {
      for (const audio of Object.values(Audio)) {
        this.audioPlay(audio).play()
      }
      resolve(true)
    })
  }

  audioPlay = (audio: AudioValue): Howl => {
    return new Howl({
      src: [audio],
      loop: this.loop,
      volume: this.volume,
    })
  }

  roundCompleteMusic = (): Howl => {
    const roundCompleteMap: Record<number, AudioValue> = {
      0: Audio.COMPLETE_1,
      1: Audio.COMPLETE_2,
      2: Audio.COMPLETE_3,
      3: Audio.COMPLETE_4,
    }
    const completeMediaSrc = roundCompleteMap[this.completeIndex]
    this.completeIndex = this.completeIndex + 1 > 3 ? 0 : this.completeIndex + 1

    return new Howl({
      src: [completeMediaSrc],
      loop: this.loop,
      volume: this.volume,
    })
  }
}
