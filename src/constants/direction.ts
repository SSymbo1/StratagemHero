/**
 * 方向枚举映射，保持输入解析和界面渲染使用同一套数值。
 */
export const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
  UN_EXIST: -1,
} as const

/**
 * 方向值字面量类型。
 */
export type DirectionValue = (typeof Direction)[keyof typeof Direction]
