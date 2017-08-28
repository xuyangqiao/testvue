<template>
  <!--s端 待审核-->
  <div class="content-wrapper">
    <div class="all-task-wrapper">
      <Ts-Info :title="$lang('任务详情')" :isZong="false" role="S"></Ts-Info>
  
      <!-- 如果任务是公开的。。那么 “allot-public” 显示。。如果是私密。。 这一块 隐藏-->
  
      <div class="all-task-other">
        <template>
          <el-table :data="list" stripe style="width: 100%">
  
            <el-table-column property="nickName" :label="$lang('企业')" width="480">
            </el-table-column>
            <el-table-column property="createTime" :label="$lang('日期')" width="280">
            </el-table-column>
            <el-table-column prop="state" :label="$lang('类型')" width="" >
              <template scope="scope">
                {{scope.row.state=="1"?"已报名":scope.row.state=="2"?"已退出":"--"}}
              </template>
            </el-table-column>
            <el-table-column prop="tag" :label="$lang('标签')" width="" >
              <template scope="scope">
                <el-tag :type="'success'">{{scope.row.lable}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </template>
  
      </div>
  
    </div>
  </div>
</template>
<script>
import TsInfo from '@/components/TsInfo'
import { SubentryList } from '@/apis/task'
export default {
  components: { TsInfo },
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    const id = this.$route.query.id;
    const res = await SubentryList(id);
    if (res.success) {
      console.log("报名列表",res)
      this.list = res.data.list;
      this.pagination = {
        currentPage: res.data.pageNum,
        pageSize: res.data.pageSize,
        total: res.data.total
      }
    }
  }
}
</script>