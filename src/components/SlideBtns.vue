<template>
    <!--放左边是fixed-left   放右边是fixed-right-->
    <div v-if="!$route.query.newTab">
        <div class="fixed-slide fixed-left" v-if="type=='back'">
            <a href="javascript:;" class="slide-btn-wrap slide-btn-01" @click="onNavigation()">
                <i></i>
                <em>{{$lang('返回')}}</em>
            </a>
        </div>
        <div class="fixed-slide fixed-right" v-if="type=='list'">
            <a href="javascript:;" class="slide-btn-wrap slide-btn-02" @click="onNavigation('login')">
                <i></i>
                <em>{{$lang('联系我们')}}</em>
            </a>
            <a href="javascript:;" class="slide-btn-wrap slide-btn-03" @click="onNavigation('choise')">
                <i></i>
                <em>{{$lang('帮助中心')}}</em>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ["to", "type"],
    methods: {
        onNavigation(name) {
            if (name) {
                this.$router.push({ name: name })
            } else {
                this.$router.go(-1)
            }
        }
    }
}
</script>