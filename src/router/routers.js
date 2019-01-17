/**
 * +----------------------------------------------------------------------
 * | tpvue-admin [ 轻量级模块化Vue后台 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2018-2019 http://tpvue.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * +----------------------------------------------------------------------
 * | Author: jry <598821125@qq.com>
 * +----------------------------------------------------------------------
*/

// 此文件用于汇总每个模块下的路由

import Layout from '@/views/layout';
import util1 from '@/views/layout/store/util';
import store from '@/store'

var routers = [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
      meta: {
        title: '首页'
      },
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/index.vue')
        }
      ]
    }
];

let menu_list = util1.getMenulistFromLocalstorage()
if (typeof menu_list === 'object') {
    var children = [];
    store.dispatch('setMenuList', menu_list);
    for(let index1 in menu_list) {
        if(menu_list[index1]._child){
            for(let index2 in menu_list[index1]._child) { 
                children.push(
                    {
                        path: index2,
                        name: index2,
                        meta: {
                            title: menu_list[index1]._child[index2].title
                        },
                        component: () => import('@/views/module'+index2+'.vue')
                    }
                )
            }
        }
    }
    routers[0].children = routers[0].children.concat(children)
    //router.addRoutes(routes)
}

// 导入tpvue核心模块路由
import core from '@/views/module/core/route.js'
routers = routers.concat(core.parent)
routers[0].children = routers[0].children.concat(core.children)

// 导入其它模块路由

export default routers;
