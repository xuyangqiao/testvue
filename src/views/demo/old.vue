<template>
   <div class="core-wrapper">
       <div class="core-main">
           <ul class="nav-circular clearfix">
                <li class="nav-circular-li nav-circular-li_dsh active">
                    <a href="javascript:;">待审核</a>
                </li>
                <li class="nav-circular-li nav-circular-li_shz">
                    <a href="javascript:;">审核中</a>
                </li>
                <li class="nav-circular-li  nav-circular-li_ysl">
                    <a href="javascript:;">已受理</a>
                </li>
                <li class="nav-circular-li nav-circular-li_ywc">
                    <a href="javascript:;">已完成</a>
                </li>
           </ul>
           <div class="screen-wrapper clearfix">
                <div class="fl task-set-select">
                    <template>
                        <el-select v-model="value" placeholder="专业分类">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-model="value" placeholder="应用场景">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-model="value" placeholder="状态选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </div>
                <div class="fr on-off-btn">
                    <el-switch
                        v-model="value2"
                        on-color="#1d9bf9"
                        off-color="#8a42e1"
                        on-text="公开"
                        off-text="私密">
                    </el-switch>
                </div>
           </div>
           <div class="screen-sun-wrapper">
                <div class="">
                    <el-badge :value="200" :max="99" class="item item-dqd active">
                       <el-button size="small">待确定</el-button>
                    </el-badge>
                    <el-badge :value="200" :max="99" class="item item-dzf">
                       <el-button size="small">待支付</el-button>
                    </el-badge>
                    <el-badge :value="200" :max="99" class="item item-zjz">
                       <el-button size="small">征集中</el-button>
                    </el-badge>
                    <el-badge :value="200" :max="99" class="item item-zzz">
                       <el-button size="small">制作中</el-button>
                    </el-badge>
                    <el-badge :value="200" :max="99" class="item item-ysz">
                       <el-button size="small">验收中</el-button>
                    </el-badge>
                    <el-badge :value="200" :max="99" class="item item-wc">
                       <el-button size="small">已完成</el-button>
                    </el-badge>
                </div>
           </div>
          <!--如果是私密的。。 那么给 “task-set-wrap”添加一个 class“task-set-wrap-private”-->
           <div class="task-set-wrap">
              <el-row :gutter="26">
                <el-col :span="6">
                   <div class="task-set-item task-set-item-ysl">
                        <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                    <p>项目金额：￥5000.00</p>
                                </div>
                                <i class='tag-biao'></i>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item task-set-item-zjz">
                        <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                    <p>项目金额：￥5000.00</p>
                                </div>
                                <i class='tag-biao'></i>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item task-set-item-ywc">
                        <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                    <p>项目金额：￥5000.00</p>
                                </div>
                                <i class='tag-biao'></i>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item task-set-item-dsh">
                        <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                    <p>项目金额：￥5000.00</p>
                                </div>
                                <i class='tag-biao'></i>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item task-set-item-dzf">
                        <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                    <p>项目金额：￥5000.00</p>
                                </div>
                                <i class='tag-biao'></i>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item task-set-item-zzz">
                        <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                    <p>项目金额：￥5000.00</p>
                                </div>
                                <i class='tag-biao'></i>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item task-set-item-zzz">
                        <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                    <p>项目金额：￥5000.00</p>
                                </div>
                                <i class='tag-biao'></i>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item task-set-item-zzz">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                    <p>项目金额：￥5000.00</p>
                                </div>
                                <i class='tag-biao'></i>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
              </el-row>
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
       </div>
   </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '专业分类1'
        }, {
          value: '2',
          label: '专业分类2'
        }, {
          value: '3',
          label: '专业分类3'
        }],
        value: '',
        value2: true
      }
    }
  }
</script>