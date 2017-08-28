<template>
    <div class="lr-content-wrapper">
        <div class="login-logo" @click="$router.push({ path: '/'})"></div>
        <div class="lr-main">
            <div class="box-flex-media-box login-left">
                <div class="flex1">
                    <div class="lr-radius">
                        <img src="../assets/images/logon-left.jpg"/>
                    </div>
                    <router-link :to="{ path: '/' }" class="back-index">{{$lang('返回首页')}}</router-link>
                </div>
                <div class="flex1">
                    <div class="lr-main-right">
                        <h3 class="main-title">{{$lang('欢迎登录VSWORK')}}</h3>
                        <div class="lr-form-wrap">
                            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0">
                                <el-form-item prop='phone'>
                                    <el-input v-model="loginForm.phone" :placeholder="$lang('请输入手机号码')"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item prop='password'>
                                    <el-input type="password" v-model="loginForm.password" :placeholder="$lang('请输入密码')"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="sure" @click="doLogin('loginForm')">{{$lang('登录')}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="login-set-btn clearfix">
                            <router-link :to="{ name: 'choise' }" class="fl">{{$lang('立即注册')}}</router-link>
                            <router-link :to="{ name: 'forget' }" class="fr">{{$lang('忘记密码')}}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Login} from '@/apis'
    import {CheckUserInfoV} from '@/apis/person'
    import {getTackParam} from '@/apis/task'
    export default {
        data() {
            return {
                loginForm: {
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [{validator: this.validatePhone, trigger: 'blur'}],
                    password: [{validator: this.validatePwd, trigger: 'blur'}]
                }
            }
        },
        methods: {
            validatePhone(rule, value, callback) {
                if (value === '') {
                    callback(new Error($lang('手机号码不能为空')));
                } else if (!(/^1[34578]\d{9}$/.test(value))) {
                    callback(new Error($lang('请输入正确的手机号码')));
                } else {
                    callback();
                }
            },
            validatePwd(rule, value, callback) {
                if (value === '') {
                    callback(new Error($lang('密码不能为空')));
                } else if (value.length < 6 || value.length > 12) {
                    callback(new Error($lang('6-12个字符')));
                } else {
                    callback();
                }
            },
            //点击校验
            doLogin(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login()
                    } else {
                        return false;
                    }
                });
            },
            async getUserInfo(id,userType){
                const res1 = await CheckUserInfoV({userId: id});
                if (res1.success) {
                    sessionStorage.setItem("UserInfo", JSON.stringify(res1.data));  
                }
                this.$router.push({name: userType})
            },
            async login(){
                const res = await Login(this.loginForm)
                if (res.success) {
                    this.$message.success($lang("登录成功！"))
                    let userInfo = {
                        userId: res.data.user.id,
                        userType: res.data.user.userType,
                        phone: res.data.user.phone,
                        bUserType:res.data.user.bUserType
                    }
                    sessionStorage.setItem("user_token", res.data.token)
                    sessionStorage.setItem("LoginUser", JSON.stringify(userInfo));
                    const TaskParam = await getTackParam();
                    if (TaskParam) {
                        sessionStorage.setItem("TaskParam", JSON.stringify(TaskParam));
                    }
                    window.store={
                            parentTaskState:-1,
                            childTaskState:-1
                    }
                    this.getUserInfo(userInfo.userId,userInfo.userType);
                    // var options = { 
                    //     apiUrl: WebIM.config.apiURL,
                    //     user: this.loginForm.phone,
                    //     pwd: this.loginForm.password,
                    //     appKey: WebIM.config.appkey
                    // };
                    // conn.open(options);
                    // this.$router.push({name: res.data.user.userType})
                } else {
                    this.$message.error(res.msg)
                }
            }
        }
    }
</script>
