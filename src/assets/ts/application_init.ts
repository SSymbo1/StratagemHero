import DisableDevtool from "disable-devtool";
import {MediaPlayer} from "@/assets/ts/media_player.ts";

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
export const initApplicationLayout = async () => {
    let agent: RegExpMatchArray | null = navigator.userAgent.match(/Android|webOS|iPhone|iPad|Opera Mini/i)
    if (agent !== null) {

    }
}

/**
 * 缓存按键音效
 */
export const operationSoundCache = () => {
    new MediaPlayer(false, 0).trueKeyPress().play()
    new MediaPlayer(false, 0).wrongKeyPress().play()
}