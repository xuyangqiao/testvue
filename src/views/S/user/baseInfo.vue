<template>
    <div class="base-account-wrapper"> 
        <BaseUserInfo ref="baseInfo" :userId="userId" :hasEdit="hasEdit" ></BaseUserInfo>
        <el-dialog
            title="Tips"
            :visible.sync="dialogVisible"
            size="tiny"
           >
            <span>{{$lang('是否放弃编辑？')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false,nextTo=false">{{$lang('取消')}}</el-button>
                <el-button type="sure" @click="cancalEdit">{{$lang('确定')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import BaseUserInfo from '@/components/BaseUserInfo'
import {getUser, isLogin,getUserInfo} from '@/apis/storage.js'
export default {
    components:{
        BaseUserInfo
    },
    data() {
        return {
            dialogVisible:false,
            nextTo:false,
            hasEdit:true,
            userId:"",
        }
    },
    created(){
       this.userId=getUser().userId;
    },
    methods:{
        cancalEdit(){
                this.$router.push({name:this.nextTo})
                this.dialogVisible=false;
        }
    },
    beforeRouteLeave(to, from, next){
        if(this.$refs.baseInfo.edit){
            this.dialogVisible=true;
            if(this.nextTo){
                next()
            }else{
                next(false)
                this.nextTo=to.name
            }
        }else{
            next()
        }
    }
  }
</script>