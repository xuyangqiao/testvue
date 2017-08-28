<!--修改密码-->
<template>
    <div class="passowrd-mesg" v-loading="loading">
        <el-form ref="form" :model="form" label-width="110" :rules="rules">
            <el-form-item :label="$lang('原始密码:')" prop="oldPwd">
                <el-input v-model="form.oldPwd" type="password" :placeholder="$lang('请输入原始密码')"></el-input>
            </el-form-item>
            <el-form-item :label="$lang('新密码:')" prop="newPwd">
                <el-input v-model="form.newPwd" type="password" :placeholder="$lang('请输入新密码')"></el-input>
            </el-form-item>
            <el-form-item :label="$lang('确认新密码:')" prop="surePwd">
                <el-input v-model="form.surePwd" type="password" :placeholder="$lang('请再次输入新密码')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">
                    <el-button type="sure" class="fr" @click='modifyPwd'>{{$lang('确定')}}</el-button>
                </el-col>
                <el-col :span="11" :offset="2">
                    <el-button type="cancle" class="fr" @click='cancleModify'>{{$lang('取消')}}</el-button>
                </el-col>
            </el-form-item>
        </el-form>    
    </div>
</template>
<script>
import {UpdatePwdV} from '@/apis/person'
import {isLogin, getUser} from '@/apis/storage'
export default{
    data(){
        return{
            loading:false,
            form:{
                oldPwd:"",
                newPwd:"",
                surePwd:""
            },
            rules:{
                oldPwd:[{validator:this.validateOldPwd,trigger: 'blur'}],
                newPwd: [ {validator:this.validatePwd,trigger: 'blur'}],
                surePwd:[ {validator:this.validateCheckpwd,trigger: 'blur'}] 
            }  
           
        }
    },
    created(){
        this.userId=this.$route.query.userId||getUser().userId;
    },
    methods:{
        validateOldPwd(rule, value, callback){
            if (value === '') {
                callback(new Error($lang('密码不能为空')));
            }else {
            callback();
            }
        },
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
            } else if(value!==this.form.newPwd){
                callback(new Error($lang('两次密码不一致')));
            } else {
            callback();
            }
        },
        //确认修改
        async doModifyPwd(){
            const LoginUser=getUser();
            this.form.userId=this.userId;
            const res=await UpdatePwdV(this.form);
            this.loading=false;
            if(res.success){
                this.$message.success($lang("操作成功！"));
                this.cancleModify();
            }else{
               this.$message.error(res.msg)
            }
        },
        modifyPwd(){
            this.$refs['form'].validate((valid)=>{
                if(valid){
                    this.loading=true;
                    this.doModifyPwd();
                }else{
                    return false;
                }
            })
        },
        //取消修改
        cancleModify(){
            this.form={
                oldPwd:"",
                newPwd:"",
                surePwd:""
            }
        }
    }
}
</script>