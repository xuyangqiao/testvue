<template>
  <div class="content-wrapper">
    <div class="new-task-wrapper">
       <h3 class="main-title">拆分任务</h3>
       <div class="new-task-base">
           <el-row>
              <el-col :span="10">
                  <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="任务名称:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="发包类型:">
                    <el-radio-group v-model="form.type">
                      <el-radio label="公开"></el-radio>
                      <el-radio label="私密"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意向出价:">
                      <el-col :span="11">
                          <el-select v-model="form.pricetype" placeholder="请选择">
                              <el-option label="询价" value="1"></el-option>
                              <el-option label="面议" value="2"></el-option>
                          </el-select>
                      </el-col>
                      <el-col :span="11" :push="2">
                          <el-input v-model="form.price"></el-input>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="活动时间:">
                    <el-date-picker v-model="form.datetime" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="任务组:">
                    <el-col :span="19">
                        <el-select v-model="form.group" placeholder="请选择" class="group-select">
                            <el-option label="世界制造大会" value="1"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4" :push="1">
                        <a href="javascript:;" class="new-group-a"   @click="dialogVisible1 = true">新建分组</a>
                    </el-col>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="11" :offset="3">
                  <div class="new-tast-upload">
                    <img src="../assets/images/img.jpg"/>
                  </div>

              </el-col>
           </el-row>
       </div>

       <div class="new-task-other">
          <el-row>
             <el-form ref="form" :model="form1" label-width="80px">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="应用领域:">
                      <el-select v-model="form1.pricetype" placeholder="请选择" class="select-width-all">
                          <el-option label="VR" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="应用环境:">
                      <el-select v-model="form1.ambient" placeholder="请选择" class="select-width-all">
                          <el-option label="Unity" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="应用类别:">
                        <el-select v-model="form1.type1" placeholder="请选择" class="select-width-all">
                            <el-option label="Unity" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="贴图属性:">
                         <el-button type="sure"  class="select-width-all">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="贴图属性:">
                        <el-select v-model="form1.type1" placeholder="自定义" class="select-width-all">
                            <el-option label="Unity" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="贴图属性:">
                        <el-select v-model="form1.type1" placeholder="jpg" class="select-width-all">
                            <el-option label="Unity" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
               </el-row>

               <div class="jdx-add-task">
                   <div class="jdx-title clearfix">
                        <h3 class="th-title fl">阶段性任务分配</h3>
                         <el-button type="sure"  class="fr">添加</el-button>
                   </div>
                   <el-row>
                        <el-col :span="10"> 
                                <el-form-item label="任务名称:">
                                    <el-input></el-input>
                                </el-form-item> 
                        </el-col>
                        <el-col :span="10" :offset="1"> 
                                <el-form-item label="活动时间:">
                                    <el-date-picker type="datetimerange" placeholder="选择时间范围"></el-date-picker>
                                </el-form-item>
                        </el-col>  
                         <el-col :span="21"> 
                            <el-form-item label="任务详情:">
                                <el-input type="textarea" :rows="5" placeholder="请输入内容" class="textarea-width-790"></el-input>
                            </el-form-item>
                        </el-col>  
                    </el-row>  
               </div> 
                
                <el-form-item label="上传附件:" class="update-images-list">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                 <el-row>
                  <el-col :span="10" class="update-text">
                    <el-form-item label="上传附件:">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-change="handleChange"
                          :file-list="fileList3">
                          <el-button size="small" type="sure">选择文件</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                  </el-col>
                 </el-row>

                 <el-form-item label="备注:">
                    <el-input type="textarea" v-model="form1.ps"  :rows="5" placeholder="请输入内容" class="textarea-width-790"></el-input>
                 </el-form-item>

             </el-form>
          </el-row>
          <div class="creart-task-btn">
              <el-button type="cancle">取消</el-button>
              <el-button type="sure">提交任务</el-button>
              <el-button type="info">保存</el-button>
          </div>
       </div>

    </div>
    <el-dialog
      title="新建分组"
      :visible.sync="dialogVisible1"
      size="tiny"
      :before-close="handleClose">
      <div class="">
           <el-input placeholder="请输入分组名称"></el-input>
      </div> 
      <span slot="footer" class="dialog-footer">
        <el-button type="cancle" @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="sure" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
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
        dialogVisible: false,
        dialogVisible1:false
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
        handleClose(done) {
       done();
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
