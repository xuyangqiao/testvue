<template>
 <!--s端 审核通过分任务-->
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

         <div class="all-task-other">
             <el-row>
                <el-col :span="12">
                    <h4 class="th-title pd-left-5">任务特性</h4>
                    <div class="">
                        <dl class="box-flex info-show">
                            <dt>应用领域:</dt>
                            <dd class="flex1">VR</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>应用类别:</dt>
                            <dd class="flex1">Unity</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>应用类别:</dt>
                            <dd class="flex1">工业模型  军事</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>应用类别:</dt>
                            <dd class="flex1">工业模型  军事</dd>
                        </dl>
                        <dl class="box-flex info-show">
                            <dt>备注:</dt>
                            <dd class="flex1">这些看上去彼此没有太多联系的连续创业者，现在有了一个共同的身份——共享电单车玩家。当然，除了李如彬、夏涛和张天雄这些互联网创业者之外，扎堆在这一领域的还有十几位来自传统电动车行业的“老炮儿”。而他们的共同目标是——成为共享电单车界的摩拜或ofo。</dd>
                        </dl>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="pad-left-40">
                        <h4 class="th-title">参考图片</h4>
                        <ul class="pic-list-wrap clearfix">
                             <li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>
                             <li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>
                             <li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>
                             <li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>
                             <li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>
                             <li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>
                             <li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>
                             <li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>
                        </ul>
                    </div>
                    <div class="pad-left-40">
                        <h4 class="th-title">附件（3 个）</h4>
                        <ul class="file-list-wrap clearfix">
                             <li class="file-list-item">
                                 <p>VSWORkVSWORkVSWORk</p>
                                 <a href="javascript:;">下载</a>
                             </li>
                             <li class="file-list-item">
                                 <p>VSWORk</p>
                                 <a href="javascript:;">下载</a>
                             </li>
                             <li class="file-list-item">
                                 <p>VSWORk</p>
                                 <a href="javascript:;">下载</a>
                             </li>
                        </ul>
                    </div>
                </el-col>    
            </el-row>
          
         </div>

         <div class="set-btn-wrap bt-dashed">
           <el-button type="sure">编辑</el-button>
        </div>

        <div class="">
            <ul class="">
                  <li class="allot-task-li clearfix">
                     <p>项目名称：VSWORK1</p>
                     <p>项目出价：6000</p>
                     <p>项目出价：6000</p>
                     <p>总占比例：40%</p>
                     <p>  
                          <el-button type="sure">编辑</el-button>
                          <el-button type="cancle">删除</el-button>
                          <el-button type="danger">代付款</el-button>
                     </p>
                  </li>
                  <!--公开的可以查看报名-->
                  <li class="allot-task-li clearfix">
                     <p>项目名称：公开的可以查看报名</p>
                     <p>项目出价：6000</p>
                     <p>项目出价：6000</p>
                     <p>总占比例：40%</p>
                     <p>  
                          <el-button type="sure">编辑</el-button>
                          <el-button type="success">分配</el-button>
                          <el-button type="warning">查看报名</el-button>
                          <el-button type="cancle">删除</el-button>
                     </p>
                  </li>
                  
                  <!--私密的的没有查看报名-->
                  <li class="allot-task-li clearfix">
                     <p>项目名称：私密的的没有查看报名</p>
                     <p>项目出价：6000</p>
                     <p>项目出价：6000</p>
                     <p>总占比例：40%</p>
                     <p>  
                          <el-button type="sure">编辑</el-button>
                          <el-button type="success">分配</el-button>
                          <el-button type="cancle">删除</el-button>
                     </p>
                  </li>
            </ul>
        </div>
         
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          type: '',
          price:'',
          pricetype:'',
          datetime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
          group: '',
        },
        imageUrl: '',
        form1:{
          field: '',
          type1:'',
          type2:'',
          type3:'',
          type4:'',
          type5:'',
          ambient:'',
          ps:'',
        },
        fileList3: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
       handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>