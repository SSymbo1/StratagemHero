import {Howl} from "howler";

/**
 * @enum {string}
 * 音频文件路径枚举
 */
export enum Audio {
    /** 正确按键音效 **/
    PRESS_KEY = "/StratagemHero/audio/key_press.ogg",
    /** 错误按键音效 **/
    WRONG_KEY_PRESS = "/StratagemHero/audio/wrong_key_press.ogg",
    /** 完整输入战备音效 **/
    SUCCESS = "/StratagemHero/audio/success.ogg",
    /** 准备环节音效 **/
    GET_READY = "/StratagemHero/audio/get_ready.ogg",
    /** 游戏结束音效 **/
    GAME_OVER = "/StratagemHero/audio/game_over.ogg",
    /** 回合进行时背景音效 **/
    BACKGROUND = "/StratagemHero/audio/background.ogg",
    /** 回合结束音效1 **/
    COMPLETE_1 = "/StratagemHero/audio/round_complete_1.mp3",
    /** 回合结束音效2 **/
    COMPLETE_2 = "/StratagemHero/audio/round_complete_2.mp3",
    /** 回合结束音效3 **/
    COMPLETE_3 = "/StratagemHero/audio/round_complete_3.mp3",
    /** 回合结束音效4 **/
    COMPLETE_4 = "/StratagemHero/audio/round_complete_4.mp3",
}

/**
 * 游戏音频播放器类（封装howler）
 * @desc 实例化时需要传入是否循环{loop:boolean}和音量{volume:number}
 */
export class MediaPlayer {
    private readonly loop: boolean
    private readonly volume: number
    private completeIndex: number

    constructor(loop: boolean, volume: number) {
        this.loop = loop
        this.volume = volume
        this.completeIndex = 0
    }

    /**
     * 预加载音频文件，使得第一次游戏时音频同步
     * @return {Promise<boolean>} 是否已经静音播放一轮所有音频文件
     */
    audioFilePreload = (): Promise<boolean> => {
        return new Promise((resolve) => {
            for (const audio of Object.values(Audio)) {
                this.audioPlay(audio).play()
            }
            resolve(true)
        })
    }

    /**
     * 播放指定的音频
     * @param audio 音频文件路径
     * @return {Howl} 封装音效的Howl的实例
     */
    audioPlay = (audio: string): Howl => {
        return new Howl({
            src: [audio],
            loop: this.loop,
            volume: this.volume
        })
    }

    /**
     * 回合结算时播放的背景音乐
     * @desc 播放顺序为1-4循环,每次调用该方法自动按序播放
     * @return {Howl} 封装音效的Howl的实例
     */
    roundCompleteMusic = (): Howl => {
        const roundCompleteMap: { [key: number]: string } = {
            0: Audio.COMPLETE_1,
            1: Audio.COMPLETE_2,
            2: Audio.COMPLETE_3,
            3: Audio.COMPLETE_4,
        }
        const completeMediaSrc = roundCompleteMap[this.completeIndex]
        this.completeIndex + 1 > 3 ? this.completeIndex = 0 : this.completeIndex++
        return new Howl({
            src: [completeMediaSrc],
            loop: this.loop,
            volume: this.volume
        })
    }

}

