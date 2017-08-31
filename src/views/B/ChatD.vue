<template>
    <div class="chart-wrpaper clearfix">
        <div class="chart-left">
            <div class="box-flex-media-box">
                <div class="flex1 chart-left-title">
                    <h3>{{subTask.projectName}}</h3>
                </div>
                <el-button type="sure" @click="$router.push({name:'B_ChatT', query: $route.query})">&lt;{{$lang('返回总任务')}}</el-button>
                <el-button type="sure" @click="$router.push({name:'B_TaskChildDetail',query: { id: $route.query.id }})">{{$lang('查看任务')}}&gt;</el-button>
            </div>
            <div class="chart-left-list">
                <ul class="chart-left-ul">
                    <li class="chart-left-li" v-for="(item,i) in taskStage" :key="i">
                        <div class="box-flex-media-box cl-top">
                            <p class="num">
                                <em>{{i + 1}}</em>
                            </p>
                            <a href="javascript:;" class="title flex1">
                                <h4>{{item.stageName}}</h4>
                            </a>
                            <!--<el-button size="small"  type="info" style="z-index: 1" >{{$lang('查看聊天记录')}}</el-button>-->
                            <el-button size="small" type="info" @click="$router.push({name:'B_History',query: { id: item.id, index: i }})">{{$lang('查看历史')}}</el-button>
                        </div>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('截止时间')}}：</dt>
                            <dd class="flex1">{{item.stageEndTime}}</dd>
                        </dl>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('阶段详情')}}：</dt>
                            <dd class="flex1">{{item.stageRemarks}}</dd>
                        </dl>
                    </li>
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <p class="num">
                                <em>{{taskStage.length + 1}}</em>
                            </p>
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('验收')}}</h4>
                                <p>{{$lang('截止时间')}}：{{subTask.taskEndTime}}</p>
                            </a>
                            <el-button size="small" type="info" @click="$router.push({name:'B_TaskCheck',query: { id: subTask.id }})" v-if="$route.query.state==6">{{$lang('去验收')}}</el-button>
                            <el-button size="small" type="info" @click="$router.push({name:'B_DTaskCheck',query: { id: subTask.id }})" v-else>{{$lang('预览')}}</el-button>
                            <el-button size="small" type="info" @click="$router.push({name:'B_History',query: { id: subTask.id, index: -1 }})">{{$lang('查看历史')}}</el-button>
                        </div>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('阶段详情')}}：</dt>
                            <dd class="flex1">{{subTask.remarks}}</dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="Object.keys(chatConfig).length>0">
            <Chat :chatConfig="chatConfig" :isHistory="true" :isReserve="false"></Chat>
        </div>
        <div v-else class="chart-right" style="background: none">
            <div class="chart-msg">{{msg}}</div>
        </div>
        <SlideBtns :type="'back'"></SlideBtns>
    </div>
</template>
<style>
.undelete .el-icon-close {
    display: none !important;
}
</style>
<script>
import Chat from '@/components/Chat'
import SlideBtns from '@/components/SlideBtns'
import { ChildTaskInfo, AcceptanceTask, getTalkByGroupId } from '@/apis/task'
export default {
    components: { Chat, SlideBtns },
    data() {
        return {
            subTask: {},
            taskStage: [],
            chatConfig: {},
            msg: $lang("正在加载中..."),
        }
    },
    async mounted() {
        const me = this;
        const id = this.$route.query.id;

        const qq = await getTalkByGroupId(id);
        console.log(id + $lang("获取聊天组信息"), qq)
        if (qq.success) {
            if (qq.data && qq.data.groupDetails && qq.data.groupDetails.data && qq.data.sChatUser && qq.data.sChatUser.entities) {
                this.chatConfig = {
                    groupid: qq.data.groupDetails.data[0].id,
                    userid: qq.data.sChatUser.entities[0].username,
                    userimg: qq.data.sUser.info.headUrl,
                    username: qq.data.sUser.info.nickName || qq.data.sUser.phone,
                    userRole: "S",
                    youname: qq.data.targetUser.info.nickName || qq.data.targetUser.phone,
                    youimg: qq.data.targetUser.info.headUrl,
                    youRole: "V",
                }
            } else {
                this.msg = $lang("聊天相关数据出现异常");
            }
        } else {
            this.msg = qq.msg;
        }

        // const id = this.$route.query.id;

        const res = await ChildTaskInfo(id);
        if (res.success) {
            this.subTask = res.data.subTask;
            this.taskStage = res.data.taskStage;
        } else {
            this.$message.warning(res.msg)
        }
    }
}
</script>
