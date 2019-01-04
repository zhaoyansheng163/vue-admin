export default [
    {
      path: '/core/user/login',
      component: () => import('./user/login.vue')
    },
    {
      path: '/core/user/list',
      component: () => import('./user/list.vue')
    }
]
