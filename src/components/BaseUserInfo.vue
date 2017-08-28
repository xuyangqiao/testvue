<template>
    <div>
        <!-- 基本信息-展示  -->
        <div class="base-account-show" v-if="!edit">
            <div class="bus-account-show">
                <div class="base-img-wrap">
                    <img :src='oldImageUrl'/>
                </div>
                <p>{{$lang('昵称：')}}{{form.nickName}}</p>
                <p>{{$lang('联系方式：')}}{{form.contact}}</p>
                <p>{{userType == "B" ? '企业介绍：' : '个人介绍：'}}</p>
                <p>{{form.profile}}</p>
                <el-button type="text" icon="edit" class="edit" @click="editBaseInfo" v-if="hasEdit">{{$lang('编辑')}}</el-button>
            </div>
        </div>
        <!-- 基本信息-编辑 -->
        <div class="add-sun-cont" v-if="edit" v-loading="loading">
            <div class="base-info-edit">
                <div class="up-load-hd-img">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        ref="headImage"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="headChange">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="el-upload__tip" slot="tip">{{$lang('更换头像（支持10M以下的jpg、png、BMP文件）')}}</div>
                </div>
                <el-form ref="form" :model="form1" label-width="0" :rules="rules">
                    <el-form-item>
                        <el-input v-model="form1.nickName" :placeholder="$lang('请输入姓名')"></el-input>
                    </el-form-item>
                    <VerifyCode :phone="form1.contact" :code="form1.code" :parentClass="'add-sun-cont'" :type="'baseInfo'" :getData="getData"></VerifyCode>
                    <el-form-item>
                        <el-input type="textarea" :placeholder="userType == 'B' ? '请输入企业介绍：' : '请输入个人介绍'" v-model="form1.profile"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-button type="sure" class="fr" @click="save" :disabled="!validCode">{{$lang('提交')}}</el-button>
                        </el-col>
                        <el-col :span="11" :offset="2">
                            <el-button type="cancle" class="fr" @click="edit=false">{{$lang('取消')}}</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import VerifyCode from '@/components/VerifyCode'
    import {UpdateInfoV, CheckUserInfoV} from '@/apis/person'
    import {isLogin, getUser,getUserInfo} from '@/apis/storage'
    import {getAllFile, deleteFileByParam, addFileList, addFile} from '@/apis/files'
    import {uploadFile, deleteOssFile} from '@/apis/uploadFile'
    export default{
        components: {
            VerifyCode
        },
        props: {
            userId: String,
            hasEdit: {type: Boolean, default: false},
        },
        data() {
            return {
                loading:false,
                code: "",
                edit: false,
                userType: "B",
                form: {},
                form1: {
                    contact: ""||getUser().phone,
                    code: ""
                },
                imageUrl: '',
                oldImageUrl: '',
                oldImageName: '',
                validCode:false,
                rules:{
                }
            }
        },
        created(){
            this.userType=this.$route.name[0]||"B"
            this.getBaseInfo();
        },
        methods: {
            async getBaseInfo(){
                const me = this;
                let userInfo={};
                if(this.userId==getUser().userId){
                    userInfo=getUserInfo();
                }else{
                    const res = await CheckUserInfoV({userId: this.userId || ""});
                    if (res.success) {
                        userInfo= res.data;
                    }else {
                        this.$message.error(res.msg)
                    }
                }
                me.form = {
                    nickName: userInfo.nickName,
                    contact: userInfo.contact,
                    profile: userInfo.profile,
                    userId: userInfo.userId,
                    id:userInfo.id
                }
                me.oldImageUrl = userInfo.headUrl;
                me.oldImageName = userInfo.headName;
            },
            //点击“编辑”
            editBaseInfo(){
                this.edit = true;
                this.form1 = Object.assign({}, this.form);
                this.imageUrl = this.oldImageUrl;
            },
            //图片改变的时候
            headChange(file){
                const me = this;
                const fileName = file.name.slice(file.name.lastIndexOf(".")+1).toLowerCase();
                if(!(fileName == "jpg" || fileName == "bmp" || fileName == "png")){
                    this.$message($lang('只能上传jpg、png、bmp文件'));
                    me.$refs.headImage.uploadFiles.pop();
                    return
                }
                if(file.size > 10485760){
                    this.$message($lang('文件大小不能超过10M'));
                    me.$refs.headImage.uploadFiles.pop();
                    return
                }
                const reader = new FileReader();
                reader.readAsDataURL(file.raw);
                reader.onload = function (e) {
                    me.imageUrl = e.target.result
                }
                const headImage = me.$refs.headImage.uploadFiles;
                const id = getUser().userId;
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
                        if (addFileData.success) {
                            me.oldImageUrl = addFileData.data.url;
                            me.oldImageName = addFileData.data.fileName;
                            me.imageUrl = addFileData.data.url;
                            const UserInfo = getUserInfo();
                            UserInfo.headUrl = addFileData.data.url;
                            UserInfo.headName = addFileData.data.fileName;
                            sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo));
                        }else{
                            this.$message.error(addFileData.msg)
                        }
                    })
                }
            },
            save(){
                const me=this;
                this.$refs['form'].validate((valid)=>{
                    if(valid&&me.validCode){
                        this.loading=true;
                        this.doSave()
                    }else{
                        return false
                    }
                })
            },
            //保存修改
            async doSave(){
                const me = this;
                delete this.form1.code;
                const res = await UpdateInfoV(this.form1);
                this.loading=false;
                if (res.success) {
                    this.$message.success($lang("操作成功！"))
                    sessionStorage.setItem("UserInfo", JSON.stringify(res.data));
                    me.$router.go(0);
                } else {
                  this.$message.error(res.msg)
                }
            },
            getData(data){
                this.form1.contact = data.phone
                this.validCode=data.valid
            }
        }
    }
</script>
