// 此文件用于汇总每个模块下的路由

import Layout from '@/views/layout';

var routers = [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
      meta: {
        title: '后台首页'
      },
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '后台首页'
          },
          component: () => import('@/views/index.vue')
        }
      ]
    }
];

// 导入tpvue核心模块路由
import core from '@/views/module/core/route.js'
var children = routers[0].children.concat(core);
routers[0].children = children;

// 导入其它模块路由

export default routers;
