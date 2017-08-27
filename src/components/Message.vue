<template>
<div>
    <div :class="roleName" v-if="!isTip">
        <div class="c-header">
            <img :src="src" class="header-img"/>
            <i class="sfzm-i">
                <img src="../assets/images/b-icon.png" v-if="role=='B'"/>
                <img src="../assets/images/s-icon.png" v-if="role=='S'"/>
                <img src="../assets/images/v-icon.png" v-if="role=='V'"/>
            </i>
        </div>
        <div class="c-body">
            <p class="c-body_time">{{getTime(time)}}</p>
            <div class="c-body_main">
                <p class="talk-p" v-html="value"></p>
            </div>
                <i class="zx-jt"></i>
            <!--<span class="read-state on">{{statusName}}</span>-->
        </div>
        
    </div>
    <div class="tips-news" v-else>
        <p v-html="value"></p>
    </div>
    <div class="tips-news" v-if="isEnd">
        <p>以上为聊天记录</p>
    </div>
</div>
</template>
<script>
import moment from 'moment'
export default {
  props:{
      status:{
          type:String,
          default:""
      },
      src:{
          type:String,
          default:require("../assets/images/hdr.png")
      },
      value:{
          type:String,
          default:""
      },
      isLeft:{
          type:Boolean,
          default:true
      },
      isEnd:{
          type:Boolean,
          default:false
      },
      isStart:{
          type:Boolean,
          default:false
      },
      time:{
          type:Number
      },
      role:{
          type:String,
          default:""
      }
    //   isTip:{
    //       type:Boolean,
    //       default:false
    //   }
  },
  computed:{
      statusName(){
        var a='已读'
        switch(this.status){
            case 'Undelivered':
                a = '未送达';
                break;
            case 'Delivered':
                a = '已送达';
                break;
            case 'Read':
                a = '已读';
            default:
        }
        return a;
      },
      roleName(){
          return this.isLeft?["talk-item","clearfix","talk-other-wrap"]:["talk-item","clearfix","talk-me-wrap"]
      },
      isTip:{
          get(){
            return this.value.search(/^系统消息/)>-1?true:false
          }
      }
  },
  methods:{
      getTime(time){
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      }
  }
}
</script>
<style>
.sfzm-i img{
    width: 15px;
    height: 15px;
}
</style>