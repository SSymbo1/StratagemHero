import type { Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 使用 hash 模式以兼容静态托管环境刷新。
 */
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('@/components/home/Home.vue') },
    { path: '/level', component: () => import('@/components/level/Level.vue') },
    { path: '/rank', component: () => import('@/components/level/Rank.vue') },
  ],
})

export default router
