<template>
    <div>
        <h3 class="main-title">{{title}}</h3>
        <div class="all-task-base">
            <el-row>
                <el-col :span="11">
                    <div class="img-wrapper">
                        <img v-if="form.url" :src="form.url" />
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="">
                        <dl class="box-flex info-show">
                            <dt>{{$lang('任务ID:')}}</dt>
                            <dd class="flex1">{{form.id}}</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>{{$lang('项目名称:')}}</dt>
                            <dd class="flex1">{{form.projectName}}</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>{{$lang('发包类型:')}}</dt>
                            <dd class="flex1">{{packageTypeName}}</dd>
                        </dl>
                        <dl class="box-flex info-show" v-if="!isZong">
                            <dt>{{$lang('任务报名时间:')}}</dt>
                            <dd class="flex1">{{form.entryEndTime}}</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>{{$lang('任务结束时间:')}}</dt>
                            <dd class="flex1">{{form.taskEndTime}}</dd>
                        </dl>
                        <dl class="box-flex info-show" v-if="isZong">
                            <dt>{{$lang('任务分组:')}}</dt>
                            <dd class="flex1">{{form.groupName}}</dd>
                        </dl>
                        <dl class="box-flex info-show" v-if="form.audit&&form.audit.objection">
                            <dt>{{$lang('驳回理由:')}}</dt>
                            <dd class="flex1">{{form.audit.objection}}</dd>
                        </dl>
                        <dl class="box-flex info-show" v-if="form.subTaskExit&&form.subTaskExit.remarks">
                            <dt>{{$lang('退款驳回原因:')}}</dt>
                            <dd class="flex1">{{form.subTaskExit.remarks}}</dd>
                        </dl>
                    </div>
                    <div class="task-progress-wrap">
                        <p class="task-progress task-progress-ing">{{stateName}}</p>
                    </div>

                </el-col>
                <el-col :span="3" v-if="isZong">
                    <p class="all-task-price" v-if="form.totalType==2">
                        <em>¥</em>{{form.total}}</p>
                    <p class="all-task-price" v-else>
                        <em>{{$lang('询价')}}</em>
                    </p>
                </el-col>
                <el-col :span="3" v-else>
                    <p class="all-task-price">
                        <em>¥</em>{{form.total}}</p>
                </el-col>
            </el-row>
        </div>
        <div class="master-name" v-if="showHead">
            <div class="user-header" @click="toBuserInfo">
                <img :src="User.headUrl" />
            </div>
            <p>{{$lang('雇主：')}}{{User.nickName}}</p>
        </div>
        <SlideBtns :type="'back'"></SlideBtns>

    </div>
</template>
<script>
import { TaskInfoById, ChildTaskInfo, TaskState, ChildTaskState } from '@/apis/task'
import { getAllFile } from '@/apis/files'
import { CheckUserInfoV } from '@/apis/person.js'
import { getUser } from '@/apis/storage'
import SlideBtns from '@/components/SlideBtns'

export default {
    components: {
        SlideBtns
    },
    props: {
        onload: Function,
        title: {
            type: String,
            default() {
                return $lang("总任务详情");
            }
        },
        isZong: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            default: "B"
        },
        name: String,
        userType: String
    },
    data() {
        return {
            form: {
                projectName: '',
                state: '',
                total: '',
                packageType: '',
                taskEndTime: '',
                entryEndTime: '',
                group: '',
                groupName: '',
                vUserId: '',
                sUserId: '',
                bUserId: '',
                url: ''
            },
            User: {
                success: false,
                nickName: "",
                headUrl: "http://vsdata.oss-cn-hangzhou.aliyuncs.com/head.jpg"
            },
            imageUrl: '',
            showHead: false,


            fileData: null
        }
    },
    created() {
        this.showHead = getUser().userType == "S"
    },
    computed: {
        stateName() {
            if (this.name) {
                return this.name;
            } else {
                if (this.isZong) {
                    return TaskState(this.role, this.form.state)
                } else {
                    return ChildTaskState(this.role, this.form.state)
                }
            }
        },
        packageTypeName() {
            const map = ["公开", "私密"]
            return map[this.form.packageType || 0]
        },
        userTypeName() {
            return this.userType ? { "B": "雇主 :", "S": "平台 :", "V": "服务商 :" }[this.userType] : ""
        }
    },
    methods: {
        toBuserInfo() {
            this.form.bUserInfo && this.form.bUserInfo.userId ? this.$router.push({ name: 'S-BuserInfo', query: { userId: this.form.bUserInfo.userId } }) : null
        }
    },
    async mounted() {
        const me = this;
        let id = this.$route.query.id, res;
        if (this.isZong) {
            res = await TaskInfoById(id);
            Object.assign(this.form, res.data)
            console.log("...总任务...", this.form)
        } else {
            res = await ChildTaskInfo(id);
            if (!res.success) {
                console.log("子任务查询失败" + res.msg)
                return;
            }
            console.log("...子任务...", res)
            if (res && res.data && res.data.subTask) {
                Object.assign(this.form, res.data.subTask);
            }
        }
        if (this.showHead) {
            if (this.form.bUserInfo && this.form.bUserInfo.userId) {
                this.User.headUrl = this.form.bUserInfo.headUrl || "http://vsdata.oss-cn-hangzhou.aliyuncs.com/head.jpg";
                this.User.nickName = this.form.bUserInfo.nickName || "";
            }
        }
        const fileRes = await getAllFile("", id);
        let fileData = fileRes.data;
        this.fileData = (fileRes.data || []).sort((a, b) => new Date(a.createTime) > new Date(b.createTime) ? -1 : 1)[0];
        this.onload && this.onload(this.form, fileData);
    }
}
</script>
