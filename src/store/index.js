import Vue from 'vue'
import Vuex from 'vuex'

import app from './module/app'

import tagsview from '@/views/layout/store/tagsview' //多标签
import getters from '@/views/layout/store/getters.js' //getters

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    app,
    tagsview
  },
  getters
})
