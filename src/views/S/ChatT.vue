<template>
    <div class="chart-wrpaper clearfix">
        <div class="chart-left">
            <div class="box-flex-media-box">
                <div class="flex1 chart-left-title">
                    <h3>{{taskInfo.projectName}}</h3>
                </div>
                <el-button type="sure" @click="toRedirectT">查看任务&gt;</el-button>
            </div>
            <div class="chart-left-list">
                <ul class="chart-left-ul">
                    <!--待确认-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>待确认</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(0).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(0)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="m.url" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="changStateToPay(m.id)">确认&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more" @click="$router.push({name:'S_SonTaskInfo',query: { id: m.id }})">查看&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--待支付-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4 class="height70">待支付</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(1).length">
                            <el-checkbox-group v-model="zhifuIds">
                                <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(1)" :key="i">

                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header">
                                                <img :src="m.url" />
                                            </p>
                                            <p class="name flex1">{{m.projectName}}</p>
                                        </div>
                                    </div>
                                    <div class="moey">
                                        <p>{{'￥' + m.total}}</p>
                                    </div>
                                    <a href="javascript:;" class="more" @click="$router.push({name:'S_SonTaskInfo',query: { id: m.id }})">查看&gt;</a>
                                </li>
                            </el-checkbox-group>
                        </ul>
                    </li>
                    <!--征集中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>征集中</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(2).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(2)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="m.url" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'toFenPei',query: { id: m.id }})">查看&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more" @click="openApplyRefund(m.id)">申请退款&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--制作中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>制作中</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(3).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(3)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="m.url" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'S_ChatD',query: { id: m.id }})">查看&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more" @click="$router.push({name:'toFenPei',query: { id: m.id, state: 5 }})">重新指派&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more" @click="openApplyRefund(m.id)">申请退款&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--验收中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>验收中</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(4).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(4)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="m.url" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'S_ChatD',query: { id: m.id }})">查看&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--完成-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>完成</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(5).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(5)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="m.url" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <div class="moey">
                                    <p>{{'￥' + m.total }}</p>
                                </div>
                                <a href="javascript:;" class="more" @click="toShowPay(i)" style="margin-right:20px">去打款</a>
                                <a href="javascript:;" class="more" @click="$router.push({name:'S_ChatD',query: { id: m.id,isOnlyChat:true }})">查看&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--已打款-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>已打款</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(6).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(6)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="m.url" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'S_ChatD',query: { id: m.id,isOnlyChat:true }})">查看&gt;</a>
                            </li>
                        </ul>
                    </li>
                    <!--"退款申请中"-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>退款申请中</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(7).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(7)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="m.url" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'S_ChatD',query: { id: m.id,isOnlyChat:true }})">查看&gt;</a>
                            </li>
                        </ul>
                    </li>
                    <!--已关闭-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>已关闭</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(8).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(8)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="m.url" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'S_ChatD',query: { id: m.id,isOnlyChat:true }})">查看&gt;</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="Object.keys(chatConfig).length>0">
            <Chat ref="chat" :chatConfig="chatConfig" :isReserve="true"></Chat>
        </div>
        <div v-else class="chart-right" style="background: none">
            <div class="chart-msg">{{msg}}</div>
        </div>
        <!--去支付弹层-->
        <el-dialog title="支付" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <div class="pay-dialog-wrap">
                <!--申请支付-->
                <div class="apply-payment-wrap" style="display:none;">
                    <div class="apply-people-wrap">
                        <h4 class="title-h4-dig">确定任务：</h4>
                        <div class="apply-pay-people">
                            <div class="box-flex-media-box" v-for="(m,i) in getChilds(5)" :key="i">
                                <p class="user-header">
                                    <img :src="m.vUserInfo ? m.vUserInfo.headUrl : ''" />
                                </p>
                                <p class="name">{{m.projectName}}</p>
                            </div>
                            <!--<div class="box-flex-media-box">-->
                            <!--<p class="user-header"><img src="../../assets/images/user-header.png"/></p>-->
                            <!--<p class="name">呵呵哈哈</p>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <div class="money-num">
                        <p>付款金额：
                            <em>2000</em>元</p>
                    </div>

                    <!--申请付款 和 已发起付款 两种选择-->
                    <div class="fqfk-wrap">
                        <span>已发起付款</span>
                    </div>
                    <div class="payment-btn-wrap">
                        <el-button type="sure">申请支付</el-button>
                    </div>
                </div>

                <!--点击申请支付后 付款-->
                <div class="payment-method-wrap">
                    <div class="box-flex-media-box">
                        <p class="flex1">付款金额：
                            <em>{{toPayMoney}}</em>元</p>
                        <div class="pm-cz-btn">
                            <div class="box-flex-media-box">
                                <el-button type="sure">充值</el-button>
                                <p class="marg-left-10">余额：400 元</p>
                            </div>
                        </div>
                    </div>
                    <p class="yebz-tips">*余额不足请充值。</p>
                    <div class="zffs-div">
                        <ul class="clearfix">
                            <li class="zffs-li active">
                                <span class="zf-zfb">
                                    <i></i>
                                </span>
                                <p>支付宝支付</p>
                            </li>
                            <li class="zffs-li">
                                <span class="zf-wx">
                                    <i></i>
                                </span>
                                <p>微信支付</p>
                            </li>
                            <li class="zffs-li">
                                <span class="zf-ye">
                                    <i></i>
                                </span>
                                <p>余额支付</p>
                            </li>
                        </ul>
                    </div>
                    <div class="payment-btn-wrap">
                        <el-button type="sure" @click="toPay">付款</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <SlideBtns :type="'back'"></SlideBtns>

        <el-dialog title="申请退款" size="tiny" :visible.sync="dialog.applyRefund.show">
            <el-form :model="dialog.applyRefund.form" :rules="dialog.applyRefund.rules" ref="form">
                <el-form-item label="百分比：" prop="percent">
                    <el-input type="text" class="percent" v-model.trim="dialog.applyRefund.form.percent">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="退款原因：" prop="reason">
                    <el-input type="textarea" :rows="4" v-model.trim="dialog.applyRefund.form.reason"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="applyRefund">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<style>
