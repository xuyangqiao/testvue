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
                <div class="lr-main-right reg-wrapper">
                   <h3 class="main-title">{{$lang('忘记密码')}}</h3>
                   <div class="lr-form-wrap">
                        <el-form ref="form" :model="form" label-width="0" :rules="rules">      
                            <VerifyCode ref="VerifyCode" :phone="form.phone" :code="form.code" :getData="getData" :parentClass="'reg-wrapper'" :type="'forgetPwd'"></VerifyCode>
                            <el-form-item prop="password1">
                               <el-input type="password" v-model="form.password1" :placeholder="$lang('请输入密码')"></el-input>
                            </el-form-item>
                            <el-form-item prop="password1">
                               <el-input type="password" v-model="form.password2" :placeholder="$lang('请再次输入密码')" ></el-input>
                            </el-form-item>
                            <el-form-item class="pad-top-15">
                               <el-button type="sure" @click="saveUpdatePwd">{{$lang('确认并提交')}}</el-button>
                            </el-form-item>
                        </el-form>
                   </div>
                </div>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
import VerifyCode from '@/components/VerifyCode'
import {UpdateForgetPwd} from '@/apis/index'
export default {
    components:{
        VerifyCode
    },
    data() {
        return {
            form: {
                phone:'',
                password1:'',
                password2:'',
                code:""
            },
            validCode:false,
            rules:{
                password1: [ {validator:this.validatePwd,trigger: 'blur'}],
                password2:[ {validator:this.validateCheckpwd,trigger: 'blur'}] 
            } 
        
        }
    },
    methods:{
        validatePwd(rule, value, callback){
            if (value === '') {
                callback(new Error($lang('密码不能为空')));
            } else if(value.length<6||value.length>12){
                callback(new Error($lang('6-12个字符')));
            } else {
            callback();
            }
        },
        validateCheckpwd(rule, value, callback){
            if (value === '') {
                callback(new Error($lang('密码不能为空')));
            } else if(value!==this.form.password1){
                callback(new Error($lang('两次密码不一致')));
            } else {
            callback();
            }
        },
        getData(data){
            this.form.phone=data.phone;
            this.form.code=data.code;
            this.form.type=data.type;
            this.validCode=data.valid;
        },
        saveUpdatePwd(){
            this.$refs['form'].validate((valid)=>{
                if(this.validCode&&valid){
                    this.UpdatePwd()
                }else{
                    return false;
                }
            })
        },
        async UpdatePwd(){
            let param={
                phone:this.form.phone,
                password:this.form.password1,
                type:this.form.type,
                code:this.form.code,  
            }
            const res=await UpdateForgetPwd(param);
            if(res.success){
                this.$message.success($lang("操作成功！"))
                this.$router.push({name:'login'})
            }
            else{
                if(res.code=='1007'||res.code=='1005'||res.code=='1006'){
                     this.$refs.VerifyCode.clear(res.code);
                }else if(res.code=='1009'){
                    this.form.password1=this.form.password2="";
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
        }
    }
}
</script>