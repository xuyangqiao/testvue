<template>
    <div class="new-header">
        <div class="header-top clearfix">
            <div class="header-top-main">
                <div class="fr">
                    <div class="htm-jh box-flex-media-box">
                        <p class="mar-15">
                            <a href="javascript:;" class="nh-a-04" @click="onNavigation('login',5)">{{$lang('登录')}}</a>/<a href="javascript:;" class="nh-a-04" @click="onNavigation('choise',6)">{{$lang('注册')}}</a>
                        </p>
                        <SetLang></SetLang>
                    </div>
                </div>
              </div>
           </div>
          <div class="header-content box-flex-media-box">
               <h1 class="h1-logo flex1"><img src="../assets/images/logo.png"/></h1>
               <ul class="nav-ul-jh box-flex-media-box">
                   <!--
                   <li class="nav-li-jh"><a href="javascript:;" :class="active==1&&'active'" @click="onNavigation('login',1)">{{$lang('新建任务')}}</a></li>
                   <li class="nav-li-jh"><a href="javascript:;" :class="active==2&&'active'" @click="onNavigation('login',2)">{{$lang('大厅')}}</a></li>
                   <li class="nav-li-jh"><a href="javascript:;" :class="active==3&&'active'" @click="onNavigation('login',3)">{{$lang('制作中心')}}</a></li>
                   <li class="nav-li-jh"><a href="javascript:;" :class="active==4&&'active'" @click="onNavigation('login',4)">{{$lang('通知中心')}}</a></li>
                   -->
               </ul>
           </div>
       </div>

</template>
<script>
import { getUser } from '@/apis/storage.js'
import SetLang from'@/components/SetLang' 
export default {
    components: {SetLang},
    data() {
        return {
            active: 2
        }
    },
    methods: {
        onNavigation(name, active) {
            this.active = active;
            this.$router.push({ name: name })
        }
    }
}
</script>
