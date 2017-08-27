<template>
 <!--s端 待审核-->
  <div class="content-wrapper">
    <div class="all-task-wrapper">
         <h3 class="main-title">总任务详情</h3>
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
                            <dd class="flex1">VSWORk建模</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>发包类型:</dt>
                            <dd class="flex1">私密</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>任务时间:</dt>
                            <dd class="flex1">2017-06-07</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>任务分组:</dt>
                            <dd class="flex1">世界制造大会</dd>
                        </dl>
                    </div>
                    <div class="task-progress-wrap">
                        <p class="task-progress task-progress-ing">审核中</p>
                    </div>

                </el-col>
                <el-col :span="3">
                    <p class="all-task-price"><em>$</em>2000</p>
                </el-col>
            </el-row>
         </div>
         <div class="master-name">
            <div class="user-header"> <img src="../assets/images/user-header.png"/></div>
            <p>雇主：Avon-Lee</p>
         </div>

         <div class="serarch-diy">
              <el-input placeholder="搜索用户或者用户标签" v-model="input4">
                    <el-button slot="prepend" icon="search"></el-button>
                    <el-button slot="append" type="sure">搜索</el-button>
              </el-input>
         </div>
         <!-- 如果任务是公开的。。那么 “allot-public” 显示。。如果是私密。。 这一块 隐藏-->
         <div class="allot-public">
            <div class="userinfo-nav">
                <el-button type="sure">已报名列表</el-button>
                <el-button type="text">所有v端列表</el-button>
            </div>
         </div>

         <div class="allot-chose-wrap">
            <template>
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 100%">
                        <el-table-column
                        type="index"
                        width="">
                        </el-table-column>
                        <el-table-column
                        property="name"
                        label="昵称"
                        width="">
                        </el-table-column>
                        <el-table-column
                        property="date"
                        label="注册时间"
                        width="">
                        </el-table-column>
                         <el-table-column
                            prop="tag"
                            label="标签"
                            width=""
                            :filters="[{ text: 'A', value: 'A' }, { text: 'B', value: 'B' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                            <template scope="scope">
                                <el-tag
                                :type="scope.row.tag === 'A' ? 'primary' : 'success'"
                                close-transition>{{scope.row.tag}}</el-tag>
                            </template>
                         </el-table-column>
                        </el-table-column>
                </el-table>
             </template>
             <div class="page-wrap clearfix">
                <div class="fr">
                     <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
             </div>
         </div>

         <div class="set-btn-wrap">
           <el-button type="success">确认选择</el-button>
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
          name: '王小虎',
          tag: 'B'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          tag: 'B'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          tag: 'A'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          tag: 'A'
        }],
        currentRow: null
      }
    },

    methods: {
      //表格过滤  
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },

      //表格单选  
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
      
    }
  }
</script>