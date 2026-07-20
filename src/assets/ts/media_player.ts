import { Howl } from 'howler'

export const Audio = {
  PRESS_KEY: '/StratagemHero/audio/key_press.ogg',
  WRONG_KEY_PRESS: '/StratagemHero/audio/wrong_key_press.ogg',
  SUCCESS: '/StratagemHero/audio/success.ogg',
  GET_READY: '/StratagemHero/audio/get_ready.ogg',
  GAME_OVER: '/StratagemHero/audio/game_over.ogg',
  BACKGROUND: '/StratagemHero/audio/background.ogg',
  COMPLETE_1: '/StratagemHero/audio/round_complete_1.mp3',
  COMPLETE_2: '/StratagemHero/audio/round_complete_2.mp3',
  COMPLETE_3: '/StratagemHero/audio/round_complete_3.mp3',
  COMPLETE_4: '/StratagemHero/audio/round_complete_4.mp3',
} as const

export type AudioValue = (typeof Audio)[keyof typeof Audio]

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
