<template>
    <div>
        <ChangePwd></ChangePwd>
        <el-dialog
                title="Tips"
                :visible.sync="dialogVisible"
                size="tiny"
            >
                <span>{{$lang('是否放弃编辑？')}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible= false,nextTo=false">{{$lang('取消')}}</el-button>
                    <el-button type="sure" @click="cancalEdit">{{$lang('确定')}}</el-button>
                </span>
        </el-dialog>
    </div>
</template>
<script>
import ChangePwd from '@/components/changePwd';
export default {
    components:{
        ChangePwd
    },
    data(){
        return {
            dialogVisible:false,
            nextTo:false,
        }
    },
    methods:{
        cancalEdit(){
                this.$router.push({name:this.nextTo})
                this.dialogVisible=false;
        }
    },
    beforeRouteLeave(to, from, next){
        next();
        // this.dialogVisible=true;
        // if(this.nextTo){
        //     next()
        // }else{
        //     next(false)
        //     this.nextTo=to.name
        // }
    }
  }
</script>