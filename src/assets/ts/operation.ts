import operation from "@/assets/json/operation.json";

/**
 * @enum {number}
 * 箭头方向指令
 */
export enum Direction {
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4,
    UN_EXIST = -1
}

/**
 * 封装操作指令类
 * @desc 根据{event}的类型对键盘，触控操作事件封装
 */
export class Operation {
    private readonly type: KeyboardEvent | HammerInput
    private readonly keyboardOp: Array<string>
    private readonly swipeOp: Array<number>

    constructor(type: KeyboardEvent | HammerInput) {
        this.type = type
        this.keyboardOp = Object.values(operation.keyboard).flat()
        this.swipeOp = Object.values(operation.swipe)
    }

    /**
     * 根据{event}判断输入操作是否是有效指令
     * @return {boolean} 是否为有效操作指令
     */
    checkOPEffective = (): boolean => {
        return (this.type instanceof KeyboardEvent && this.keyboardOp.includes(this.type.key)) ||
            ("direction" in this.type && this.swipeOp.includes(this.type.direction))
    }

    /**
     * 根据{event}返回输入操作指令的箭头方向
     * @return {number} 箭头方向指令
     */
    transformOP2Direction = (): number => {
        if ((this.type instanceof KeyboardEvent && operation.keyboard.up.includes(this.type.key)) ||
            ("direction" in this.type && this.type.direction === operation.swipe.up)) {
            return Direction.UP
        } else if ((this.type instanceof KeyboardEvent && operation.keyboard.down.includes(this.type.key)) ||
            ("direction" in this.type && this.type.direction === operation.swipe.down)) {
            return Direction.DOWN
        } else if ((this.type instanceof KeyboardEvent && operation.keyboard.left.includes(this.type.key)) ||
            ("direction" in this.type && this.type.direction === operation.swipe.left)) {
            return Direction.LEFT
        } else if ((this.type instanceof KeyboardEvent && operation.keyboard.right.includes(this.type.key)) ||
            ("direction" in this.type && this.type.direction === operation.swipe.right)) {
            return Direction.RIGHT
        } else {
            return Direction.UN_EXIST
        }
    }

}