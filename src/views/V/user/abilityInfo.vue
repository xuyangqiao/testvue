<template>
    <!--能力管理-->
    <div class="capacity-mesg-wrpper">
        <div class="userinfo-nav">
            <el-button :type="navIndex==1?'sure':'text'" @click="navIndex=1">{{$lang('擅长领域')}}</el-button>
            <el-button :type="navIndex==2?'sure':'text'" @click="navIndex=2">{{$lang('能力认证')}}</el-button>
            <el-button :type="navIndex==3?'sure':'text'" @click="navIndex=3,editWorkTag='index'">{{$lang('作品集')}}</el-button>
        </div>
        <div class="capacity-mesg-main">
            <!--擅长领域-->
            <div class="good-field-wrpper" v-if="navIndex==1" v-loading="loading1">
                <el-form ref="form" label-width="80px" label-position="top">
                    <el-form-item :label="$lang('3D角色：')">
                        <el-checkbox-group v-model="checkedRole">
                            <el-checkbox v-for="item in this[`3D_role`]" :label="item.key" :key="item.key" :disabled="!hasEdit">{{item.cnValue}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item :label="$lang('3D场景：')">
                        <el-checkbox-group v-model="checkedScenes">
                            <el-checkbox v-for="item in this[`3D_Scenes`]" :label="item.key" :key="item.key" :disabled="!hasEdit">{{item.cnValue}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item :label="$lang('应用软件：')">
                        <el-checkbox-group v-model="checkedSoft">
                            <el-checkbox v-for="item in this[`3D_Soft`]" :label="item.key" :key="item.key" :disabled="!hasEdit">{{item.cnValue}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item v-if="hasEdit">
                        <el-row>
                            <el-col :span="6" :offset="9">
                                <el-button type="sure" class="btn-width-all" @click="saveSpecialty">{{$lang('确定')}}</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
            <!--能力认证-->
            <div class="capacity-agree-wrapper" v-if="navIndex==2">
                <div class="capacity-agree-main">
                    <div class="get-capacity">
                        <h4>{{$lang('已获得')}}</h4>
                        <p class="capacity-tips" v-if="abilityList.length==0">{{$lang('暂时还未获得成就，去努力吧！')}}</p>
                        <ul class="capacity-ul" v-if="abilityList.length!==0">
                            <li v-for="(item,i) in abilityList" :class="item" :key="i"></li>
                        </ul>
                    </div>
                    <div class="loss-capacity">
                        <h4>{{$lang('未获得')}}</h4>
                        <p class="capacity-tips" v-if="abilityList.length==4">{{$lang('恭喜你，获得所有能力认证！')}}</p>
                        <ul class="capacity-ul" v-if="notAbility.length>0">
                            <li v-for="(item,i) in notAbility" :class="item" :key="i"></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--作品集-->
            <div class="sample-reels-wrapper" v-if="navIndex==3">
                <div v-if="editWorkTag=='index'">
                    <div class="chose-sample-nav">
                        <el-button :type="workTab=='1'?'sure':'text'" @click="workTab=1">{{$lang('历史作品')}}</el-button>
                        <el-button :type="workTab=='2'?'sure':'text'" @click="workTab=2">{{$lang('平台作品')}}</el-button>
                    </div>
                    <div class="sample-reels-main">
                        <!--历史作品-->
                        <div class="history-sample" v-if="workTab==1">
                            <el-row :gutter="12">
                                <el-col :span="8" v-for="(item,i) in workList" :key="i">
                                    <el-button type="danger" @click="delHistory(item)" v-if="workList.length>1">{{$lang('删除')}}</el-button>
                                    <div class="sample-item">
                                        <a href="javascript:;" class="sample-item-a" @click="workForm=item,editWorkTag='info'">
                                            <div class="sample-img">
                                                <img :src="item.coverUrl" />
                                            </div>
                                            <div class="sample-info">
                                                <p>{{$lang('任务名称：')}}{{item.worksName}}</p>
                                                <p>{{$lang('任务截止时间：')}}{{item.worksEndTime}}</p>
                                            </div>
                                        </a>
                                    </div>
                                </el-col>
                                <el-col :span="8" v-if="hasEdit">
                                    <div class="sample-item sample-item-upload">
                                        <a href="javascript:;" class="sample-item-a" @click="workForm={ worksName: '',worksEndTime: ''},editWorkTag='add'">
                                        </a>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <!--平台作品-->
                        <div class="platform-sample" v-if="workTab==2">
                            <el-row :gutter="12">
                                <el-col :span="8" v-for="(item, i) in taskList" :key="i">
                                    <div class="sample-item">
                                        <a href="javascript:;" class="sample-item-a" @click="toSubTask(item)">
                                            <div class="sample-img">
                                                <img :src="item.url||''" />
                                            </div>
                                            <div class="sample-info">
                                                <p>{{$lang('任务名称：')}}{{item.projectName}}</p>
                                                <p>{{$lang('任务截止时间：')}}{{item.taskEndTime}}</p>
                                            </div>
                                        </a>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <!--查看作品详情-->
                <div class="sun-sample-info" v-if="editWorkTag=='info'">
                    <div class="chose-sample-nav">
                        <el-button type="sure" @click="editWorkTag='index'">{{$lang('返回')}}&gt;&gt;</el-button>
                    </div>
                    <div class="sun-sample-info-main">
                        <dl class="box-flex ssim-dl">
                            <dt>{{$lang('作品名称：')}}</dt>
                            <dd>{{workForm.worksName}}</dd>
                        </dl>
                        <dl class="box-flex ssim-dl">
                            <dt>{{$lang('完成日期：')}}</dt>
                            <dd>{{workForm.worksEndTime}}</dd>
                        </dl>
                        <dl class="ssim-dl">
                            <dt>{{$lang('作品图片：')}}</dt>
                            <dd class="ssim-img-dd">
                                <el-row :gutter="12">
                                    <el-col :span="6" v-for="(item,i) in workForm.imgList" :key="i">
                                        <img :src="item.url||''" v-if="checkType(item.url)" />
                                    </el-col>
                                </el-row>
                            </dd>
                        </dl>
                        <dl class="box-flex ssim-dl">
                            <dt>{{$lang('附件：')}}</dt>
                            <dd class="ssim-fj-dd">
                                <div class="fj-one" v-for="(item,i) in workForm.fileList" :key="i">
                                    <span>{{item.fileName || ''}}</span>
                                    <a :href="item.url||''" :download="item.fileName">{{$lang('下载')}}</a>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
                <!--添加作品集-->
                <div class="add-sample-jh" v-if="editWorkTag=='add'" v-loading="loading2">
                    <el-form :model="workForm" label-width="90px">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item :label="$lang('作品名称:')" required>
                                    <el-input v-model="workForm.worksName"></el-input>
                                </el-form-item>
                                <el-form-item :label="$lang('完成日期:')" required>
                                    <el-date-picker type="datetime" v-model="workForm.worksEndTime" :placeholder="$lang('请选择时间')" format='yyyy-MM-dd HH:mm:ss' style="width:100%">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item class="update-images-list" :label="$lang('参考图片:')" required>
                                    <el-upload ref="ReferencePicture" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-change="ReferencePictureChange" :auto-upload="false" multiple>
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" class="update-text">
                                <el-form-item :label="$lang('附件:')" required>
                                    <el-upload ref="EnclosureFile" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" multiple>
                                        <el-button slot="trigger" size="small" type="sure">{{$lang('添加文件')}}</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="btn-center-wrap">
                        <el-button slot="trigger" size="small" type="cancle" @click="editWorkTag='index'">{{$lang('取消上传')}}</el-button>
                        <el-button slot="trigger" size="small" type="sure" @click="addWork">{{$lang('确认上传')}}</el-button>
                    </div>

                </div>
            </div>
        </div>
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
import {
  AbilityParamV,
  AbilityListV,
  SpecialtyV,
  TsechnologyV,
  CheckUserInfoV,
  WorkCollectionV,
  SaveWorkCollectionV,
  UpdateWorkCollectionV,
  delHistory
} from "@/apis/person";
import { TaskList, subTaskList } from "@/apis/task";
import { uploadFile } from "@/apis/uploadFile";
import { addFileList } from "@/apis/files";
import { isLogin, getUser } from "@/apis/storage";
import { formatTime } from "@/apis/util";
export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      dialogVisible: false,
      nextTo: false,
      navIndex: 1, //tab页
      userId: "", //用户id
      hasEdit: true, //是否可编辑
      //擅长领域数据
      "3D_Scenes": [],
      "3D_role": [],
      "3D_Soft": [],
      checkedScenes: [],
      checkedRole: [],
      checkedSoft: [],
      //能力认证数据
      abilityParamList: {},
      notAbility: [
        "first-gold",
        "Skilled-people",
        "Task-people",
        "Control-man"
      ],
      abilityList: [],
      //作品集数据
      workTab: 1,
      workList: [],
      editWorkTag: "index",
      workForm: {
        worksName: "",
        worksEndTime: ""
      },
      taskList: []
    };
  },
  created() {
    this.userId = this.$route.query.userId || getUser().userId;
    this.hasEdit =
      this.$route.query.userId == getUser().userId || getUser().userType == "V";
    this.getData(this.userId);
  },
  methods: {
    //获取静态数据
    async getData(id) {
      const res = await CheckUserInfoV({ userId: id || "" });
      if (res.success) {
        let userInfo = res.data;
        this.checkedScenes = userInfo.scebe ? userInfo.scebe.split("/") : [];
        this.checkedRole = userInfo.expertise
          ? userInfo.expertise.split("/")
          : [];
        this.checkedSoft = userInfo.technology
          ? userInfo.technology.split("/")
          : [];
      } else {
        this.$message.error($lang("无用户信息"));
      }
      this.GetSpecialtyData();
      this.GetAbilityData(id);
      this.GetWorkCollection(id);
      this.GetSubTaskList(id);
    },
    checkType(fileUrl) {
      let type = fileUrl.slice(fileUrl.lastIndexOf(".") + 1).toLowerCase();
      if (type == "jpg" || type == "bmp" || type == "png") {
        return true;
      }
      return false;
    },
    //获取擅长领域数据
    async GetSpecialtyData() {
      const res = await SpecialtyV(); //擅长领域参数
      if (res.success) {
        this["3D_Scenes"] = res.data["3D_Scenes"];
        this["3D_role"] = res.data["3D_role"];
        this["3D_Soft"] = res.data["3D_Soft"];
      } else {
        this.$message.error($lang("无擅长领域参数"));
      }
    },
    //获取能力认证数据
    async GetAbilityData(id) {
      const res1 = await AbilityParamV(); //能力认证参数
      const res2 = await AbilityListV({ userId: id });
      if (res1.success) {
        res1.data.ability.map(item => {
          this.abilityParamList[item.id] = item.key;
        });
      } else {
        this.$message.error($lang("无能力参数值"));
      }
      if (res2.success) {
        res2.data.map(item => {
          let key = this.abilityParamList[item.abilityId];
          if (key) {
            this.abilityList.push(key);
            delete this.abilityParamList[item.abilityId];
          }
        });
        this.notAbility = Object.values(this.abilityParamList);
      }
    },
    //保存擅长领域
    async saveSpecialty() {
      this.loading1 = true;
      const LoginUser = JSON.parse(localStorage.getItem("LoginUser"));
      let param = {
        expertise: this.checkedRole.join("/"),
        scebe: this.checkedScenes.join("/"),
        technology: this.checkedSoft.join("/"),
        userId: LoginUser.userId
      };
      const res = await TsechnologyV(param);
      this.loading1 = false;
      if (res.success) {
        this.$message.success($lang("操作成功！"));
      } else {
        this.$message.error(res.msg);
      }
    },
    //获取历史作品
    async GetWorkCollection(id) {
      const me = this;
      const res = await WorkCollectionV({ userId: id || "" });
      if (res.success) {
        if (Array.isArray(res.data)) {
          // for (let i = 0, l = res.data.length; i < l; i++) {
          //     if (Array.isArray(res.data[i].files)) {
          //         for (let i2 = 0, l2 = res.data[i].files.length; i2 < l2; i2++) {
          //             if (me.checkType(res.data[i].files[i2].url)) {
          //                 res.data[i].coverUrl = res.data[i].files[i2].url;
          //             }
          //         }
          //     }
          // }
          res.data.map(o => {
            o.imgList = o.files.filter(f => f.findex == "samplereels");
            o.fileList = o.files.filter(f => f.findex == "enclosure");
            return (o.coverUrl = o.files[0].url);
          });
        }
        this.workList = res.data || [];
      }
    },
    //获取平台作品列表
    async GetSubTaskList(id) {
      const res = await subTaskList({
        appType: "",
        appAreas: "",
        packageType: "",
        state: "7,8",
        vUserId: id,
        page: 1,
        row: 0
      });
      this.taskList = res.list;
    },
    //上传图片
    ReferencePictureChange(file) {
      const me = this;
      const fileName = file.name
        .slice(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      if (!(fileName == "jpg" || fileName == "bmp" || fileName == "png")) {
        this.$message($lang("只能上传jpg、png、bmp文件"));
        me.$refs.ReferencePicture.uploadFiles.pop();
        return false;
      }
      if (file.size > 10485760) {
        this.$message($lang("文件大小不能超过10M"));
        me.$refs.ReferencePicture.uploadFiles.pop();
        return false;
      }
    },
    //新增作品集
    async addWork() {
      this.loading2 = true;
      const me = this;
      let param = Object.assign({}, this.workForm);
      param.worksEndTime = formatTime(param.worksEndTime);

      if (!this.workForm.worksName) {
        this.$message.warning(this.$lang("请输入作品名称"));
      } else if (!this.workForm.worksEndTime) {
        this.$message.warning(this.$lang("请选择完成日期"));
      } else if (!this.$refs.ReferencePicture.uploadFiles.length) {
        this.$message.warning(this.$lang("请上传参考图片"));
      } else if (!this.$refs.EnclosureFile.uploadFiles.length) {
        this.$message.warning(this.$lang("请上传附件"));
      } else {
        const res = await SaveWorkCollectionV(param);
        if (res.success) {
          this.workList.push(res.data);
          const id = res.data.id;
          let file = [],
            fileListType = [],
            PromiseList = [];
          let ReferencePicture = me.$refs.ReferencePicture.uploadFiles;
          ReferencePicture.map(item => {
            if (item.raw) {
              file.push(item.raw);
              fileListType.push(2);
            }
          });
          let EnclosureFile = me.$refs.EnclosureFile.uploadFiles;
          console.log("EnclosureFile", EnclosureFile);
          EnclosureFile.map((item, i) => {
            if (item.raw) {
              file.push(item.raw);
              var el = me.$refs.EnclosureFile.$el.querySelectorAll("li");
              var barDiv = document.createElement("div");
              barDiv.id = "abilityDiv" + i;
              barDiv.className = "self-bar-div";
              barDiv.appendChild(document.createElement("i"));
              barDiv.appendChild(document.createElement("div"));
              el[i].appendChild(barDiv, el[i].childNodes[0]);
              fileListType.push(3);
            }
          });
          let j = 0;
          file.map((item, i) => {
            if (fileListType[i] == 3) {
              PromiseList.push(
                uploadFile(
                  item,
                  `/user-info/${getUser().userId}/exhibition`,
                  "abilityDiv" + j++
                )
              );
            } else {
              PromiseList.push(
                uploadFile(item, `/user-info/${getUser().userId}/exhibition`)
              );
            }
          });
          Promise.all(PromiseList).then(data => {
            let fileList = [];
            console.log(data);
            data.map((item, i) => {
              const fileName = item.name.slice(item.name.lastIndexOf("/") + 1);
              fileList.push({
                bindid: id,
                findex:
                  i < ReferencePicture.length ? "samplereels" : "enclosure",
                url: item.url
                  ? item.url
                  : item.res.requestUrls[0].replace(/\?.*/gm, ""),
                fileName: file[i].name,
                alias: fileName
              });
            });
            this.addAllFileList(fileList);
          });
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async addAllFileList(fileList) {
      const me = this;
      const res = await addFileList(fileList);
      this.$message({
        message: res.msg || $lang("保存成功"),
        type: res.success ? "success" : "error",
        onClose: () => {
          me.loading2 = false;
          if (res.success) {
            this.GetWorkCollection(me.userId);
            me.workTab = 1;
            me.editWorkTag = "index";
          }
        }
      });
    },
    async delHistory(item) {
      const res = await delHistory(item.id);
      this.$message({
        message: res.success ? $lang("删除成功") : res.msg,
        type: res.success ? "success" : "error"
      });
      if (res.success) {
        this.workList.splice(this.workList.indexOf(item), 1);
      }
    },
    //跳转到子任务详情页
    toSubTask(item) {
      this.$router.push({
        name: "V_detail",
        query: { id: item.id, taskId: item.taskId }
      });
    },
    cancalEdit() {
      this.$router.push({ name: this.nextTo });
      this.dialogVisible = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
    // if (this.editWorkTag == 'add') {
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
.sample-reels-main .el-col {
  position: relative;
}

.sample-reels-main .el-col .el-button {
  top: 14px;
  right: 10px;
  display: none;
  padding: 4px 5px;
  line-height: 14px;
  position: absolute;
}

.sample-reels-main .el-col:hover .el-button {
  display: inline;
}
</style>