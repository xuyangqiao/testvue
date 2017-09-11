<template>
    <div class="content-wrapper">
        <div class="all-task-wrapper">
            <TsInfo :tid="tid" :onload="onloadCallBack" :title="title" :isZong="isZong" :role="role" :name="stateName" :userType="userType" ref="tsInfo">
            </TsInfo>

            <slot name="middle"></slot>

            <div class="all-task-other">
                <el-row>

                    <el-col :span="12">
                        <div>
                            <h4 class="th-title">{{$lang('参考图片')}}</h4>
                            <ul class="pic-list-wrap clearfix">
                                <li class="pic-list-item" v-for="(item,i) in imgList" :key="i">
                                    <img @click="handlePictureCardPreview(i)" :src="item" />
                                </li>
                                <!--<li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>-->
                                <!--<li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>-->
                                <!--<li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>-->
                                <!--<li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>-->
                                <!--<li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>-->
                                <!--<li class="pic-list-item"><img src="../assets/images/img-100.jpg"/></li>-->
                            </ul>
                        </div>
                        <div v-if="$route.query.origin!='index'">
                            <h4 class="th-title">{{$lang('附件（')}}{{fileList.length}} {{$lang('个）')}}</h4>
                            <ul class="file-list-wrap clearfix">
                                <li class="file-list-item" v-for="(item,i) in fileList" :key="i">
                                    <p>{{item.fileName}}</p>
                                    <!--:href="item.url" :download="item.fileName"-->
                                    <a href="javascript:void(0)" @click="downloadFile(item.url, item.fileName)">{{$lang('下载')}}</a>
                                </li>
                                <!--<li class="file-list-item">-->
                                <!--<p>VSWORk</p>-->
                                <!--<a href="javascript:;">{{$lang('下载')}}</a>-->
                                <!--</li>-->
                                <!--<li class="file-list-item">-->
                                <!--<p>VSWORk</p>-->
                                <!--<a href="javascript:;">{{$lang('下载')}}</a>-->
                                <!--</li>-->
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <h4 class="th-title pad-left-40">{{$lang('任务特性')}}</h4>
                        <div class="pad-left-40">
                            <dl class="box-flex info-show">
                                <dt>{{$lang('应用领域:')}}</dt>
                                <dd class="flex1">{{form.appAreasName}}</dd>
                            </dl>
                            <dl class="box-flex info-show">
                                <dt>{{$lang('应用类别:')}}</dt>
                                <dd class="flex1">{{form.appTypeName}}</dd>
                            </dl>
                            <dl class="box-flex info-show">
                                <dt>{{$lang('应用环境:')}}</dt>
                                <dd class="flex1">{{form.vevironmentsName}}</dd>
                            </dl>
                            <dl class="box-flex info-show" v-if="form.chartlatProperty1">
                                <dt>{{$lang('贴图属性:')}}</dt>
                                <dd class="flex1">{{form.chartlatProperty1}}</dd>
                            </dl>
                            <dl class="box-flex info-show" v-if="form.chartlatFormat">
                                <dt>{{$lang('模型风格:')}}</dt>
                                <dd class="flex1">{{form.chartlatFormat}}</dd>
                            </dl>
                            <dl class="box-flex info-show" v-if="form.chartlatSize">
                                <dt>{{$lang('贴图大小:')}}</dt>
                                <dd class="flex1">{{form.chartlatSize}}</dd>
                            </dl>
                            <dl class="box-flex info-show" v-if="form.modelStyle">
                                <dt>{{$lang('模型格式:')}}</dt>
                                <dd class="flex1">{{form.modelStyle}}</dd>
                            </dl>

                            <!--<dl class="box-flex info-show">-->
                            <!--<dt>{{$lang('应用类别:')}}</dt>-->
                            <!--<dd class="flex1">{{$lang('工业模型  军事')}}</dd>-->
                            <!--</dl>-->
                            <!--<dl class="box-flex info-show">-->
                            <!--<dt>{{$lang('应用类别:')}}</dt>-->
                            <!--<dd class="flex1">{{$lang('工业模型  军事')}}</dd>-->
                            <!--</dl>-->
                            <dl class="box-flex info-show">
                                <dt>{{$lang('备注:')}}</dt>
                                <dd class="flex1" style="word-break: break-all;">{{form.remarks}}
                                    <!--{{$lang('这些看上去彼此没有太多联系的连续创业者，现在有了一个共同的身份——共享电单车玩家。当然，除了李如彬、夏涛和张天雄这些互联网创业者之外，扎堆在这一领域的还有十几位来自传统电动车行业的“老炮儿”。而他们的共同目标是——成为共享电单车界的摩拜或ofo。')}}-->
                                </dd>
                            </dl>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="text-align:center;">
                <el-button type="sure" v-if="['7','8'].includes(this.$refs.tsInfo&&this.$refs.tsInfo.form.state)" @click="toProview">预览</el-button>
            </div>
            <slot name="footer"></slot>
        </div>
        <!--图片预览的小弹窗-->
        <!--封装的时候:visible.sync="dialogVisible"作为父元素传给子元素的属性有问题-->
        <el-dialog :title="$lang('图片预览')" :visible.sync="dialogVisible" size="large">
            <div class="dialog-img-preview">
                <div class="dialog-img-preview-left">
                    <i @click="imgPreviewArrow(-1)" class="el-icon-arrow-left"></i>
                </div>
                <img :src="dialogImageUrl" alt="">
                <div class="dialog-img-preview-right">
                    <i @click="imgPreviewArrow(1)" class="el-icon-arrow-right"></i>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getTackParam, TaskInfoById } from '@/apis/task.js'
