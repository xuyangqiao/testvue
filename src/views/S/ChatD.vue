<template>
    <div class="chart-wrpaper clearfix">
        <div class="chart-left">
            <div class="box-flex-media-box">
                <div class="flex1 chart-left-title">
                    <h3>{{subTask.projectName}}</h3>
                </div>
                <el-button type="sure" @click="$router.push({name:'S_ChatT', query: {id:subTask.taskId,state:subTask.state}})" v-if="subTask">&lt;{{$lang('返回总任务')}}</el-button>
                <el-button type="sure" @click="toDetail('S_SonTaskInfo')">{{$lang('查看任务')}}&gt;</el-button>
            </div>
            <div class="chart-left-list">
                <ul class="chart-left-ul">
                    <li class="chart-left-li" v-for="(item,i) in taskStage" :key="i">
                        <div class="box-flex-media-box cl-top">
                            <p class="num">
                                <em>{{i + 1}}</em>
                            </p>
                            <a href="javascript:;" class="title flex1">
                                <h4>{{item.stageName}}</h4>

                            </a>
                            <!--<el-button type="success" @click="chooseFile(i, $event)">上传</el-button>-->
                            <!--<input type="file" @click="chooseFile(i)">-->
                            <!--<span v-if="uploading[i]">{{progress[i]}}...</span>-->
                            <el-progress type="circle" style="margin-right: 10px" v-if="uploading[i]" :percentage="progress[i]" :width='36'></el-progress>
                            <div class="upload-sc" v-else>
                                <el-button type="info" size="small" v-if="!isOnlyChat">{{$lang('上传文件')}}</el-button>
                                <input class="upload-file-btn" type="file" v-if="!isOnlyChat" @change="chooseFile(i, $event.target.files[0])" />
                            </div>
                            <el-button type="info" size="small" @click="toRedirect('S_History', i)">{{$lang('查看记录')}}</el-button>
                        </div>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('截止时间：')}}</dt>
                            <dd class="flex1">{{item.stageEndTime}}</dd>
                        </dl>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('阶段详情：')}}</dt>
                            <dd class="flex1">{{item.stageRemarks}}</dd>
                        </dl>
                    </li>
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <p class="num">
                                <em>{{taskStage.length + 1}}</em>
                            </p>
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('验收')}}</h4>
                            </a>
                            <el-button type="info" size="small" @click="uploadChecked" v-if="!isOnlyChat">{{$lang('上传文件')}}</el-button>
                            <!-- <el-button type="info" size="small" @click="toSubmit" v-if="!isOnlyChat&&uploaded">{{$lang('提交验收')}}</el-button> -->
                            <el-button type="info" size="small" @click="toRedirect('S_History', '-1')">{{$lang('查看记录')}}</el-button>
                        </div>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('截止时间：')}}</dt>
                            <dd class="flex1">{{subTask.taskEndTime}}</dd>
                        </dl>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('阶段详情：')}}</dt>
                            <dd class="flex1">{{subTask.remarks}}</dd>
                        </dl>
                    </li>
                    <li class="chart-left-li" v-if="subTask.state>=7">
                        <div class="box-flex-media-box cl-top">
                            <p class="num">
                                <em>{{taskStage.length + 2}}</em>
                            </p>
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('完成')}}</h4>
                            </a>
                            <el-button type="info" size="small" @click="uploadChecked" v-if="!isOnlyChat">{{$lang('上传文件')}}</el-button>
                            <el-button type="info" size="small" @click="toRedirect('S_History', '-2')">{{$lang('查看记录')}}</el-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="Object.keys(chatConfig).length>0">
            <Chat ref="chat" :chatConfig="chatConfig" :isReserve="false" :isHistory="['8','10'].includes(subTask.state)"></Chat>
        </div>
        <div v-else class="chart-right" style="background: none">
            <div class="chart-msg">{{msg}}</div>
        </div>
        <el-dialog :title="$lang('上传文件')" ref="toSubmitUpload" :visible.sync="toSubmitUploadShow" size="tiny" :before-close="toSubmitUploadClose" v-loading.body="loading">
            <el-form>
                <el-form-item :label="$lang('格式选择：')">
                    <el-select v-model="form.fileVersion" :placeholder="$lang('请选择')">
                        <el-option :label="o.valueExp" :value="o.key" v-for="o in versionList" :key="o.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$lang('资源文件：')">
                    <el-input v-model.trim="sourcePath" :placeholder="$lang('请输入资源文件路径')" v-if="form.fileVersion=='__path__'"></el-input>
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" ref="indexFile" :file-list="IndexFileList" :on-change="IndexFileChange" :on-remove="IndexFileRemove" :autoUpload="false" v-else>
                        <el-button size="small" type="primary">{{$lang('点击上传')}}</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="submit">{{$lang('确 定')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
.undelete .el-icon-close {
  display: none !important;
}

.el-upload-list__item .el-icon-close {
  display: block;
}

.shoujiicon {
  width: 15px;
  height: 20px;
  margin-left: 20px;
  position: relative;
  top: 2px;
}
</style>
<script>
var shouji = require("../../assets/images/phone.jpg");
import Chat from "@/components/Chat";
import { ChildTaskInfo, AcceptanceTask, getTalkByGroupId } from "@/apis/task";
import { addFile } from "@/apis/files";
import { client, uploadFile, progress } from "@/apis/uploadFile";
import { getAllFile, getFileVersionList } from "@/apis/files";

export default {
  components: { Chat },
  data() {
    return {
      subTask: {},
      taskStage: [],
      uploading: [],
      progress: [],
      toSubmitUploadShow: false,
      IndexFileList: [],
      ReleaseFileList: [],
      chatConfig: {},
      msg: $lang("正在加载中..."),
      isOnlyChat: false,

      versionList: [],
      selectedFile: null,
      form: {
        fileVersion: ""
      },
      uploaded: false,
      loading: false,
      sourcePath: ""
    };
  },
  async mounted() {
    const me = this;

    if (!!this.$route.query.isOnlyChat) {
      this.isOnlyChat = true;
    }

    const id = this.$route.query.id;

    const qq = await getTalkByGroupId(id);
    console.log(id + $lang("获取聊天组信息"), qq);
    if (qq.success) {
      if (
        qq.data &&
        qq.data.groupDetails &&
        qq.data.groupDetails.data &&
        qq.data.sChatUser &&
        qq.data.sChatUser.entities
      ) {
        this.chatConfig = {
          groupid: qq.data.groupDetails.data[0].id,
          userid: qq.data.sChatUser.entities[0].username,
          userimg: qq.data.sUser.info.headUrl,
          username: qq.data.sUser.info.nickName || qq.data.sUser.phone,
          userRole: "S",
          userphone: qq.data.sUser.phone,
          // youname:qq.data.targetUser.info.nickName||qq.data.targetUser.phone,
          youname:
            qq.data.targetUser.info.nickName +
            '<img class="shoujiicon" src="' +
            shouji +
            '" /> ' +
            qq.data.targetUser.phone,

          youimg: qq.data.targetUser.info.headUrl,
          youRole: "V",
          isReserve: true,
          youphone: qq.data.targetUser.phone,
          id: id
        };
      } else {
        this.msg = $lang("聊天相关数据出现异常");
      }
    } else {
      this.msg = qq.msg;
    }

    const res = await ChildTaskInfo(id);
    if (res.success) {
      //                debugger
      //                const latestVersion = parseInt(res.data.subTask.latestVersion);
      //                if (isNaN(latestVersion)) {
      //                    res.data.subTask.latestVersion = 1;
      //                } else {
      //                    res.data.subTask.latestVersion = latestVersion + 1;
      //                }
      this.subTask = res.data.subTask;
      this.taskStage = res.data.taskStage;
      const dir = "task/" + res.data.subTask.id + "/";
      client.then(oss => {
        oss
          .list({
            prefix: dir,
            delimiter: "/"
          })
          .then(data => {
            let checkedData = [];

            console.log(data);

            (data.prefixes || []).map(item => {
              var arr = item.split("/");
              if (arr[arr.length - 2] && parseInt(arr[arr.length - 2])) {
                checkedData.push(item);
              }
            });
            this.subTask.latestVersion = checkedData.length + 1;
            // debugger
            //                        debugger
            //                        if (data.prefixes && data.prefixes.length > 0) {
            //                            this.subTask.latestVersion = data.prefixes.length + 1
            //                        } else {
            //                            this.subTask.latestVersion = 1
            //                        }
          });
      });
    } else {
      this.$message.warning(res.msg);
    }
    if (!localStorage.localPoint) {
      localStorage.localPoint = JSON.stringify([]);
    }
    //            const fileData = await getAllFile('checked', me.subTask.id);
    //            console.log(fileData);
    //            if (fileData.data.length > 0) {
    //                debugger
    //            }

    const r = await getFileVersionList();
    this.versionList = [...r.data, { valueExp: "自定义路径", key: "__path__" }];
  },
  methods: {
    chooseFile(index, file) {
      const me = this;

      //加载断点
      let localPoint = JSON.parse(localStorage.localPoint);
      let currCheckPoint = localPoint[index];
      //判断是否有断点存在，有则添加文件对象
      if (file) {
        if (currCheckPoint) currCheckPoint.file = file;
        me.$set(me.uploading, index, true); //直接改变数组不刷新DOM
        //                    /task/子任务ID/阶段ID/
        let fileName;
        //                    ！！！！！！index == me.taskStage.length 原来用于上传完成阶段的文件，更改之后将不存在，完成阶段的文件上传调用其他方法
        if (index == me.taskStage.length) {
          me.subTask.latestVersion = parseInt(me.subTask.latestVersion) + 1;
          if (
            me.subTask.latestVersion == "NaN" ||
            isNaN(me.subTask.latestVersion)
          ) {
            me.subTask.latestVersion = 1;
          }
          fileName =
            me.subTask.projectName +
            "-" +
            "验收" +
            "-" +
            me.subTask.latestVersion;
        } else {
          me.taskStage[index].latestVersion =
            parseInt(me.taskStage[index].latestVersion) + 1;
          if (
            me.taskStage[index].latestVersion == "NaN" ||
            isNaN(me.taskStage[index].latestVersion)
          ) {
            me.taskStage[index].latestVersion = 1;
          }
          fileName =
            me.subTask.projectName +
            "-" +
            me.taskStage[index].stageName +
            "-" +
            me.taskStage[index].latestVersion;
        }
        const fileType = file.name.slice(file.name.lastIndexOf("."));
        client.then(oss => {
          oss
            .multipartUpload(
              `/task/${me.$route.query.id}/${me.$route.query
                .taskId}/${fileName}${fileType}`,
              file,
              {
                checkpoint: currCheckPoint,
                progress: function*(progress, point) {
                  me.$set(me.progress, index, parseInt(progress * 100));
                  let localPoint = JSON.parse(localStorage.localPoint);
                  localPoint[index] = point;
                  localStorage.localPoint = JSON.stringify(localPoint);
                  //                                console.log('上传中...', me.progress[index], point);
                }
              }
            )
            .then(data => {
              //                            me.$message(`文件${file.name}上传完成，文件名为${fileName}`);
              me.$set(me.uploading, index, false);
              let localPoint = JSON.parse(localStorage.localPoint);
              localPoint[index] = null;
              localStorage.localPoint = JSON.stringify(localPoint);
              //保存到java服务器
              me.addFileToServer(
                {
                  bindid:
                    index == me.taskStage.length
                      ? me.subTask.id
                      : me.taskStage[index].id,
                  findex: "enclosure",
                  url: data.url
                    ? data.url
                    : data.res.requestUrls[0].replace(/\?.*/gm, ""),
                  fileName: fileName + fileType,
                  alias: fileName + fileType
                },
                index
              );
              //                            console.log('上传完成', data);
            })
            .catch(data => {
              me.$message({
                message: data.message + $lang(" 将清除当前文件断点信息"),
                type: "error"
              });
              me.$set(me.uploading, index, false);
              let localPoint = JSON.parse(localStorage.localPoint);
              localPoint[index] = null;
              localStorage.localPoint = JSON.stringify(localPoint);
            });
        });
      } else {
        this.$message($lang("请选择要上传的文件"));
      }
    },
    async addFileToServer(param, index) {
      const me = this;
      const res = await addFile(param);
      if (res.success) {
        if (index == me.taskStage.length) {
          const id = this.$route.query.id;
          const res = await AcceptanceTask(id);
          this.$message({
            message: res.msg,
            type: res.success ? "success" : "error"
          });
        }
      }
    },
    toRedirect(name, index) {
      const me = this;
      let TaskStage;
      if (index >= 0) {
        TaskStage = me.taskStage[index].id;
      } else {
        // ！！！有疑问，路过看看这个 id 对不对
        //                    TaskStage = me.taskStage[me.taskStage.length - 1].id
        TaskStage = me.subTask.id;
      }
      const id = this.$route.query.id;
      this.$router.push({
        name,
        query: { id: id, TaskStage: TaskStage, index: index }
      });
    },
    toDetail(name) {
      const id = this.$route.query.id;
      this.$router.push({ name, query: { id: id } });
    },
    async toSubmit() {
      const id = this.$route.query.id;
      const res = await AcceptanceTask(id);
      this.$message({
        message: res.msg,
        type: res.success ? "success" : "error"
      });
    },
    uploadChecked() {
      const me = this;
      me.toSubmitUploadShow = true;
    },
    toSubmitUploadClose() {
      const me = this;
      // me.$confirm($lang('确认关闭当前窗口？(如果上传过index.html并且关闭弹框，重新打开将生成新的版本号)')).then(data => {
      //     if (data == 'confirm') {
      //         me.toSubmitUploadShow = false;
      //         if (me.$refs.indexFile.uploadFiles.length > 0) {
      //             //                        me.subTask.latestVersion++
      //             history.go(0)
      //         }
      //     }
      //     //                    me.$refs.indexFile.clearFiles();
      //     //                    me.$refs.ReleaseFile.clearFiles();
      // }).catch(data => {

      // });
      me.toSubmitUploadShow = false;
    },
    async addFileToServer(param) {
      const me = this;
      const res = await addFile(param);
      if (res.success) {
        me.$message($lang("保存文件成功，文件名为") + param.alias);
        me.$refs.chat.sendMessage(param.alias);
      }
    },
    IndexFileChange(file, fileList) {
      if (fileList.length > 1) {
        this.$message.warning($lang("最多只能上传一个文件"));
        fileList.pop();
        // } else if ((/.vsdata$/).test(file.name)) {
      } else if (/.*$/.test(file.name)) {
        this.selectedFile = file;
      } else {
        this.$message.warning($lang("选择的文件格式不正确"));
        fileList.pop();
      }
    },
    submit() {
      let file = this.selectedFile,
        version = this.form.fileVersion,
        path = this.sourcePath,
        findex = this.subTask.state >= 7 ? "final" : "checked";
      if (!version) {
        this.$message.warning($lang("请先选择格式"));
      } else if (version == "__path__" ? !path : !file) {
        this.$message.warning(
          $lang(version == "__path__" ? "请输入资源文件路径" : "请上传资源文件")
        );
      } else {
        const barId = null;
        this.loading = true;
        if (version == "__path__") {
          this.addFileToServer({
            bindid: this.subTask.id,
            findex,
            url: path,
            fileName: `自定义路径 ${path}`,
            alias: `自定义路径 ${path}`,
            subvsion: this.subTask.latestVersion,
            fileVersion: version
          });
          this.loading = this.toSubmitUploadShow = false;
          this.uploaded = true;
        } else
          client.then(oss => {
            oss
              .multipartUpload(
                `/task/${this.subTask.id}/${this.subTask.latestVersion}/${file
                  .raw.name}`,
                file.raw,
                {
                  progress: p => progress(p, barId)
                }
              )
              .then(data => {
                this.addFileToServer({
                  bindid: this.subTask.id,
                  findex,
                  url:
                    data.url || data.res.requestUrls[0].replace(/\?.*/gm, ""),
                  fileName: file.raw.name,
                  alias: file.raw.name,
                  subvsion: this.subTask.latestVersion,
                  fileVersion: version
                });
                this.loading = this.toSubmitUploadShow = false;
                this.uploaded = true;
              });
          });
      }
    },
    ReleaseFileChange(file, fileList) {
      const me = this;
      console.log(file, fileList);
      if (me.$refs.indexFile.uploadFiles.length == 0) {
        me.$message($lang("请先上传主文件index.html"));
        me.$refs.ReleaseFile.clearFiles();
        return;
      }
      if (file) {
        const barId = null;
        client.then(oss => {
          oss
            .multipartUpload(
              `/task/${me.subTask.id}/${me.subTask.latestVersion}/Release/${file
                .raw.name}`,
              file.raw,
              {
                progress: p => progress(p, barId)
              }
            )
            .then(function(data) {
              me.addFileToServer({
                bindid: me.subTask.id,
                findex: "checked",
                url: data.url
                  ? data.url
                  : data.res.requestUrls[0].replace(/\?.*/gm, ""),
                fileName: file.raw.name,
                alias: file.raw.name,
                subvsion: me.subTask.latestVersion
              });
            });
        });
      }
    },
    IndexFileRemove(file, fileList) {
      const me = this;
      console.log(file, fileList);
      fileList.pop();
      this.selectedFile = null;
    },
    ReleaseFileRemove(file, fileList) {
      const me = this;
      console.log(file, fileList);
      fileList.pop();
      this.selectedFile = null;
    }
  }
};
</script>
