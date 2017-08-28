<template>
  <div class="content-wrapper">
      <div class="userInfo-wrap">
          <div class="user-info-banner">
              <img src="../../assets/images/user-info-banner.jpg"/>
          </div>
          <div class="user-info-main clearfix">
              <div class="ui-slide-left">
                
                  <ul class="slide-nav-ul" >
                     <li class="snu-li-01" :class="{ active: navIndx=='base' }" >
                        <router-link :to="{ name: 'S-BuserInfo-base', query: { userId: userId } }" >{{$lang('基本信息')}}</router-link>
                    </li>
                     <li class="snu-li-02" :class="{ active: navIndx=='account' }" >
                          <router-link :to="{ name: 'S-BuserInfo-account', query: { userId: userId }}" >{{$lang('账户管理')}}</router-link>
                    </li>
                  </ul>
              </div>
              <div class="ui-slide-right">
                 <router-view></router-view>
              </div>
          </div>
      </div>
      <SlideBtns :type="'back'"></SlideBtns>
  </div>
</template>

<script>
import {isLogin,getUser} from '@/apis/storage'
import SlideBtns from '@/components/SlideBtns'
export default {
    components:{
        SlideBtns
    },
    data() {
        return {
            navIndx:'base',
            bUserType:"0",
            userId:getUser().userId
        }
    },
    created () {
        const LoginUser=JSON.parse(sessionStorage.getItem('LoginUser'));
        this.bUserType=LoginUser.bUserType||"0";
        this.navIndx=this.getStatus(this.$route.path);
        //拼接路由中的query
        if(this.$route.query&&this.$route.query.userId){
            this.userId=this.$route.query.userId
        }else{
            this.userId=getUser().userId
        }
    },
    watch:{
        '$route.path':function(val,oldVal){
            this.navIndx=this.getStatus(val)
        }
    },
    methods: {
        getStatus (urlStr) {
          var urlStrArr = urlStr.split('/')
          return urlStrArr[urlStrArr.length-1 ]
        }
    }
  }
</script>