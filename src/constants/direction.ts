export const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
  UN_EXIST: -1,
} as const

export type DirectionValue = (typeof Direction)[keyof typeof Direction]
