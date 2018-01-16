<template>
    <div class="chart-wrpaper clearfix">
        <div class="chart-left">
            <div class="box-flex-media-box">
                <div class="flex1 chart-left-title">
                    <h3>{{taskInfo.projectName}}</h3>
                </div>
                <el-button type="sure" @click="toRedirectT">{{$lang('查看任务')}}&gt;</el-button>
            </div>
            <div class="chart-left-list">
                <ul class="chart-left-ul">
                    <!--待确认-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('待确认')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(0).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(0)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_TaskChildDetail',query: { id: m.id, taskId:m.taskId }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--待支付-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4 class="height70">{{$lang('待支付(勾选之后可支付)')}}</h4>
                            </a>
                            <el-button type="sure" @click="openPayDialog(1)" v-if="getChilds(1).length" :disabled="payLoading">{{ parentId?['',$lang('申请支付'),''][bUserType]:$lang('支付') }}</el-button>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(1).length">
                            <el-checkbox-group v-model="zhifuIds">
                                <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(1)" :key="i">
                                    <div class="pdr-15">
                                        <el-checkbox :label="m.id"></el-checkbox>
                                    </div>
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header">
                                                <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                            </p>
                                            <p class="name">{{m.projectName}}</p>
                                        </div>
                                    </div>
                                    <div class="moey">
                                        <p>{{'￥' + m.total}}</p>
                                    </div>
                                    <a href="javascript:;" class="more" @click="$router.push({name:'B_TaskChildDetail',query: { id: m.id, taskId:m.taskId }})">{{$lang('查看')}}&gt;</a>
                                </li>
                            </el-checkbox-group>
                        </ul>
                    </li>

                    <!--支付中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4 class="height70">{{$lang('支付中')}}</h4>
                            </a>
                            <!--<el-button type="sure" @click="openPayDialog(2)" v-if="getChilds(2).length">{{$lang('支付中')}}</el-button>-->
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(2).length">
                            <el-checkbox-group v-model="zhifuIds">
                                <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(2)" :key="i">
                                    <div class="pdr-15">
                                        <!--<el-checkbox :label="m.id"></el-checkbox>-->
                                    </div>
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header">
                                                <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                            </p>
                                            <p class="name flex1">{{m.projectName}}</p>
                                        </div>
                                    </div>
                                    <div class="moey">
                                        <p>{{'￥' + m.total}}</p>
                                    </div>
                                    <a href="javascript:;" class="more" @click="$router.push({name:'B_TaskChildDetail',query: { id: m.id, taskId:m.taskId }})">{{$lang('查看')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                    <a href="javascript:;" class="more" @click="$router.push({name:'B-userInfo-bag',query: { id: userId, index: 3 }})">{{$lang('去支付')}}&gt;</a>
                                </li>
                            </el-checkbox-group>
                        </ul>
                    </li>

                    <!--征集中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('征集中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(3).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(3)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_TaskChildDetail',query: { id: m.id, taskId:m.taskId }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--制作中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('制作中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(4).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(4)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_ChatD',query: { id: m.id, taskId:m.taskId }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--验收中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('验收中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(5).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(5)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_TaskCheck',query: { id: m.id, taskId:m.taskId }})">{{$lang('去验收')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <!--<a href="javascript:;" class="more" @click="$router.push({name:'B-detail',query: { id: $route.query.id }})">{{$lang('查看详情')}}&gt;</a>&nbsp;&nbsp;&nbsp;-->
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_ChatD',query: { id: m.id, taskId:m.taskId }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--完成-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('完成')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(6).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(6)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <!--<a href="javascript:;" class="more" @click="$router.push({name:'B_History',query: { id: m.id, taskId:m.taskId, index: -1 }})">{{$lang('下载')}}&gt;</a>&nbsp;&nbsp;&nbsp;-->
                                <a href="javascript:;" class="more" @click="downloadLastFile(m.id)">{{$lang('下载')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_DTaskCheck',query: { id: m.id, taskId:m.taskId, index: -1 }})">{{$lang('预览')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_Detail',query: { id: m.id, taskId:m.taskId }})">{{$lang('任务详情')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_ChatD',query: { id: m.id, taskId:m.taskId }})">{{$lang('聊天记录')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--"退款申请中"-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('退款申请中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(8).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(8)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_TaskChildDetail',query: { id: m.id, taskId:m.taskId, isOnlyChat:true }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>
                    <!--已关闭-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('已关闭')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(9).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(9)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`" />
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more" @click="$router.push({name:'B_TaskChildDetail',query: { id: m.id, taskId:m.taskId, isOnlyChat:true }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
        <div v-if="Object.keys(chatConfig).length>0">
            <Chat :chatConfig="chatConfig" :isReserve="false"></Chat>
        </div>
        <div v-else class="chart-right" style="background: none">
            <div class="chart-msg">{{msg}}</div>
        </div>
        <!--去支付弹层-->
        <el-dialog :title="$lang('支付')" :visible.sync="payDialogVisible" size="tiny" :before-close="payDialogClose">
            <div class="pay-dialog-wrap">
                <!--申请支付-->
                <div class="apply-payment-wrap" style="display:none;">
                    <div class="apply-people-wrap">
                        <h4 class="title-h4-dig">{{$lang('确定任务')}}：</h4>
                        <div class="apply-pay-people">
                            <div class="box-flex-media-box">
                                <p class="user-header">
                                    <img src="../../assets/images/user-header.png" />
                                </p>
                                <p class="name">{{$lang('呵呵哈哈')}}</p>
                            </div>
                            <div class="box-flex-media-box">
                                <p class="user-header">
                                    <img src="../../assets/images/user-header.png" />
                                </p>
                                <p class="name">{{$lang('呵呵哈哈')}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="money-num">
                        <p>{{$lang('付款金额')}}：
                            <em>2000</em>{{$lang('元')}}</p>
                    </div>

                    <!--申请付款 和 已发起付款 两种选择-->
                    <div class="fqfk-wrap">
                        <span>{{$lang('已发起付款')}}</span>
                    </div>
                    <div class="payment-btn-wrap">
                        <el-button type="sure">{{$lang('申请支付')}}</el-button>
                    </div>
                </div>

                <!--点击申请支付后 付款-->
                <div class="payment-method-wrap">
                    <div class="box-flex-media-box">
                        <p class="flex1">{{$lang('付款金额')}}：
                            <em>{{total}}</em>{{$lang('元')}}</p>
                        <div class="pm-cz-btn">
                            <div class="box-flex-media-box">
                                <!--<el-button type="sure">{{$lang('充值')}}</el-button>-->
                                <p class="marg-left-10">{{$lang('余额')}}：{{balance}} {{$lang('元')}} </p>
                            </div>
                        </div>
                    </div>
                    <p class="yebz-tips" v-if="cashType == 3 && balance < total">*{{$lang('余额不足请充值。')}}</p>
                    <div class="zffs-div">
                        <ul class="clearfix">
                            <li class="zffs-li" :class="cashType==1&&'active'" @click="cashType=1">
                                <span class="zf-zfb">
                                    <i></i>
                                </span>
                                <p>{{$lang('支付宝支付')}}</p>
                            </li>
                            <li class="zffs-li" :class="cashType==2&&'active'" @click="cashType=2">
                                <span class="zf-wx">
                                    <i></i>
                                </span>
                                <p>{{$lang('微信支付')}}</p>
                            </li>
                            <li class="zffs-li" :class="cashType==3&&'active'" @click="cashType=3">
                                <span class="zf-ye">
                                    <i></i>
                                </span>
                                <p>{{$lang('余额支付')}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="payment-btn-wrap">
                        <el-button type="sure" @click="toPay">{{$lang('付款')}}</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog :title="$lang('微信支付二维码')" ref="WXImg" :visible.sync="WXPayImgShow" size="tiny" :before-close="WXPayImgClose">
            <div v-if="WXPaying" style="text-align: center">
                <img :src="WXImgSrc" alt="">
            </div>
        </el-dialog>
        <SlideBtns :type="'back'"></SlideBtns>

    </div>
</template>

<style>
.chart-wrpaper .el-checkbox__label {
  display: none;
}
</style>

<script>
import Chat from "@/components/Chat";
import SlideBtns from "@/components/SlideBtns";
import {
  ChildTaskList,
  ChildTaskState,
  TaskInfoById,
  PayChildTask,
  getTalkByGroupId,
  ChildTaskInfo
} from "@/apis/task";
import {
  addOrder,
  getAliapyInfo,
  createWXPayOrder,
  checkByOrderId,
  cancelOrder,
  getMoney,
  balancePay
} from "@/apis/money";
import { getAllFile, downloaded, getFile } from "@/apis/files";
import axios from "axios";
import { getUser } from "@/apis/storage";

export default {
  components: { Chat, SlideBtns },
  data() {
    return {
      zhifuIds: [],
      payDialogVisible: false, //去支付
      cashType: 1,
      total: 0,
      balance: 0, //余额
      orderId: "",
      WXPayImgShow: false,
      WXImgSrc: "",
      WXPayTimes: "",
      stateGroup: [],
      taskInfo: {},
      chatConfig: {},
      msg: "正在加载中...",
      WXPaying: false,
      userId: "",
      payLoading: false,

      bUserType: localStorage.LoginUser
        ? JSON.parse(localStorage.LoginUser).bUserType
        : 0,
      parentId: null
    };
  },
  async mounted() {
    this.userId = getUser().userId;
    // alert(this.tabState)
    let id = this.$route.query.id;
    if (id.indexOf("SubTask-") > -1) {
      id = this.$route.query.taskId;
    }
    const qq = await getTalkByGroupId(id);
    console.log(id + "获取聊天组信息", qq);
    if (qq.success) {
      if (qq.data && qq.data.targetUser) {
        console.log(qq.data);
        this.parentId = qq.data.targetUser.parentId;
      }
      if (
        qq.data &&
        qq.data.groupDetails &&
        qq.data.groupDetails.data &&
        qq.data.targetChatUser &&
        qq.data.targetChatUser.entities
      ) {
        this.chatConfig = {
          groupid: qq.data.groupDetails.data[0].id,
          userid: qq.data.targetChatUser.entities[0].username,
          userimg: qq.data.targetUser.info.headUrl,
          username:
            qq.data.targetUser.info.nickName || qq.data.targetUser.phone,
          userphone: qq.data.targetUser.phone,
          userRole: "B",
          youname: qq.data.sUser.info.nickName || qq.data.sUser.phone,
          youimg: qq.data.sUser.info.headUrl,
          youRole: "S",
          youphone: qq.data.sUser.phone,
          id: id
          // isReserve:true
        };
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
      ChildTaskState("B").map((value, i) => {
        const model = {
          name: value,
          childs: []
        };
        list.forEach(item => {
          if (i == item.state) {
            model.childs.push(item);
          }
        });
        stateGroup.push(model);
      });

      stateGroup[7].childs = stateGroup[7].childs.concat(stateGroup[8].childs);
      // // delete stateGroup[2]
      stateGroup.shift();
      console.log(stateGroup);
      this.stateGroup = stateGroup;
    } else {
      this.$message.warning(res.msg);
    }
  },
  methods: {
    async toPay() {
      //                const id = this.zhifuIds[0];
      //                PayChildTask(id).then((res) => {
      //                    alert(res.msg)
      //                })
      const me = this;
      if (me.cashType == 3) {
        //余额支付
        if (me.balance < me.total) {
          me.$message("余额不足");
          return;
        }
        me
          .$confirm(`确定用余额支付${me.total}元？`)
          .then(async data => {
            if (data == "confirm") {
              const data = await balancePay({ orderId: me.orderId });
              //                        console.log(data);
              if (data.success) {
                me.$message("操作成功");
                setTimeout(function() {
                  history.go(0);
                }, 200);
              } else {
                me.$message.error(data.msg);
              }
            }
          })
          .catch(data => {});
      }
      if (me.cashType == 1) {
        //支付宝支付
        const alipayData = await getAliapyInfo({
          outTradeNo: me.orderId,
          subject: "子订单选择支付：" + me.orderId,
          totalFee: me.total,
          body: `1&&${location.href}`
        });
        let div = document.createElement("div");
        div.innerHTML = alipayData.data;
        document.body.appendChild(div);
        document.forms["alipaysubmit"].submit();
      }
      if (me.cashType == 2) {
        //微信支付
        //                'http://api.vswork.com/api/wxpay/createOrder?orderId=170730202640d04e4c198f8226b11c&attach=1'
        //                'http://api.vswork.com/api/wxpay/createOrder?orderId=170730202813d7563f411c8b26b11c&attach=1'
        me.WXPayImgShow = true;
        me.WXImgSrc = `${axios.defaults
          .baseURL}/wxpay/createOrder?orderId=${me.orderId}&attach=1`;
        me.WXPaying = true;
        me.WXPayTimes = setInterval(me.queryWXPayState, 5000);
      }
    },
    async queryWXPayState() {
      const me = this;
      const orderId = me.orderId;
      const type = "1";
      const WXPayState = await checkByOrderId({ orderId, type });
      if (WXPayState.data.state == "2") {
        me.$message.success("支付成功");
        clearInterval(me.WXPayTimes);
        me.WXPayImgShow = false;
        me.WXImgSrc = "";
        me.WXPaying = false;
        me.payDialogVisible = false;
        history.go(0);
      } else if (WXPayState.data.state == "3") {
        me.$message.error("支付失败");
        clearInterval(me.WXPayTimes);
        me.WXPayImgShow = false;
        me.WXPaying = "";
        me.WXImgSrc = "";
      }
    },
    WXPayImgClose() {
      const me = this;
      me
        .$confirm("确认取消支付？")
        .then(data => {
          if (data == "confirm") {
            me.WXImgSrc = "";
            me.WXPayImgShow = false;
            clearInterval(me.WXPayTimes);
          }
        })
        .catch(data => {});
    },
    getChilds(index) {
      return this.stateGroup[index] ? this.stateGroup[index].childs : [];
    },
    payDialogClose() {
      const me = this;
      me
        .$confirm("确认取消支付？")
        .then(data => {
          if (data == "confirm") {
            cancelOrder(me.orderId);
            me.orderId = "";
            me.payDialogVisible = false;
            history.go(0);
          }
        })
        .catch(data => {});
    },
    async openPayDialog(state) {
      this.payLoading = true;
      const me = this;
      if (me.zhifuIds.length == 0) {
        me.$message("选择为空");
        return;
      }
      const subtaskId = me.zhifuIds.join(",");
      const data = await addOrder({ subtaskId });
      if (!data.success) {
        me.$message({ type: "error", message: data.msg });
        return false;
      }
      this.payLoading = false;
      //获取余额
      const userId = getUser().userId;
      const moneyData = await getMoney({ userId });
      console.log(moneyData);
      if (moneyData.success) {
        me.balance = moneyData.data.money;
      }
      me.orderId = data.data.orderId;
      me.total = data.data.total;

      if (this.parentId == null) me.payDialogVisible = true;
      else location.reload();
    },
    toRedirectT() {
      let id = this.$route.query.id;
      if (id.indexOf("SubTask-") > -1) {
        id = this.$route.query.taskId;
      }
      this.$router.push({ name: "B-detail", query: { id: id } });
    },
    toRedirect(name, id) {
      this.$router.push({ name, query: { id } });
    },
    async downloadLastFile(id) {
      //   //"TaskStage-25ec6ce178acacaf"
      //   const me = this;
      //   const taskData = await ChildTaskInfo(id);
      //   if (!taskData.success) {
      //     me.$message.error(taskData.msg);
      //     return;
      //   }
      //   const taskStage = taskData.data.taskStage;
      //   if (taskStage.length == 0) {
      //     me.$message.error("任务阶段为空");
      //     return;
      //   }
      //   const fileData = await getAllFile(
      //     "enclosure",
      //     taskStage[taskStage.length - 1].id
      //   );
      //   if (fileData.data.length == 0) {
      //     me.$message("文件列表为空");
      //     return;
      //   }
      //   let lastFile = fileData.data.sort(
      //     (a, b) => (new Date(a.createTime) > new Date(b.createTime) ? -1 : 1)
      //   )[0];
      //   var a = document.createElement("a");
      //   a.href = lastFile.url;
      //   a.download = lastFile.fileName;
      //   var ev = document.createEvent("MouseEvents");
      //   ev.initEvent("click", false, true);
      //   a.dispatchEvent(ev);
      //   await downloaded(this.$route.query.id);
      let res = await getFile("final", id);

      if (res.success) {
        var a = document.createElement("a");
        a.href = res.data.url;
        a.download = res.data.fileName;
        var ev = document.createEvent("MouseEvents");
        ev.initEvent("click", false, true);
        a.dispatchEvent(ev);

        await downloaded(id);
      } else {

        res.msg && this.$message.error(res.msg);

      }
    }
  }
};
//    'http://vswork.cttwow.com/vsworkapi/api/wxpay/createOrder?orderId=1707171203583c9855c50d5ddd426d&attach=2'
//    'http://vswork.cttwow.com/vsworkapi/api/wxpay/createOrder?orderId=170717141643abb3739d9cfddd426d&attach=2'
//    'http://vswork.cttwow.com/vsworkapi/api/wxpay/createOrder?orderId=170717120441dafaf0d60113dd426d&attach=2'
</script>
