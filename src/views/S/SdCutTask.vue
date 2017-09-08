<template>
    <div class="content-wrapper">
        <div class="new-task-wrapper">
            <el-form ref="form" :model="form" :rules="rules" label-width="260px">
                <h3 class="main-title">{{title}}</h3>
                <div class="new-task-base">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$lang('项目名称:')">
                                <el-input v-model="form.projectName"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('发包类型:')">
                                <el-radio-group v-model="form.packageType">
                                    <el-radio label="0">{{$lang('公开')}}</el-radio>
                                    <el-radio label="1">{{$lang('私密')}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item :label="$lang('意向出价:')">
                                <el-input v-model="form.total"></el-input>
                            </el-form-item>
                            <el-form-item :label="$lang('报名结束时间~任务截止时间:')">
                                <el-date-picker v-model="form.rangeTime" type="datetimerange" :placeholder="$lang('报名结束时间~任务截止时间')" format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions0"></el-date-picker>
                            </el-form-item>
                            <!--<el-form-item :label="$lang('任务截止时间:">
                                                                                                                                                                                    <el-date-picker v-model="form.taskEndTime" type="datetime" placeholder="请选择时间" format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions0"></el-date-picker>
                                                                                                                                                                                </el-form-item>-->
                        </el-col>
                        <el-col :span="10" :offset="3">
                            <div class="new-tast-upload">
                                <img v-if="form.src" :src="form.src" />
                            </div>

                        </el-col>
                    </el-row>
                </div>

                <div class="new-task-other">
                    <el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="$lang('应用领域:')">
                                    <el-select v-model="form.appAreas" :placeholder="$lang('请选择')" class="select-width-all">
                                        <el-option v-for="item in configs.areaList" :key="item.key" :label="item.cnValue" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$lang('应用环境:')">
                                    <el-select v-model="form.vevironments" :placeholder="$lang('请选择')" class="select-width-all">
                                        <el-option v-for="item in configs.enviList" :key="item.key" :label="item.cnValue" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$lang('应用类别:')">
                                    <Type-Select :onChange="AppClassChange" :value="form.appType" :dataSource="configs.AppClass"></Type-Select>
                                </el-form-item>
                                <el-form-item :label="$lang('贴图属性:')">
                                    <el-tree ref="tree" :data="configs.mapAtrr" show-checkbox node-key="id" :props="{
                                                                                                                                                                                                    children: 'children',
                                                                                                                                                                                                    label: 'label'
                                                                                                                                                                                                }">
                                    </el-tree>
                                </el-form-item>
                                <el-form-item :label="$lang('模型风格:')">
                                    <el-select v-model="form.chartlatFormat" :placeholder="$lang('请选择')" class="select-width-all">
                                        <el-option v-for="item in configs.mapModelList" :key="item.key" :label="item.cnValue" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$lang('贴图大小:')">
                                    <el-select v-model="form.chartlatSize" :placeholder="$lang('请选择')" class="select-width-all">
                                        <el-option v-for="item in configs.mapSizeList" :key="item.key" :label="item.cnValue" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$lang('模型格式:')">
                                    <el-select v-model="form.modelStyle" multiple :placeholder="$lang('请选择')" class="select-width-all">
                                        <el-option v-for="item in configs.mapModelStyleList" :key="item.key" :label="item.cnValue" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$lang('贴图格式:')">
                                    <el-select v-model="form.chartlatProperty2" :placeholder="$lang('请选择')" class="select-width-all">
                                        <el-option v-for="item in configs.mapStyle" :key="item.key" :label="item.cnValue" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$lang('模型精度:')">
                                    <el-select v-model="form.chartlatProperty3" :placeholder="$lang('请选择')" class="select-width-all">
                                        <el-option v-for="item in configs.modelAccuracy" :key="item.key" :label="item.cnValue" :value="item.key"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$lang('场景制作单位:')">
                                    <el-select v-model="form.chartlatProperty4" :placeholder="$lang('请选择')" class="select-width-all">
                                        <el-option v-for="item in configs.sightUnit" :key="item.key+'/'+item.cnValue" :label="item.cnValue" :value="item.key+'/'+item.cnValue"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <div class="jdx-add-task">

                            <div class="jdx-title clearfix">
                                <h3 class="th-title fl">{{$lang('阶段性任务分配')}}</h3>
                            </div>

                            <el-row v-for="(item,i) in form.taskStages" :key="i">
                                <el-col :span="12">
                                    <el-form-item :label="$lang('阶段名称:')">
                                        <el-input v-model="item.backup.stageName" v-if="item.editable"></el-input>
                                        <span v-else>{{item.stageName}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item :label="$lang('截止时间:')">
                                        <el-date-picker v-model="item.backup.stageEndTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="$lang('选择时间')" :picker-options="pickerOptions0" v-if="item.editable"></el-date-picker>
                                        <span v-else>{{item.stageEndTime}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="22">
                                    <el-form-item :label="$lang('阶段说明:')">
                                        <el-input type="textarea" v-model="item.backup.stageRemarks" :rows="5" :placeholder="$lang('请输入内容')" v-if="item.editable"></el-input>
                                        <span v-else>{{item.stageRemarks}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="22" class="tr" v-if="item.editable">
                                    <el-button type="sure" @click="saveStage(item)">{{$lang('保存')}}</el-button>
                                    <el-button type="sure" @click="cancelStage(item)">{{$lang('取消')}}</el-button>
                                </el-col>
                                <el-col :span="22" class="tr" v-else>
                                    <el-button type="sure" @click="editStage(item)">{{$lang('修改')}}</el-button>
                                    <el-button type="sure" @click="removeStage(item)">{{$lang('删除')}}</el-button>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item :label="$lang('阶段名称:')">
                                        <el-input v-model="stage.stageName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item :label="$lang('截止时间:')">
                                        <el-date-picker v-model="stage.stageEndTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" :placeholder="$lang('选择时间')" :picker-options="pickerOptions0"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="22">
                                    <el-form-item :label="$lang('阶段说明:')">
                                        <el-input type="textarea" v-model="stage.stageRemarks" :rows="5" :placeholder="$lang('请输入内容')"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="22" class="tr">
                                    <el-button type="sure" @click="createStage">{{$lang('添加')}}</el-button>
                                </el-col>
                            </el-row>
                        </div>

                        <el-form-item :label="$lang('参考图片:')" class="update-images-list">
                            <el-upload ref="ReferencePicture" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-remove="removeFile" :on-change="ReferencePictureChange" :file-list="ReferencePictureFileList" :auto-upload="false" :multiple="true">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <!--<el-dialog v-model="dialogVisible" size="tiny">-->
                            <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                            <!--</el-dialog>-->
                        </el-form-item>
                        <el-row>
                            <el-col :span="12" class="update-text">
                                <el-form-item :label="$lang('附件:')">
                                    <el-upload class="upload-demo" ref="EnclosureFile" action="https://jsonplaceholder.typicode.com/posts/" :on-remove="removeFile" :file-list="EnclosureFileList" :auto-upload="false" :multiple="true">
                                        <el-button slot="trigger" size="small" type="primary">{{$lang('添加文件')}}</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item :label="$lang('状态:')">
                            <el-select v-model="form.state" :placeholder="$lang('请选择')">
                                <el-option :label="$lang('草稿')" value="0"></el-option>
                                <el-option :label="$lang('待确认')" value="1"></el-option>
                                <el-option :label="$lang('待支付')" value="2"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item :label="$lang('备注:')">
                            <el-input type="textarea" v-model="form.remarks" :rows="5" :placeholder="$lang('请输入内容')" class="textarea-width-790"></el-input>
                        </el-form-item>

                    </el-row>
                    <div class="creart-task-btn" v-if="!childid">
                        <el-button type="cancle" @click="$router.go(-1)">{{$lang('取消')}}</el-button>
                        <el-button type="sure" @click="submitTask">{{$lang('提交任务')}}</el-button>
                    </div>
                    <div class="creart-task-btn" v-if="childid">
                        <el-button type="cancle" @click="$router.go(-1)">{{$lang('取消')}}</el-button>
                        <el-button type="sure" @click="updateTask">{{$lang('修改任务')}}</el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <el-dialog :title="$lang('提示')" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <div class="">
                <el-input :placeholder="$lang('请输入分组名称')" v-model="groupName"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$lang('取 消')}}</el-button>
                <el-button type="primary" @click="submitGroup">{{$lang('确 定')}}</el-button>
            </span>
        </el-dialog>
        <SlideBtns :type="'back'"></SlideBtns>

    </div>
</template>
<style>
.new-task-base,
.new-task-other,
.all-task-base {
    padding: 0;
}

.jdx-add-task>div {
    padding: 10px;
    margin-bottom: 25px;
    border-bottom: 1px solid #eeeeee;
}

.jdx-add-task>div:first-child,
.jdx-add-task>div:last-child {
    border-bottom: none;
}

.tc {
    text-align: center;
}

.tr {
    text-align: right;
}
</style>


<script>
import { Loading, Message } from 'element-ui'
import { CreateChildTask, UpdateChildTask, ChildTaskInfo, CreateChildTaskStage, ChildTaskStageList, getSubTaskParam, CreateGroup, TaskInfoById, RemoveStage } from '@/apis/task'
import { addFileList, deleteFileByIds, getAllFile } from '@/apis/files'
import { uploadFile, deleteOssFile } from '@/apis/uploadFile'
import TypeSelect from '@/components/TypeSelect'
import SlideBtns from '@/components/SlideBtns'
import moment from 'moment'
export default {
    components: { TypeSelect, SlideBtns },
    data() {
        return {
            title: $lang("任务拆分"),
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            // pickerOptions1: {
            //     disabledDate(time) {
            //         return time.getTime() > new Date(this.stageEndTime);
            //     }
            // },
            form: {
                // totalType: '1',
                projectName: '',
                packageType: "0",
                total: '',
                appAreas: '',
                vevironments: "",
                appType: '',
                groupId: '',
                // taskEndTime: "",
                // entryEndTime: "",
                rangeTime: [],
                chartlatProperty1: [],
                chartlatProperty2: '',
                chartlatProperty3: '',
                chartlatProperty4: '',


                chartlatFormat: "",
                chartlatSize: "",
                modelStyle: [],
                taskId: '',
                logo: '',
                refer_img: '',
                remarks: '',
                state: '0',
                taskStages: []
                // state:''
            },
            rules: {
                projectName: [{ required: true, message: $lang('请输入活动名称'), trigger: 'blur' }],
                total: [{ required: true, message: $lang('请输入意向出价'), trigger: 'change' }],
                taskEndTime: [{ required: true, message: $lang('请输入任务结束时间'), trigger: 'change', type: 'date', }],
                entryEndTime: [{ required: true, message: $lang('请输入报名结束时间'), trigger: 'change', type: 'date', }],
                appType: [{ required: true, message: $lang('请输入应用类别'), trigger: 'change' }],
                appAreas: [{ required: true, message: $lang('请输入应用领域'), trigger: 'change' }],
                vevironments: [{ required: true, message: $lang('请输入应用环境'), trigger: 'change' }],
                chartlatFormat: [{ required: true, message: $lang('请输入模型风格'), trigger: 'change' }],
                chartlatSize: [{ required: true, message: $lang('请输入贴图大小'), trigger: 'change' }],
                modelStyle: [{ required: true, message: $lang('请输入模型格式'), trigger: 'change', type: 'array' }]
            },
            stage: {
                stageName: "",
                stageEndTime: "",
                stageRemarks: ""
            },
            // taskStages: [],
            dialogVisible: false,
            configs: {
                AppClass: [],
                areaList: [],
                enviList: [],
                mapAtrr: [],
                mapModelList: [],
                mapModelStyleList: [],
                mapSizeList: [],
                mapStyle: [],
                modelAccuracy: [],
                sightUnit: []
            },
            groupName: "",
            childid: "",

            isUpdate: false,
            ReferencePictureFileList: [],
            EnclosureFileList: [],

            //保持当前页面需要删除的文件
            removeFileList: [],
            removeFileNameList: [],
            // imageUrl: '',
            // fileList3: [],
            // dialogImageUrl: '',
            // dialogVisible: false
            // activityDate: [],
            maxTotal: 0,
            loadinginstace: null
        }
    },
    async mounted() {
        this.loadinginstace = Loading.service({ fullscreen: true })
        //        this.maxTotal = this.$route.params.maxTotal || -1;
        const id = this.$route.query.id;
        this.form.taskId = id;
        const res = await getSubTaskParam(id)
        console.log("res.data.mapAtrr", res.data)
        res.data.mapAtrr = res.data.mapAtrr.map(item => {
            return {
                label: item.cnValue,
                id: item.key,
                children: item.list.map(m => {
                    return {
                        label: m.cnValue,
                        id: m.key
                    }
                })
            }
        })
        // console.log("mapAtrr", res.data.mapAtrr)//configs.mapAtrr
        this.configs = res.data;
        // this.configs

        //查询总任务
        const zt = await TaskInfoById(id);
        this.form.groupId = zt.data.groupId;

        const childid = this.$route.query.childid;
        if (childid) {
            this.title = $lang("任务编辑")
            this.childid = childid;
            this.isUpdate = true;
            const resc = await ChildTaskInfo(childid);
            if (resc.success) {
                // this.form.entryEndTime=new Date(this.form.entryEndTime);
                // this.form.taskEndTime=new Date(this.form.taskEndTime);
                this.form.rangeTime = [new Date(resc.data.subTask.entryEndTime), new Date(resc.data.subTask.taskEndTime)];
                if (resc.data.subTask.chartlatProperty1) {
                    if (resc.data.subTask.chartlatProperty1.indexOf(',') > -1) {
                        resc.data.subTask.chartlatProperty1 = resc.data.subTask.chartlatProperty1.split(',')
                    } else {
                        resc.data.subTask.chartlatProperty1 = [resc.data.subTask.chartlatProperty1];
                    }
                } else {
                    resc.data.subTask.chartlatProperty1 = []
                }

                this.$refs.tree.setCheckedKeys(resc.data.subTask.chartlatProperty1);
                console.log("resc.data.subTask.chartlatProperty1", resc.data.subTask.chartlatProperty1)

                // if (resc.data.subTask.chartlatFormat) {
                //     if (resc.data.subTask.chartlatFormat.indexOf(',') > -1) {
                //         resc.data.subTask.chartlatFormat = resc.data.subTask.chartlatFormat.split(',')
                //     } else {
                //         resc.data.subTask.chartlatFormat = [resc.data.subTask.chartlatFormat];
                //     }
                // } else {
                //     resc.data.subTask.chartlatFormat = []
                // }
                if (resc.data.subTask.modelStyle) {
                    if (resc.data.subTask.modelStyle.indexOf(',') > -1) {
                        resc.data.subTask.modelStyle = resc.data.subTask.modelStyle.split(',')
                    } else {
                        resc.data.subTask.modelStyle = [resc.data.subTask.modelStyle];
                    }
                } else {
                    resc.data.subTask.modelStyle = [];
                }

                Object.assign(this.form, resc.data.subTask)
                this.form.taskStages = resc.data.taskStage.map(o => Object.assign(o, {
                    backup: {
                        stageName: o.stageName,
                        stageEndTime: o.stageEndTime,
                        stageRemarks: o.stageRemarks,
                    },
                    editable: false
                }));
                // Object.assign(this.form.taskStages, resc.data.taskStage)
            } else {
                this.$message.warning(resc.msg)
            }
            const fileList = await getAllFile("", childid);
            if (fileList.success && fileList.data) {
                for (let i = 0, l = fileList.data.length; i < l; i++) {
                    let findex = fileList.data[i].findex;
                    if (findex == "referencechart") {
                        this.ReferencePictureFileList.push({
                            name: fileList.data[i].fileName,
                            alias: fileList.data[i].alias,
                            url: fileList.data[i].url,
                            id: fileList.data[i].id
                        })
                    } else if (findex == "enclosure") {
                        this.EnclosureFileList.push({
                            name: fileList.data[i].fileName,
                            alias: fileList.data[i].alias,
                            url: fileList.data[i].url,
                            id: fileList.data[i].id
                        })
                    }

                }
            }
        } else {
            res.data.mapAtrr.forEach(item => {
                if (item.label == "默认贴图") {
                    item.children.map(m => {
                        this.form.chartlatProperty1.push(m.id);
                    })
                }
            })
            // console.log("this.form.chartlatProperty1",this.form.chartlatProperty1)
            // setTimeout(()=>{
            this.$refs.tree.setCheckedKeys(this.form.chartlatProperty1);
            // },800)
        }
        this.loadinginstace.close();
    },
    methods: {
        AppClassChange(value, arrs) {
            this.form.appType = value;
        },
        async submitGroup() {
            if (this.groupName) {
                const res = await CreateGroup(this.groupName)
                this.$message({
                    message: res.msg || $lang('添加成功'),
                    type: res.success ? 'success' : 'error',
                    onClose: () => {
                        if (res.success) {
                            this.dialogVisible = false
                            this.configs.taskGroup.unshift(res.data)
                        }
                    }
                });
            } else {
                this.$message.warning($lang("分组名称不可为空"))
            }

        },
        async submitTask() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.__submitTask()
                } else {
                    return false;
                }
            })

        },
        async updateTask() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.__updateTask()
                } else {
                    return false;
                }
            })
        },
        async __submitTask() {
            const id = this.$route.query.id;

            const validate = this.validatefn()
            if (!validate) {
                return false;
            }
            this.loadinginstace = Loading.service({ fullscreen: true })
            const res = await this._CreateChildTask(this.form, this.form.state);
            console.log('fffffffffffffffffffffffffffffffffff', res);
            // this.$message({
            //     message: res.msg,
            //     type: res.success ? 'success' : 'error',
            //     onClose: () => {

            //         if (res.success) {
            //             this.$router.push({ name: "toEdit", query: { id } })
            //         }
            //     }
            // });
        },
        validatefn() {
            // rules: {
            //     projectName: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
            //     total: [{required: true, message: '请输入意向出价', trigger: 'change'}],
            //     taskEndTime:[{required: true, message: '请输入任务结束时间', trigger: 'change', type: 'date',}],
            //     entryEndTime:[{required: true, message: '请输入报名结束时间', trigger: 'change',type: 'date',}],
            //     appType:[{required: true, message: '请输入应用类别', trigger: 'change'}],
            //     appAreas:[{required: true, message: '请输入应用领域', trigger: 'change'}],
            //     vevironments:[{required: true, message: '请输入应用环境', trigger: 'change'}],
            //     chartlatFormat:[{required: true, message: '请输入模型风格', trigger: 'change',type: 'array'}],
            //     chartlatSize:[{required: true, message: '请输入贴图大小', trigger: 'change'}],
            //     modelStyle:[{required: true, message: '请输入模型格式', trigger: 'change',type: 'array'}],
            // },
            if (!this.form.projectName) {
                this.$message.warning($lang("项目名称不可为空"))
                return false
            }
            if (!this.form.total) {
                this.$message.warning($lang("项目金额不可为空"))
                return false
            }
            if (!this.form.total) {
                this.$message.warning($lang("项目金额不可为空"))
                return false
            }
            if (isNaN(this.form.total)) {
                this.$message.warning($lang("项目金额格式错误"))
                return false
            }
            //验证有问题，下个版本做
            //            if(this.maxTotal != -1 && this.form.total > this.maxTotal){
            //                this.$message.warning("子任务总金额大于总任务金额")
            //                return false
            //            }
            // if(!this.form.entryEndTime){
            //     this.$message.warning("报名时间不可为空")
            //     return false
            // }
            if (!(this.form.rangeTime.length == 2)) {
                this.$message.warning($lang("请输入报名时间和截至时间"))
                return false
            }
            // if(new Date(this.form.taskEndTime)<new Date(this.form.entryEndTime)){
            //     this.$message.warning("报名时间不可大于任务截至时间")
            //     return false
            // }
            if (!this.form.appType) {
                this.$message.warning($lang("请输入应用类别"))
                return false
            }
            if (!this.form.appAreas) {
                this.$message.warning($lang("请输入应用领域"))
                return false
            }
            if (!this.form.vevironments) {
                this.$message.warning($lang("请输入应用环境"))
                return false
            }
            if (!this.form.chartlatFormat) {
                this.$message.warning($lang("请输入模型风格"))
                return false
            }
            if (!this.form.chartlatSize) {
                this.$message.warning($lang("请输入贴图大小"))
                return false
            }
            if (!this.form.modelStyle.length) {
                this.$message.warning($lang("请输入模型格式"))
                return false
            }
            if (!this.form.taskStages.length) {
                this.$message.warning($lang("请添加阶段性任务"))
                return false
            }
            return true;
        },
        async __updateTask() {

            const id = this.$route.query.id;
            const treenode = this.$refs.tree.getCheckedNodes();
            this.form.chartlatProperty1 = treenode.filter(node => !node.children).map(node => node.id);

            const validate = this.validatefn()
            if (!validate) {
                return false;
            }
            // console.log
            this.loadinginstace = Loading.service({ fullscreen: true })
            const res = await UpdateChildTask(this.form, this.form.state);
            if (res.success) {
                //删除java服务器文件
                if (this.removeFileList.length > 0) {
                    deleteFileByIds(this.removeFileList);
                    deleteOssFile(this.removeFileNameList)
                }
                this.uploadAllFile(res.data.id)
            }
            this.loadinginstace.close();
        },
        async _CreateChildTask(form, state) {
            const treenode = this.$refs.tree.getCheckedNodes();
            this.form.chartlatProperty1 = treenode.filter(node => !node.children).map(node => node.id);
            if (this.stage.stageName && this.stage.stageEndTime && this.stage.stageRemarks) {
                form.taskStages.push({
                    backup: {
                        stageName: this.stage.stageName,
                        stageEndTime: moment(this.stage.stageEndTime).format("YYYY-MM-DD"),
                        stageRemarks: this.stage.stageRemarks,
                    },
                    editable: false,
                    stageName: this.stage.stageName,
                    stageEndTime: moment(this.stage.stageEndTime).format("YYYY-MM-DD"),
                    stageRemarks: this.stage.stageRemarks,
                });
            }

            const res = await CreateChildTask(form, state);
            if (res.success) {
                //删除java服务器文件
                if (this.removeFileList.length > 0) {
                    deleteFileByIds(me.removeFileList);
                    deleteOssFile(me.removeFileNameList)
                }
                this.uploadAllFile(res.data.id)
            }
            return res;
        },
        async createStage() {
            if (!this.stage.stageName) {
                this.$message.warning($lang("请填入阶段名称"));
                return;
            }
            if (!this.stage.stageEndTime) {
                this.$message.warning($lang("请选择阶段时间"));
                return;
            }
            if (!this.stage.stageRemarks) {
                this.$message.warning($lang("请填入阶段内容"));
                return;
            }

            this.form.taskStages.push({
                backup: {
                    stageName: this.stage.stageName,
                    stageEndTime: moment(this.stage.stageEndTime).format("YYYY-MM-DD"),
                    stageRemarks: this.stage.stageRemarks,
                },
                editable: false,
                stageName: this.stage.stageName,
                stageEndTime: moment(this.stage.stageEndTime).format("YYYY-MM-DD"),
                stageRemarks: this.stage.stageRemarks,
            });
            this.stage.stageName = "";
            this.stage.stageEndTime = "";
            this.stage.stageRemarks = "";


            // const res = await CreateChildTaskStage(this.stage, this.childid);

            // this.$message({
            //     message: res.msg || '成功创建子阶段',
            //     type: res.success ? 'success' : 'error',
            //     onClose: () => {
            //         if (res.success) {
            //             this.taskStages.push(res.data)
            //         }
            //     }
            // });
        },
        async liststage() {
            const res = await ChildTaskStageList();
        },
        handleClose(done) {
            done();
        },

        async removeFile(file) {
            if (file.id) {
                this.removeFileList.push({ id: file.id });
                this.removeFileNameList.push(`/task/${this.childid}/${file.alias}`)
            }
        },
        ReferencePictureChange(file) {
            const me = this;

            const fileName = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
            if (!(fileName == "jpg" || fileName == "bmp" || fileName == "png")) {
                this.$message($lang('只能上传jpg、png、bmp文件'));
                me.$refs.ReferencePicture.uploadFiles.pop();
                return false
            }
            if (file.size > 10485760) {
                this.$message($lang('文件大小不能超过10M'));
                me.$refs.ReferencePicture.uploadFiles.pop();
                return false
            }
        },
        async addAllFileList(fileList) {
            const id = this.$route.query.id;
            const res = await addFileList(fileList);
            // this.$message({
            //     message: res.success ? '操作成功' : '操作失败',
            //     type: res.success ? 'success' : 'error',
            //     onClose: () => {
            //         if (res.success) {
            //             this.$router.push({ name: "toEdit", query: { id } })
            //         }
            //     }
            // });
            this.$router.push({ name: "toEdit", query: { id } })
        },
        uploadAllFile(id) {
            const me = this;
            //获取上传的文件列表，并且通过1、2、3确定是哪个地方的文件
            let file = [],
                fileListNum = { ReferencePicture: 0, EnclosureFile: 0 },
                fileListType = [],
                PromiseList = [];

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
                    barDiv.id = 'childTaskCreateDiv' + j++;
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
                    PromiseList.push(uploadFile(item, `/task/${id}`, "childTaskCreateDiv" + j++));
                } else {
                    PromiseList.push(uploadFile(item, `/task/${id}`));
                }
            });
            //上传文件
            Promise.all(PromiseList).then(data => {
                console.log('xxxxxxxxxxxxxxxxxxx', data);
                this.loadinginstace = Loading.service({ fullscreen: true })
                let fileList = [];
                data.map((item, i) => {
                    const fileName = item.name.slice(item.name.lastIndexOf("/") + 1);
                    fileList.push({
                        bindid: id,
                        findex: fileListType[i] == 2 ? "referencechart" : "enclosure",
                        url: item.url ? item.url : item.res.requestUrls[0].replace(/\?.*/gm, ''),
                        fileName: file[i].name,
                        alias: fileName
                    });
                    if (!ReferencePicture.filter(o => !o.raw).length && i == 0 && fileListType[i] == 2) {
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
                this.loadinginstace.close();
            });
        },
        editStage(item) {
            item.editable = true;
            item.backup = {
                stageName: item.stageName,
                stageEndTime: item.stageEndTime,
                stageRemarks: item.stageRemarks,
            };
        },
        saveStage(item) {
            Object.assign(item, item.backup);
            item.editable = false;
        },
        async removeStage(item) {
            const res = await RemoveStage(item.id);
            if (res.success) {
                this.form.taskStages.splice(this.form.taskStages.indexOf(item), 1);
            } else {
                this.$message.error(res.msg);
            }
        },
        cancelStage(item) {
            item.editable = false;
        }
    }
}
</script>
