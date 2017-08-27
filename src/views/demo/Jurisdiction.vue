<template>
    <div class="header-main clearfix">
        <h1 class="header-logo">
            <a href="javscirpt:;" class="">
                <img src="../assets/images/logo.png" />
            </a>
        </h1>
        <div class="header-main-right">
            <div class="login-yes-nav">
                <div class="fr">
                    <el-badge :value="4" :max="99" class="item" v-if="isLogin">
                        <el-button type="text">消息</el-button>
                    </el-badge>
                    <el-button type="text">联系我们</el-button>
                    <el-button type="text">帮助中心</el-button>
                    <el-button type="text" @click="onNavigation('S-userInfo-base')" v-if="isLogin">个人中心</el-button>
                    <el-button type="text" @click="onNavigation('login')" v-if="isLogin">退出登录</el-button>
                </div>

                <div class="fr" v-if="isLogin">
                    <a href="javascript:;" class="header-user-a">
                        <div class="box-flex-media-box">
                            <p class="user-header"><img src="../assets/images/user-header.png" /></p>
                            <p class="name flex1">呵呵哈哈</p>
                        </div>
                    </a>
                </div>
            </div>

            <div class="nav-wrap">
                <el-button v-bind:type="tag=='B-create'?'sure':'text'" @click="onNavigation('B-create')">新建任务</el-button>
                <el-button v-bind:type="tag=='B_list'?'sure':'text'" @click="onNavigation('B_list')">大厅</el-button>
                <el-button type="text">制作中心</el-button>
                <el-button type="text" @click="$router.push({name:'notices'})">通知中心</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { getUser } from '@/apis/storage.js'
export default {
    data() {
        return {
            tag: 'B_list'
        }
    },
    computed: {
        isLogin() {
            const LoginUser = getUser()
            return LoginUser.userId ? true : false;
        }
    },
    methods: {
        onNavigation(name) {
            this.$router.push({ name: name })
        }
    }
}
</script>