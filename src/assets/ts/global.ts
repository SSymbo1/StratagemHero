/**
 * @enum
 * 游戏组件参数枚举
 */
export enum COMPONENT {
    /** 准备阶段持续时间 **/
    READY_WAIT = 3000,
    /** 回合结果持续时间 **/
    ROUND_RESULT_WAIT = 6000,
    /** label展示间隔 **/
    LABEL_SHOW = 1000,

}

/**
 * @enum
 * 游戏参数枚举
 */
export enum GAME {
    /** 基础回合时间 **/
    TIME = 15,
    /** 基础续时时间 **/
    PER_TIME = 2,
    /** 起始分数 **/
    SCORE = 0,
    /** 起始回合 **/
    ROUND = 0,
    /** 基础战略配备个数 **/
    STRATAGEMS = 5,
    /** 基础正确得分 **/
    PER_SCORE = 15,
    /** 基础完美回合得分 **/
    PERFECT_SCORE = 100,
    /** 基础困难回合全清得分 **/
    DIFFICULT_SCORE = 150,
    /** 困难回合开始节点 **/
    DIFFICULT_ROUND = 3,
    /** 基础回合全清得分 **/
    ROUND_SCORE = 100
}

/**
 * @enum
 * 计时器颜色配置枚举
 */
export enum TIMER {
    /** 剩余足够时间时timer颜色 **/
    SAFE_TIME = "gold",
    /** 剩余时间不足时timer颜色 **/
    DANGER_TIME = "red",
}