import type { AudioValue } from '@/constants/audio.ts'
import { Howl } from 'howler'
import { Audio } from '@/constants/audio.ts'

/**
 * 基于 Howler 的音频封装，负责预加载、播放与回合完成轮播。
 */
export class MediaPlayer {
  private readonly loop: boolean

  private readonly volume: number

  private completeIndex: number

  constructor(loop: boolean, volume: number) {
    this.loop = loop
    this.volume = volume
    this.completeIndex = 0
  }

  /**
   * 预加载全部音频资源，避免首播卡顿。
   */
  audioFilePreload = (): Promise<boolean> => {
    return new Promise((resolve) => {
      for (const audio of Object.values(Audio)) {
        this.audioPlay(audio).play()
      }
      resolve(true)
    })
  }

  /**
   * 创建指定音频的播放实例。
   */
  audioPlay = (audio: AudioValue): Howl => {
    return new Howl({
      src: [audio],
      loop: this.loop,
      volume: this.volume,
    })
  }

  /**
   * 按顺序轮换回合完成音效。
   */
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
