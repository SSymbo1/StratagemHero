import {Howl} from "howler";

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
     * 按下正确指令的音效
     * @return {Howl} 封装音效的Howl的实例
     */
    trueKeyPress = (): Howl => {
        return new Howl({
            src: ["/StratagemHero/audio/key_press.ogg"],
            loop: this.loop,
            volume: this.volume
        })
    }

    /**
     * 按下错误指令的音效
     * @return {Howl} 封装音效的Howl的实例
     */
    wrongKeyPress = (): Howl => {
        return new Howl({
            src: ["/StratagemHero/audio/wrong_key_press.ogg"],
            loop: this.loop,
            volume: this.volume
        })
    }

    /**
     * 游戏回合进行时的背景音乐
     * @returns {Howl} 封装音效的Howl的实例
     */
    backgroundMusic = (): Howl => {
        return new Howl({
            src: ["/StratagemHero/audio/background.ogg"],
            loop: this.loop,
            volume: this.volume
        })
    }

    /**
     * 游戏结束时的背景音乐
     * @return {Howl} 封装音效的Howl的实例
     */
    gameOverMusic = (): Howl => {
        return new Howl({
            src: ["/StratagemHero/audio/game_over.ogg"],
            loop: this.loop,
            volume: this.volume
        })
    }

    /**
     * 游戏回合准备环节时的背景音乐
     * @returns {Howl} 封装音效的Howl的实例
     */
    getReadyMusic = (): Howl => {
        return new Howl({
            src: ["/StratagemHero/audio/get_ready.ogg"],
            loop: this.loop,
            volume: this.volume
        })
    }

    /**
     * 成功输入一项战备时的音效
     * @returns {Howl} 封装音效的Howl的实例
     */
    successMusic = (): Howl => {
        return new Howl({
            src: ["/StratagemHero/audio/success.ogg"],
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
            0: "/StratagemHero/audio/round_complete_1.mp3",
            1: "/StratagemHero/audio/round_complete_2.mp3",
            2: "/StratagemHero/audio/round_complete_3.mp3",
            3: "/StratagemHero/audio/round_complete_4.mp3",
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

