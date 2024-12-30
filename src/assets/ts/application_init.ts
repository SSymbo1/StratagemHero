import DisableDevtool from "disable-devtool";

/**
 * 初始化应用模式,生产环境下关闭控制台
 */
export const initApplicationMode = () => {
    if (import.meta.env.MODE === "production") {
        DisableDevtool()
    }
}

/**
 * 初始化应用布局，检测是否移动端
 */
export const initApplicationLayout = () => {
    let agent: RegExpMatchArray | null = navigator.userAgent.match(/Android|webOS|iPhone|iPad|Opera Mini/i)
    if (agent !== null) {

    }
}

/**
 * 缓存按键音效
 */
export const operationSoundCache = () => {
    const success = new Audio("/StratagemHero/audio/key_press.mp3")
    const fail = new Audio("/StratagemHero/audio/key_press_fail.mp3")
    success.muted = true
    fail.muted = true
    success.play().then()
    fail.play().then()
}