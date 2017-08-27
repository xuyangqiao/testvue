<template>
  <div class="content-wrapper">
      <div class="userInfo-wrap">
          <div class="user-info-banner">
              <img src="../../assets/images/user-info-banner.jpg"/>
          </div>
          <div class="user-info-main clearfix">
              <div class="ui-slide-left">
                  <!--B端主账号-->
                  <ul class="slide-nav-ul" v-if="bUserType=='0'">
                     <li class="snu-li-01" :class="{ active: navIndx=='base' }" >
                        <router-link :to="{ name: 'B-userInfo-base' , query: { userId: userId }}" >基本信息</router-link>
                    </li>
                     <li class="snu-li-02" :class="{ active: navIndx=='account' }" >
                          <router-link :to="{ name: 'B-userInfo-account', query: { userId: userId }} " >账户管理</router-link>
                    </li>
                     <li class="snu-li-03" :class="{ active: navIndx=='bag' }" >
                        <router-link :to="{ name: 'B-userInfo-bag', query: { userId: userId }}" >我的钱包</router-link>
                    </li>
                     <li class="snu-li-04" :class="{ active: navIndx=='child' }" >
                       <router-link :to="{ name: 'B-userInfo-child', query: { userId: userId } }" >子账号管理</router-link>
                    </li>
                  </ul>
                  <!--B端发包员-->
                   <ul class="slide-nav-ul" v-if="bUserType=='1'">
                     <li class="snu-li-01" :class="{ active: navIndx=='base' }" >
                        <router-link :to="{ name: 'B-userInfo-base' , query: { userId: userId }}" >基本信息</router-link>
                    </li>
                     <li class="snu-li-02" :class="{ active: navIndx=='account' }" >
                          <router-link :to="{ name: 'B-userInfo-account' , query: { userId: userId }}" >账户管理</router-link>
                    </li>
                  </ul>
                    <!--B端财务-->
                   <ul class="slide-nav-ul" v-if="bUserType=='2'">
                     <li class="snu-li-03" :class="{ active: navIndx=='paying' }" >
                        <router-link :to="{ name: 'B-userInfo-paying' , query: { userId: userId }}" >待支付</router-link>
                    </li>
                     <li class="snu-li-02" :class="{ active: navIndx=='paid' }" >
                          <router-link :to="{ name: 'B-userInfo-paid' , query: { userId: userId }}" >已支付</router-link>
                    </li>
                    <li class="snu-li-03" :class="{ active: navIndx=='billList' }" >
                          <router-link :to="{ name: 'B-userInfo-billList' , query: { userId: userId }}" >账单流水</router-link>
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