<template>
    <div class="content-wrapper">

        <div class="userInfo-wrap">
            <div class="user-info-banner">
                <img src="../../assets/images/user-info-banner.jpg" />
            </div>
            <div class="user-info-main clearfix">
                <div class="ui-slide-left">
                    <div style="text-align:center;margin-top:20px;">
                        <el-button type="sure" @click="toFenPei">&lt;返回指派页</el-button>
                    </div>
                    <ul class="slide-nav-ul">
                        <li class="snu-li-01" :class="{ active: navIndx=='base' }">
                            <router-link :to="{ name: 'S-VuserInfo-base',query: { userId: userId }}">{{$lang('基本信息')}}</router-link>
                        </li>
                        <li class="snu-li-03" :class="{ active: navIndx=='ability' }">
                            <router-link :to="{ name: 'S-VuserInfo-ability',query: { userId: userId }}">{{$lang('能力管理')}}</router-link>
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
import { isLogin, getUser } from '@/apis/storage'
import SlideBtns from '@/components/SlideBtns'

export default {
    components: {
        SlideBtns
    },
    props: ['id'],
    data() {
        return {
            navIndx: 'base',
            userId: this.id || getUser().userId,
            pageState: JSON.parse(sessionStorage.pageState)
        }
    },
    created() {
        console.log(this.id, '|', this.$route.query.userId, getUser().userId);
        this.navIndx = this.getStatus(this.$route.path);
        //拼接路由中的query
        if (this.$route.query && this.$route.query.userId) {
            this.userId = this.$route.query.userId
        } else {
            this.userId = this.id || getUser().userId
        }
    },
    watch: {
        '$route.path': function(val, oldVal) {
            this.navIndx = this.getStatus(val)
        }
    },
    methods: {
        getStatus(urlStr) {
            var urlStrArr = urlStr.split('/')
            return urlStrArr[urlStrArr.length - 1]
        },
        toFenPei() {
            sessionStorage.removeItem('pageState');
            this.$router.push({ name: 'toFenPei', query: this.pageState });
        }
    }
}
</script>