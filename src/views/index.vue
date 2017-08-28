<template>
  <div class="core-wrapper">
    <Banner></Banner>
    <Show></Show>
    <TList :childTasks="childTasks"  :isZong="false" :isWall="true"></TList>   
  </div>
</template>
<script>
import TList from'@/components/TList' 
import Banner from '@/components/Banner'
import Show from '@/components/Show'
export default {
  components: {TList,Banner,Show},
  data(){
    const role=this.$route.name.split('_');
    return {
      childTasks:[
          {name:$lang("全部"),value:-1,count:99,color:"zjz",to:role[0]+"_Detail"},
          {name:$lang("征集中"),value:4,count:99,color:"zjz",to:role[0]+"_Detail"},
          {name:$lang("制作中"),value:5,count:99,color:"zzz",to:role[0]+"_Detail"},
          {name:$lang("已完成"),value:[7,8],count:99,color:"wc",to:role[0]+"_Detail"}
      ]
    }
  }
}
</script>
