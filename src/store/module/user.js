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
import util from '@/libs/util';
export default {
    state: {
      token: util.getToken(),
      user_info: {
        uid: '',
        nickname: '',
        avatar: '',
        role: []
      }
    },
    getters: {
    },
    mutations: {
      set_token:(state,data)=>{
        state.token = data
        util.setToken(data)
      },
      set_user_info:(state,data)=>{
        state.user_info = data
      }
    },
    actions: { 
      setToken({commit},data){
        commit('set_token',data)
      },
      setUserInfo({commit},data){
        commit('set_user_info',data)
      },
    }
  }
    