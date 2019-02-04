"use strict";

import Vue from 'vue';
import qs from 'qs';
import axios from "axios";
import util from '@/libs/util';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.headers.common['Authorization'] = 'Bearer ' + util.getToken();
const contentType = 'application/x-www-form-urlencoded'  // application/x-www-form-urlencoded或者application/json
axios.defaults.headers.post['Content-Type'] = contentType;
axios.defaults.transformRequest = data => {
    if (contentType == 'application/x-www-form-urlencoded') {
      return qs.stringify(data)
    } else {
      return data
    }
};

let config = {
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.initadmin.net/' : 'http://localhost/InitAdmin/actionphp/public/index.php/api/',
  timeout: 60 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if(response.data.data.need_login == 1){
      //console.log(Vue)
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
