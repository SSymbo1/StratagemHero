import type { DirectionValue } from '@/constants/direction.ts'

export interface Stratagem {
  readonly name: string
  readonly icon: string
  readonly operation: readonly DirectionValue[]
}
