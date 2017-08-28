<template>
    <!-- 我的钱包  -->
    <div class="my-bag-wrapper" :class="'bg-f5'">
        <div class="userinfo-nav">
            <el-button :type="billIndex==1?'sure':'text'" @click="recordList($lang('支付佣金'),1)">{{$lang('支付佣金')}}</el-button>
            <el-button :type="billIndex==2?'sure':'text'" @click="recordList($lang('任务退款'),2)">{{$lang('任务退款')}}</el-button>
            <el-button :type="billIndex==3?'sure':'text'" @click="recordList($lang('充值'),3)">{{$lang('充值')}}</el-button>
            <el-button :type="billIndex==4?'sure':'text'" @click="recordList($lang('提现'),4)">{{$lang('提现')}}</el-button>
        </div>
        <!-- 我的钱包-账单流水 -->
        <div class="mybag-zd-wrap" >
            <div class="zd-list-wrap" v-if="billIndex==1">
                <div class="pad-top-40">
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
                </div>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagiOpt11.row"
                            :current-page="pagiOpt11.page"
                            @size-change="sizeChange11"
                            @current-change="currentChange11"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagiOpt11.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="zd-list-wrap" v-if="billIndex==2">
                <div class="pad-top-40">
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
                </div>
                <div class="page-wrap clearfix">
                    <div class="fr">
                         <el-pagination
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagiOpt12.row"
                            :current-page="pagiOpt12.page"
                            @size-change="sizeChange12"
                            @current-change="currentChange12"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagiOpt12.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="zd-list-wrap" v-if="billIndex==3">
                <div class="pad-top-40">
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
                </div>
                <div class="page-wrap clearfix">
                    <div class="fr">
                         <el-pagination
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagiOpt13.row"
                            :current-page="pagiOpt13.page"
                            @size-change="sizeChange13"
                            @current-change="currentChange13"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagiOpt13.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="zd-list-wrap" v-if="billIndex==4">
                <div class="pad-top-40">
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
                </div>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagiOpt14.row"
                            :current-page="pagiOpt14.page"
                            @size-change="sizeChange14"
                            @current-change="currentChange14"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagiOpt14.total">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {getUser} from '@/apis/storage'
    import {recordList} from '@/apis/person'
    import {formatNumber} from '@/apis/util'
    import axios from 'axios'
    export default {
        data() {
            return {
                billIndex: 1,//账单页tab 
                orderIndex:1,//支付管理tab
                billTable11:[],//流水1
                billTable12:[],//流水2
                billTable13:[],//流水3
                billTable14:[],//流水4
                //分页参数
                pagiOpt11:{
                    total:0,
                    page:1,
                    row:5
                },
                pagiOpt12:{
                    total:0,
                    page:1,
                    row:5
                },
                pagiOpt13:{
                    total:0,
                    page:1,
                    row:5
                },
                pagiOpt14:{
                    total:0,
                    page:1,
                    row:5
                },
            
            }
        },
        created(){
            this.recordList($lang('支付佣金'),1);//流水
        },
        methods: {
            formatNum(str){
                return formatNumber(str);
            },
            //我的账单流水
            async recordList(type,index){
                this.billIndex=index;
                const res=await recordList({type:type,page:this['pagiOpt1'+index].page,row:this['pagiOpt1'+index].row})
                if(res.success){
                    this['billTable1'+index]=res.data.list;
                    this['pagiOpt1'+index].total=res.data.total;
                }else{
                    this.$message.error(res.msg);
                }
            },
            sizeChange11(i){
                this.pagiOpt11.row=i;
                this.recordList($lang('支付佣金'),1);
            },
            currentChange11(i){
               this.pagiOpt11.page=i;
               this.recordList($lang('支付佣金'),1);
            },
            sizeChange12(i){
                this.pagiOpt12.row=i;
                this.recordList($lang('任务退款'),2);
            },
            currentChange12(i){
               this.pagiOpt12.page=i;
               this.recordList($lang('任务退款'),2);
            },
            sizeChange13(i){
                this.pagiOpt13.row=i;
                this.recordList($lang('充值'),3);
            },
            currentChange13(i){
               this.pagiOpt13.page=i;
               this.recordList($lang('充值'),3);
            },
            sizeChange14(i){
                this.pagiOpt14.row=i;
                this.recordList($lang('提现'),4);
            },
            currentChange14(i){
               this.pagiOpt14.page=i;
               this.recordList($lang('提现'),4);
            },
        }
    }
</script>
