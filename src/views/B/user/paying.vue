<!--去支付-->
<template>
    <div class="mybag-zfgl-wrap">
        <div>
            <div class="">
                <dl class="bag-pay-dl" v-for="(bill,index) in billTable">
                    <dt class="bag-pay-dt box-flex-media-box">
                        <p class="flex1">订单号：{{bill.orderId}}</p>
                        <p class="flex1">状态：{{getState(bill.state)}}</p>
                        <p class="">下单时间：{{bill.createTime}}</p>
                    </dt>
                    <dd class="bag-pay-dd" v-if="bill.subTasks.length>0">
                        <ul class="bag-pay-dd_ul" v-if="!collapse[index]">
                            <li class="bpd-li box-flex-media-box">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header"><img :src="bill.subTasks[0].url" /></p>
                                        <p class="name flex1" @click="toTaskDetail(bill.subTasks[0])">{{bill.subTasks[0].projectName}}</p>
                                    </div>
                                </div>
                                <p class="bpd-li_num">￥{{formatNum(bill.subTasks[0].total)}}</p>
                            </li>
                        </ul>
                        <ul class="bag-pay-dd_ul" v-for="item in bill.subTasks" v-if="collapse[index]">
                            <li class="bpd-li box-flex-media-box">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header"><img :src="item.url" /></p>
                                        <p class="name flex1" @click="toTaskDetail(item)">{{item.projectName}}</p>
                                    </div>
                                </div>
                                <p class="bpd-li_num">￥{{formatNum(item.total)}}</p>
                            </li>
                        </ul>
                        <div class="box-flex-media-box pay-showOff-wrap" v-if="bill.subTasks.length>1&&!collapse[index]">
                            <p class="flex1" @click="setCollapse(index)">
                                <em>……</em>
                            </p>
                            <a href="javascript:;" @click="setCollapse(index)">【展开】</a>
                        </div>
                        <div class="box-flex-media-box pay-showOff-wrap" v-if="bill.subTasks.length>1&&collapse[index]">
                            <p class="flex1">
                                <em></em>
                            </p>
                            <a href="javascript:;" @click="setCollapse(index)">【收起】</a>
                        </div>
                    </dd>
                    <dd class="bag-pay-footer-dd  box-flex-media-box">
                        <p class="flex1">待支付：
                            <em>{{formatNum(bill.total)}}</em> 元</p>
                        <div class="flex1">
                            <el-button type="text">支付人：{{bill.payBy || '-'}}</el-button>
                        </div>
                        <el-button type="sure" @click="toPayRecordOrder(bill.orderId, bill.total)">订单支付</el-button>
                        <el-button type="cancle" @click="cancelRecordOrder(bill.orderId)">取消订单</el-button>
                    </dd>
                </dl>
            </div>
            <div class="page-wrap clearfix">
                <div class="fr">
                    <el-pagination :page-sizes="[2,4]" :page-size="pagiOpt.row" :current-page="pagiOpt.page" @size-change="sizeChange" @current-change="currentChange" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt.total">
                    </el-pagination>
                </div>
            </div>
            <el-dialog title="微信支付二维码" ref="WXImg" :visible.sync="WXPayImgShow" size="tiny" :before-close="WXPayImgClose">
                <div style="text-align: center"><img :src="WXImgSrc" alt=""></div>
            </el-dialog>
            <el-dialog title="支付" :visible.sync="payDialogVisible" size="tiny" :before-close="payDialogClose">
                <div class="pay-dialog-wrap">
                    <!--点击申请支付后 付款-->
                    <div class="payment-method-wrap">
                        <div class="box-flex-media-box">
                            <p class="flex1">付款金额：
                                <em>{{payDialogTotal}}</em>元</p>
                            <div class="pm-cz-btn">
                                <div class="box-flex-media-box">
                                    <!--<el-button type="sure">充值</el-button>-->
                                    <p class="marg-left-10">余额：{{totalMoney}} </p>
                                </div>
                            </div>
                        </div>
                        <p class="yebz-tips" v-if="payDialogCashType == 3 && totalMoney < payDialogTotal">*余额不足请充值。</p>
                        <div class="zffs-div">
                            <ul class="clearfix">
                                <li class="zffs-li" :class="payDialogCashType==1&&'active'" @click="payDialogCashType=1">
                                    <span class="zf-zfb">
                                        <i></i>
                                    </span>
                                    <p>支付宝支付</p>
                                </li>
                                <li class="zffs-li" :class="payDialogCashType==2&&'active'" @click="payDialogCashType=2">
                                    <span class="zf-wx">
                                        <i></i>
                                    </span>
                                    <p>微信支付</p>
                                </li>
                                <li class="zffs-li" :class="payDialogCashType==3&&'active'" @click="payDialogCashType=3">
                                    <span class="zf-ye">
                                        <i></i>
                                    </span>
                                    <p>余额支付</p>
                                </li>
                            </ul>
                        </div>
                        <div class="payment-btn-wrap">
                            <el-button type="sure" @click="payDialogCashTypeToPay">付款</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { orderList } from '@/apis/person'
import { formatNumber } from '@/apis/util'
import { addRecharge, getAliapyInfo, createWXPayOrder, checkByOrderId, getMoney, cancelOrder, addAtms, balancePay } from '@/apis/money'
import axios from 'axios'
import { getUser } from '@/apis/storage'


