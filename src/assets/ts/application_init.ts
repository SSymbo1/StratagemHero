import DisableDevtool from "disable-devtool";
import {MediaPlayer} from "@/assets/ts/media_player.ts";

/**
 * 初始化应用模式,生产环境下关闭控制台
 */
export const initApplicationMode = () => {
    import.meta.env.MODE === "production" ? DisableDevtool() : console.log(`mode:${import.meta.env.MODE}`)
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
 * 缓存音效
 */
export const operationSoundCache = async (): Promise<boolean> => {
    return await new MediaPlayer(false, 0).audioFilePreload()
}