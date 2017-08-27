<template>
   <div class="prd-center-wrapper">
        <div class="prd-center-search">
            <div class="prd-center-search_main">
                <el-form :label-position="labelPosition" label-width="90px">
                    <el-form-item label="任务类型:">
                        <el-button type="sure">总任务</el-button>
                        <el-button type="diy">子任务</el-button>
                        <el-button type="diy">员工任务</el-button>
                    </el-form-item>
                    <el-form-item label="子任务:">
                        <el-button type="sure">全部</el-button>
                        <el-button type="diy">草稿</el-button>
                        <el-button type="diy">审核中</el-button>
                        <el-button type="diy">未通过</el-button>
                        <el-button type="diy">已受理</el-button>
                        <el-button type="diy">已完成</el-button>
                    </el-form-item>
                    <el-form-item label="任务类型:">
                        <el-col :span="22">
                            <el-select v-model="value" placeholder="专业分类">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <el-select v-model="value" placeholder="应用场景">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <el-select v-model="value" placeholder="状态选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                            <el-button type="text" @click="dialogGroup = true">分组管理</el-button>
                        </el-col>
                        <el-col :span="2" class="on-off-btn">
                            <el-switch
                                v-model="value2"
                                on-color="#1d9bf9"
                                off-color="#8a42e1"
                                on-text="公开"
                                off-text="私密">
                            </el-switch>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div> 
        <div class="prd-center-main">
           <div class="task-set-wrap">
              <el-row :gutter="20">
                <el-col :span="6">
                   <div class="task-set-item">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                </div>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                </div>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                </div>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                </div>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                </div>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                </div>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                </div>
                            </div>
                            <div class="news-tips-w">
                                <p>您有3新的消息</p>
                            </div>
                        </a>
                   </div>
                </el-col>
                <el-col :span="6">
                   <div class="task-set-item">
                       <a href="javascript:;" class="tsi-a">
                            <img src="../assets/images/img-item.jpg"/>
                            <div class="task-info_show">
                                <div class="vg-center ">
                                    <p>项目名称：u3d建筑模型制作9种</p>
                                    <p>任务截止时间：2017-03-31 18:00</p>
                                </div>
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
        <el-dialog title="分组管理" :visible.sync="dialogGroup" size="tiny" class="creat-group-wrapper">
            <div class="">
                <div class="creat-group">
                    <el-input placeholder="请输入分组名称"></el-input>
                    <div class="srk-set">
                         <a href="javascript:;" class="creat-a">创建分组</a>
                    </div>
                </div>
                <div class="group-msg-main">
                     <ul class="group-msg-ul">
                         <!--点击修改时候， 第二个div显示。 -->
                         <li class="group-msg-li">
                               <div class="box-flex-media-box">
                                   <el-radio class="radio flex1" v-model="radio" label="1">任务分组1</el-radio>
                                   <a href="javascript:;" class="a-text">修改</a>
                                   <a href="javascript:;" class="el-icon-close"></a>
                               </div>
                               <div class="box-flex-media-box" style="display:none;">
                                     <el-input placeholder="请输入分组名称" class="flex1"></el-input>
                                     <a href="javascript:;" class="a-text">确定</a>
                                     <a href="javascript:;" class="a-text a-text-cancle">取消</a>
                               </div>
                         </li>
                         <li class="group-msg-li">
                               <div class="box-flex-media-box"  style="display:none;">
                                   <el-radio class="radio flex1" v-model="radio" label="1">任务分组1</el-radio>
                                   <a href="javascript:;" class="a-text">修改</a>
                                   <a href="javascript:;" class="el-icon-close"></a>
                               </div>
                               <div class="box-flex-media-box">
                                     <el-input placeholder="请输入分组名称" class="flex1"></el-input>
                                     <a href="javascript:;" class="a-text">确定</a>
                                     <a href="javascript:;" class="a-text a-text-cancle">取消</a>
                               </div>
                         </li>
                         <li class="group-msg-li">
                               <div class="box-flex-media-box">
                                   <el-radio class="radio flex1" v-model="radio" label="1">任务分组1</el-radio>
                                   <a href="javascript:;" class="a-text">修改</a>
                                   <a href="javascript:;" class="el-icon-close"></a>
                               </div>
                               <div class="box-flex-media-box" style="display:none;">
                                     <el-input placeholder="请输入分组名称" class="flex1"></el-input>
                                     <a href="javascript:;" class="a-text">确定</a>
                                     <a href="javascript:;" class="a-text a-text-cancle">取消</a>
                               </div>
                         </li>
                         <li class="group-msg-li">
                               <div class="box-flex-media-box">
                                   <el-radio class="radio flex1" v-model="radio" label="1">任务分组1</el-radio>
                                   <a href="javascript:;" class="a-text">修改</a>
                                   <a href="javascript:;" class="el-icon-close"></a>
                               </div>
                               <div class="box-flex-media-box" style="display:none;">
                                     <el-input placeholder="请输入分组名称" class="flex1"></el-input>
                                     <a href="javascript:;" class="a-text">确定</a>
                                     <a href="javascript:;" class="a-text a-text-cancle">取消</a>
                               </div>
                         </li>
                         <li class="group-msg-li">
                               <div class="box-flex-media-box">
                                   <el-radio class="radio flex1" v-model="radio" label="1">任务分组1</el-radio>
                                   <a href="javascript:;" class="a-text">修改</a>
                                   <a href="javascript:;" class="el-icon-close"></a>
                               </div>
                               <div class="box-flex-media-box" style="display:none;">
                                     <el-input placeholder="请输入分组名称" class="flex1"></el-input>
                                     <a href="javascript:;" class="a-text">确定</a>
                                     <a href="javascript:;" class="a-text a-text-cancle">取消</a>
                               </div>
                         </li>
                         <li class="group-msg-li">
                               <div class="box-flex-media-box">
                                   <el-radio class="radio flex1" v-model="radio" label="1">任务分组1</el-radio>
                                   <a href="javascript:;" class="a-text">修改</a>
                                   <a href="javascript:;" class="el-icon-close"></a>
                               </div>
                               <div class="box-flex-media-box" style="display:none;">
                                     <el-input placeholder="请输入分组名称" class="flex1"></el-input>
                                     <a href="javascript:;" class="a-text">确定</a>
                                     <a href="javascript:;" class="a-text a-text-cancle">取消</a>
                               </div>
                         </li>
                         <li class="group-msg-li">
                               <div class="box-flex-media-box">
                                   <el-radio class="radio flex1" v-model="radio" label="1">任务分组1</el-radio>
                                   <a href="javascript:;" class="a-text">修改</a>
                                   <a href="javascript:;" class="el-icon-close"></a>
                               </div>
                               <div class="box-flex-media-box" style="display:none;">
                                     <el-input placeholder="请输入分组名称" class="flex1"></el-input>
                                     <a href="javascript:;" class="a-text">确定</a>
                                     <a href="javascript:;" class="a-text a-text-cancle">取消</a>
                               </div>
                         </li>
                     </ul>

                </div>
                
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="cancle"  @click="dialogGroup = false">取 消</el-button>
                <el-button type="sure" @click="dialogGroup = false">确 定</el-button>
            </div>
        </el-dialog>
   </div>
</template>



<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
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
         value2:'',
         radio: '1',
         dialogGroup: false
      }
    }
  }
</script>