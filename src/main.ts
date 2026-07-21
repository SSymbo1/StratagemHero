import { createApp } from 'vue'
import App from './App.vue'
import i18n from './lang/index.ts'
import router from './router'
import pinia from './store'
import '@/assets/css/app.css'

// 先注册路由、状态和国际化，再挂载根实例。
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
