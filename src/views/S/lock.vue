<template>
  <TInfo :onload="load">
    <div slot="footer" class="set-btn-wrap bt-dashed">
      <el-button type="sure" @click="onLock">锁定</el-button>
    </div>
  </TInfo>
</template>
<script>
import TInfo from '@/components/TInfo'
import { TaskLock } from '@/apis/task'
export default {
  components: { TInfo },
  data() {
    return {
      User: {
        name: "",
        url: ""
      }
    }
  },
  methods: {
    load(data, file) {
    },
    async onLock() {
      const id = this.$route.query.id;
      const res = await TaskLock(id);
      this.$message({
        message: res.msg || '成功锁定',
        type: res.success ? 'success' : 'error',
        onClose: () => {
          if (res.success) {
            this.$router.push({ name: "S_ToExamine", query: { id } })
          }
        }
      });
    }
  }
}
</script>

