import { withPublicUrl } from '@/utils/public-url.ts'

/**
 * 游戏音频资源路径表，供预加载和播放逻辑统一引用。
 */
export const Audio = {
  PRESS_KEY: withPublicUrl('audio/key_press.ogg'),
  WRONG_KEY_PRESS: withPublicUrl('audio/wrong_key_press.ogg'),
  SUCCESS: withPublicUrl('audio/success.ogg'),
  GET_READY: withPublicUrl('audio/get_ready.ogg'),
  GAME_OVER: withPublicUrl('audio/game_over.ogg'),
  BACKGROUND: withPublicUrl('audio/background.ogg'),
  COMPLETE_1: withPublicUrl('audio/round_complete_1.mp3'),
  COMPLETE_2: withPublicUrl('audio/round_complete_2.mp3'),
  COMPLETE_3: withPublicUrl('audio/round_complete_3.mp3'),
  COMPLETE_4: withPublicUrl('audio/round_complete_4.mp3'),
} as const

/**
 * 音频资源路径字面量类型。
 */
export type AudioValue = (typeof Audio)[keyof typeof Audio]
