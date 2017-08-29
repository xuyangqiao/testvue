<template>
    <div class="content-wrapper">
        <div class="check-accept-wrapper">
            <h3 class="main-title">{{$lang('验收预览')}}</h3>
            <div style="width:960px;margin:auto;">
                <img :src="require('../../assets/images/logo.png')" height="28" />
                <img :src="require('../../assets/images/fullscreen.png')" height="28" style="float:right;cursor:pointer;" @click="fullScreen" />
            </div>
            <div>
                <iframe style="width: 960px; height: 642px; margin: 0 auto;display: block;" frameBorder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" v-if="iframeSrc" :src="iframeSrc" frameborder="0"></iframe>
            </div>
            <div class="set-btn-wrap">
                <el-button type="sure" @click='toPass'>{{$lang('通过')}}</el-button>
                <el-button type="danger" @click='isReject=true'>{{$lang('驳回')}}</el-button>
            </div>
            <div class="reject-wrap" v-show="isReject">
                <el-input type="textarea" :rows="5" :placeholder="$lang('请输入内容')" v-model="textarea"></el-input>
                <div class="set-btn-right">
                    <el-button type="sure" @click='toReject'>{{$lang('提交')}}</el-button>
                    <el-button type="danger" @click='isReject=false'>{{$lang('取消')}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AccomplishTask, OverruleTask } from '@/apis/task'
import { getAllFile } from '@/apis/files'
import { client } from '@/apis/uploadFile'

export default {
    data() {
        return {
            textarea: '',
            isReject: false,
            iframeSrc: ''
        };
    },
    async mounted() {
        const me = this;
        const id = me.$route.query.id;
        const fileData = await getAllFile('checked', getAllFile);

        let info = (fileData.data || []).sort((a, b) => new Date(a.createTime) > new Date(b.createTime) ? -1 : 1)[0];

        if (info) {
            this.iframeSrc = `http://api.combo.xin/vsworkapi/preview.jsp?fileVersion=${info.fileVersion}&dataPath=${info.url}`;
        } else {
            this.$message.warning($lang('未找到文件'));
        }

        //            console.log(fileData);
        //             const dir = 'task/' + id + '/';
        //             client.then(oss => {
        //                 oss.list({
        //                     prefix: dir,
        //                     delimiter: '/'
        //                 }).then(data => {
        //                     let checkedData = [];
        //                     if (!data.prefixes || data.prefixes.length == 0) {
        //                         me.$message('未找到文件')
        //                     } else {
        //                         var maxIndex = -1;
        //                         var maxValue = -1;
        //                         data.prefixes.map(item => {
        //                             var arr = item.split('/');
        //                             var v = arr[arr.length - 2] && parseInt(arr[arr.length - 2]);
        //                             if (v) {
        //                                 checkedData.push(item);
        //                                 if(maxValue < v){
        //                                     maxValue = v;
        //                                     maxIndex = checkedData.length - 1
        //                                 }
        //                             }
        //                         });
        // //                    if(data.prefixes && data.prefixes.length > 0){
        //                         if(maxIndex == -1){
        //                             me.$message('未找到文件');
        //                             return
        //                         }
        //                         const lastDir = checkedData[maxIndex] + 'index.html';
        //                         fileData.data.map(item => {
        //                             if (item.url.indexOf(lastDir) != -1 && me.iframeSrc == "") {
        //                                 me.iframeSrc = item.url;
        //                             }
        //                         })
        // //                    }
        //                     }
        //                 })
        //             })
    },
    methods: {
        async toPass() {
            const id = this.$route.query.id;
            const res = await AccomplishTask(id);
            this.$message({
                message: res.msg,
                type: res.success ? 'success' : 'error',
                onClose: () => {
                    if (res.success) {
                        this.$router.go(-1)
                    }
                }
            });
        },
        async toReject() {
            const id = this.$route.query.id;
            if (!this.textarea) {
                this.$message.warning($lang("驳回内容不可为空"));
                return;
            }
            const res = await OverruleTask(id, this.textarea);
            this.$message({
                message: res.msg,
                type: res.success ? 'success' : 'error',
                onClose: () => {
                    if (res.success) {
                        this.$router.go(-1)
                    }
                }
            });
        },
        fullScreen() {
            let iframe = this.$refs.demo;
            (iframe.requestFullScreen || iframe.webkitRequestFullScreen || iframe.mozRequestFullScreen).call(iframe);
        }
    }
}
</script>
