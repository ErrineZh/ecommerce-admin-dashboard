import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { roles: ['admin', 'editor'] },
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
        meta: { roles: ['admin'] },
      },
      {
        path: '/orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue'),
        meta: { roles: ['admin', 'editor'] },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const roles = Array.isArray(to.meta?.roles) ? to.meta.roles : []

  if (!token && to.path !== '/login') {
    return '/login'
  }

  if (token && to.path === '/login') {
    return '/'
  }

  if (roles.length > 0 && (!role || !roles.includes(role))) {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    return '/login'
  }
})

export default router
