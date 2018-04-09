import axios from 'axios'
import { Loading, Message } from 'element-ui'

//axios.defaults.baseURL = 'http://yietoo.com:8080/vsworkapi/api';//开发服
axios.defaults.baseURL = 'http://47.95.202.72:18088/api/api';//新开发服务器

// axios.defaults.baseURL = 'http://api.vswork.com/api';//客户服务器
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['language'] = (localStorage.lang || '').toLowerCase();

// http request 拦截器
axios.defaults.timeout = 50000;
var loadinginstace;
axios.interceptors.request.use(function (config) {
    config.headers.token = localStorage.getItem("user_token")
    // loadinginstace = Loading.service({ fullscreen: true })
    return config;
}, function (error) {
    // loadinginstace.close()
    return Promise.reject(error);
});
// http response 拦截器
axios.interceptors.response.use(function (response) {
    // loadinginstace.close()
    if (response.data.code == '1001' || response.data.code == '1002') {
        localStorage.setItem("user_token", '')
        localStorage.setItem("LoginUser", '{}')
        // alert(response.data.msg);
        window.location.href = '/#/login'
    } else {
        return response
    }
}, function (error) {
    // loadinginstace.close()
    return Promise.reject(error);
});
