import { createRouter,createWebHistory } from "vue-router";

import loginVue from '@/views/Login.vue'
import layoutVue from '@/views/Layout.vue'

import GraphicsCategoryVue from '@/views/function/GraphicsCategory.vue'
import TeacherManageVue from '@/views/function/TeacherManage.vue'
import ScoreListvue from '@/views/function/ScoreList.vue'
import StudentReviewsvue from '@/views/function/StudentReviews.vue'
import othervue from '@/views/function/other.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'

const routes = [
    { path: '/login', component: loginVue},
    { path: '/', component: layoutVue, redirect: '/function/manage', children: [
        { path: '/function/category', component: GraphicsCategoryVue },
        { path: '/function/manage', component: TeacherManageVue },
        { path: '/function/reviews', component: StudentReviewsvue },
        { path: '/function/list', component: ScoreListvue },
        { path: '/function/other', component: othervue },
        { path: '/user/info', component: UserInfoVue},
        { path: '/user/avatar', component: UserAvatarVue},
        { path: '/user/password', component:UserResetPasswordVue},
    ]}
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router