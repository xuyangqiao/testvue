<template>
    <div class="content-wrapper">
        <div class="check-accept-wrapper">
            <h3 class="main-title">预览</h3>
            <div style="width:960px;margin:auto;">
                <img :src="require('../../assets/images/logo.png')" height="28" />
                <img :src="require('../../assets/images/fullscreen.png')" height="28" style="float:right;cursor:pointer;" @click="fullScreen" />
            </div>
            <div>
                <iframe ref="demo" style="width: 960px; height: 642px; margin: 0 auto;display: block;" frameBorder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" v-if="iframeSrc" :src="iframeSrc" frameborder="0"></iframe>
            </div>
            <SlideBtns :type="'back'"></SlideBtns>
        </div>
    </div>
</template>

<script>
import { AccomplishTask, OverruleTask } from '@/apis/task'
import { getAllFile } from '@/apis/files'
import { client } from '@/apis/uploadFile'
import SlideBtns from '@/components/SlideBtns'
export default {
    components: { SlideBtns },
    data() {
        return {
            textarea: '',
            isReject: false,
            iframeSrc: ''
        };
    },
    methods: {
        fullScreen() {
            let iframe = this.$refs.demo;
            (iframe.requestFullScreen || iframe.webkitRequestFullScreen || iframe.mozRequestFullScreen).call(iframe);
        }
    },
    async mounted() {
        this.$route.query.id;

        let info = this.$route.query;

        if (!('fileVersion' in info)) {
            const fileData = await getAllFile('checked', getAllFile);
            info = (fileData.data || []).sort((a, b) => new Date(a.createTime) > new Date(b.createTime) ? -1 : 1)[0];
        }

        if (info) {
            if (info.url.includes('index.html')) {
                this.iframeSrc = info.url;
            } else {
                this.iframeSrc = `http://api.combo.xin/vsworkapi/preview.jsp?untityVersion=${info.fileVersion}&dataPath=${info.url}`;
            }
        } else {
            this.$message.warning('未找到文件');
        }
    }
}
</script>
