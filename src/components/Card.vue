<template>
    <div class="task-set-item">
        <router-link :to="to" href="javascript:;" class="tsi-a">
            <img v-if="imageUrl" src="" :src="imageUrl" />
            <img v-if="!imageUrl" src="../assets/images/img-item.jpg" />
            <div class="task-info_show">
                <div class="vg-center ">
                    <p>{{$lang('项目名称：')}}{{projectName}}</p>

                    <p>{{$lang('任务截止时间：')}}{{time == "Invalid date" ? '' : time}}</p>
                    <p>{{$lang('项目金额：')}}
                        <span v-if="totalType == '1'">{{$lang('询价')}}</span>
                        <span v-else>¥{{total || '未填写'}}</span>
                    </p>
                </div>
            </div>
            <div class="news-tips-w" :class="{unread}">
                <p>{{stateName}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ["to", "projectName", "time", "total", "totalType", "userType", "state", "imageUrl", "stateName", "unread"],
    computed: {
        color() {
            const colors = ["dsh", "dsh", "shz", "ysl", "ywc"]
            return colors[this.state]
        }
    },
}
</script>

<style>
.news-tips-w.unread::before {
    top: 12px;
    left: 27px;
    width: 10px;
    content: '';
    height: 10px;
    position: absolute;
    border-radius: 50%;
    display: inline-block;
    background-color: red;
}
</style>