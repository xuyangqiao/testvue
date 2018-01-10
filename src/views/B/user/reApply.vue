<template>
    <!-- 账户管理  -->
    <div class="account-msg-wrapper">
        <div class="userinfo-nav">
            <el-button :type="'sure'">{{$lang('重新认证信息')}}</el-button>
        </div>
        <!--账户管理-->
        <div class="bus-account-main" v-if="accType==1">
            <!-- 账户管理-展示 -->
            <div class="bus-account-show" v-if="!editCom">
                <p>{{$lang('公司名称')}}：{{form1.name||''}}</p>
                <p>{{$lang('营业执照注册号/统一社会信用号码')}}：{{form1.licenseNum||''}}</p>
                <p>{{$lang('营业执照所在地')}}：{{form1.licenseAddress||''}}</p>
                <p>{{$lang('常用地址')}}：{{form1.address||''}}</p>
                <p>{{$lang('营业年限')}}：{{form1.licenseYear||''}}{{$lang('年')}}</p>
                <p>{{$lang('营业范围')}}：{{form1.licenseRange||''}}</p>
                <p>{{$lang('盖公章的营业执照复印件')}}：
                    <em><img :src="imageUrl" class="yyzz-img" /></em>
                </p>
                <p style="color:red;" v-if="form1.applyState=='3'">{{$lang('驳回理由')}}：{{form1.reason||''}}</p>
                <el-button type="text" icon="edit" class="edit" @click="openEditInfo" v-if="hasEdit">{{$lang('编辑')}}</el-button>
            </div>
            <!-- 账户管理-编辑 -->
            <div class="bus-account-edit" v-if="editCom" v-loading="loading">
                <el-form ref="form2" :model="form2" label-width="140px" :rules="rules">
                    <el-form-item :label="$lang('企业名称')" prop="name" required>
                        <el-col :span="12">
                            <el-input v-model="form2.name" :placeholder="$lang('请输入企业名称')"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$lang('营业执照号')" prop="licenseNum" required>
                        <el-col :span="12">
                            <el-input v-model="form2.licenseNum" :placeholder="$lang('请输入营业执照注册号/统一社会信用号码')"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$lang('营业年限')" prop="licenseYear" required>
                        <el-col :span="12">
                            <el-input v-model="form2.licenseYear" :placeholder="$lang('请输入营业年限')"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            {{$lang('年')}}
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$lang('营业执照所在地')" prop="compAddr1" required>
                        <el-col :span="12">
                            <el-cascader :options="options" v-model="form2.compAddr1" @change="handleChange1">
                            </el-cascader>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$lang('常用地址')" prop="compAddr2" required>
                        <el-col :span="10">
                            <el-cascader expand-trigger="hover" :options="options" v-model="form2.compAddr2" @change="handleChange2">
                            </el-cascader>
                        </el-col>
                        <el-col :span="13" :offset="1">
                            <el-input v-model="form2.address" :placeholder="$lang('详细地址')"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item :label="$lang('营业范围')" prop="licenseRange" required>
                        <el-col :span="24">
                            <el-input type="textarea" v-model="form2.licenseRange" :rows="4" :placeholder="$lang('请输入营业范围')"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item :label="$lang('营业执照复印件')" required>
                        <el-col :span="12">
                            <el-upload class="avatar-uploader width-100" action="https://jsonplaceholder.typicode.com/posts/" ref="businessLicense" :auto-upload="false" :on-change="businessLicenseChange" :show-file-list="false">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <div class="el-upload__tip">
                                <p class="yz-tips">{{$lang('请上传盖公章的营业执照复印件,只能上传jpg/png文件，且不超过500kb')}}</p>
                            </div>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="6" :offset="3">
                            <el-button type="sure" class="fr" @click="saveModify">{{$lang('提交')}}</el-button>
                        </el-col>
                        <el-col :span="6" :offset="3">
                            <el-button type="cancle" class="fr" @click="editCom=false">{{$lang('取消')}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--密码管理-->
        <ChangePwd v-if="accType==2"></ChangePwd>
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
import { ReUpdateCompanyB, ReCheckCompanyInfoB } from "@/apis/person";
import { isLogin, getUser } from "@/apis/storage";
import areaData from "@/apis/area.json";
import { addFile, deleteFileByParam } from "@/apis/files";
import { uploadFile, deleteOssFile } from "@/apis/uploadFile";

export default {
  components: {
    ChangePwd
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      nextTo: false,
      userId: "",
      hasEdit: true,
      accType: 1,
      editCom: false,
      form1: {}, //企业认证详情
      form2: {}, //企业认证编辑
      tableData: [],
      //地址下拉选择数据
      options: areaData,
      imageUrl: "",
      licenseImg: "",
      licenseImgName: "",
      rules: {
        name: [{ validator: this.validateName, trigger: "blur" }],
        licenseRange: [{ required: true, message: "请输入营业范围", trigger: "blur" }],
        compAddr1: [{ validator: this.validateCompAddr1, trigger: "blur" }],
        compAddr2: [{ validator: this.validateCompAddr2, trigger: "blur" }],
        address: [{ validator: this.validateAddress, trigger: "blur" }],
        licenseNum: [{ validator: this.validateLicenseNum, trigger: "blur" }],
        licenseYear: [{ validator: this.validateYear, trigger: "blur" }]
      }
    };
  },
  created() {
    this.userId = this.$route.query.userId || getUser().userId;
    this.hasEdit =
      this.$route.query.userId == getUser().userId || getUser().userType == "B";
    this.CheckCompanyInfo();
  },
  methods: {
    validateName(rule, value, callback) {
      if (!value) {
        callback(new Error($lang("请输入企业名称")));
      } else {
        callback();
      }
    },
    validateYear(rule, value, callback) {
      if (!value) {
        callback(new Error($lang("请输入营业年年限")));
      } else if (!Number.isInteger(value)) {
        callback(new Error($lang("请输入正确的格式")));
      } else {
        callback();
      }
    },
    validateLicenseNum(rule, value, callback) {
      if (!value) {
        callback(new Error($lang("请输入营业执照号")));
      } else if (!/^[0-9|A-Z]{18}$/.test(value)) {
        callback(new Error($lang("18位数字和大写字母组合")));
      } else {
        callback();
      }
    },
    validateCompAddr1(rule, value, callback) {
      if (!value.length) {
        callback(new Error($lang("请选择营业执照所在地")));
      } else {
        callback();
      }
    },
    validateCompAddr2(rule, value, callback) {
      if (!value.length || !this.form2.address) {
        callback(new Error($lang("请选择常用地址并且输入详细地址")));
      } else {
        callback();
      }
    },
    getAddr(obj) {
      let address = "";
      if (obj.addressProvince) {
        address = [obj.addressProvince, obj.addressCity, obj.addressArea].join(
          "-"
        );
      }
      if (obj.address) {
        address = address + "/" + (obj.address || "");
      }
      return address;
    },
    async CheckCompanyInfo() {
      const res = await ReCheckCompanyInfoB({ userId: this.userId });
      if (res.success) {
        let CompanyInfo = res.data;
        if (CompanyInfo.fullState == "1") {
          this.hasEdit = false;
        } else {
          let address = this.getAddr(CompanyInfo);
          this.form1 = Object.assign({}, CompanyInfo, {
            userId: this.userId,
            address: address
          });
        }
        this.imageUrl = CompanyInfo.licenseImg;
        this.licenseImg = CompanyInfo.licenseImg;
        this.licenseImgName = CompanyInfo.licenseImgName;
      } else {
        this.form1 = {};
      }
    },
    //打开编辑页面
    openEditInfo() {
      this.editCom = true;
      this.form2 = Object.assign({}, this.form1, {
        compAddr1: this.form1.licenseAddress
          ? this.form1.licenseAddress.split("-")
          : [],
        compAddr2: this.form1.addressProvince
          ? [
              this.form1.addressProvince,
              this.form1.addressCity,
              this.form1.addressArea
            ]
          : [],
        address: this.form1.address ? this.form1.address.split("/")[1] : ""
      });
    },
    saveModify() {
      if (this.imageUrl) {
        this.$refs["form2"].validate(valid => {
          if (valid) {
            this.loading = true;
            this.dosaveModify();
          } else {
            return false;
          }
        });
      } else {
        this.$message.warning(this.$lang("请上传盖公章的营业执照复印件"));
      }
    },
    //保存企业认证信息
    async dosaveModify() {
      const me = this;
      let param = Object.assign({}, this.form2, {
        licenseAddress: this.form2.compAddr1.join("-"),
        addressProvince: this.form2.compAddr2[0],
        addressCity: this.form2.compAddr2[1],
        addressArea: this.form2.compAddr2[2]
      });
      if (this.form2.id) {
        param.id = this.form2.id;
      }
      delete param.licenseImg;
      delete param.licenseImgName;
      const res = await ReUpdateCompanyB(param);
      if (res.success) {
        let CompanyInfo = res.data;
        let address = this.getAddr(CompanyInfo);
        this.form1 = Object.assign({}, CompanyInfo, {
          address: address
        });
        const businessLicense = me.$refs.businessLicense.uploadFiles;
        const id = getUser().userId;
        if (businessLicense[0] && businessLicense[0].raw) {
          if (me.licenseImg) {
            deleteFileByParam(id, "businesslicense");
            deleteOssFile([`/user-info/${id}/company/re-${me.licenseImgName}`]);
          }
          const file = businessLicense[businessLicense.length - 1].raw;
          uploadFile(
            businessLicense[businessLicense.length - 1].raw,
            `/user-info/${id}/company`
          ).then(async function(data) {
            const fileName = data.name.slice(data.name.lastIndexOf("/") + 1);
            const addFileData = await addFile({
              fileName: file.name,
              alias: fileName,
              findex: "businesslicensetemp",
              bindid: id,
              url: data.url
                ? data.url
                : data.res.requestUrls[0].replace(/\?.*/gm, "")
            });
            me.loading = false;
            if (addFileData.success) {
              me.imageUrl = addFileData.data.url;
              me.licenseImgName = addFileData.data.fileName;
              me.licenseImg = addFileData.data.url;
              me.$message($lang("操作成功"));
              //返回展示界面
              me.editCom = false;
            } else {
              me.$message.error(addFileData.msg);
            }
          });
        } else {
          me.$message($lang("操作成功"));
          //返回展示界面
          me.editCom = false;
        }
      } else {
        me.loading = false;
        this.$message.error(res.msg);
      }
    },
    //选择城市
    handleChange1(value) {
      this.form2.compAddr1 = value;
    },
    handleChange2(value) {
      this.form2.compAddr2 = value;
    },
    //营业执照改变
    businessLicenseChange(file) {
      const me = this;
      const fileName = file.name
        .slice(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      if (!(fileName == "jpg" || fileName == "bmp" || fileName == "png")) {
        this.$message($lang("只能上传jpg、png、bmp文件"));
        me.$refs.businessLicense.uploadFiles.pop();
        return;
      }
      if (file.size > 10485760) {
        this.$message($lang("文件大小不能超过10M"));
        me.$refs.businessLicense.uploadFiles.pop();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        me.imageUrl = e.target.result;
      };
    },
    cancalEdit() {
      this.$router.push({ name: this.nextTo });
      this.dialogVisible = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
    // if(this.editCom||this.accType==2){
    //     this.dialogVisible=true;
    //     if(this.nextTo){
    //         next()
    //     }else{
    //         next(false)
    //         this.nextTo=to.name
    //     }
    // }else{
    //     next()
    // }
  }
};
</script>