.chart-wrpaper .el-checkbox__label {
    display: none;
}

.percent {
    width: 100px;
}

.shoujiicon {
    width: 15px;
    height: 20px;
    margin-left: 20px;
    position: relative;
    top: 2px;
}
</style>

<script>

import Chat from '@/components/Chat'
import SlideBtns from '@/components/SlideBtns'
import { ChildTaskList, ChildTaskState, TaskInfoById, PayChildTask, getTalkByGroupId, UpdateChildTask, UpdateChildTaskForSure, applyRefund } from '@/apis/task'
import { SToVpayMoney, SToVTopayMoney } from '@/apis/money'
var shouji = require("../../assets/images/phone.jpg");
export default {
    components: { Chat, SlideBtns },
    data() {
        return {
            zhifuIds: [],
            dialogVisible: false,   //去支付
            stateGroup: [],
            taskInfo: {},
            // tabState:0,
            // tabState1: false,
            // tabState2: false,
            // tabState3: false,
            // tabState4: false,
            // tabState5: false,
            // tabState6: false,
            // tabState7:false,
            // tabState8:false,
            // tabState9:false,
            // targetUser:{},
            // myUser:{},
            toPayMoney: "",
            toPayId: "",
            msg: "正在加载聊天...",
            chatConfig: {

            },

            dialog: {
                applyRefund: {
                    show: false,
                    form: {
                        id: null,
                        reason: '',
                        percent: 100
                    },
                    rules: {
                        reason: [{ required: true, message: '请填写退款原因', trigger: 'blur' }],
                        percent: [
                            {
                                validator(rule, value, callback) {
                                    if (value > 0 && value <= 100) {
                                        callback();
                                    } else {
                                        callback(new Error('百分比在0~100之间(不包括0)'));
                                    }
                                }, trigger: 'change'
                            }
                        ]
                    }
                }
            }
        }
    },
    async mounted() {
        // alert(this.tabState)
        let id = this.$route.query.id;
        if (id.indexOf("SubTask-") > -1) {
            id = this.$route.query.taskId;
        }
        const qq = await getTalkByGroupId(id);
        console.log(id + "获取聊天组信息", qq)
        if (qq.success) {
            if (qq.data && qq.data.groupDetails && qq.data.groupDetails.data && qq.data.sChatUser && qq.data.sChatUser.entities) {
                this.chatConfig = {
                    groupid: qq.data.groupDetails.data[0].id,
                    userid: qq.data.sChatUser.entities[0].username,
                    userimg: qq.data.sUser.info.headUrl,
                    userRole: "S",
                    userphone: qq.data.sUser.phone,
                    username: qq.data.sUser.info.nickName || qq.data.sUser.phone,
                    youname: qq.data.targetUser.info.nickName + '<img class="shoujiicon" src="' + shouji + '" /> ' + qq.data.targetUser.phone,
                    youimg: qq.data.targetUser.info.headUrl,
                    youRole: "B",
                    youphone: qq.data.targetUser.phone,
                    id: id

                }
            } else {
                this.msg = "聊天相关数据出现异常";
            }
        } else {
            this.msg = qq.msg;
        }
        const re = await TaskInfoById(id);
        if (re.success) {
            this.taskInfo = re.data;
        }
        const stateGroup = [];
        const res = await ChildTaskList(id);

        if (res.success) {
            const list = res.data ? res.data : [];
            ChildTaskState("S").map((value, i) => {
                const model = {
                    name: value,
                    childs: []
                };
                list.forEach((item) => {
                    if (i == item.state) {
                        model.childs.push(item)
                    }
                })
                stateGroup.push(model)
            })
            stateGroup[2].childs = stateGroup[2].childs.concat(stateGroup[3].childs);

            stateGroup.splice(3, 1);
            stateGroup.shift();
            console.log("stateGroup", stateGroup);


            this.stateGroup = stateGroup;

        } else {
            this.$message.warning(res.msg)
        }
    },
    methods: {
        changStateToPay(id) {
            const me = this;
            me.$confirm(`是否确定该子任务？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await UpdateChildTaskForSure({ id }, 2);
                //                    console.log(res)
                if (res.success) {
                    me.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    history.go(0)
                } else {
                    me.$message.error(res.msg);
                }
            }).catch(() => { });
        },
        toPay() {
            const id = this.zhifuIds[0];
            PayChildTask(id).then((res) => {
                alert(res.msg)
            })
        },
        getChilds(index) {
            return this.stateGroup[index] ? this.stateGroup[index].childs : []
        },
        handleClose() {
            this.dialogVisible = false;
        },
        toRedirectT() {
            const id = this.$route.query.taskId;
            this.$router.push({ name: "toFinally", query: { id: id } })
        },
        toRedirect(name, id) {
            this.$router.push({ name, query: { id } })
        },
        async toShowPay(index) {
            const me = this;
            //                const res = await SToVpayMoney({id});
            //                console.log(res);
            const money = me.getChilds(5)[index].total;
            const id = me.getChilds(5)[index].id;
            const payInfo = await SToVTopayMoney({ id });
            //                console.log(payInfo);
            //                me.$confirm(`打款支付${payInfo.data.money}？(总额百分比${payInfo.data.remitRatio || 0})`, '提示', {
            me.$confirm(`打款支付${payInfo.data.money}？(总价:${money}，折扣：${(1 - payInfo.data.remitRatio).toFixed(2) * 100 + '%'}，实际:${payInfo.data.money})`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await SToVpayMoney({ id });
                //                    console.log(res);
                if (res.success) {
                    me.$message({
                        type: 'success',
                        message: '打款成功!'
                    });
                    history.go(0)
                }

            }).catch(() => {
                me.$message({
                    type: 'info',
                    message: '打款未成功'
                });
            });
        },
        openApplyRefund(id) {
            this.dialog.applyRefund.form.id = id;
            this.dialog.applyRefund.form.reason = '';
            this.dialog.applyRefund.form.percent = 100;
            this.dialog.applyRefund.show = true;
        },
        applyRefund() {
            this.$refs.form.validate(async v => {
                if (v) {
                    const res = await applyRefund(this.dialog.applyRefund.form.id, this.dialog.applyRefund.form.percent, this.dialog.applyRefund.form.reason);
                    if (res.success) {
                        this.$message.success('申请成功');
                        this.dialog.applyRefund.show = false;
                        location.reload();
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            });
        }
    }
}
</script>
