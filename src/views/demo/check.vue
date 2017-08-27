<template>
  <div class="content-wrapper">
    <div class="check-accept-wrapper">
       <h3 class="main-title">验收预览</h3>
       <div class="ca-img-wrap">
           <img src="../assets/images/ys.jpg"/>
       </div>
       <div class="set-btn-wrap">
           <el-button type="sure">通过</el-button>
           <el-button type="danger">驳回</el-button>
       </div>
       <div class="reject-wrap">
           <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
            <div class="set-btn-right">
                <el-button type="sure">提交</el-button>
                <el-button type="danger">取消</el-button>
            </div>
       </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        textarea: ''
      };
    }
  }
</script>