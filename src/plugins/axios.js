"use strict";

import Vue from 'vue';
import qs from 'qs';
import axios from "axios";
import util from '@/libs/util';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.headers.common['Authorization'] = 'bearer ' + util.getToken();
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
  baseURL: process.env.NODE_ENV === 'production' ? 'https://tpvue.com/api/' : 'https://ufgacz-80-gyqbmz.dev.ide.live/api/',
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
