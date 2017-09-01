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
import { count } from '@/apis/notices'
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

import EN from './local/en';
Vue.use({
  install(Vue, config) {
    Vue.prototype.lang = localStorage.lang;
    window.$setLang = Vue.prototype.$setLang = function (lang) {
      localStorage.lang = lang, location.reload();
    }
    window.$lang = Vue.prototype.$lang = function (context) {
      return (config[localStorage.lang] || {})[context] || context;
    }
  }
}, { EN });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    count: 0
  },
  methods: {
    async updateCount() {
      let res = await count();
      if (res.success) this.$root.count = res.data.sys + res.data.per;
    }
  },
  router,
  template: '<App/>',
  components: { App }
})


