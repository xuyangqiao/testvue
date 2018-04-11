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
import MetaInfo from 'vue-meta-info'


import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

window.store = {
  parentTaskState: -1,
  childTaskState: -1
}

getChatConfig().then((res) => {
  if (res.success) {
    WebIM.config.appkey = res.data.chatName;
  }
})

Vue.use(MetaInfo);

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
    _count: 0,
    get count() {
      return Math.max(0, this._count);
    },
    set count(value) {
      this._count = value;
    }
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


