<template>
  <div class="content-wrapper">
 
      <div class="userInfo-wrap">
          <div class="user-info-banner">
              <img src="../../assets/images/user-info-banner.jpg"/>
          </div>
          <div class="user-info-main clearfix">
              <div class="ui-slide-left">
                  <ul class="slide-nav-ul">
                     <li class="snu-li-01" :class="{ active: navIndx=='base' }" >
                        <router-link  :to="{ name: 'S-userInfo-base' }">基本信息</router-link>
                    </li>
                     <li class="snu-li-03" :class="{ active: navIndx=='manage' }" >
                        <router-link :to="{ name: 'S-userInfo-manage' }">信息管理</router-link>
                    </li>
                  </ul>
              </div>
              <div class="ui-slide-right">
                 <router-view></router-view>
              </div>
            <SlideBtns :type="'back'"></SlideBtns>

          </div>
      </div>
  </div>
</template>

<script>
import SlideBtns from '@/components/SlideBtns'
  export default {
    components:{
        SlideBtns
    },
    data() {
        return {
            navIndx:'base'
        }
      },
    created () {
      this.navIndx=this.getStatus(this.$route.path);
    },
    watch:{
        '$route.path':function(val,oldVal){
            this.navIndx=this.getStatus(val)
        }
    },
    methods: {
        getStatus (urlStr) {
          var urlStrArr = urlStr.split('/')
          return urlStrArr[urlStrArr.length - 1]
        }
    }
  }
</script>