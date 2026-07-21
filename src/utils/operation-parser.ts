import type { DirectionValue } from '@/constants/direction.ts'
import { Direction } from '@/constants/direction.ts'
import { OperationSetting } from '@/constants/operation.ts'

function includesValue<T>(values: readonly T[], value: unknown): value is T {
  return values.includes(value as T)
}

export class Operation {
  private readonly type: KeyboardEvent | HammerInput

  private readonly keyboardOp: string[]

  private readonly swipeOp: number[]

  constructor(type: KeyboardEvent | HammerInput) {
    this.type = type
    this.keyboardOp = Object.values(OperationSetting.keyboard).flat()
    this.swipeOp = Object.values(OperationSetting.swipe)
  }

  checkOPEffective = (): boolean => {
    return (this.type instanceof KeyboardEvent && this.keyboardOp.includes(this.type.key))
      || ('direction' in this.type && this.swipeOp.includes(this.type.direction))
  }

  transformOP2Direction = (): DirectionValue => {
    if (
      (this.type instanceof KeyboardEvent && includesValue(OperationSetting.keyboard.up, this.type.key))
      || ('direction' in this.type && this.type.direction === OperationSetting.swipe.up)
    ) {
      return Direction.UP
    }
    if (
      (this.type instanceof KeyboardEvent && includesValue(OperationSetting.keyboard.down, this.type.key))
      || ('direction' in this.type && this.type.direction === OperationSetting.swipe.down)
    ) {
      return Direction.DOWN
    }
    if (
      (this.type instanceof KeyboardEvent && includesValue(OperationSetting.keyboard.left, this.type.key))
      || ('direction' in this.type && this.type.direction === OperationSetting.swipe.left)
    ) {
      return Direction.LEFT
    }
    if (
      (this.type instanceof KeyboardEvent && includesValue(OperationSetting.keyboard.right, this.type.key))
      || ('direction' in this.type && this.type.direction === OperationSetting.swipe.right)
    ) {
      return Direction.RIGHT
    }
    return Direction.UN_EXIST
  }
}
