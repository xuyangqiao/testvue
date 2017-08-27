<template>
    <div class="base-account-wrapper">
        <div class="userinfo-nav">
            <el-button :type="navIndex==1?'sure':'text'" @click="navIndex=1">基本信息</el-button>
            <el-button :type="navIndex==2?'sure':'text'" @click="navIndex=2">工作区间</el-button>
        </div>
        <BaseUserInfo ref="baseInfo" :userId="userId" :hasEdit="hasEdit" v-if="navIndex==1"></BaseUserInfo>
        <div v-if="navIndex==2" class="gzqj-wrap" v-loading="loading">
            <el-form ref="form" label-width="90">
                <el-form-item label="工作区间:">
                    <el-time-select placeholder="起始时间" v-model="startTime" :disabled="!hasEdit">
                    </el-time-select>
                    <el-time-select placeholder="结束时间" v-model="endTime" :disabled="!hasEdit" :picker-options="{ minTime: startTime }">
                    </el-time-select>
                </el-form-item>
            </el-form>
            <div class="gzqj-btn" style="padding:10px 0 0 70px;" v-if="hasEdit">
                <el-col :span="11">
                    <el-button type="sure" @click='modifyWorkInterval'>确定</el-button>
                </el-col>
                <el-col :span="11" :offset="2">
                    <el-button type="cancle" @click='cancle'>取消</el-button>
                </el-col>
            </div>
        </div>
        <el-dialog title="Tips" :visible.sync="dialogVisible" size="tiny">
            <span>是否放弃编辑？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false,nextTo=false">取消</el-button>
                <el-button type="sure" @click="cancalEdit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import BaseUserInfo from '@/components/BaseUserInfo'
import { UpdateWorkIntervalV, CheckUserInfoV } from '@/apis/person'
import { isLogin, getUser } from '@/apis/storage'
export default {
    components: {
        BaseUserInfo
    },
    data() {
        return {
            loading: false,
            dialogVisible: false,
            nextTo: false,
            navIndex: 1,
            hasEdit: true,
            userId: "",
            id: "",
            startTime: "",
            endTime: "",
            oldStartTime: "",
            oldendTime: "",
        }
    },
    created() {
        this.userId = this.$route.query.userId || getUser().userId;
        this.hasEdit = getUser().userType == 'V';
        this.getData(this.userId);
    },
    methods: {
        cancle() {
            this.navIndex = 1;
            this.edit = false;
            [this.startTime, this.endTime] = [this.oldStartTime, this.oldendTime]
        },
        async getData(id) {
            const me = this;
            const res = await CheckUserInfoV({ userId: id || "" });
            if (res.success) {
                let UserInfo = res.data;
                if (UserInfo.workInterval) {
                    this.id = UserInfo.id;
                    [me.startTime, me.endTime] = [me.oldStartTime, me.oldendTime] = UserInfo.workInterval.split('-')
                }
            } else {
                this.$message.error(res.msg)
            }
        },
        async modifyWorkInterval() {
            if (!this.startTime) {
                this.$message.warning('请选择起始时间');
            } else if (!this.endTime) {
                this.$message.warning('请选择结束时间');
            } else {
                this.loading = true;
                let param = {
                    workInterval: this.startTime + '-' + this.endTime,
                    userId: this.userId,
                    id: this.id
                }
                const res = await UpdateWorkIntervalV(param);
                this.loading = false;
                if (res.success) {
                    this.$message.success("操作成功！")
                    let workInterval = res.data.workInterval;
                    [this.startTime, this.endTime] = [this.oldStartTime, this.oldendTime] = workInterval.split('-');
                    this.navIndex = 1;
                } else {
                    this.$message.error(res.msg);
                }
            }
        },
        cancalEdit() {
            this.$router.push({ name: this.nextTo })
            this.dialogVisible = false;
        }
    },
    beforeRouteLeave(to, from, next) {
        if ((this.$refs.baseInfo && this.$refs.baseInfo.edit) || this.navIndex == 2) {
            this.dialogVisible = true;
            if (this.nextTo) {
                next()
            } else {
                next(false)
                this.nextTo = to.name
            }
        } else {
            next()
        }
    }
}
</script>