import TsInfo from '@/components/TsInfo'
export default {
    props: {
        tid: null,
        onload: Function,
        isZong: {
            type: Boolean,
            default: true
        },
        role: String,
        stateName: String,
        title: String,
        userType: String
    },
    components: { TsInfo },
    data() {
        return {
            referImg: [],
            form: {
                appAreas: '',
                appAreasName: '',
                vevironments: '',
                vevironmentsName: '',
                appType: '',
                appTypeName: '',
                remarks: '',
                logo: ''
            },
            imgList: [],
            fileList: [],
            dialogVisible: false,
            dialogImageUrl: "",
            dialogImageIndex: 0
        }
    },
    async mounted() {
        //   const id = this.$route.query.id;
        //   //根据ID 查询总任务
        //   const data = await TaskInfoById(id);
        //   this.onload&&this.onload(data)
        // this.form.projectName = data.projectName;
        // this.form.state = data.state;
        // this.form.total = data.total;
        // this.form.packageType = data.packageType;
        // this.form.taskEndTime = data.taskEndTime;
        // //从localStorage 获取任务参数，没有就重新请求
        //   let TaskParamCache = localStorage.getItem("TaskParam");
        //   let taskGroup;
        //   if(TaskParamCache){
        //   taskGroup = JSON.parse(TaskParamCache).taskGroup;
        // }else{
        //   taskGroup = await getTackParam().taskGroup;
        // }
        // for(let i=0,l=taskGroup.length;i>l;i++){
        //     if(taskGroup[i].id == data.groupId){
        //         this.form.group = taskGroup[i].groupName;
        //         console.log(taskGroup[i]);
        //         break;
        //   }
        // }
        /*  {
         "id": "Task-1e5682154bcaec3a",
         "remarks": "1",
         "sort": 0,
         "version": 0,
         "status": "0",
         "idList": null,
         "createBy": "user-1",
         "createTime": "2017-06-14 11:12:08",
         "updateBy": null,
         "updateTime": null,
         "startDate": null,
         "endDate": null,
         "projectName": "1",
         "packageType": "1",
         "total": 1,
         "totalType": "2",
         "appAreas": "1",
         "vevironments": "1",
         "logo": "1",
         "referImg": "1",
         "state": "{state}",
         "appType": "1",
         "groupId": "1",
         "sUserId": null,
         "taskEndTime": "1"
         }*/
    },
    methods: {
        onloadCallBack(taskInfo, fileData) {
            // console.log(fileData);
            const me = this;
            Object.assign(this.form, taskInfo)
            if (fileData && Array.isArray(fileData)) {
                me.imgList = [];
                me.fileList = [];
                for (let i = 0, l = fileData.length; i < l; i++) {
                    if (fileData[i].findex == "referencechart") {
                        me.imgList.push(fileData[i].url);
                    } else if (fileData[i].findex == "enclosure") {
                        me.fileList.push({ url: fileData[i].url, fileName: fileData[i].fileName });
                    }
                }
            }
            this.onload && this.onload(taskInfo, fileData)
        },
        //            handleRemove(file, fileList) {
        //                console.log(file, fileList);
        //            },
        handlePictureCardPreview(index) {
            this.dialogImageUrl = this.imgList[index];
            this.dialogVisible = true;
            this.dialogImageIndex = index;
        },
        imgPreviewArrow(state) {
            const length = this.imgList.length;
            if (state == -1) {
                if (this.imgList[this.dialogImageIndex - 1]) {
                    this.dialogImageUrl = this.imgList[--this.dialogImageIndex]
                } else {
                    this.dialogImageIndex = length - 1;
                    this.dialogImageUrl = this.imgList[this.dialogImageIndex]
                }
            } else {
                if (this.imgList[this.dialogImageIndex + 1]) {
                    this.dialogImageUrl = this.imgList[++this.dialogImageIndex]
                } else {
                    this.dialogImageIndex = 0;
                    this.dialogImageUrl = this.imgList[this.dialogImageIndex]
                }
            }
        },
        downloadFile(url, fileName) {
            var a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            var ev = document.createEvent('MouseEvents');
            ev.initEvent('click', false, true);
            a.dispatchEvent(ev);
        },
        //            handleChange(file, fileList) {
        //                this.fileList3 = fileList.slice(-3);
        //            },
        //            handleAvatarSuccess(res, file) {
        //                this.imageUrl = URL.createObjectURL(file.raw);
        //            },
        //            beforeAvatarUpload(file) {
        //                const isJPG = file.type === 'image/jpeg';
        //                const isLt2M = file.size / 1024 / 1024 < 2;
        //
        //                if (!isJPG) {
        //                    this.$message.error('上传头像图片只能是 JPG 格式!');
        //                }
        //                if (!isLt2M) {
        //                    this.$message.error('上传头像图片大小不能超过 2MB!');
        //                }
        //                return isJPG && isLt2M;
        //            }
        toProview() {
            let loginUser = JSON.parse(localStorage.LoginUser || '{}');
            console.log(this.$refs.tsInfo.fileData)
            let fileData = this.$refs.tsInfo.fileData;
            this.$router.push({ name: `${loginUser.userType}_${{ B: 'DTaskCheck' }[loginUser.userType] || 'Proview'}`, query: { fileVersion: fileData.fileVersion, url: fileData.url } })
        }
    }
}
</script>
