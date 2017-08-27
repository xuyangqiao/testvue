<template>
    <div class="content-wrapper">
        <div class="new-task-wrapper">
            <h3 class="main-title">{{isUpdate ? '修改任务' : '新建任务'}}</h3>
            <div class="new-task-base">
                <el-row>
                    <el-col :span="10">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="项目名称:">
                                <el-input v-model="form.projectName"></el-input>
                            </el-form-item>
                            <el-form-item label="发包类型:">
                                <el-radio-group v-model="form.packageType">
                                    <el-radio :label="0">公开</el-radio>
                                    <el-radio :label="1">私密</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="意向出价:">
                                <el-col :span="11">
                                    <el-select v-model="form.totalType" placeholder="请选择">
                                        <el-option label="询价" value="1"></el-option>
                                        <el-option label="定价" value="2"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="11" :push="2" v-show="form.totalType==1 ? 0 : 1">
                                    <el-input v-model="form.total"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="任务时间:">
                                <el-date-picker v-model="form.taskEndTime" type="datetime" :picker-options="pickerOptions" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="任务组:">
                                <el-col :span="18">
                                    <el-select v-model="form.groupId" placeholder="请选择" class="group-select">
                                        <!--<el-option label="世界制造大会" value="1"></el-option>-->
                                        <el-option v-for="(item,i) in taskGroup" :label="item.groupName" :value="item.id" :key="i"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="4" :push="1">
                                    <a href="javascript:;" class="new-group-a" @click="createGroup = true">新建分组</a>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="11" :offset="3">
                        <div class="new-tast-upload" style="display: none">
                            <el-upload
                                ref="LogoUpload"
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-change="logoChange"
                                :auto-upload="false">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <p class="tips">*支持jpg，png，每张图片大小不超过1M</p>
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
                                    <el-select v-model="form1.appAreas" placeholder="请选择" class="select-width-all">
                                        <!--<el-option label="VR" value="1"></el-option>-->
                                        <el-option v-for="(item,i) in areaList" :label="item.cnValue" :value="item.key" :key="i"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="应用环境:">
                                    <el-select v-model="form1.vevironments" placeholder="请选择" class="select-width-all">
                                        <!--<el-option label="Unity" value="1"></el-option>-->
                                        <el-option v-for="(item,i) in enviList" :label="item.cnValue" :value="item.key" :key="i"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="应用类别:" class="zy-select">
                                    <Type-Select :onChange="typeSelectChange" :dataSource="AppClass" :value="TypeSelectValue"></Type-Select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="参考图片:" class="update-images-list">
                            <el-upload
                                ref="ReferencePicture"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-remove="removeFile"
                                :on-change="ReferencePictureChange"
                                :file-list="ReferencePictureFileList"
                                :auto-upload="false"
                                :multiple=true>
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-row>
                            <el-col :span="10" class="update-text">
                                <el-form-item label="附件:">
                                    <!--<el-upload-->
                                    <!--ref="enclosureFile"-->
                                    <!--class="upload-demo"-->
                                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                    <!--:on-change="handleChange"-->
                                    <!--:file-list="fileList3">-->
                                    <!--<el-button size="small" type="sure">选择文件</el-button>-->
                                    <!--<div slot="tip" class="el-upload__tip" @click="chooseEnclosure">只能上传jpg/png文件，且不超过500kb</div>-->
                                    <!--</el-upload>-->
                                    <el-upload
                                        class="upload-demo"
                                        ref="EnclosureFile"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-remove="removeFile"
                                        :file-list="EnclosureFileList"
                                        :auto-upload="false"
                                        :multiple=true>
                                        <el-button slot="trigger" size="small" type="primary">添加文件</el-button>
                                        <!--<el-progress :percentage="0"></el-progress>-->
                                        <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="uploadEnclosure">上传到服务器</el-button>-->
                                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                                    </el-upload>
                                    <!--<input id="enclosureFlie" multiple="multiple" type="file">-->
                                    <!--<el-button type="sure" @click="uploadEnclosure">上 传</el-button>-->
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="备注:">
                            <el-input type="textarea" v-model="form1.remarks" :rows="5" placeholder="请输入内容" class="textarea-width-790"></el-input>
                        </el-form-item>
                    </el-form>
                </el-row>
                <div class="creart-task-btn">
                    <el-button type="cancle" @click="$router.go(-1)">取消</el-button>
                    <el-button type="sure" @click="btnHandle(1)">托管提交发布任务</el-button>
                    <el-button type="info" @click="btnHandle(0)">保存</el-button>
                </div>
            </div>
        </div>
        <el-dialog
            title="新建分组"
            :visible.sync="createGroup"
            size="tiny">
            <div class="">
                <el-input placeholder="请输入分组名称" v-model="groupName"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="cancle" @click="createGroup = false">取 消</el-button>
                <el-button type="sure" @click="createGroupConfirm">确 定</el-button>
            </span>
        </el-dialog>
        <div id="progress-bar" style="background: #ddd;height: 10px;"></div>
        <SlideBtns :type="'back'"></SlideBtns>
    </div>
