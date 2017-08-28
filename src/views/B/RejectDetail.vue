<template>
    <TInfo>
        <div slot="footer" class="bt-dashed">
             <div class="set-btn-wrap bt-dashed">
               <el-button type="sure" @click="toUpdate">{{$lang('编辑')}}</el-button>
            </div>
        </div>
    </TInfo>
</template>
<script>
  import TInfo from '@/components/TInfo'
  export default {
    components:{TInfo},
    methods:{
        toUpdate(){
            const id=this.$route.query.id;
            this.$router.push({name:"B-create",query: { id: id }})
        }
    }
  }
</script>