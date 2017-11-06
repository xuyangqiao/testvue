<template>
    <div class="task-set-item">
        <router-link :to="route" class="tsi-a" target="_blank">
            <img v-if="imageUrl" :src="imageUrl" />
            <img v-else src="../assets/images/img-item.jpg" />
            <div class="task-info_show">
                <div class="vg-center ">
                    <p>{{$lang('任务名称：')}}{{projectName}}</p>

                    <p>{{$lang('任务截止时间：')}}{{time == "Invalid date" ? '' : time}}</p>
                    <p>{{$lang('任务金额：')}}
                        <span v-if="totalType == '1'">{{$lang('询价')}}</span>
                        <span v-else>¥{{total || '未填写'}}</span>
                    </p>
                </div>
            </div>
            <div class="news-tips-w" :class="{unread}">
                <p>
                    <span>{{stateName}}</span>
                    <el-button type="text" v-if="$route.name=='B_list'&&['0','1','3'].includes(state)" @click.prevent="remove">删除</el-button>
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>
import { removeTask } from '@/apis/task';

export default {
    props: ["to", "projectName", "time", "total", "totalType", "userType", "state", "imageUrl", "stateName", "unread", 'isDialog', 'origin', 'item', 'list'],
    computed: {
        color() {
            const colors = ["dsh", "dsh", "shz", "ysl", "ywc"]
            return colors[this.state]
        },
        route() {
            console.log(this.$route);
            this.to.query = Object.assign({}, this.to.query, { newTab: true, origin: this.origin });
            return this.to;
        }
    },
    methods:{
        remove(){
            this.$confirm(`确定删除 “${this.projectName}” 吗？`,'提示').then(async data => {
                if (data == 'confirm') {
                    let res = await removeTask(this.item.id);
                    if(res.success){
                        this.list.splice(this.list.indexOf(this.item), 1);
                    } else {
                        res.msg && this.$message.error(res.msg);
                    }
                }
            })
        }
    }
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

.task-set-item .el-button {
    float: right;
    color: red;
    padding: 0px;
    line-height: 35px;
}
</style>