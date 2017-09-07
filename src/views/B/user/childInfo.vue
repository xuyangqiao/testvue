<template>
    <div class="sun-cont-wrapper">
        <!-- 您暂时未设置子账号，点击添加  -->
        <div class="sun-cont-no" v-if="tableData.length==0&&handleType!=='add'">
            <p>{{$lang('您暂时未设置子账号')}}，
                <a href="javascript:;" @click="addChildTab">{{$lang('点击添加')}}</a>
            </p>
        </div>

        <!-- 您的子账号列表 -->
        <div class="sun-cont-list" v-if="!tableData.length==0&&handleType=='index'">
            <div class="sun-cont-list-title clearfix">
                <h3 class="main-title fl">{{$lang('您的子账号')}}</h3>
                <el-button type="sure" class="fr" @click="addChildTab">{{$lang('添加')}}</el-button>
            </div>
            <div class="">
                <template>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column :label="$lang('头像')" width="80">
                            <template scope="scope">
                                <img :src="scope.row.info?scope.row.info.headUrl:''" class="table-header-img" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="nickName" :label="$lang('账户名')"></el-table-column>
                        <el-table-column prop="phone" :label="$lang('账号')"></el-table-column>
                        <el-table-column prop="bUserType" :label="$lang('身份')"></el-table-column>
                        <el-table-column prop="set" :label="$lang('操作')" width="240">
                            <template scope="scope">
                                <el-button size="small" :type="scope.row.state=='0'?'danger':'info'" @click="handleChange(scope.$index, scope.row)">
                                    {{scope.row.state=='0'?$lang('禁用'):$lang('启用')}}</el-button>
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">{{$lang('编辑')}}</el-button>
                                <el-button size="small" @click="handleChangePwd(scope.$index, scope.row)">{{$lang('重置密码')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>

        <!-- 添加子账户 -->
        <div class="add-sun-cont" v-if="handleType=='add'||handleType=='edit'" v-loading="loading">
            <h3 class="main-title">{{handleType=='add'?$lang('添加子账户'):$lang('编辑子账户')}}</h3>
            <div class="">
                <div class="up-load-hd-img">
                    <el-upload class="avatar-uploader" action="" ref="headImage" :show-file-list="false" :auto-upload="false" :on-change="headChange">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="el-upload__tip" slot="tip">{{$lang('上传头像（支持10M以下的jpg、png、BMP文件）')}}</div>
                </div>
                <el-form ref="form" :model="form" label-width="0" :rules="rules">
                    <el-form-item prop='nickName'>
                        <el-input v-model="form.nickName" :placeholder="$lang('请输入子账号用户名')"></el-input>
                    </el-form-item>
                    <VerifyCode :phone="form.phone" :code="code" :parentClass="'add-sun-cont'" :type="'editChild'" :getData="getData"></VerifyCode>
                    <el-form-item prop='bUserType'>
                        <el-select v-model="form.bUserType" :placeholder="$lang('请选择账号类型')" :disabled="handleType=='edit'">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop='password' v-if="handleType=='add'">
                        <el-input type="password" v-model="form.password" :placeholder="$lang('请输入子账号密码')"></el-input>
                    </el-form-item>
                    <el-form-item prop='password1' v-if="handleType=='add'">
                        <el-input type="password" v-model="form.password1" :placeholder="$lang('请再次输入子账号密码')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-button type="sure" class="fr" @click="addChild">{{$lang('保存')}}</el-button>
                        </el-col>
                        <el-col :span="11" :offset="2">
                            <el-button type="cancle" class="fr" @click="handleType='index',getChildList()">{{$lang('取消')}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="passowrd-mesg" v-if="handleType=='changePwd'">
            <el-form ref="form1" :model="form1" label-width="110" :rules="pwdrules">
                <el-form-item :label="$lang('新密码:')" prop="newPwd">
                    <el-input v-model="form1.newPwd" type="password" :placeholder="$lang('请输入新密码')"></el-input>
                </el-form-item>
                <el-form-item :label="$lang('确认新密码:')" prop="surePwd">
                    <el-input v-model="form1.surePwd" type="password" :placeholder="$lang('请再次输入新密码')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="11">
                        <el-button type="sure" class="fr" @click="modifyPwd">{{$lang('确定')}}</el-button>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-button type="cancle" class="fr" @click="handleType='index'">{{$lang('取消')}}</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
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
import VerifyCode from '@/components/VerifyCode'
import { AddChildB, GetChildListB, ChangeChildStateB, editChildB, resetChildPwd } from '@/apis/person'
import { uploadFile, deleteOssFile } from '@/apis/uploadFile'
import { getAllFile, deleteFileByParam, addFileList, addFile } from '@/apis/files'
export default {
    components: {
        VerifyCode
    },
    data() {
        return {
            loading: false,
            dialogVisible: false,
            nextTo: false,
            code: "",
            validCode: false,//手机验证状态
            options: [{ label: $lang("发包人员"), value: "1" }, { label: $lang("财务人员"), value: "2" }],
            tableData: [],//数据
            imageUrl: '',
            oldImageUrl: '',
            oldImageName: '',
            form: {},
            phoneCode: {},
            handleType: "index",
            editForm: {},
            rules: {
                nickName: [{ validator: this.validateNickName, trigger: 'blur' }],
                bUserType: [{ validator: this.validateBUserType, trigger: 'change' }],
                password: [{ validator: this.validatePwd, trigger: 'blur' }],
                password1: [{ validator: this.validateCheckpwd, trigger: 'blur' }]
            },
            form1: {

            },
            pwdrules: {
                newPwd: [{ validator: this.validatePwd, trigger: 'blur' }],
                surePwd: [{ validator: this.validateSurePwd, trigger: 'blur' }]
            }
        }
    },
    created() {
        this.getChildList();
    },
    methods: {
        validateNickName(rule, value, callback) {
            if (value === '' || value === undefined) {
                callback(new Error($lang('请输入昵称')));
            } else {
                callback();
            }
        },
        validateBUserType(rule, value, callback) {
            if (value === '' || value === undefined) {
                callback(new Error($lang('请选择账户类型')));
            } else {
                callback();
            }
        },
        validatePwd(rule, value, callback) {
            if (value === '' || value === undefined) {
                callback(new Error($lang('密码不能为空')));
            } else if (value.length < 6 || value.length > 12) {
                callback(new Error($lang('6-12个字符')));
            } else {
                callback();
            }
        },
        validateCheckpwd(rule, value, callback) {
            if (value === '' || value === undefined) {
                callback(new Error($lang('密码不能为空')));
            } else if (value !== this.form.password) {
                callback(new Error($lang('两次密码不一致')));
            } else {
                callback();
            }
        },
        validateSurePwd(rule, value, callback) {
            if (value === '' || value === undefined) {
                callback(new Error($lang('密码不能为空')));
            } else if (value !== this.form1.newPwd) {
                callback(new Error($lang('两次密码不一致')));
            } else {
                callback();
            }
        },
        async getChildList() {
            const res = await GetChildListB();
            if (res.success) {
                this.tableData = res.data;
                this.tableData.map((item) => {
                    item.bUserType = item.bUserType == "1" ? $lang("发包人员") : $lang("财务人员");
                    item.nickName = item.info ? item.info.nickName : "-";
                })
            } else {
                this.$message.error(res.msg)
            }
        },
        //改变子账户状态
        async handleChange(index, row) {
            const res = await ChangeChildStateB({ id: row.id })
            if (res.success) {
                this.$message.success($lang("操作成功！"));
                this.tableData[index].state = "" + (1 - parseFloat(row.state));
            } else {
                this.$message.error(res.msg);
            }
        },
        //打开新增页
        addChildTab() {
            this.handleType = 'add';
            this.form = {
                bUserType: ""
            };
            this.imageUrl = '';
            this.oldImageUrl = '';
            this.oldImageName = '';
        },
        //编辑子账户
        handleEdit(index, row) {
            this.handleType = 'edit';
            this.form = row;
            this.form.password = "";
            this.oldImageUrl = row.info.headUrl || "";
            this.oldImageName = row.info.headName || "";
            this.imageUrl = row.info.headUrl;
            this.validCode = true;
        },
        handleChangePwd(index, row) {
            this.handleType = "changePwd";
            this.form1 = Object.assign({}, row, {
                newPwd: "",
                surePwd: "",
            })
        },
        getData(data) {
            this.form.phone = data.phone;
            this.validCode = data.valid;
            this.phoneCode = {
                type: data.type,
                code: data.code,
            }
        },
        //添加或编辑子账户
        async doHandle() {
            this.loading = true;
            //新增
            if (this.handleType == 'add') {
                let param = {
                    nickName: this.form.nickName,
                    bUserType: this.form.bUserType,
                    password: this.form.password,
                    phone: this.form.phone,
                    phoneCode: this.phoneCode,
                }
                const res = await AddChildB(param);
                if (res.success) {
                    res.data.bUserType = res.data.bUserType == "1" ? $lang("发包人员") : $lang("财务人员");
                    this.oldImageUrl = res.data.info.headUrl;//默认头像
                    this.tableData.push(res.data);
                    this.form.id = res.data.id;
                    this.uploadHead();
                } else {
                    this.loading = false;
                    this.$message.error(res.msg);
                }
            }
            //编辑
            else if (this.handleType == 'edit') {
                let param = {
                    nickName: this.form.nickName,
                    id: this.form.id,
                    phone: this.form.phone,
                    phoneCode: this.phoneCode,
                }
                const res = await editChildB(param);
                this.loading = false;
                if (res.success) {
                    this.getChildList();
                    this.handleType = "index";
                    this.$message.success($lang("操作成功！"));
                } else {
                    this.$message.error(res.msg);
                }
            } else {
                let param = {
                    id: this.form1.id,
                    password: this.form1.newPwd,
                }
                const res = await resetChildPwd(param);
                this.loading = false;
                if (res.success) {
                    this.$message.success($lang("重置成功"));
                    this.handleType = 'index';
                } else {
                    this.$message.error(res.msg);
                }
            }
        },
        //点击保存按钮
        addChild() {
            this.$refs['form'].validate((valid) => {
                if (valid && this.validCode) {
                    this.doHandle();
                } else {
                    return false;
                }
            })
        },
        modifyPwd() {
            this.$refs['form1'].validate((valid) => {
                if (valid) {
                    this.doHandle();
                } else {
                    return false;
                }
            })
        },
        //图片改变的时候
        headChange(file) {
            const me = this;
            const fileName = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
            if (!(fileName == "jpg" || fileName == "bmp" || fileName == "png")) {
                this.$message($lang('只能上传jpg、png、bmp文件'));
                me.$refs.headImage.uploadFiles.pop();
                return
            }
            if (file.size > 10485760) {
                this.$message($lang('文件大小不能超过10M'));
                me.$refs.headImage.uploadFiles.pop();
                return
            }
            const reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = function (e) {
                me.imageUrl = e.target.result
            }
            if (me.handleType == 'edit') {
                me.uploadHead();
            }
        },
        //上传头像
        uploadHead() {
            const me = this;
            const headImage = me.$refs.headImage.uploadFiles;
            const id = this.form.id;
            if (headImage[0] && headImage[0].raw) {
                if (me.oldImageUrl) {
                    deleteFileByParam(id, "head");
                    deleteOssFile([`/user-info/${id}/head/${me.oldImageName}`]);
                }
                const file = headImage[headImage.length - 1].raw;
                uploadFile(file, `/user-info/${id}/head`).then(async function (data) {
                    const fileName = data.name.slice(data.name.lastIndexOf("/") + 1);
                    const addFileData = await addFile({
                        fileName: file.name,
                        alias: fileName,
                        findex: "head",
                        bindid: id,
                        url: data.url ? data.url : data.res.requestUrls[0].replace(/\?.*/gm, '')
                    });
                    me.loading = false;
                    if (addFileData.success) {
                        if (me.handleType == 'add') {
                            me.getChildList();
                            me.handleType = "index";
                        }
                        me.$message.success($lang("上传成功"));
                    } else {
                        me.$message.error(addFileData.msg)
                    }
                })
            } else {
                if (me.handleType == 'add') {
                    me.getChildList();
                    me.handleType = "index";
                    me.$message.success($lang("操作成功！"));
                    me.loading = false;
                }

            }
        },
        cancalEdit() {
            this.$router.push({ name: this.nextTo })
            this.dialogVisible = false;
        },
    },
    beforeRouteLeave(to, from, next) {
        next();
        // if (this.edit) {
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
}
</script>