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
