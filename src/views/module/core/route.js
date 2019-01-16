export default {
  parent: [
    {
      name: '/core/user/login',
      path: '/core/user/login',
      meta: {
        title: '用户登录'
      },
      component: () => import('./user/login.vue')
    }
  ],
  children: [
  ]
}
