<template>
  <div class="content-wrapper">
    <div class="all-task-wrapper">
         <h3 class="main-title main-title-dashed">任务详情</h3>
         <div class="all-task-base">
            <el-row>
                <el-col :span="11">
                  <div class="img-wrapper">
                      <img src="../assets/images/img.jpg"/>
                  </div>
                </el-col>
                <el-col :span="10">
                    <div class="">
                        <dl class="box-flex info-show">
                            <dt>项目名称:</dt>
                            <dd class="flex1">VSWORk建模一号</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>发包类型:</dt>
                            <dd class="flex1">私密</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>报名结束时间:</dt>
                            <dd class="flex1">2017-05-07 15：00</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>任务结束时间:</dt>
                            <dd class="flex1">2017-06-07 15：00</dd>
                        </dl>
                        <p class="zong-task-price"><em>$</em>2000</p>
                    </div>
                    

                </el-col>
                <el-col :span="3">
                    <div class="rw-right-wrap">
                        <div class="rw-right-top">
                           <div class="task-rt-info">
                                <a href="javascript:;">
                                    <img src="../assets/images/user-header.png"/>
                                    <p>雇主：Avon-Lee</p>
                                </a>
                           </div>
                        </div>
                        <div class="task-progress-wrap">
                           <!--
                            task-progress-shz ="审核中"，task-progress-dzf ="待支付"，task-progress-zfz ="支付中"
                            task-progress-ysl ="已受理"，task-progress-zzz ="制作中"，task-progress-dqd ="待确定"
                            task-progress-ybm ="已报名"，task-progress-ywc ="已完成"，task-progress-zjz ="征集中"
                            task-progress-dsh ="待审核"，task-progress-yfk ="已付款"，task-progress-dfk ="待付款"
                           -->
                            <p class="task-progress task-progress-shz">审核中</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
         </div>

         <div class="all-task-other">
             <template>
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    
                    <el-table-column
                    prop="name"
                    label="企业"
                    width="480">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="日期"
                    width="280">
                    </el-table-column>
                    <el-table-column
                    prop="type"
                    label="类型">
                    </el-table-column>
                </el-table>
             </template>
          
         </div>
         
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '南京千亩公司',
          type: '退出报名'
        }, {
          date: '2016-05-04',
          name: '南京千亩公司2',
          type: '报名'
        }, {
          date: '2016-05-01',
          name: '南京千亩公司3',
          type: '报名'
        }, {
          date: '2016-05-03',
          name: '南京千亩公司5',
          type: '退出报名'
        }]
      }
    }
  }
</script>