import {createI18n} from "vue-i18n";

import zh from "@/lang/locales/zh.ts";
import en from "@/lang/locales/en.ts";

let language = navigator.language !== "zh-CN" ? "en-US" : "zh-CN"

const i18n = createI18n({
    locale: language,
    globalInjection: true,
    legacy: false,
    messages: {
        "zh-CN": zh,
        "en-US": en
    }
})

export default i18n