import type { DirectionValue } from '@/constants/direction.ts'
import { Direction } from '@/constants/direction.ts'
import { OperationSetting } from '@/constants/operation.ts'

/**
 * 判断数组中是否包含指定值，并保留类型信息。
 */
function includesValue<T>(values: readonly T[], value: unknown): value is T {
  return values.includes(value as T)
}

/**
 * 将键盘或滑动事件转换为游戏方向，并校验输入是否有效。
 */
export class Operation {
  private readonly type: KeyboardEvent | HammerInput

  private readonly keyboardOp: string[]

  private readonly swipeOp: number[]

  constructor(type: KeyboardEvent | HammerInput) {
    this.type = type
    this.keyboardOp = Object.values(OperationSetting.keyboard).flat()
    this.swipeOp = Object.values(OperationSetting.swipe)
  }

  /**
   * 判断当前输入是否属于有效操作。
   */
  checkOPEffective = (): boolean => {
    return (this.type instanceof KeyboardEvent && this.keyboardOp.includes(this.type.key))
      || ('direction' in this.type && this.swipeOp.includes(this.type.direction))
  }

  /**
   * 将输入转换为内部方向值。
   */
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