</template>

<script>
    import {Loading, Message} from 'element-ui'
    import TypeSelect from '@/components/TypeSelect'
    import {TaskInfoById, SaveTaskGroup, TaskAdd, TaskSave, getTackParam} from '@/apis/task'
    import {getAllFile, deleteFileByParam, deleteFileByIds, addFileList} from '@/apis/files'

    import {uploadFile, deleteOssFile} from '@/apis/uploadFile'
    import SlideBtns from '@/components/SlideBtns'

    export default {
        components: {TypeSelect, SlideBtns},
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                form: {
                    projectName: '',
                    packageType: 0,
                    totalType: '',
                    total: '',
                    taskEndTime: "",
                    groupId: ''
                },
                imageUrl: '',
                //保存原来的封面，删除oss文件用
                oldImageName: "",
                form1: {
                    appAreas: '',
                    vevironments: '',
                    appType: '',
                    ambient: '',
                    remarks: '',
                },
                dialogImageUrl: '',
                dialogVisible: false,

                areaList: [],
                enviList: [],
                AppClass: [],
                taskGroup: [],
                isUpdate: false,

                groupName: '',
                createGroup: false,

//                path: '',
//                oss: null,
//                uploading: false,
//                progress: '准备上传...',

//                LogoUploadFileList: [],
                ReferencePictureFileList: [],
                EnclosureFileList: [],

                //保持当前页面需要删除的文件
                removeFileList: [],
                removeFileNameList: [],

                TypeSelectValue: "",
                loadinginstace: null
            }
        },
        async mounted() {

            const me = this;
            const {areaList, enviList, taskGroup, AppClass} = JSON.parse(sessionStorage.getItem("TaskParam") || {});
            this.areaList = areaList;
            this.enviList = enviList;
            this.taskGroup = taskGroup;
            this.AppClass = AppClass;
            const id = this.$route.query.id;
            if (id) {
                this.isUpdate = true;
                const res = await TaskInfoById(id);
                const {success, msg, data} = res;
                if (!success) {
                    this.$message.warning(msg);
                    return;
                }
                this.form = {
                    projectName: data.projectName,
                    packageType: parseInt(data.packageType),
                    totalType: data.totalType,
                    total: data.totalType == 2 ? data.total : 0,
                    taskEndTime: new Date(data.taskEndTime),
                    groupId: data.groupId
                };
                this.form1 = {
                    appAreas: data.appAreas,
                    vevironments: data.vevironments,
                    appType: data.appType,
                    ambient: data.ambient,
                    remarks: data.remarks,
                };
                this.TypeSelectValue = this.form1.appType;
                const fileList = await getAllFile("", id);
//                console.log(fileList);
                if (fileList.success && fileList.data) {
                    for (let i = 0, l = fileList.data.length; i < l; i++) {
                        let findex = fileList.data[i].findex;

                        if (findex == "cover") {
                            me.imageUrl = fileList.data[i].url;
                            me.oldImageName = fileList.data[i].alias;
                        } else if (findex == "referencechart") {
                            me.ReferencePictureFileList.push({
                                name: fileList.data[i].fileName,
                                alias: fileList.data[i].alias,
                                url: fileList.data[i].url,
                                id: fileList.data[i].id
                            })
                        } else if (findex == "enclosure") {
                            me.EnclosureFileList.push({
                                name: fileList.data[i].fileName,
                                alias: fileList.data[i].alias,
                                url: fileList.data[i].url,
                                id: fileList.data[i].id
                            })
                        }
                    }
                }
            }
        },
        methods: {
            async createGroupConfirm() {
                const {groupName} = this;
                const data = await SaveTaskGroup(groupName);
                this.taskGroup.push(data.data);
                this.createGroup = false;
                this.groupName = "";
                const taskData = await getTackParam();
                if (taskData) {
                    sessionStorage.setItem("TaskParam", JSON.stringify(taskData));
                }
            },
            typeSelectChange(value) {
                this.form1.appType = value;
            },
//            handleRemove(file, fileList) {
//                console.log(file, fileList);
//            },
//            handlePictureCardPreview(file) {
//                this.dialogImageUrl = file.url;
//                this.dialogVisible = true;
//            },
//            handleChange(file, fileList) {
//                this.fileList3 = fileList.slice(-3);
//            },
//            handleAvatarSuccess(res, file) {
//                this.imageUrl = URL.createObjectURL(file.raw);
//            },
            logoChange(file) {
                const me = this;

                const fileName = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
                if (!(fileName == "jpg" || fileName == "bmp" || fileName == "png")) {
                    this.$message('只能上传jpg、png、bmp文件');
                    me.$refs.LogoUpload.uploadFiles.pop();
                    return false
                }
                if (file.size > 10485760) {
                    this.$message('文件大小不能超过10M');
                    me.$refs.LogoUpload.uploadFiles.pop();
                    return false
                }

                const reader = new FileReader();
                reader.readAsDataURL(file.raw);
                reader.onload = function (e) {
                    me.imageUrl = e.target.result
                }
            },
            ReferencePictureChange(file) {
                const me = this;

                const fileName = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
                if (!(fileName == "jpg" || fileName == "bmp" || fileName == "png")) {
                    this.$message('只能上传jpg、png、bmp文件');
                    me.$refs.ReferencePicture.uploadFiles.pop();
                    return false
                }
                if (file.size > 10485760) {
                    this.$message('文件大小不能超过10M');
                    me.$refs.ReferencePicture.uploadFiles.pop();
                    return false
                }
            },
//            beforeAvatarUpload(file) {
//                this.coverImg = file;
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
//            },
            //上传当前页面所有文件到阿里云oss
            async uploadAllFile(id) {
                const me = this;
                //获取上传的文件列表，并且通过1、2、3确定是哪个地方的文件
                let file = [],
                    fileListNum = {LogoUpload: true, ReferencePicture: 0, EnclosureFile: 0},
                    fileListType = [],
                    PromiseList = [];
                let LogoUpload = me.$refs.LogoUpload.uploadFiles;
                if (LogoUpload[0] && LogoUpload[0].raw) {
                    let last = LogoUpload.length - 1;
                    file.push(LogoUpload[last].raw);
                    fileListNum.LogoUpload = true;
                    fileListType.push(1);
                    //删除原来的封面
                    if (me.oldImageName != "") {
                        //const headFileData = await deleteFileByParam(id, "cover");
                        deleteFileByParam(id, "cover");
                        deleteOssFile([`/task/${this.$route.query.id}/${me.oldImageName}`]);
                    }
                }
                let ReferencePicture = me.$refs.ReferencePicture.uploadFiles;
                ReferencePicture.map((item) => {
                    if (item.raw) {
                        file.push(item.raw);
                        fileListNum.ReferencePicture++;
                        fileListType.push(2)
                    }
                });
                let EnclosureFile = me.$refs.EnclosureFile.uploadFiles;
                let j = 0;
                EnclosureFile.map((item, i) => {
                    if (item.raw) {
                        file.push(item.raw);

                        var el = me.$refs.EnclosureFile.$el.querySelectorAll("li");
                        var barDiv = document.createElement('div');
                        barDiv.id = 'taskCreateDiv' + j++;
                        barDiv.className = 'self-bar-div';
                        barDiv.appendChild(document.createElement('i'));
                        barDiv.appendChild(document.createElement('div'));
                        el[i].appendChild(barDiv, el[i].childNodes[0]);

                        fileListNum.EnclosureFile++;
                        fileListType.push(3)
                    }
                });
                //生成上传的函数，并且判断为附件的时候调用进度条
                j = 0;
                file.map((item, i) => {
                    if (fileListType[i] == 3) {
                        PromiseList.push(uploadFile(item, `/task/${id}`, "taskCreateDiv" + j++));
                    } else {
                        PromiseList.push(uploadFile(item, `/task/${id}`));
                    }
                });
                console.log('ReferencePicture',ReferencePicture);
                //上传文件
                Promise.all(PromiseList).then(data => {
                    let fileList = [];
                    data.map((item, i) => {
                        const fileName = item.name.slice(item.name.lastIndexOf("/") + 1);
                        fileList.push({
                            bindid: id,
                            findex: fileListType[i] == 1 ? "cover" : fileListType[i] == 2 ? "referencechart" : "enclosure",
                            url: item.url ? item.url : item.res.requestUrls[0].replace(/\?.*/gm, ''),
                            fileName: file[i].name,
                            alias: fileName
                        });
                        if (!ReferencePicture.filter(o=>!o.raw).length && i == 0 && fileListType[i] == 2) {
                            fileList.push({
                                bindid: id,
                                findex: "cover",
                                url: item.url ? item.url : item.res.requestUrls[0].replace(/\?.*/gm, ''),
                                fileName: file[i].name,
                                alias: fileName
                            });
                        }
                    });
                    this.addAllFileList(fileList);
                });
            },
            //上传文件成功之后保存到服务器
            async addAllFileList(fileList) {
                const res = await addFileList(fileList);
                this.loadinginstace.close();
//                this.$message({
//                    message: res.msg || '操作成功',
//                    type: res.success ? 'success' : 'error',
//                    onClose: () => {
//                        if (res.success) {
//                            this.$router.push({name: "B_list"})
//                        }
//                    }
//                });
                this.$message({
                    message: res.msg || '操作成功',
                    type: res.success ? 'success' : 'error'
                });
                this.$router.push({name: "B_list"})
            },
            async removeFile(file) {
//            	console.log(file, fileList);
                if (file.id) {
                    this.removeFileList.push({id: file.id});
                    this.removeFileNameList.push(`/task/${this.$route.query.id}/${file.alias}`)
                }
            },
            //点击按钮提交或者保存
            async submit(state, param, isUpdate) {
                const me = this;
                if (isUpdate) {

                    const res = await TaskSave(state, param);
                    if (res.success) {
                        //删除java服务器文件
                        if (this.removeFileList.length > 0) {
                            deleteFileByIds(me.removeFileList);
                            deleteOssFile(me.removeFileNameList)
                        }
                        const id = res.data.id;
                        me.uploadAllFile(id);
                    } else {
                        me.$message.error(res.msg || '未知错误');
                        this.loadinginstace.close();
                    }
//                    this.$message({
//                        message: res.msg || '保存成功',
//                        type: res.success ? 'success' : 'error',
//                        onClose: () => {
//                            if (res.success) {
//                                this.$router.push({name: "B-list"})
//                            }
//                        }
//                    });

                } else {
                    const res = await TaskAdd(state, param);
                    if (res.success) {
                        const id = res.data.id;
                        me.uploadAllFile(id);
                    } else {
                        me.$message.error(res.msg || '未知错误');
                        this.loadinginstace.close();
                    }
//                    this.$message({
//                        message: res.msg || '添加成功',
//                        type: res.success ? 'success' : 'error',
//                        onClose: () => {
//                            if (res.success) {
//                                this.$router.push({name: "B-list"})
//                            }
//                        }
//                    });
                }
            },

            btnHandle(state) {
                const me = this;
                const form = me.form;
                const form1 = me.form1;
                if (state == 1) {
                    if (form.projectName == '') {
                        me.$message.error('任务名不能为空');
                        return;
                    }
                    if (form.totalType == '') {
                        me.$message.error('意向出价类型不能为空');
                        return;
                    }
                    if (form.totalType == 2 && form.total == "") {
                        me.$message.error('意向出价价格不能为空');
                        return;
                    }
                    if (form.totalType == 2 && !/^\d+(\.\d{2})?$/.test(form.total * 1)) {
                        me.$message.error('价格格式不对，请输入正确的价格');
                        return;
                    }
                    if (form.taskEndTime == '') {
                        me.$message.error('任务时间不能为空');
                        return;
                    }
                    if (form1.vevironments == '') {
                        me.$message.error('应用环境不能为空');
                        return;
                    }
                    if (form1.appType == '') {
                        me.$message.error('应用类别不能为空');
                        return;
                    }
                    if (form1.remarks == '') {
                        me.$message.error('备注不能为空');
                        return;
                    }
                    if (me.$refs.ReferencePicture.uploadFiles.length == 0) {
                        me.$message.error('至少需要一张参考图');
                        return;
                    }
                }

                this.loadinginstace = Loading.service({fullscreen: true});

                let param = {
                    projectName: form.projectName,   //required
                    packageType: form.packageType,
                    totalType: form.totalType,
                    total: form.total,
                    appAreas: form1.appAreas,
                    vevironments: form1.vevironments,
                    appType: form1.appType,
                    groupId: form.groupId,
                    taskEndTime: form.taskEndTime,
                    remarks: form1.remarks
                };
                if (me.isUpdate) {
                    param.id = me.$route.query.id;
                }
                me.submit(state, param, me.isUpdate);
//            	const me = this;
//                let file = [],
//                    fileListNum = {LogoUpload: true, ReferencePicture: 0, EnclosureFile: 0},
//                    fileListType = [],
//                    PromiseList = [];
//            	let LogoUpload = me.$refs.LogoUpload.uploadFiles;
//            	if(LogoUpload[0] && LogoUpload[0].raw){
//                    file.push(LogoUpload[0].raw);
//                    fileListNum.LogoUpload = true;
//                    fileListType.push(1)
//                }
//                let ReferencePicture = me.$refs.ReferencePicture.uploadFiles;
//            	ReferencePicture.map((item) => {
//                    file.push(item.raw);
//                    fileListNum.ReferencePicture++;
//                    fileListType.push(2)
//                });
//            	let EnclosureFile = me.$refs.EnclosureFile.uploadFiles;
//            	debugger
//                EnclosureFile.map((item, i) => {
//                    file.push(item.raw);
//
//                    var el = me.$refs.EnclosureFile.$el.querySelectorAll("li");
//                    var barDiv = document.createElement('div');
//                    barDiv.id = 'div' + i;
//                    barDiv.className = 'self-bar-div';
//                    barDiv.appendChild(document.createElement('i'));
//                    barDiv.appendChild(document.createElement('div'));
//                    el[i].appendChild(barDiv, el[i].childNodes[0]);
//
//                    fileListNum.EnclosureFile++;
//                    fileListType.push(3)
//                });
//                file.map((item, i) => {
//                    if(fileListType[i] == 3){
//                        PromiseList.push(uploadFile(item, "", "div" + i));
//                    }else{
//                        PromiseList.push(uploadFile(item, ""));
//                    }
//                });
//                Promise.all(PromiseList).then(data => {
//                	console.log(data);
//                	data.map((item,i) => {
//                		if(item.url){
//                			console.log(item.url)
//                        }else{
//                			let url = item.res.requestUrls[0].replace(/\?.*/gm, '');
//                			console.log(url)
//                        }
//                    })
//                });
//            	const file = [].concat(me.$ref.)
//                const coverImg = this.coverImg;
//                const self = this;
//                if(coverImg && coverImg != {}){
//                	debugger
//                    this.oss = new OSS.Wrapper({
//                        bucket: 'limei',
//                        region: 'oss-cn-shanghai',
//                        accessKeyId: 'LTAI6leHXQrWHqIK',
//                        accessKeySecret: 'y9lMfdK78KEpAWBTClyBSHFPFf8Z4I',
//                    });
//                    let coverImgPoint = localStorage.coverImg && JSON.parse(localStorage.coverImg);
//                    if (coverImgPoint) coverImgPoint.file = coverImg;
//                    this.uploading = true;
//                    this.oss.multipartUpload(`${this.path && this.path + '/'}${coverImg.name}`, coverImg, {
//                        coverImgPoint,
//                        progress: function* (progress, point) {
//                            self.progress = (progress * 100).toFixed(2) + '%';
//                            localStorage.coverImgPoint = JSON.stringify(coverImgPoint);
//                            console.log('上传中...', self.progress, coverImgPoint);
//                        }
//                    }).then(data => {
//                        this.uploading = false;
//                        localStorage.removeItem('coverImgPoint');
//                        console.log('上传完成', data);
//                        alert('上传完成');
//                        debugger
//                        self.imageUrl = data.url;
//
//                        const form = self.form;
//                        const form1 = self.form1;
//                        let param = {
//                            projectName: form.projectName,   //required
//                            packageType: form.packageType,
//                            totalType: form.totalType,
//                            total: form.total,
//                            appAreas: form1.appAreas,
//                            vevironments: form1.vevironments,
//                            appType: form1.appType,
//                            groupId: form.groupId,
//                            taskEndTime: form.taskEndTime.toLocaleString(),
//                            logo: this.imageUrl,
//                            referImg: "",
//                            remarks: form1.remarks,
//                        };
//                        debugger
//                        if(self.isUpdate){
//                            param.id = self.$route.query.id;
//                        }
//                        console.log(param);
//                        self.submit(state, param, self.isUpdate);
//                    });
//                }
            }
//            addEnclosure(){
//                debugger
//            },
//            uploadEnclosure(){
//                const fileList = this.$refs.EnclosureFile.uploadFiles;
//                debugger
//                const data = uploadFile(fileList[0].raw)
//
//                const file = document.getElementById("enclosureFlie").files[0];
//                const self = this;
//                this.oss = new OSS.Wrapper({
//                    bucket: 'limei',
//                    region: 'oss-cn-shanghai',
//                    accessKeyId: 'LTAI6leHXQrWHqIK',
//                    accessKeySecret: 'y9lMfdK78KEpAWBTClyBSHFPFf8Z4I',
//                });
//                let checkpoint = localStorage.point && JSON.parse(localStorage.point);
//                if (checkpoint) checkpoint.file = file;
//                if (true) {
//                    this.uploading = true;
//                    this.oss.multipartUpload(`${this.path && this.path + '/'}${file.name}`, file, {
//                        checkpoint,
//                        progress: function*(progress, point) {
//                            self.progress = (progress * 100).toFixed(2) + '%';
//                            localStorage.point = JSON.stringify(point);
//                            console.log('上传中...', self.progress, point);
//                        }
//                    }).then(data => {
//                        this.uploading = false;
//                        localStorage.removeItem('point');
//                        console.log('上传完成', data);
//                        alert('上传完成');
//                    });
//                } else {
//                    alert('请选择要上传的文件');
//                }
//            }
        }
    }
</script>
