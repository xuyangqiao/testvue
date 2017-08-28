<template>
  <TInfo :onload="load">
    <div slot="footer" class="bt-dashed">
      <div class="set-btn-wrap" v-show="visible">
        <el-button type="sure" @click="onPass">{{$lang('通过')}}</el-button>
        <el-button type="danger" @click="visible=false">{{$lang('驳回')}}</el-button>
      </div>
      <div class="reject-wrap" v-show="!visible">
        <el-input type="textarea" :rows="5" :placeholder="$lang('请输入内容')" v-model="remark"></el-input>
        <div class="set-btn-right">
          <el-button type="sure" @click="onReject">{{$lang('提交')}}</el-button>
          <el-button type="danger" @click="visible=true">{{$lang('取消')}}</el-button>
        </div>
      </div>
    </div>
  </TInfo>
</template>
<script>
import TInfo from '@/components/TInfo'
import { TaskPass, TaskReject } from '@/apis/task'
export default {
  components: { TInfo },
  data() {
    return {
      visible: true,
      remark: "",
    }
  },
  methods: {
    load(data, file) {
    },
    async onPass() {
      const id = this.$route.query.id;
      const res = await TaskPass(id);
      this.$message({
        message: res.msg || $lang('通过成功'),
        type: res.success ? 'success' : 'error',
        onClose: () => {
          if (res.success) {
            this.$router.push({ name: "S_CreateTask", query: { id }, params: {maxTotal:res.data.total || -1 } })
          }
        }
      });
    },
    async onReject() {
      const id = this.$route.query.id;
      if (!this.remark) {
        this.$message.warning($lang("请填写驳回原因"))
        return;
      }
      const res = await TaskReject(id, this.remark);
      this.$message({
        message: res.msg || $lang('驳回成功'),
        type: res.success ? 'success' : 'error',
        onClose: () => {
          if (res.success) {
            this.$router.push({ name: "S_list", query: { id } })
          }
        }
      });
    }
  }
}
</script>
