import {createRouter, createWebHashHistory, Router} from "vue-router";

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: "/", component: () => import("@/components/home/Home.vue")},
        {path: "/level", component: () => import("@/components/level/Level.vue")},
        {path: "/rank", component: () => import("@/components/level/Rank.vue")},
    ]
});

export default router;