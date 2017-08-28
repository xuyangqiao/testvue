// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import './assets/css/public.css'
import './assets/css/other.css'
import './apis/axiosConfig.js'
import { getChatConfig } from '@/apis/task'
window.store = {
  parentTaskState: -1,
  childTaskState: -1
}

getChatConfig().then((res) => {
  if (res.success) {
    WebIM.config.appkey = res.data.chatName;
  }
})


Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use({
  install(Vue, config) {
    window.$setLang = Vue.prototype.$setLang = function (lang) {
      localStorage.lang = lang;
    }
    window.$lang = Vue.prototype.$lang = function (context) {
      return (config[localStorage.lang] || {})[context] || context;
    }
  }
}, {
    en: {
      '啦啦啦': 'lalala'
    }
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


