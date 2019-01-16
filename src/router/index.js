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

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';
import store from '@/store'
import iView from 'iview';
import util from '@/libs/util';

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history'
});

const LOGIN_PAGE_NAME = '/core/user/login'

router.beforeEach((to, from, next) => {
  //判断是否存在登录成功返回的token
  const token = util.getToken()
  if(!token && to.name !== LOGIN_PAGE_NAME){
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  }

  //进度条
  iView.LoadingBar.start();
  util.title(to.meta.title);
  next();
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
})

export default router
