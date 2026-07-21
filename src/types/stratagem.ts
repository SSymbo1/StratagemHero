import type { DirectionValue } from '@/constants/direction.ts'

/**
 * 单个战备的结构定义。
 */
export interface Stratagem {
  readonly name: string
  readonly icon: string
  readonly operation: readonly DirectionValue[]
}
