import { createRouter, createWebHistory } from 'vue-router'

import LoginX from '@/components/LoginX.vue'
import BieuDo from '@/components/BieuDo.vue'

const routes = [
    {
        path: '/',
        component: LoginX
    },
    {
        path: '/login',
        component: LoginX
    },
    {
        path: '/chart',
        component: BieuDo,
        meta: { requiresAuth: true } // Yêu cầu xác thực đăng nhập
    },
    {
        path: '/:catchAll(.*)',
        component: Error
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router