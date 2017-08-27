<template>
  <div class="lr-content-wrapper">
    <div class="login-logo" @click="$router.push({ path: '/'})"></div>
     <div class="lr-main">
        <div class="box-flex-media-box login-left">
            <div class="flex1">
                <div class="lr-radius">
                    <img src="../assets/images/logon-left.jpg"/>
                </div>
                <router-link :to="{ path: '/' }" class="back-index">返回首页</router-link>
            </div>
            <div class="flex1">
                <div class="lr-main-right reg-wrapper">
                   <h3 class="main-title">欢迎注册VSWORK成为会员</h3>
                   <div class="lr-form-wrap">
                        <el-form ref="form" :model="form" label-width="0" :rules="rules">      
                            <VerifyCode ref="VerifyCode" :phone="form.phone"  :code="form.code" :getData="getData" :parentClass="'reg-wrapper'" :type="'register'" ></VerifyCode>
                            <el-form-item prop='password1'>
                               <el-input v-model="form.password1" type="password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item prop='password2'>
                               <el-input v-model="form.password2" type="password" placeholder="请再次输入密码" ></el-input>
                            </el-form-item>
                             <el-form-item class="mag-botm-5">
                                <el-checkbox v-model="form.checked">已阅读并同意<a  class="yhxz-a">《VSWORK用户协议》</a></el-checkbox>
                            </el-form-item>
                            <el-form-item>
                               <el-button type="sure" @click="register" :disabled="!(form.checked&&validCode)">注册</el-button>
                            </el-form-item>
                        </el-form>
                   </div>
                   <div class="reg-set-btn">
                        <p>我已注册，现在<router-link :to="{ name: 'login' }">登录</router-link></p>
                   </div>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
import VerifyCode from '@/components/VerifyCode'
import {Register} from '@/apis'
export default {
    components:{
        VerifyCode
    },
    data() {
        return {
            userType:'B',//用户类型
            form: {
                phone: '',
                password1: '',
                password2: '',
                checked:false,
                code:""
            },
            validCode:false,
            rules:{
                password1: [ {validator:this.validatePwd,trigger: 'blur'}],
                password2:[ {validator:this.validateCheckpwd,trigger: 'blur'}] 
            }  
        }
    },
    created(){
        this.userType=this.getUserType(this.$route.query);
    },
    methods:{
        validatePwd(rule, value, callback){
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else if(value.length<6||value.length>12){
                callback(new Error('6-12个字符'));
            } else {
            callback();
            }
        },
        validateCheckpwd(rule, value, callback){
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else if(value!==this.form.password1){
                callback(new Error('两次密码不一致'));
            } else {
            callback();
            }
        },
        //获取验证组件的返回值
        getData(data){
            this.form.phone=data.phone;
            this.form.code=data.code;
            this.validCode=data.valid;
        },
        //获取用户类型
        getUserType(urlQuery){
            return urlQuery.type
        },
        async doRegister(){
            let param={
                phone: this.form.phone,
                password: this.form.password1,
                userType: this.userType,
                code:this.form.code,
                type:"register"
            }
            const res=await Register(param);
            if(res.success){
                this.$message.success("注册成功！")
                this.$router.push({name:'login'})

                //注册聊天
                var options = { 
                    username: param.phone,
                    password: param.password,
                    nickname: param.phone,
                    appKey: WebIM.config.appkey,
                    success: function () { 
                        console.log("%c 注册聊天成功", "color: green")
                    },  
                    error: function () {
                        console.log("%c 注册聊天失败", "color: red")
                    }, 
                    apiUrl: WebIM.config.apiURL
                }; 
                conn.registerUser(options);
            }else{
                if(res.code=='1007'||res.code=='1005'||res.code=='1006'){
                     this.$refs.VerifyCode.clear(res.code);
                }else if(res.code=='1008'){
                    this.$refs.VerifyCode.clear();
                }else{
                     this.$refs.VerifyCode.clear();
                     this.form={
                        phone: '',
                        password1: '',
                        password2: '',
                        code:""
                    }
                }
                this.$message.error(res.msg);
            }
        },
        register(){
             const me=this;
             this.$refs['form'].validate((valid)=>{
                 if(me.validCode&&valid){
                     this.doRegister();
                 }else{
                    return false;
                }
             })
        }
    }
}
</script>