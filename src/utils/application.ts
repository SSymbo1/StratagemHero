import DisableDevtool from 'disable-devtool'
import { MediaPlayer } from '@/utils/audio-player.ts'

/**
 * 生产环境下启用基础防调试能力。
 */
export function initApplicationMode() {
  if (import.meta.env.MODE === 'production') {
    DisableDevtool()
  }
}

/**
 * 根据设备类型判断是否需要使用移动端布局。
 */
export function initApplicationLayout() {
  return /Android|webOS|iPhone|iPad|Opera Mini/i.test(navigator.userAgent)
}

/**
 * 预加载常用操作音效，供首页与关卡页复用。
 */
export function operationSoundCache(): Promise<boolean> {
  return new MediaPlayer(false, 0).audioFilePreload()
}
