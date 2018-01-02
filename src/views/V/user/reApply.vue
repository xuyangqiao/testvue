<template>
    <!--身份验证  -->
    <div class="account-msg-wrapper">
        <div class="userinfo-nav">
            <el-button :type="'sure'">{{$lang('重新认证')}}</el-button>
        </div>
        <!--身份验证-->
        <div class="account-main" v-if="accType==1">
            <div class="bus-account-show" v-if="!edit">
                <div class="sfyz-show">
                    <div class="box-flex">
                        <p class="sf-lable">{{$lang('真实姓名:')}}</p>
                        <p class="flex1">{{form.realName}}</p>
                    </div>
                    <div class="box-flex">
                        <p class="sf-lable">{{$lang('证件号码:')}}</p>
                        <p class="flex1">{{form.cardId}}</p>
                    </div>
                    <div class="box-flex">
                        <p class="sf-lable">{{$lang('证件有效期:')}}</p>
                        <p class="flex1">{{form.validity}}</p>
                    </div>
                    <div class="zhengnianzhao">
                        <p class="sf-lable">{{$lang('证件照：')}}</p>
                        <el-row :gutter="20" class="w200">
                            <el-col :span="8" v-for="item in oldImgs" :key="item">
                                <img :src="item.url" />
                            </el-col>
                        </el-row>
                    </div>
                    <div class="box-flex" style="margin:20px 0px;" v-if="form.applyState=='3'">
                        <p class="sf-lable" style="color:red;">{{$lang('驳回理由:')}}</p>
                        <p class="flex1" style="color:red;">{{form.reason}}</p>
                    </div>
                </div>
                <el-button type="text" icon="edit" class="edit" @click="editInfo" v-if="userInfo.applyState!=2">{{$lang('编辑')}}</el-button>
            </div>
            <div class="account-edit account-edit-v" v-if="edit" v-loading="loading">
                <el-form ref="form" :model="form1" label-width="110" :rules="rules">
                    <el-form-item :label="$lang('真实姓名:')" prop="realName" required>
                        <el-col :span="12">
                            <el-input v-model="form1.realName" :placeholder="$lang('真实姓名')"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$lang('证件号码:')" prop="cardId" required>
                        <el-col :span="12">
                            <el-input :placeholder="$lang('请输入证件号码')" v-model="form1.cardId"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$lang('证件有效期:')" prop="validity" required>
                        <el-col :span="12">
                            <el-date-picker v-model="form1.validity" type="date" :placeholder="$lang('证件有效期')" style=" width:100%">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$lang('上传证件照:')" class="upload-zhengjianzhao" required>
                        <el-row :gutter="20" class="zjz-wrap">
                            <el-col :span="8">
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :auto-upload="false" ref="IDImage1" :on-change="IDImage1Change">
                                    <img v-if="IDImage1Url" :src="IDImage1Url">
                                    <i v-else class="avatar-uploader-icon x"></i>
                                </el-upload>
                            </el-col>
                            <el-col :span="8">
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :auto-upload="false" ref="IDImage2" :on-change="IDImage2Change">
                                    <img v-if="IDImage2Url" :src="IDImage2Url">
                                    <i v-else class="avatar-uploader-icon y"></i>
                                </el-upload>
                            </el-col>
                            <el-col :span="8">
                                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :auto-upload="false" ref="IDImage3" :on-change="IDImage3Change">
                                    <img v-if="IDImage3Url" :src="IDImage3Url">
                                    <i v-else class="avatar-uploader-icon z"></i>
                                </el-upload>
                            </el-col>
                            <el-col :span="24">
                                <p class="sfyz-p">{{$lang('请上传手持身份证照片(正面/反面/手持)*（支持10M以下jpg、png、bmp格式）')}}</p>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="8" :offset="2">
                            <el-button type="sure" class="fr" @click="save">{{$lang('提交')}}</el-button>
                        </el-col>
                        <el-col :span="8" :offset="4">
                            <el-button type="cancle" class="fr" @click="edit=false">{{$lang('取消')}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--密码管理-->
        <Change-Pwd v-if="accType==2"></Change-Pwd>
        <el-dialog title="Tips" :visible.sync="dialogVisible" size="tiny">
            <span>{{$lang('是否放弃编辑？')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false,nextTo=false">{{$lang('取消')}}</el-button>
                <el-button type="sure" @click="cancalEdit">{{$lang('确定')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import ChangePwd from "@/components/changePwd";
import { ReValidityV, ReCheckUserInfoV } from "@/apis/person";
import { addFileList, getAllFile, deleteFileByIds } from "@/apis/files";
import { uploadFile, deleteOssFile } from "@/apis/uploadFile";
import { formatTime } from "@/apis/util";
import { isLogin, getUser, getUserInfo } from "@/apis/storage";
export default {
  components: {
    ChangePwd
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      nextTo: false,
      accType: 1,
      imageUrl: "",
      edit: false,
      form: {},
      form1: {},
      oldImgs: [],
      IDImage1Url: null,
      IDImage2Url: null,
      IDImage3Url: null,
      IDImageName: [],
      IDImageId: [],
      rules: {
        realName: [{ validator: this.validateRealName, trigger: "blur" }],
        cardId: [{ validator: this.validateCardId, trigger: "blur" }],
        validity: [{ validator: this.validateValidity, trigger: "change" }]
      },
      userInfo: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const me = this;
      const res = await ReCheckUserInfoV({ userId: getUser().userId });
      if (res.success) {
        let UserInfo = (this.userInfo = res.data);
        this.form = {
          realName: UserInfo.realName,
          cardId: UserInfo.cardId,
          validity: UserInfo.validity,
          userId: getUser().userId,
          applyState: UserInfo.applyState,
          reason: UserInfo.reason
        };
        this.oldImgs = UserInfo.files || [];
        if (UserInfo.id) {
          this.form.id = UserInfo.id;
        }
        UserInfo.files
          ? UserInfo.files.map((item, i) => {
              me[`IDImage${i + 1}Url`] = item.url;
              me.IDImageName.push(item.fileName);
              me.IDImageId.push(item.id);
            })
          : null;
      }
    },
    validateRealName(rule, value, callback) {
      if (!value) {
        callback(new Error($lang("请输入真实姓名")));
      } else {
        callback();
      }
    },
    validateCardId(rule, value, callback) {
      if (!value) {
        callback(new Error($lang("请输入证件号码")));
      } else if (
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          value
        )
      ) {
        callback(new Error($lang("证件号码格式不正确")));
      } else {
        callback();
      }
    },
    validateValidity(rule, value, callback) {
      if (!value) {
        callback(new Error($lang("请选择证件有效期")));
      } else {
        callback();
      }
    },
    IDImage1Change(file) {
      this.IDImageChange(file, 1);
    },
    IDImage2Change(file) {
      this.IDImageChange(file, 2);
    },
    IDImage3Change(file) {
      this.IDImageChange(file, 3);
    },
    IDImageChange(file, index) {
      const me = this;
      const fileName = file.name
        .slice(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      if (!(fileName == "jpg" || fileName == "bmp" || fileName == "png")) {
        this.$message($lang("只能上传jpg、png、bmp文件"));
        me.$refs["IDImage" + index].uploadFiles.pop();
        return false;
      }
      if (file.size > 10485760) {
        this.$message($lang("文件大小不能超过10M"));
        me.$refs["IDImage" + index].uploadFiles.pop();
        return false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        switch (index) {
          case 1:
            me.IDImage1Url = e.target.result;
            break;
          case 2:
            me.IDImage2Url = e.target.result;
            break;
          case 3:
            me.IDImage3Url = e.target.result;
            break;
        }
      };
    },
    editInfo() {
      this.edit = true;
      this.form1 = Object.assign({}, this.form);
    },
    //上传文件成功之后保存到服务器
    async addAllFileList(fileList) {
      const res = await addFileList(fileList);
      this.loading = false;
      this.$message({
        message: res.msg || $lang("保存成功"),
        type: res.success ? "success" : "error"
      });
      this.edit = false;
      this.getData();
    },
    save() {
      const me = this;
      if (!(this.IDImage1Url && this.IDImage2Url && this.IDImage3Url)) {
        this.$message.warning(this.$lang("证件照不全"));
      } else
        me.$refs["form"].validate(valid => {
          if (valid) {
            me.loading = true;
            me.saveData();
          } else {
            return false;
          }
        });
    },
    async saveData() {
      const me = this;
      const id = me.form1.userId;
      const promiseFileList = [];
      const delFileList = [];
      const ossDelFileList = [];
      const IDImageList = [
        me.$refs.IDImage1.uploadFiles,
        me.$refs.IDImage2.uploadFiles,
        me.$refs.IDImage3.uploadFiles
      ];
      IDImageList.forEach((item, i) => {
        if (item[0] && item[0].raw) {
          promiseFileList.push(
            uploadFile(item[item.length - 1].raw, `/user-info/${id}/carded`)
          );
          if (me.IDImageId[i]) {
            delFileList.push({ id: me.IDImageId[i] });
            ossDelFileList.push(
              `/user-info/${id}/carded/re-${me.IDImageName[i]}`
            );
          }
        }
      });
      //上传图片
      if (promiseFileList.length > 0) {
        //删除原来的图片
        if (delFileList.length > 0) {
          deleteFileByIds(delFileList);
          deleteOssFile(ossDelFileList);
        }
        Promise.all(promiseFileList).then(data => {
          let fileList = [];
          data.map(item => {
            const fileName = item.name.slice(item.name.lastIndexOf("/") + 1);
            fileList.push({
              bindid: id,
              findex: "idcardtemp",
              url: item.url
                ? item.url
                : item.res.requestUrls[0].replace(/\?.*/gm, ""),
              fileName: fileName,
              alias: fileName
            });
          });
          this.addAllFileList(fileList);
        });
      }
      this.form1.validity = formatTime(this.form1.validity, "date");
      const res = await ReValidityV(this.form1);
      if (res.success) {
        this.$alert("认证已提交至系统，系统管理员会在24小时内完成审核", "认证成功", {
          confirmButtonText: "好的"
        });
        me.$refs.IDImage1.uploadFiles = me.$refs.IDImage2.uploadFiles = me.$refs.IDImage3.uploadFiles = [];
        localStorage.setItem("UserInfo", JSON.stringify(res.data));
        if (promiseFileList.length == 0) {
          me.loading = false;
          me.edit = false;
          me.getData();
        }
      } else {
        me.$message.error(res.msg);
      }
    },
    cancalEdit() {
      this.$router.push({ name: this.nextTo });
      this.dialogVisible = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
    // if (this.edit || this.accType == 2) {
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
};
</script>

<style>
.account-msg-wrapper .avatar-uploader-icon {
  width: 100% !important;
  height: 100% !important;
  line-height: 110px !important;
  display: block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.account-msg-wrapper .avatar-uploader-icon.x {
  background-image: url("../../../assets/images/x.png");
}
.account-msg-wrapper .avatar-uploader-icon.y {
  background-image: url("../../../assets/images/y.png");
}
.account-msg-wrapper .avatar-uploader-icon.z {
  background-image: url("../../../assets/images/z.jpg");
}
</style>
