<!--已支付-->
<template>
    <div class="mybag-zfgl-wrap" >
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
                            <li class="bpd-li box-flex-media-box" >
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header"><img :src="bill.subTasks[0].url"/></p>
                                        <p class="name flex1" @click="toTaskDetail(bill.subTasks[0])">{{bill.subTasks[0].projectName}}</p>
                                    </div>
                                </div>
                                <p class="bpd-li_num">￥{{formatNum(bill.subTasks[0].total)}}</p>
                            </li>
                        </ul>
                        <ul class="bag-pay-dd_ul" v-for="item in bill.subTasks" v-if="collapse[index]">
                            <li class="bpd-li box-flex-media-box" >
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header"><img :src="item.url"/></p>
                                        <p class="name flex1" @click="toTaskDetail(item)">{{item.projectName}}</p>
                                    </div>
                                </div>
                                <p class="bpd-li_num">￥{{formatNum(item.total)}}</p>
                            </li>
                        </ul>
                        <div class="box-flex-media-box pay-showOff-wrap" v-if="bill.subTasks.length>1&&!collapse[index]">
                                <p class="flex1" @click="setCollapse(index)"><em>……</em></p>
                                <a href="javascript:;" @click="setCollapse(index)">【展开】</a>
                        </div>
                        <div class="box-flex-media-box pay-showOff-wrap" v-if="bill.subTasks.length>1&&collapse[index]">
                                <p class="flex1" ><em></em></p>
                                <a href="javascript:;" @click="setCollapse(index)">【收起】</a>
                        </div>
                    </dd>
                    <dd class="bag-pay-footer-dd  box-flex-media-box">
                        <p class="flex1" >已支付：<em>{{formatNum(bill.total)}}</em> 元</p>
                        <div class="flex1">
                                <el-button type="text">支付人：{{bill.payBy||'-'}}</el-button>
                        </div>
                       
                    </dd>
                </dl>
            </div>
            <div class="page-wrap clearfix">
                <div class="fr">
                    <el-pagination
                            :page-sizes="[2,4]"
                            :page-size="pagiOpt.row"
                            :current-page="pagiOpt.page"
                            @size-change="sizeChange"
                            @current-change="currentChange"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagiOpt.total">
                        </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {orderList} from '@/apis/person'
import {formatNumber} from '@/apis/util'
export default{
     data() {
        return {
            billTable:[],
            collapse:[],
            pagiOpt:{
                page:1,
                row:2
            }
        }
    },
    created(){
        this.orderList();//支付管理
    },
    methods:{
        setCollapse(index){
                this.$set(this.collapse,index,!this.collapse[index])
        },
        //支付管理
        async orderList(){
            const res=await orderList({state:2,page:this.pagiOpt.page,row:this.pagiOpt.row})
            if(res.success){
                this.billTable=res.data.list;
                this.pagiOpt.total=res.data.total;
            }else{
                this.$message.error(res.msg);
            }
        },
        sizeChange(i){
            this.pagiOpt.row=i;
            this.orderList();
        },
        currentChange(i){
            this.pagiOpt.page=i;
            this.orderList();
        },
        getState(i){
            let state=''
            switch(i){
                case '1':state='申请支付中';break;
                case '2':state='支付成功 ';break;
                case '3':state='支付失败';break;
                case '4':state='废弃申请';break;
                default: state='申请支付中'
            }
            return state
        },
        formatNum(str){
            return formatNumber(str);
        },
        toTaskDetail(item){
            if(item.taskId){
                this.$router.push({ name: "B-detail", query: { id: item.taskId } })
            }
        },
    }
}    
</script>