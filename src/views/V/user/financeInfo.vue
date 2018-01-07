<template>
    <!-- 我的钱包  -->
    <div class="my-bag-wrapper">
        <div class="userinfo-nav">
            <el-button :type="navIndex==1?'sure':'text'" @click="navIndex=1">{{$lang('我的资金')}}</el-button>
            <el-button :type="navIndex==2?'sure':'text'" @click="recordList('-1',1),navIndex=2">{{$lang('我的账单')}}</el-button>
        </div>
        <!-- 我的钱包-资金 -->
        <div class="mybag-zj-wrap" v-if="navIndex==1">
            <!-- 我的钱包-展示 -->
            <div class="mybag-zj-show" v-if="operateType=='index'">
                <div class="mybag-zj">
                    <div class="zj-edu">
                        <p>￥{{totalMoney}}</p>
                        <p>{{$lang('总资产（元）')}}</p>
                    </div>
                    <div class="zj-btn">
                        <el-col :span="16" :offset="4">
                            <el-button type="sure" class="fr" @click="toTixian">{{$lang('提现')}}</el-button>
                        </el-col>
                    </div>
                </div>
            </div>
            <!-- 我的钱包-提现 -->
            <div class="mybag-zj-tx" v-if="operateType=='cash'">
                <div class="mybag-tx-wrap" v-loading="loading">
                    <h3 class="main-title">{{$lang('提现')}}</h3>
                    <div class="txcz-wrap">
                        <el-form ref="cashForm" :model="cashForm" label-width="130px" :rules="rules">
                            <el-form-item :label="$lang('请选择提现方式')">
                                <template>
                                    <ul class="clearfix">
                                        <!-- <li class="zffs-li" :class="cashForm.atmType==1&&'active'" @click="changeType(1)">
                                            <span class="zf-zfb"><i></i></span>
                                            <p>{{$lang('支付宝提现')}}</p>
                                        </li> -->
                                        <li class="zffs-li" :class="cashForm.atmType==2&&'active'" @click="changeType(2)">
                                            <span class="zf-yl"><i></i></span>
                                            <p>{{$lang('银联提现')}}</p>
                                        </li>
                                    </ul>
                                </template>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入提现金额')" prop="money" required>
                                <el-input :placeholder="$lang('请输入提现金额')" v-model="cashForm.money"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入账户名称')" prop="name" required>
                                <el-input :placeholder="$lang('请输入账户名称')" v-model="cashForm.name"></el-input>
                            </el-form-item>

                            <el-form-item :label="$lang('请输入支付宝账号')" v-show="cashForm.atmType==1" required>
                                <el-input :placeholder="$lang('请输入支付宝账号')" v-model="cashForm.cardNum"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入银行卡号')" v-show="cashForm.atmType==2" prop="cardNum" required>
                                <el-input :placeholder="$lang('请输入银行卡号')" v-model="cashForm.cardNum"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入开户行')" v-show="cashForm.atmType==2" required>
                                <el-input :placeholder="$lang('请输入开户行')" v-model="cashForm.bankName"></el-input>
                            </el-form-item>

                        </el-form>
                        <el-row>
                            <el-col :span="16" :offset="4">
                                <el-button type="sure" class="fr" @click="addAtms">{{$lang('提现')}}</el-button>
                            </el-col>
                        </el-row>
                        <el-row style="margin:10px 0px;text-align:center;" v-if="cashForm.atmType==2">
                            <div style="margin:10px;font-size:16px;">{{$lang('必须为本人身份证办理的银行卡 (否则审核不通过)')}}</div>
                            <div style="margin:10px;color:red;">{{$lang('根据《中华人民共和国个人所得税法》和《中华人民共和国个人所得税法实施条例》的要求，月收入超出3500的部分需缴纳个人所得税')}}</div>
                        </el-row>
                    </div>
                </div>
            </div>

        </div>
        <!-- 我的钱包-账单 -->
        <div class="mybag-zd-wrap" v-if="navIndex==2">
            <ul class="zd-nav-ul clearfix">
                <li class="zd-nav" :class="billIndex==1?'active':null"><a href="javascript:;" @click="recordList('-1',1)">{{$lang('全部')}}</a></li>
                <li class="zd-nav" :class="billIndex==2?'active':null"><a href="javascript:;" @click="recordList('项目收入',2)">{{$lang('项目收入')}}</a></li>
                <li class="zd-nav" :class="billIndex==3?'active':null"><a href="javascript:;" @click="recordList('提现',3)">{{$lang('提现')}}</a></li>
            </ul>
            <div class="zd-list-wrap" v-if="billIndex==1">
                <ul class="zd-list-ul">
                    <li class="zd-list-li clearfix" v-for="bill in billTable1">
                        <p >
                            <span v-if="bill.type=='提现'">{{$lang('流水号：')}}{{bill.serialNumber}}</span>
                            <span v-if="bill.type=='项目收入'">{{$lang('任务ID：')}}{{bill.bindTaskId}}</span>
                            <span>{{$lang('金额：')}}￥{{formatNum(bill.money)}}</span>
                        </p>
                        <p>
                            <span>{{$lang('类型：')}}{{bill.type}}</span>
                            <span>{{$lang('创建时间：')}}{{bill.createTime}}</span>
                        </p>
                        <p>
                            <span>{{$lang('手续费：')}}￥{{formatNum(bill.poundage)}}</span>
                            <span>{{$lang('实际金额：')}}￥{{formatNum(bill.realMoney)}}</span>
                        </p>
                    </li>
                </ul>
                <div class="page-wrap clearfix">
                    <div class="fr">
                         <el-pagination
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagiOpt1.row"
                            :current-page="pagiOpt1.page"
                            @size-change="sizeChange1"
                            @current-change="currentChange1"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagiOpt1.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="zd-list-wrap" v-if="billIndex==2">
                <ul class="zd-list-ul">
                    <li class="zd-list-li clearfix" v-for="bill in billTable2">
                        <p>
                            <span>{{$lang('任务ID：')}}{{bill.bindTaskId}}</span>
                            <span>{{$lang('金额：')}}￥{{formatNum(bill.money)}}</span>
                        </p>
                        <p>
                            <span>{{$lang('类型：')}}{{bill.type}}</span>
                            <span>{{$lang('创建时间：')}}{{bill.createTime}}</span>
                        </p>
                        <p>
                            <span>{{$lang('手续费：')}}￥{{formatNum(bill.poundage)}}</span>
                            <span>{{$lang('实际金额：')}}￥{{formatNum(bill.realMoney)}}</span>
                        </p>
                    </li>
                </ul>
                <div class="page-wrap clearfix">
                    <div class="fr">
                         <el-pagination
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagiOpt2.row"
                            :current-page="pagiOpt2.page"
                            @size-change="sizeChange2"
                            @current-change="currentChange2"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagiOpt2.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="zd-list-wrap" v-if="billIndex==3">
                <ul class="zd-list-ul">
                    <li class="zd-list-li clearfix" v-for="bill in billTable3">
                        <p>
                            <span>{{$lang('流水号：')}}{{bill.serialNumber}}</span>
                            <span>{{$lang('金额：')}}￥{{formatNum(bill.money)}}</span>
                        </p>
                        <p>
                            <span>{{$lang('类型：')}}{{bill.type}}</span>
                            <span>{{$lang('创建时间：')}}{{bill.createTime}}</span>
                        </p>
                        <p>
                            <span>{{$lang('手续费：')}}￥{{formatNum(bill.poundage)}}</span>
                            <span>{{$lang('实际金额：')}}￥{{formatNum(bill.realMoney)}}</span>
                        </p>
                    </li>
                </ul>
                <div class="page-wrap clearfix">
                    <div class="fr">
                         <el-pagination
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagiOpt3.row"
                            :current-page="pagiOpt3.page"
                            @size-change="sizeChange3"
                            @current-change="currentChange3"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagiOpt3.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="Tips"
            :visible.sync="dialogVisible"
            size="tiny"
           >
            <span>{{$lang('是否放弃编辑？')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;nextTo=false;">{{$lang('取消')}}</el-button>
                <el-button type="sure" @click="cancalEdit">{{$lang('确定')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addAtms, getMoney } from "@/apis/money";
import { recordList } from "@/apis/person";
import { formatNumber } from "@/apis/util";

export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      nextTo: false,
      userId: "",
      totalMoney: 0,
      navIndex: 1, //总nav
      operateType: "index", //资金页操作类型
      billIndex: 1, //账单页tab
      cashForm: {
        atmType: "1",
        money: "",
        name: "",
        cardNum: "",
        bankName: ""
      },
      billTable1: [],
      billTable2: [],
      billTable3: [],
      //分页参数
      pagiOpt1: {
        total: 0,
        page: 1,
        row: 5
      },
      pagiOpt2: {
        total: 0,
        page: 1,
        row: 5
      },
      pagiOpt3: {
        total: 0,
        page: 1,
        row: 5
      },
      rules: {
        money: [{ validator: this.validateMoney, trigger: "blur" }],
        name: [{ validator: this.validateName, trigger: "blur" }],
        cardNum: [{ validator: this.validateCardName, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.userId = this.$route.query.userId || getUser().userId;
    this.getMoney();
    this.recordList("-1", 1);
  },
  methods: {
    toTixian() {
      this.operateType = "cash";
      this.cashForm = {
        atmType: "2",
        money: "",
        name: "",
        cardNum: "",
        bankName: ""
      };
    },
    changeType(index) {
      this.$refs["cashForm"].resetFields();
      this.cashForm.atmType = index;
    },
    validateMoney(rule, value, callback) {
      if (value === "") {
        callback(new Error("金额不能为空"));
      } else if (!/^[+]?[\d]+(([\.]{1}[\d]+)|([\d]*))$/.test(value)) {
        callback(new Error("请输入正确的金额"));
      } else {
        callback();
      }
    },
    validateName(rule, value, callback) {
      if (value === "") {
        callback(new Error("账户名不能为空"));
      } else {
        callback();
      }
    },
    validateCardName(rule, value, callback) {
      if (value === "") {
        callback(new Error("银行卡号不能为空"));
      } else {
        callback();
      }
    },
    formatNum(str) {
      return formatNumber(str);
    },
    //获取账户余额
    async getMoney() {
      const userId = this.$route.query.userId || getUser().userId;
      const res = await getMoney({ userId });
      if (res.success) {
        this.totalMoney = res.data.money;
      }
    },
    async recordList(type, index) {
      this.billIndex = index;
      const res = await recordList({
        type: type,
        page: this["pagiOpt" + index].page,
        row: this["pagiOpt" + index].row
      });
      if (res.success) {
        this["billTable" + index] = res.data.list;
        this["pagiOpt" + index].total = res.data.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    sizeChange1(i) {
      this.pagiOpt1.row = i;
      this.recordList("-1", 1);
    },
    currentChange1(i) {
      this.pagiOpt1.page = i;
      this.recordList("-1", 1);
    },
    sizeChange2(i) {
      this.pagiOpt2.row = i;
      this.recordList("项目收入", 2);
    },
    currentChange2(i) {
      this.pagiOpt2.page = i;
      this.recordList("项目收入", 2);
    },
    sizeChange3(i) {
      this.pagiOpt3.row = i;
      this.recordList("提现", 3);
    },
    currentChange3(i) {
      this.pagiOpt3.page = i;
      this.recordList("提现", 3);
    },
    addAtms() {
      this.$refs.cashForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.doAddAtms();
        } else {
          return false;
        }
      });
    },
    //用户提现
    async doAddAtms() {
      const me = this;
      let atmType = me.cashForm.atmType,
        money = me.cashForm.money,
        name = me.cashForm.name,
        cardNum,
        bankName = "";
      if (atmType == 1) {
        //支付宝提现
        cardNum = me.cashForm.cardNum;
      } else if (atmType == 2) {
        //银联提现
        cardNum = me.cashForm.cardNum;
        bankName = me.cashForm.bankName;
      }
      const atomData = await addAtms({
        atmType,
        money,
        name,
        cardNum,
        bankName
      });
      this.loading = false;
      if (atomData.success) {
        me.$message("提现成功");
      } else {
        me.$message.error(atomData.msg);
      }
      me.getMoney();
      me.operateType = "index";
    },
    cancalEdit() {
      this.$router.push({ name: this.nextTo });
      this.dialogVisible = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
    // if(this.operateType=='cash'){
    //     this.dialogVisible=true;
    //     if(this.nextTo){
    //         next()
    //     }else{
    //         next(false)
    //         this.nextTo=to.name
    //     }
    // }else{
    //     next()
    // }
  }
};
</script>
