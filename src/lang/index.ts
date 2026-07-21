import { createI18n } from 'vue-i18n'

import en from '@/lang/locales/en.ts'
import zh from '@/lang/locales/zh.ts'

/**
 * 根据浏览器语言选择默认界面语言。
 */
const language = navigator.language !== 'zh-CN' ? 'en-US' : 'zh-CN'

/**
 * 全局国际化实例。
 */
const i18n = createI18n({
  locale: language,
  globalInjection: true,
  legacy: false,
  messages: {
    'zh-CN': zh,
    'en-US': en,
  },
})

export default i18n
