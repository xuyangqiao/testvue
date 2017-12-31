<template>
    <div class="content-wrapper">
        <div class="check-accept-wrapper">
            <h3 class="main-title">{{$lang('预览')}}</h3>
            <div>
                <iframe ref="demo" style="width: 960px; height: 642px; margin: 0 auto;display: block;" frameBorder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" v-if="iframeSrc" :src="iframeSrc" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
            </div>
            <SlideBtns :type="'back'"></SlideBtns>
        </div>
    </div>
</template>

<script>
import { AccomplishTask, OverruleTask } from "@/apis/task";
import { getAllFile } from "@/apis/files";
import { client } from "@/apis/uploadFile";
import SlideBtns from "@/components/SlideBtns";
export default {
  components: { SlideBtns },
  data() {
    return {
      textarea: "",
      isReject: false,
      iframeSrc: ""
    };
  },
  methods: {
    fullScreen() {
      let iframe = this.$refs.demo;
      (iframe.requestFullScreen ||
        iframe.webkitRequestFullScreen ||
        iframe.mozRequestFullScreen
      ).call(iframe);
    }
  },
  async mounted() {
    let info = this.$route.query;

    if (!("fileVersion" in info)) {
      const fileData = await getAllFile("checked", this.$route.query.id);
      info = (fileData.data || []).sort(
        (a, b) => (new Date(a.createTime) > new Date(b.createTime) ? -1 : 1)
      )[0];
    }

    if (info) {
      if (info.url.includes("index.html") || info.fileVersion == "__path__") {
        this.iframeSrc = info.url;
      } else {
        this.iframeSrc = `http://vsdata.oss-cn-hangzhou.aliyuncs.com/untity/${info.fileVersion}/index.html?vsdata=${info.url}`;
      }
    } else {
      this.$message.warning($lang("未找到文件"));
    }
  }
};
</script>
