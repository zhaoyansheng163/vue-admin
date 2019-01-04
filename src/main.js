import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router';
import config from './config'
import store from './store'
import util from './libs/util';

Vue.use(iView);

Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

// 实例化Vue
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
