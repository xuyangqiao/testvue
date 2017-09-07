<template>
    <!-- 我的钱包  -->
    <div class="my-bag-wrapper" :class="navIndex==3&&'bg-f5'">
        <div class="userinfo-nav">
            <el-button :type="navIndex==1?'sure':'text'" @click="navIndex=1">{{$lang('我的资金')}}</el-button>
            <el-button :type="navIndex==2?'sure':'text'" @click="navIndex=2,billIndex=1">{{$lang('我的账单')}}</el-button>
            <el-button :type="navIndex==3?'sure':'text'" @click="navIndex=3">{{$lang('支付管理')}}</el-button>
            <el-button :type="navIndex==4?'sure':'text'" @click="navIndex=4">{{$lang('订单充值')}}</el-button>
            <el-button :type="navIndex==5?'sure':'text'" @click="navIndex=5">{{$lang('提现订单')}}</el-button>
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
                        <el-col :span="11">
                            <el-button type="sure" class="fr" @click="chargeForm={ money: ''},operateType='charge'">{{$lang('充值')}}</el-button>
                        </el-col>
                        <el-col :span="11" :offset="2">
                            <el-button type="info" class="fr" @click="cashForm={withdrawalsMoney: '',withdrawalsName: '',withdrawalsAlipayNum: '',withdrawalsBankName: '',withdrawalsBankNum: ''},operateType='cash'">{{$lang('提现')}}
                            </el-button>
                        </el-col>
                    </div>
                </div>
            </div>
            <!-- 我的钱包-充值 -->
            <div class="mybag-zj-tx" v-show="operateType=='charge'" v-loading="loading1">
                <div class="mybag-tx-wrap">
                    <h3 class="main-title">{{$lang('充值')}}</h3>
                    <div class="txcz-wrap">
                        <el-form ref="chargeForm" :model="chargeForm" label-width="120px" :rules="chargeRules">
                            <el-form-item :label="$lang('请输入充值金额')" prop="money">
                                <el-input :placeholder="$lang('请输入充值金额')" v-model="chargeForm.money"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('请选择充值方式')">
                                <template>
                                    <ul class="clearfix">
                                        <li class="zffs-li" :class="chargeType==1&&'active'" @click="chargeType=1">
                                            <span class="zf-zfb">
                                                <i></i>
                                            </span>
                                            <p>{{$lang('支付宝支付')}}</p>
                                        </li>
                                        <li class="zffs-li" :class="chargeType==2&&'active'" @click="chargeType=2">
                                            <span class="zf-wx">
                                                <i></i>
                                            </span>
                                            <p>{{$lang('微信支付')}}</p>
                                        </li>
                                    </ul>
                                </template>
                            </el-form-item>
                        </el-form>
                        <el-row>
                            <el-col :span="16" :offset="4">
                                <el-button type="sure" class="fr" @click="doSubmit('chargeForm')">{{$lang('充值')}}</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <a href="javascript:;" class="my-bag-link" @click="$refs.chargeForm.resetFields(),operateType='cash'">{{$lang('我要提现')}}</a>
            </div>
            <!-- 我的钱包-提现 -->
            <div class="mybag-zj-tx" v-show="operateType=='cash'" v-loading="loading2">
                <div class="mybag-tx-wrap">
                    <h3 class="main-title">{{$lang('提现')}}</h3>
                    <div class="txcz-wrap">
                        <el-form ref="cashForm" :model="cashForm" :rules="cashRules" label-width="130px">
                            <el-form-item :label="$lang('请选择充值方式')">
                                <template>
                                    <ul class="clearfix">
                                        <li class="zffs-li" :class="cashType==1&&'active'" @click="$refs.cashForm.resetFields(),cashType=1">
                                            <span class="zf-zfb">
                                                <i></i>
                                            </span>
                                            <p>{{$lang('支付宝提现')}}</p>
                                        </li>
                                        <li class="zffs-li" :class="cashType==2&&'active'" @click="$refs.cashForm.resetFields(),cashType=2">
                                            <span class="zf-yl">
                                                <i></i>
                                            </span>
                                            <p>{{$lang('银联提现')}}</p>
                                        </li>
                                    </ul>
                                </template>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入提现金额')" prop="withdrawalsMoney">
                                <el-input :placeholder="$lang('请输入提现金额')" v-model="cashForm.withdrawalsMoney"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入账户名称')" prop="withdrawalsName">
                                <el-input :placeholder="$lang('请输入账户名称')" v-model="cashForm.withdrawalsName"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入支付宝账号')" v-show="cashType==1" prop="withdrawalsAlipayNum">
                                <el-input :placeholder="$lang('请输入支付宝账号')" v-model="cashForm.withdrawalsAlipayNum"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入开户行')" v-show="cashType==2" prop="withdrawalsBankName">
                                <el-input :placeholder="$lang('请输入开户行')" v-model="cashForm.withdrawalsBankName"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('请输入银行卡号')" v-show="cashType==2" prop="withdrawalsBankNum">
                                <el-input :placeholder="$lang('请输入银行卡号')" v-model="cashForm.withdrawalsBankNum"></el-input>
                            </el-form-item>

                        </el-form>
                        <el-row>
                            <el-col :span="16" :offset="4">
                                <el-button type="sure" class="fr" @click="doSubmit('cashForm')">{{$lang('提现')}}</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <a href="javascript:;" class="my-bag-link" @click="$refs.cashForm.resetFields(),operateType='charge'">{{$lang('我要充值')}}</a>
            </div>

        </div>
        <!-- 我的钱包-账单流水 -->
        <div class="mybag-zd-wrap" v-if="navIndex==2">
            <ul class="zd-nav-ul clearfix">
                <li class="zd-nav" :class="billIndex==1?'active':null">
                    <a href="javascript:;" @click="recordList($lang('支付佣金'),1)">{{$lang('支付佣金')}}</a>
                </li>
                <li class="zd-nav" :class="billIndex==2?'active':null">
                    <a href="javascript:;" @click="recordList($lang('任务退款'),2)">{{$lang('任务退款')}}</a>
                </li>
                <li class="zd-nav" :class="billIndex==3?'active':null">
                    <a href="javascript:;" @click="recordList($lang('充值'),3)">{{$lang('充值')}}</a>
                </li>
                <li class="zd-nav" :class="billIndex==4?'active':null">
                    <a href="javascript:;" @click="recordList($lang('提现'),4)">{{$lang('提现')}}</a>
                </li>
            </ul>
            <div class="zd-list-wrap" v-if="billIndex==1">
                <ul class="zd-list-ul">
                    <li class="zd-list-li clearfix" v-for="(bill,i) in billTable11" :key="i">
                        <p>
                            <span>{{$lang('流水号')}}：{{bill.serialNumber}}</span>
                            <span>{{$lang('金额')}}：￥{{formatNum(bill.money)}}</span>
                        </p>
                        <p>
                            <span>{{$lang('类型')}}：{{bill.type}}</span>
                            <span>{{$lang('创建时间')}}：{{bill.createTime}}</span>
                        </p>
                        <p>
                            <span>{{$lang('手续费')}}：￥{{formatNum(bill.poundage)}}</span>
                            <span>{{$lang('实际金额')}}：￥{{formatNum(bill.realMoney)}}</span>
                        </p>
                    </li>
                </ul>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pagiOpt11.row" :current-page="pagiOpt11.page" @size-change="sizeChange11" @current-change="currentChange11" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt11.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="zd-list-wrap" v-if="billIndex==2">
                <ul class="zd-list-ul">
                    <li class="zd-list-li clearfix" v-for="(bill,i) in billTable12" :key="i">
                        <p>
                            <span>{{$lang('流水号')}}：{{bill.serialNumber}}</span>
                            <span>{{$lang('金额')}}：￥{{formatNum(bill.money)}}</span>
                        </p>
                        <p>
                            <span>{{$lang('类型')}}：{{bill.type}}</span>
                            <span>{{$lang('创建时间')}}：{{bill.createTime}}</span>
                        </p>
                        <p>
                            <span>{{$lang('手续费')}}：￥{{formatNum(bill.poundage)}}</span>
                            <span>{{$lang('实际金额')}}：￥{{formatNum(bill.realMoney)}}</span>
                        </p>
                    </li>
                </ul>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pagiOpt12.row" :current-page="pagiOpt12.page" @size-change="sizeChange12" @current-change="currentChange12" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt12.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="zd-list-wrap" v-if="billIndex==3">
                <ul class="zd-list-ul">
                    <li class="zd-list-li clearfix" v-for="(bill,i) in billTable13" :key="i">
                        <p>
                            <span>{{$lang('流水号')}}：{{bill.serialNumber}}</span>
                            <span>{{$lang('金额')}}：￥{{formatNum(bill.money)}}</span>
                        </p>
                        <p>
                            <span>{{$lang('类型')}}：{{bill.type}}</span>
                            <span>{{$lang('创建时间')}}：{{bill.createTime}}</span>
                        </p>
                        <p>
                            <span>{{$lang('手续费')}}：￥{{formatNum(bill.poundage)}}</span>
                            <span>{{$lang('实际金额')}}：￥{{formatNum(bill.realMoney)}}</span>
                        </p>
                    </li>
                </ul>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pagiOpt13.row" :current-page="pagiOpt13.page" @size-change="sizeChange13" @current-change="currentChange13" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt13.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="zd-list-wrap" v-if="billIndex==4">
                <ul class="zd-list-ul">
                    <li class="zd-list-li clearfix" v-for="(bill,i) in billTable14" :key="i">
                        <p>
                            <span>{{$lang('流水号')}}：{{bill.serialNumber}}</span>
                            <span>{{$lang('金额')}}：￥{{formatNum(bill.money)}}</span>
                        </p>
                        <p>
                            <span>{{$lang('类型')}}：{{bill.type}}</span>
                            <span>{{$lang('创建时间')}}：{{bill.createTime}}</span>
                        </p>
                        <p>
                            <span>{{$lang('手续费')}}：￥{{formatNum(bill.poundage)}}</span>
                            <span>{{$lang('实际金额')}}：￥{{formatNum(bill.realMoney)}}</span>
                        </p>
                    </li>
                </ul>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pagiOpt14.row" :current-page="pagiOpt14.page" @size-change="sizeChange14" @current-change="currentChange14" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt14.total">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </div>
        <!-- 我的钱包-支付管理 -->
        <div class="mybag-zfgl-wrap" v-if="navIndex==3">
            <ul class="zd-nav-ul clearfix">
                <li class="zd-nav" :class="orderIndex==1?'active':null">
                    <a href="javascript:;" @click="collapse=[],orderList(-1,1)">{{$lang('全部')}}</a>
                </li>
                <li class="zd-nav" :class="orderIndex==2?'active':null">
                    <a href="javascript:;" @click="collapse=[],orderList(1,2)">{{$lang('待支付')}}</a>
                </li>
                <li class="zd-nav" :class="orderIndex==3?'active':null">
                    <a href="javascript:;" @click="collapse=[],orderList(2,3)">{{$lang('已支付')}}</a>
                </li>
            </ul>
            <div v-if="orderIndex==1">
                <div class="">
                    <dl class="bag-pay-dl" v-for="(bill,index) in billTable21" :key="index">
                        <dt class="bag-pay-dt box-flex-media-box">
                            <p class="flex1">{{$lang('订单号')}}：{{bill.orderId}}</p>
                            <p class="flex1">{{$lang('状态')}}：{{getState5(bill.state)}}</p>
                            <p class="">{{$lang('下单时间')}}：{{bill.createTime}}</p>
                        </dt>
                        <dd class="bag-pay-dd" v-if="bill.subTasks.length>0">
                            <ul class="bag-pay-dd_ul" v-if="!collapse[index]">
                                <li class="bpd-li box-flex-media-box">
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header"><img :src="bill.subTasks[0].url||''" /></p>
                                            <p class="name flex1" @click="toTaskDetail(bill.subTasks[0])">{{bill.subTasks[0].projectName}}</p>
                                        </div>
                                    </div>
                                    <p class="bpd-li_num">￥{{formatNum(bill.subTasks[0].total)}}</p>
                                </li>
                            </ul>
                            <ul class="bag-pay-dd_ul" v-for="(item,i) in bill.subTasks" :key="i" v-show="collapse[index]">
                                <li class="bpd-li box-flex-media-box">
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header"><img :src="item.url||''" /></p>
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
                                <a href="javascript:;" @click="setCollapse(index)">【{{$lang('展开')}}】</a>
                            </div>
                            <div class="box-flex-media-box pay-showOff-wrap" v-if="bill.subTasks.length>1&&collapse[index]">
                                <p class="flex1">
                                    <em></em>
                                </p>
                                <a href="javascript:;" @click="setCollapse(index)">【{{$lang('收起')}}】</a>
                            </div>
                        </dd>
                        <dd class="bag-pay-footer-dd  box-flex-media-box">
                            <p class="flex1" v-if="bill.state=='1'">{{$lang('待支付')}}：
                                <em>{{formatNum(bill.total)}}</em> {{$lang('元')}}</p>
                            <p class="flex1" v-if="bill.state=='2'">{{$lang('已支付')}}：
                                <em>{{formatNum(bill.total)}}</em> {{$lang('元')}}</p>
                            <div class="flex1">
                                <el-button type="text">{{$lang('支付人')}}：{{bill.payBy || '-'}}</el-button>
                            </div>
                            <el-button type="sure" v-if="bill.state=='1'" @click="toPayRecordOrder(bill.orderId, bill.total)">{{$lang('订单支付')}}</el-button>
                            <el-button type="cancle" v-if="bill.state=='1'" @click="cancelRecordOrder(bill.orderId)">{{$lang('取消订单')}}</el-button>
                        </dd>
                    </dl>
                </div>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[2,4]" :page-size="pagiOpt21.row" :current-page="pagiOpt21.page" @size-change="sizeChange21" @current-change="currentChange21" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt21.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div v-if="orderIndex==2">
                <div class="">
                    <dl class="bag-pay-dl" v-for="(bill,index) in billTable22" :key="index">
                        <dt class="bag-pay-dt box-flex-media-box">
                            <p class="flex1">{{$lang('订单号')}}：{{bill.orderId}}</p>
                            <p class="flex1">{{$lang('状态')}}：{{getState5(bill.state)}}</p>
                            <p class="">{{$lang('下单时间')}}：{{bill.createTime}}</p>
                        </dt>
                        <dd class="bag-pay-dd" v-if="bill.subTasks.length>0">
                            <ul class="bag-pay-dd_ul" v-if="!collapse[index]">
                                <li class="bpd-li box-flex-media-box">
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header"><img :src="bill.subTasks[0].url||''" /></p>
                                            <p class="name flex1" @click="toTaskDetail(bill.subTasks[0])">{{bill.subTasks[0].projectName}}</p>
                                        </div>
                                    </div>
                                    <p class="bpd-li_num">￥{{formatNum(bill.subTasks[0].total)}}</p>
                                </li>
                            </ul>
                            <ul class="bag-pay-dd_ul" v-for="(item,i) in bill.subTasks" :key="i" v-show="collapse[index]">
                                <li class="bpd-li box-flex-media-box">
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header"><img :src="item.url||''" /></p>
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
                                <a href="javascript:;" @click="setCollapse(index)">【{{$lang('展开')}}】</a>
                            </div>
                            <div class="box-flex-media-box pay-showOff-wrap" v-if="bill.subTasks.length>1&&collapse[index]">
                                <p class="flex1">
                                    <em></em>
                                </p>
                                <a href="javascript:;" @click="setCollapse(index)">【{{$lang('收起')}}】</a>
                            </div>
                        </dd>
                        <dd class="bag-pay-footer-dd  box-flex-media-box">
                            <p class="flex1">{{$lang('待支付')}}：
                                <em>{{formatNum(bill.total)}}</em> {{$lang('元')}}</p>
                            <div class="flex1">
                                <el-button type="text">{{$lang('支付人')}}：{{bill.payBy || '-'}}</el-button>
                            </div>
                            <el-button type="sure" v-if="bill.state=='1'" @click="toPayRecordOrder(bill.orderId, bill.total)">{{$lang('订单支付')}}</el-button>
                            <el-button type="cancle" v-if="bill.state=='1'" @click="cancelRecordOrder(bill.orderId)">{{$lang('取消订单')}}</el-button>
                        </dd>
                    </dl>
                </div>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[2,4]" :page-size="pagiOpt22.row" :current-page="pagiOpt22.page" @size-change="sizeChange22" @current-change="currentChange22" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt22.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div v-if="orderIndex==3">
                <div class="">
                    <dl class="bag-pay-dl" v-for="(bill,index) in billTable23" :key="index">
                        <dt class="bag-pay-dt box-flex-media-box">
                            <p class="flex1">{{$lang('订单号')}}：{{bill.orderId}}</p>
                            <p class="flex1">{{$lang('状态')}}：{{getState5(bill.state)}}</p>
                            <p class="">{{$lang('下单时间')}}：{{bill.createTime}}</p>
                        </dt>
                        <dd class="bag-pay-dd" v-if="bill.subTasks.length>0">
                            <ul class="bag-pay-dd_ul" v-if="!collapse[index]">
                                <li class="bpd-li box-flex-media-box">
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header"><img :src="bill.subTasks[0].url||''" /></p>
                                            <p class="name flex1" @click="toTaskDetail(bill.subTasks[0])">{{bill.subTasks[0].projectName}}</p>
                                        </div>
                                    </div>
                                    <p class="bpd-li_num">￥{{formatNum(bill.subTasks[0].total)}}</p>
                                </li>
                            </ul>
                            <ul class="bag-pay-dd_ul" v-for="(item,i) in bill.subTasks" :key="i" v-show="collapse[index]">
                                <li class="bpd-li box-flex-media-box">
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header"><img :src="item.url||''" /></p>
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
                                <a href="javascript:;" @click="setCollapse(index)">【{{$lang('展开')}}】</a>
                            </div>
                            <div class="box-flex-media-box pay-showOff-wrap" v-if="bill.subTasks.length>1&&collapse[index]">
                                <p class="flex1">
                                    <em></em>
                                </p>
                                <a href="javascript:;" @click="setCollapse(index)">【{{$lang('收起')}}】</a>
                            </div>
                        </dd>
                        <dd class="bag-pay-footer-dd  box-flex-media-box">
                            <p class="flex1">{{$lang('支付金额')}}：
                                <em>{{formatNum(bill.total)}}</em> {{$lang('元')}}</p>
                            <div class="flex1">
                                <el-button type="text">{{$lang('支付人')}}：{{bill.payBy || '-'}}</el-button>
                            </div>

                        </dd>
                    </dl>
                </div>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[2,4]" :page-size="pagiOpt23.row" :current-page="pagiOpt23.page" @size-change="sizeChange23" @current-change="currentChange23" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt23.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <!--订单充值-->
        <div class="mybag-zd-wrap" v-if="navIndex==4">
            <div class="zd-list-wrap">
                <div class="pad-top-40">
                    <ul class="zd-list-ul">
                        <li class="zd-list-li clearfix" v-for="(bill,i) in billTable3" :key="i">
                            <p>
                                <span>{{$lang('流水号')}}：{{bill.orderId}}</span>
                                <span>{{$lang('金额')}}：￥{{formatNum(bill.money)}}</span>
                            </p>
                            <p>
                                <span>{{$lang('状态')}}：{{getState6(bill.state)}}</span>
                                <span>{{$lang('创建时间')}}：{{bill.createTime}}</span>
                            </p>
                            <p>
                                <span>{{$lang('支付时间')}}：{{bill.payTime || '-'}}</span>
                                <span>{{$lang('支付类型')}}：{{getType6(bill.payType)}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pagiOpt3.row" :current-page="pagiOpt3.page" @size-change="sizeChange3" @current-change="currentChange3" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt3.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--提现订单-->
        <div class="mybag-zd-wrap" v-if="navIndex==5">
            <div class="zd-list-wrap">
                <div class="pad-top-40">
                    <ul class="zd-list-ul">
                        <li class="zd-list-li clearfix" v-for="(bill,i) in billTable4" :key="i">
                            <p>
                                <span>{{$lang('提现方式')}}：{{getType7(bill.atmType)}}</span>
                                <span>{{$lang('金额')}}：￥{{formatNum(bill.money)}}</span>
                            </p>
                            <p>
                                <span>{{$lang('提现账号')}}：{{bill.cardNum}}</span>
                                <el-tooltip v-if="bill.state=='3'" :content="bill.remarks" placement="top">
                                    <span style='cursor:pointer'>{{$lang('拒绝理由')}}：{{bill.remarks.length > 6 ? bill.remarks.substring(0, 6) + '...' : bill.remarks}}</span>
                                </el-tooltip>
                            </p>
                            <p>
                                <span>{{$lang('创建时间')}}：{{bill.createTime}}</span>
                                <span>{{$lang('状态')}}：{{getState7(bill.state)}}</span>
                            </p>
                        </li>
                    </ul>
                </div>

                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination :page-sizes="[5, 10, 15, 20]" :page-size="pagiOpt4.row" :current-page="pagiOpt4.page" @size-change="sizeChange4" @current-change="currentChange4" layout="total, sizes, prev, pager, next, jumper" :total="pagiOpt4.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="$lang('微信支付二维码')" ref="WXImg" :visible.sync="WXPayImgShow" size="tiny" :before-close="WXPayImgClose">
            <div style="text-align: center"><img :src="WXImgSrc" alt=""></div>
        </el-dialog>
        <el-dialog title="Tips" :visible.sync="dialogVisible" size="tiny">
            <span>{{$lang('是否放弃编辑？')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false,nextTo=false">{{$lang('取消')}}</el-button>
                <el-button type="sure" @click="cancalEdit">{{$lang('确定')}}</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="$lang('支付')" :visible.sync="payDialogVisible" size="tiny" :before-close="payDialogClose">
            <div class="pay-dialog-wrap">
                <!--点击申请支付后 付款-->
                <div class="payment-method-wrap">
                    <div class="box-flex-media-box">
                        <p class="flex1">{{$lang('付款金额')}}：
                            <em>{{payDialogTotal}}</em>{{$lang('元')}}</p>
                        <div class="pm-cz-btn">
                            <div class="box-flex-media-box">
                                <!--<el-button type="sure">{{$lang('充值')}}</el-button>-->
                                <p class="marg-left-10">{{$lang('余额')}}：{{totalMoney}} </p>
                            </div>
                        </div>
                    </div>
                    <p class="yebz-tips" v-if="payDialogCashType == 3 && totalMoney < payDialogTotal">*{{$lang('余额不足请充值。')}}</p>
                    <div class="zffs-div">
                        <ul class="clearfix">
                            <li class="zffs-li" :class="payDialogCashType==1&&'active'" @click="payDialogCashType=1">
                                <span class="zf-zfb">
                                    <i></i>
                                </span>
                                <p>{{$lang('支付宝支付')}}</p>
                            </li>
                            <li class="zffs-li" :class="payDialogCashType==2&&'active'" @click="payDialogCashType=2">
                                <span class="zf-wx">
                                    <i></i>
                                </span>
                                <p>{{$lang('微信支付')}}</p>
                            </li>
                            <li class="zffs-li" :class="payDialogCashType==3&&'active'" @click="payDialogCashType=3">
                                <span class="zf-ye">
                                    <i></i>
                                </span>
                                <p>{{$lang('余额支付')}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="payment-btn-wrap">
                        <el-button type="sure" @click="payDialogCashTypeToPay">{{$lang('付款')}}</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { addRecharge, getAliapyInfo, createWXPayOrder, checkByOrderId, getMoney, cancelOrder, addAtms, balancePay } from '@/apis/money'
import { getUser } from '@/apis/storage'
import { atmsList, rechargeList, orderList, recordList } from '@/apis/person'
import { formatNumber } from '@/apis/util'
import axios from 'axios'

export default {
    data() {
        return {
            userId: "",
            loading1: false,
            loading2: false,
            collapse: [],
            dialogVisible: false,
            nextTo: false,
            navIndex: 1,//总nav
            operateType: "index",//资金页操作类型
            billIndex: 1,//账单页tab
            chargeType: 1,//充值方式
            cashType: 1,//提现方式
            chargeForm: { money: "" },
            cashForm: {
                withdrawalsMoney: "",
                withdrawalsName: "",
                withdrawalsAlipayNum: "",
                withdrawalsBankName: "",
                withdrawalsBankNum: ""
            },
            orderIndex: 1,//支付管理tab
            billTable11: [],//流水1
            billTable12: [],//流水2
            billTable13: [],//流水3
            billTable14: [],//流水4
            billTable21: [],//支付管理
            billTable22: [],//支付管理
            billTable23: [],//支付管理
            billTable3: [],//支付列表
            billTable4: [],//提现列表
            //分页参数
            pagiOpt11: {
                total: 0,
                page: 1,
                row: 5
            },
            pagiOpt12: {
                total: 0,
                page: 1,
                row: 5
            },
            pagiOpt13: {
                total: 0,
                page: 1,
                row: 5
            },
            pagiOpt14: {
                total: 0,
                page: 1,
                row: 5
            },
            pagiOpt21: {
                total: 0,
                page: 1,
                row: 6
            },
            pagiOpt22: {
                total: 0,
                page: 1,
                row: 6
            },
            pagiOpt23: {
                total: 0,
                page: 1,
                row: 6
            },
            pagiOpt3: {
                total: 0,
                page: 1,
                row: 5
            },
            pagiOpt4: {
                total: 0,
                page: 1,
                row: 5
            },
            chargeRules: {
                money: [{ validator: this.validateMoney, trigger: 'blur' }],
            },
            cashRules: {
                withdrawalsMoney: [{ validator: this.validateMoney, trigger: 'blur' }],
                withdrawalsName: [{ validator: this.validateName, trigger: 'blur' }],
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
        this.userId = this.$route.query.userId || getUser().userId;
        this.navIndex = this.$route.query.index || '1';
        this.getTotalMoney();
        this.recordList($lang('支付佣金'), 1);//流水
        this.orderList('-1', 1);//支付管理
        this.rechargeList();//订单充值
        this.atmsList();//提现订单
    },
    mounted() {
        const me = this;
        const state = me.$route.query.state;//加个页面状态，1：充值成功返回
    },
    methods: {
        setCollapse(index) {
            this.$set(this.collapse, index, !this.collapse[index])
        },
        validateMoney(rule, value, callback) {
            if (value === '') {
                callback(new Error($lang('金额不能为空')));
            } else if (!(/^[+]?[\d]+(([\.]{1}[\d]+)|([\d]*))$/.test(value))) {
                callback(new Error($lang('请输入正确的金额')));
            } else {
                callback();
            }
        },
        validateName(rule, value, callback) {
            if (value === '') {
                callback(new Error($lang('账户名不能为空')));
            } else {
                callback();
            }
        },
        formatNum(str) {
            return formatNumber(str);
        },
        //我的资金
        async getTotalMoney() {
            const me = this;
            let userId = me.userId;
            const moneyData = await getMoney({ userId });
            if (moneyData.success) me.totalMoney = moneyData.data.money;
        },
        doSubmit(formName) {
            const me = this;
            me.$refs[formName].validate((valid) => {
                if (valid) {
                    if (formName == "cashForm") {
                        me.loading2 = true;
                        me.withdrawals('index');
                    } else {
                        me.loading1 = true;
                        me.recharge('index');
                    }
                } else {
                    return false;
                }
            })
        },
        WXPayImgClose() {
            const me = this;
            me.$confirm($lang('确认取消支付？')).then(data => {
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
            const WXPayState = await checkByOrderId({ orderId, type: 2 });
            if (WXPayState.data.state == "2") {
                me.$message.success($lang("支付成功"));
                clearInterval(me.WXPayTimes);
                me.WXPayImgShow = false;
                me.WXImgSrc = "";
                me.operateType = "index";
                me.getTotalMoney();
                me.rechargeList();
            } else if (WXPayState.data.state == "3") {
                me.$message.error($lang('支付失败'));
                clearInterval(me.WXPayTimes);
                me.WXPayImgShow = false;
                me.WXImgSrc = "";
                me.operateType = "index";
            }
        },
        async recharge(index) {
            const me = this;
            const money = me.chargeForm.money;
            if (money == 0 || money == "") {
                me.$message({ type: 'warning', message: $lang('金额不能为空，也不能为0') });
                return
            }
            if (!/^\d+(\.\d{2})?$/.test(money * 1)) {
                me.$message.error($lang('价格格式不对，请输入正确的价格'));
                return;
            }
            const chargeType = me.chargeType;
            const rechangeData = await addRecharge({ money });
            if (!rechangeData.success) {
                me.$message({ type: 'error', message: rechangeData.msg });
                return
            }
            if (chargeType == 1) {//支付宝
                const alipayData = await getAliapyInfo({ outTradeNo: rechangeData.data.orderId, subject: $lang("用户充值：") + rechangeData.data.orderId, totalFee: rechangeData.data.money, body: `2&&${location.href}` });
                let div = document.createElement("div");
                div.innerHTML = alipayData.data;
                //"<form id="alipaysubmit" name="alipaysubmit" action="https://mapi.alipay.com/gateway.do?_input_charset=utf-8" method="get"><input type="hidden" name="_input_charset" value="utf-8"/><input type="hidden" name="subject" value="用户充值：1707131107009671cd1020b5user-1"/><input type="hidden" name="sign" value="22b97558611e4aec5ae4808bd8f73ab7"/><input type="hidden" name="notify_url" value="http://combo.xin:80/vswork/api/alipay/notify_url"/><input type="hidden" name="body" value="2"/><input type="hidden" name="payment_type" value="1"/><input type="hidden" name="out_trade_no" value="1707131107009671cd1020b5user-1"/><input type="hidden" name="partner" value="2088811329319614"/><input type="hidden" name="service" value="create_direct_pay_by_user"/><input type="hidden" name="total_fee" value="111"/><input type="hidden" name="app_pay" value="Y"/><input type="hidden" name="return_url" value="http://combo.xin:80/vswork/api/alipay/return_url"/><input type="hidden" name="sign_type" value="MD5"/><input type="hidden" name="seller_id" value="2088811329319614"/><input type="submit" value="确认" style="display:none;"></form>"
                document.body.appendChild(div);
                document.forms['alipaysubmit'].submit();
            } else if (chargeType == 2) {//微信
                me.loading1 = false;
                me.WXPayImgShow = true;
                me.WXImgSrc = `${axios.defaults.baseURL}/wxpay/createOrder?orderId=${rechangeData.data.orderId}&attach=2`;
                me.WXPayOrderId = rechangeData.data.orderId;
                me.WXPayTimes = setInterval(me.queryWXPayState, 5000);
            }
        },
        async withdrawals(index) {
            const me = this;
            let atmType = me.cashType,
                money = me.cashForm.withdrawalsMoney,
                name = me.cashForm.withdrawalsName,
                cardNum,
                bankName = "";
            if (me.cashType == 1) {//支付宝提现
                cardNum = me.cashForm.withdrawalsAlipayNum;
            } else if (me.cashType == 2) {//银联提现
                cardNum = me.cashForm.withdrawalsBankNum;
                bankName = me.cashForm.withdrawalsBankName;
            }
            const atomData = await addAtms({ atmType, money, name, cardNum, bankName });
            this.loading2 = false;
            if (atomData.success) {
                me.$message($lang("提现成功"));
                me.getTotalMoney();
                me.operateType = index;
                me.atmsList();
            } else {
                me.$message.error(atomData.msg)
            }
        },
        //我的账单流水
        async recordList(type, index) {
            this.billIndex = index;
            const res = await recordList({ type: type, page: this['pagiOpt1' + index].page, row: this['pagiOpt1' + index].row })
            if (res.success) {
                this['billTable1' + index] = res.data.list;
                this['pagiOpt1' + index].total = res.data.total;
            } else {
                this.$message.error(res.msg);
            }
        },
        sizeChange11(i) {
            this.pagiOpt11.row = i;
            this.recordList($lang('支付佣金'), 1);
        },
        currentChange11(i) {
            this.pagiOpt11.page = i;
            this.recordList($lang('支付佣金'), 1);
        },
        sizeChange12(i) {
            this.pagiOpt12.row = i;
            this.recordList($lang('任务退款'), 2);
        },
        currentChange12(i) {
            this.pagiOpt12.page = i;
            this.recordList($lang('任务退款'), 2);
        },
        sizeChange13(i) {
            this.pagiOpt13.row = i;
            this.recordList($lang('充值'), 3);
        },
        currentChange13(i) {
            this.pagiOpt13.page = i;
            this.recordList($lang('充值'), 3);
        },
        sizeChange14(i) {
            this.pagiOpt14.row = i;
            this.recordList($lang('提现'), 4);
        },
        currentChange14(i) {
            this.pagiOpt14.page = i;
            this.recordList($lang('提现'), 4);
        },
        toTaskDetail(item) {
            if (item.id) {
                this.$router.push({ name: "B_TaskChildDetail", query: { id: item.id } })
            } else {
                this.$message($lang('任务不存在'));
            }
        },
        //支付管理
        async orderList(state, index) {
            this.orderIndex = index
            const res = await orderList({ state: state, page: this['pagiOpt2' + index].page, row: this['pagiOpt2' + index].row })
            if (res.success) {
                this['billTable2' + index] = res.data.list;
                this['pagiOpt2' + index].total = res.data.total;
            } else {
                this.$message.error(res.msg);
            }
        },
        getState5(i) {
            let state = ''
            switch (i) {
                case '1':
                    state = $lang('申请支付中');
                    break;
                case '2':
                    state = $lang('支付成功');
                    break;
                case '3':
                    state = $lang('支付失败');
                    break;
                case '4':
                    state = $lang('废弃申请');
                    break;
                default:
                    state = $lang('申请支付中');
            }
            return state
        },
        sizeChange21(i) {
            this.pagiOpt21.row = i;
            this.orderList(-1, 1);
        },
        currentChange21(i) {
            this.pagiOpt21.page = i;
            this.orderList(-1, 1);
        },
        sizeChange22(i) {
            this.pagiOpt22.row = i;
            this.orderList(1, 2);
        },
        currentChange22(i) {
            this.pagiOpt22.page = i;
            this.orderList(1, 2);
        },
        sizeChange23(i) {
            this.pagiOpt23.row = i;
            this.orderList(2, 3);
        },
        currentChange23(i) {
            this.pagiOpt23.page = i;
            this.orderList(2, 3);
        },
        //订单充值
        async rechargeList() {
            const res = await rechargeList({ state: "", payType: "", page: this.pagiOpt3.page, row: this.pagiOpt3.row })
            if (res.success) {
                this.billTable3 = res.data.list;
                this.pagiOpt3.total = res.data.total;
            } else {
                this.$message.error(res.msg);
            }
        },
        getState6(i) {
            let state = ''
            switch (i) {
                case '1':
                    state = $lang('创建');
                    break;
                case '2':
                    state = $lang('支付成功 ');
                    break;
                case '3':
                    state = $lang('支付失败');
                    break;
                default:
                    state = $lang('创建');
            }
            return state
        },
        getType6(i) {
            let type = ''
            switch (i) {
                case '1':
                    type = $lang('微信');
                    break;
                case '2':
                    type = $lang('支付宝 ');
                    break;
                default:
                    type = $lang('未支付');
            }
            return type
        },
        sizeChange3(i) {
            this.pagiOpt3.row = i;
            this.rechargeList();
        },
        currentChange3(i) {
            this.pagiOpt3.page = i;
            this.rechargeList();
        },
        //提现订单
        async atmsList() {
            const res = await atmsList({ state: "", atmType: "", page: this.pagiOpt4.page, row: this.pagiOpt4.row })
            if (res.success) {
                this.billTable4 = res.data.list;
                this.pagiOpt4.total = res.data.total;
            } else {
                this.$message.error(res.msg);
            }
        },
        getState7(i) {
            let state = ''
            switch (i) {
                case '1':
                    state = $lang('已提交申请');
                    break;
                case '2':
                    state = $lang('同意');
                    break;
                case '3':
                    state = $lang('拒绝');
                    break;
                case '4':
                    state = $lang('取消');
                    break;
                default:
                    state = $lang('已提交申请');
            }
            return state
        },
        getType7(i) {
            let type = ''
            switch (i) {
                case '1':
                    type = $lang('支付宝');
                    break;
                case '2':
                    type = $lang('银行卡');
                    break;
                default:
                    type = $lang('未提现');
            }
            return type
        },
        sizeChange4(i) {
            this.pagiOpt4.row = i;
            this.atmsList();
        },
        currentChange4(i) {
            this.pagiOpt4.page = i;
            this.atmsList();
        },
        cancalEdit() {
            this.$router.push({ name: this.nextTo })
            this.dialogVisible = false;
        },
        toPayRecordOrder(orderId, total) {
            const me = this;
            //                const orderData = await checkByOrderId({orderId, type: 1});
            me.payDialogVisible = true;
            me.orderId = orderId;
            me.payDialogTotal = total;
            //                console.log(orderData);
        },
        async payDialogCashTypeToPay() {
            const me = this;
            const res = await checkByOrderId({ orderId: me.orderId, type: 1 });
            if (me.payDialogCashType == 3) {//余额支付
                if (me.totalMoney < me.payDialogTotal) {
                    me.$message($lang('余额不足'));
                    return
                }
                me.$confirm($lang('确定用余额支付') + me.payDialogTotal + $lang('元')).then(async data => {
                    if (data == 'confirm') {
                        const data = await balancePay({ orderId: res.data.orderId });
                        if (data.success) {
                            me.$message($lang('操作成功'));
                            setTimeout(function() {
                                me.$router.push({ name: 'B-userInfo-bag', query: { id: getUser().userId, index: 3 } })
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
                const alipayData = await getAliapyInfo({ outTradeNo: res.data.orderId, subject: $lang("订单支付：") + res.data.orderId, totalFee: res.data.total, body: `1&&${location.href}` });
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
            me.$confirm($lang('确认取消支付？')).then(data => {
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
            me.$confirm($lang('确定取消该订单？'), $lang('提示'), {
                confirmButtonText: $lang('确定取消'),
                cancelButtonText: $lang('放弃操作'),
                type: 'warning'
            }).then(async () => {
                const res = await cancelOrder({ orderId });
                if (res.success) {
                    me.$message({
                        type: 'success',
                        message: $lang('取消成功!')
                    });
                    setTimeout(function() {
                        me.$router.push({ name: 'B-userInfo-bag', query: { id: getUser().userId, index: 3 } })
                        history.go(0)
                    }, 200)
                    me.recordList($lang('支付佣金'), 1);//流水
                }
            }).catch(() => {
            });
        }
    },
    beforeRouteLeave(to, from, next) {
        next();
        // if (this.operateType == 'charge' || this.operateType == 'cash') {
        //     this.dialogVisible = true;
        //     if (this.nextTo) {
        //         next()
        //     } else {
        //         next(false)
        //         this.nextTo = to.name
        //     }
        // } else {
        //     next()
        // }
    }
}
</script>
