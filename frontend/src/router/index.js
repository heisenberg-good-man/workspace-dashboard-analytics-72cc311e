import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '数据看板', icon: 'DataLine' }
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('@/views/Jobs.vue'),
        meta: { title: '职位管理', icon: 'Briefcase' }
      },
      {
        path: 'candidates',
        name: 'Candidates',
        component: () => import('@/views/Candidates.vue'),
        meta: { title: '候选人管理', icon: 'User' }
      },
      {
        path: 'interviews',
        name: 'Interviews',
        component: () => import('@/views/Interviews.vue'),
        meta: { title: '面试安排', icon: 'Calendar' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - 招聘管理平台'
  }
  next()
})

export default router
