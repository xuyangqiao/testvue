<template>
    <div class="task-set-item">
        <router-link :to="to" href="javascript:;" class="tsi-a">
            <img v-if="imageUrl" src="" :src="imageUrl"/>
            <img v-if="!imageUrl" src="../assets/images/img-item.jpg"/>
            <div class="task-info_show">
                <div class="vg-center ">
                    <p>项目名称：{{projectName}}</p>

                    <p>任务截止时间：{{time == "Invalid date" ? '' : time}}</p>
                    <p>项目金额：<span v-if="totalType == '1'">询价</span><span v-else>¥{{total || '未填写'}}</span></p>
                </div>
            </div>
            <div class="news-tips-w">
                <p>{{stateName}}</p>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        props: ["to", "projectName", "time", "total", "totalType", "userType", "state", "imageUrl","stateName"],
        computed: {
            color(){
                const colors = ["dsh", "dsh", "shz", "ysl", "ywc"]
                return colors[this.state]
            }
        },
    }
</script>
