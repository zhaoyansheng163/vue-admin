/**
 * +----------------------------------------------------------------------
 * | InitAdmin/vue-admin [ InitAdmin渐进式模块化通用后台 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2018-2019 http://initadmin.net All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * +----------------------------------------------------------------------
 * | Author: jry <ijry@qq.com>
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
        },
        {
            path: '/va_dylist/:api',
            name: 'va_dylist',
            meta: {
              title: '动态页面'
            },
            component: () => import('@/views/components/va_dypage/va_dylist_route.vue')
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
                if(menu_list[index1]._child[index2].is_vadypage == '1'){
                    children.push(
                        {
                            path: menu_list[index1]._child[index2].path,
                            name: menu_list[index1]._child[index2].path,
                            meta: {
                                title: menu_list[index1]._child[index2].title,
                                api: menu_list[index1]._child[index2].api
                            },
                            query: {
                                api: menu_list[index1]._child[index2].api
                            },
                            component: () => import('@/views/components/va_dypage/va_dylist_route.vue')
                        }
                    )
                } else {
                    children.push(
                        {
                            path: menu_list[index1]._child[index2].path,
                            name: menu_list[index1]._child[index2].path,
                            meta: {
                                title: menu_list[index1]._child[index2].title
                            },
                            component: () => import('@/views/module'+menu_list[index1]._child[index2].path+'.vue')
                        }
                    )
                }
            }
        }
    }
    routers[0].children = routers[0].children.concat(children)
}

// 导入tpvue核心模块路由
import core from '@/views/module/core/route.js'
routers = routers.concat(core.parent)
routers[0].children = routers[0].children.concat(core.children)

// 导入其它模块路由

export default routers;
