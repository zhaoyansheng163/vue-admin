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

export default {
    state: {
      token: localStorage.token,
      user_info: {
        uid: '',
        nickname: '',
        avatar: '',
        role: []
      }
    },
    getters: {
      get_token: state => {
          return state.token
      },
      get_user_info: state => {
        return state.user_info
      }
   },
    mutations: {
      set_token:(state,view)=>{
        state.token = view
      },
      set_user_info:(state,view)=>{
        state.user_info = view
      }
    },
    actions: { 
      setToken({commit},view){
        commit('set_token',view)
      },
      setUserInfo({commit},view){
        commit('set_user_info',view)
      },
    }
  }
    