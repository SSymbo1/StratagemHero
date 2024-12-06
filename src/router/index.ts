import {createRouter, createWebHistory, Router} from "vue-router"

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: () => import('@/components/home/Home.vue')},
        {path: '/level', component: () => import('@/components/level/Level.vue')},
    ]
});
export default router;