<template>
    <div class="new-header">
        <div class="header-top clearfix">
            <div class="header-top-main">
                <div class="fr">
                    <div class="htm-jh box-flex-media-box">
                        <a href="javascript:;" class="nh-a-01 box-flex-media-box" @click="bUserType!=='1'?onNavigation('B-userInfo-','userInfo'):null">
                            <i class="people"><img :src="headUrl" /></i>
                            <p class="flex1 user-name">{{nickName}}</p>
                        </a>
                        <a href="javascript:;" class="nh-a-02" @click="onNavigation('B-userInfo-','userInfo')" v-if="bUserType!=='1'">{{$lang('个人中心')}}</a>
                        <a href="javascript:;" class="nh-a-02" @click="onNavigation('login','login')">{{$lang('退出登录')}}</a>
                        <p>
                            <a href="javascript:;" class="nh-a-03" :class="{selected:lang=='CN'}" @click="$setLang('CN')">CN</a>
                            <span>|</span>
                            <a href="javascript:;" class="nh-a-03" :class="{selected:lang=='EN'}" @click="$setLang('EN')">EN</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-content box-flex-media-box">
            <h1 class="h1-logo flex1"><img src="../../assets/images/logo.png" /></h1>
            <ul class="nav-ul-jh box-flex-media-box">
                <li class="nav-li-jh">
                    <a href="javascript:;" :class="navIndx=='create'&&'active'" @click="onNavigation('B-create','create')" v-if="bUserType!=='2'">{{$lang('创建任务')}}</a>
                </li>
                <li class="nav-li-jh">
                    <a href="javascript:;" :class="navIndx=='index'&&'active'" @click="onNavigation('B_Index','index')">{{$lang('大厅')}}</a>
                </li>
                <li class="nav-li-jh">
                    <a href="javascript:;" :class="navIndx=='list'&&'active'" @click="onNavigation('B_list','list')" v-if="bUserType!=='2'">{{$lang('制作中心')}}</a>
                </li>
                <li class="nav-li-jh">
                    <a href="javascript:;" v-if="!bUserType" @click="$router.push({name:'B_Notices'})">{{$lang('通知中心')}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getUser, isLogin, getUserInfo } from '@/apis/storage.js'
export default {
    data() {
        return {
            navIndx: 'index',
            headUrl: '',
            nickName: '',
            bUserType: '',
        }
    },
    created() {
        this.navIndx = this.getStatus(this.$route.path);
        this.headUrl = getUserInfo().headUrl || "http://vsdata.oss-cn-hangzhou.aliyuncs.com/head.jpg";
        this.nickName = getUserInfo().nickName || getUser().phone;
        this.bUserType = getUser().bUserType;//B端子用户类别
        let navIndxName = this.$route.name;
    },
    computed: {
        isLogin() {
            return isLogin()
        }
    },
    watch: {
        '$route.path': function(val, oldVal) {
            this.navIndx = this.getStatus(val)
        }
    },
    methods: {
        onNavigation(name, navIndx) {
            this.navIndx = navIndx;
            if (name.indexOf('user') > -1) {
                if (this.bUserType && this.bUserType == "2") {
                    name = name + "paying"
                } else {
                    name = name + 'base'
                }
            }
            this.$router.push({ name: name })
        },
        getStatus(urlStr) {
            var urlStrArr = urlStr.split('/')
            return urlStrArr[urlStrArr.length - 1]
        }
    }
}
</script>
