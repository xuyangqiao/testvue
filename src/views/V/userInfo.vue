<template>
    <div class="content-wrapper">

        <div class="userInfo-wrap">
            <div class="user-info-banner">
                <img src="../../assets/images/user-info-banner.jpg" />
            </div>
            <div class="user-info-main clearfix">
                <div class="ui-slide-left">
                    <ul class="slide-nav-ul">
                        <li class="snu-li-01" :class="{ active: navIndx=='base' }">
                            <router-link :to="{ name: 'V-userInfo-base', query: { userId: userId }}">{{$lang('基本信息')}}</router-link>
                        </li>
                        <li class="snu-li-02" :class="{ active: navIndx=='identify' }">
                            <router-link :to="{ name: 'V-userInfo-identify',query: { userId: userId }}">{{$lang('身份验证')}}</router-link>
                        </li>
                        <li class="snu-li-03" :class="{ active: navIndx=='ability' }">
                            <router-link :to="{ name: 'V-userInfo-ability',query: { userId: userId }}">{{$lang('能力管理')}}</router-link>
                        </li>
                        <li class="snu-li-04" :class="{ active: navIndx=='finance' }">
                            <router-link :to="{ name: 'V-userInfo-finance' ,query: { userId: userId }}">{{$lang('财务信息')}}</router-link>
                        </li>
                        <li class="snu-li-02" :class="{ active: navIndx=='reapply' }">
                            <router-link :to="{ name: 'V-userInfo-reApply',query: { userId: userId }}">{{$lang('重新认证')}}</router-link>
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
import { isLogin, getUser } from "@/apis/storage";
import SlideBtns from "@/components/SlideBtns";

export default {
  components: {
    SlideBtns
  },
  data() {
    return {
      navIndx: "base",
      userId: getUser().userId
    };
  },
  created() {
    this.navIndx = this.getStatus(this.$route.path);
    //拼接路由中的query
    if (this.$route.query && this.$route.query.userId) {
      this.userId = this.$route.query.userId;
    } else {
      this.userId = getUser().userId;
    }
  },
  watch: {
    "$route.path": function(val, oldVal) {
      this.navIndx = this.getStatus(val);
    }
  },
  methods: {
    getStatus(urlStr) {
      var urlStrArr = urlStr.split("/");
      return urlStrArr[urlStrArr.length - 1];
    }
  }
};
</script>