export default {
    data() {
        return {
            billTable: [],
            collapse: [],
            pagiOpt: {
                page: 1,
                row: 2
            },
            totalMoney: 0,
            WXPayOrderId: "",
            WXPayImgShow: false,
            WXImgSrc: "",
            WXPayTimes: "",
            payDialogVisible: false,
            payDialogTotal: 0,
            payDialogOrderId: "",
            payDialogCashType: 1
        }
    },
    created() {
        this.orderList();//支付管理
    },
    methods: {
        setCollapse(index) {
            this.$set(this.collapse, index, !this.collapse[index])
        },
        //支付管理
        async orderList() {
            const res = await orderList({ state: 1, page: this.pagiOpt.page, row: this.pagiOpt.row })
            if (res.success) {
                this.billTable = res.data.list;
                this.pagiOpt.total = res.data.total;
            } else {
                this.$message.error(res.msg);
            }
        },
        sizeChange(i) {
            this.pagiOpt.row = i;
            this.orderList();
        },
        currentChange(i) {
            this.pagiOpt.page = i;
            this.orderList();
        },
        getState(i) {
            let state = ''
            switch (i) {
                case '1':
                    state = '申请支付中';
                    break;
                case '2':
                    state = '支付成功 ';
                    break;
                case '3':
                    state = '支付失败';
                    break;
                case '4':
                    state = '废弃申请';
                    break;
                default:
                    state = '申请支付中'
            }
            return state
        },
        formatNum(str) {
            return formatNumber(str);
        },
        toTaskDetail(item) {
            if (item.id) {
                this.$router.push({ name: "B_TaskChildDetail", query: { id: item.id } })
            } else {
                this.$message('任务不存在')
            }
        },
        WXPayImgClose() {
            const me = this;
            me.$confirm('确认取消支付？').then(data => {
                if (data == 'confirm') {
                    me.WXImgSrc = "";
                    me.WXPayOrderId = "";
                    me.WXPayImgShow = false;
                    clearInterval(me.WXPayTimes);
                }
            }).catch(data => {

            });
        },
        async queryWXPayState() {
            const me = this;
            const orderId = me.WXPayOrderId;
            const type = "1";
            const WXPayState = await checkByOrderId({ orderId, type });
            if (WXPayState.data.state == "2") {
                me.$message.success("支付成功");
                clearInterval(me.WXPayTimes);
                //                    me.WXPayImgShow = false;
                //                    me.WXImgSrc = "";
                //                    me.operateType = "index";
                //                    me.getTotalMoney();
                //                    me.rechargeList();
                history.go(0)
            } else if (WXPayState.data.state == "3") {
                me.$message.error('支付失败');
                clearInterval(me.WXPayTimes);
                me.WXPayImgShow = false;
                me.WXImgSrc = "";
                me.operateType = "index";
            }
        },
        async toPayRecordOrder(orderId, total) {
            const me = this;
            //                const orderData = await checkByOrderId({orderId, type: 1});
            me.payDialogVisible = true;
            me.orderId = orderId;
            me.payDialogTotal = total;
            const userId = getUser().userId;
            const moneyData = await getMoney({ userId });
            //                console.log(moneyData);
            if (moneyData.success) {
                me.totalMoney = moneyData.data.money
            }
            //                console.log(orderData);
        },
        async payDialogCashTypeToPay() {
            const me = this;
            const res = await checkByOrderId({ orderId: this.WXPayOrderId = me.orderId, type: 1 });
            if (me.payDialogCashType == 3) {//余额支付
                if (me.totalMoney < me.payDialogTotal) {
                    me.$message('余额不足');
                    return
                }
                me.$confirm(`确定用余额支付${me.payDialogTotal}元？`).then(async data => {
                    if (data == 'confirm') {
                        const data = await balancePay({ orderId: res.data.orderId });
                        if (data.success) {
                            me.$message('操作成功');
                            setTimeout(function () {
                                history.go(0)
                            }, 200)
                        } else {
                            me.$message.error(data.msg)
                        }
                    }
                }).catch(data => {

                });
            }
            if (me.payDialogCashType == 1) {//支付宝支付
                const alipayData = await getAliapyInfo({ outTradeNo: res.data.orderId, subject: "订单支付：" + res.data.orderId, totalFee: res.data.total, body: `1&&${location.href}` });
                let div = document.createElement("div");
                div.innerHTML = alipayData.data;
                document.body.appendChild(div);
                document.forms['alipaysubmit'].submit();
            }
            if (me.payDialogCashType == 2) {//微信支付
                me.WXPayImgShow = true;
                me.WXImgSrc = `${axios.defaults.baseURL}/wxpay/createOrder?orderId=${res.data.orderId}&attach=1`;
                me.WXPaying = true;
                me.WXPayTimes = setInterval(me.queryWXPayState, 5000);
            }

        },
        payDialogClose() {
            const me = this;
            me.$confirm('确认取消支付？').then(data => {
                if (data == 'confirm') {
                    me.payDialogTotal = 0;
                    me.payDialogOrderId = "";
                    me.payDialogVisible = false;
                }
            }).catch(data => {
            });
        },
        //取消流水订单
        cancelRecordOrder(orderId) {
            const me = this;
            me.$confirm(`确定取消该订单？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '不确定',
                type: 'warning'
            }).then(async () => {
                const res = await cancelOrder({ orderId });
                if (res.success) {
                    me.$message({
                        type: 'success',
                        message: '取消成功!'
                    });
                    me.recordList('支付佣金', 1);//流水
                }
            }).catch(() => {
            });
        }
    }
}
</script>
