<template>
  <TInfo class="toedit" :tid="$route.query.taskId" :onload="onTInfoLoad">
    <div slot="footer" class="bt-dashed">
      <div class="set-btn-wrap bt-dashed" style='text-align: left;'>
        <el-button type="sure" @click="dialogVisible=true">{{$lang('修改价格')}}</el-button>
        <el-button type="success" @click="toRedirectCreate">{{$lang('创建子任务')}}</el-button>
      </div>

      <div class="">
        <ul class="">
          <li class="allot-task-li clearfix" v-for="(item,i) in list" :key="i">
            <p>{{$lang('任务名称：')}}{{item.projectName}}</p>
            <p>{{$lang('任务出价：')}}{{item.total}}</p>
            <p>{{$lang('任务状态：')}}{{stateName(item.state)}}</p>
            <p style="width:270px;">
              <span>{{$lang('截止时间：')}}</span>
              <el-date-picker type="date" placeholder="请选择日期" v-model="item.entryEndTime" @change="item._entryEndTime=item.entryEndTime,UpdateTime(item,$event)"></el-date-picker>
            </p>
            <!--<p v-if="item.total">总占比例：{{(item.total/total*100).toFixed(2)}}%</p>-->
            <el-button type="sure" @click="toRedirectEdit(item.id)" v-if="item.state<3">{{$lang('编辑')}}</el-button>
            <el-button type="cancle" @click="toDelete(item.id)" v-if="['0','1','2','3'].includes(item.state)">{{$lang('删除')}}</el-button>
            <el-button type="text" v-if="+item.state==2" style="color:#ff4949">{{stateName(item.state)}}</el-button>
            <el-button type="success" v-if="item.state=='4'" @click="toDispatch(item.id)">{{$lang('分配')}}</el-button>
            <el-button type="warning" v-if="item.state=='4'" @click="toLookBM(item.id)">{{$lang('查看报名')}}</el-button>
          </li>
        </ul>
      </div>
      <el-dialog :title="$lang('修改价格')" :visible.sync="dialogVisible" size="tiny">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item :label="$lang('意向出价:')">
            <el-col :span="11">
              <el-select v-model="form.totalType" :placeholder="$lang('请选择')">
                <el-option :label="$lang('询价')" value="1"></el-option>
                <el-option :label="$lang('定价')" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="11" :push="2" v-show="form.totalType==1 ? 0 : 1">
              <el-input v-model="form.total"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{$lang('取 消')}}</el-button>
          <el-button type="primary" @click="updatePrice">{{$lang('确 定')}}</el-button>
        </span>
      </el-dialog>
      <!--<div class="set-btn-wrap bt-dashed">
                             <el-button type="sure" @click="toRedirectCreate">{{$lang('确认')}}</el-button>
                          </div>-->
    </div>
  </TInfo>
</template>
<style>
.toedit .allot-task-li .el-button {
  width: auto;
}
.toedit .el-date-editor > i {
  display: none;
}
.toedit .allot-task-li {
  align-items: center;
  display: inline-flex;
}
</style>
<script>
import TInfo from "@/components/TInfo";
import {
  ChildTaskList,
  DeleteTaskInfo,
  ChildTaskState,
  UpdateTotal,
  UpdateTime
} from "@/apis/task";
export default {
  components: { TInfo },
  data() {
    return {
      dialogVisible: false,
      list: [],
      form: {
        totalType: "",
        total: ""
      }
    };
  },
  methods: {
    updatePrice() {
      const id = this.$route.query.id;
      const { totalType, total } = this.form;
      UpdateTotal({ id, totalType, total }).then(res => {
        this.$message({
          message: res.msg || $lang("价格修改成功"),
          type: res.success ? "success" : "error",
          onClose: () => {
            if (res.success) {
              this.dialogVisible = false;
              this.$router.go(0);
            }
          }
        });
      });
    },
    toChatT() {
      const id = this.$route.query.id;
      this.$router.push({ name: "S_ChatT", query: { id: id } });
    },
    stateName(state) {
      return ChildTaskState("S", state);
    },
    toDispatch(id) {
      this.$router.push({ name: "toFenPei", query: { id: id } });
    },
    toLookBM(id) {
      this.$router.push({ name: "S_toBaoMing", query: { id: id } });
    },
    toRedirectCreate() {
      const id = this.$route.query.taskId || this.$route.query.id;
      let maxTotal = -1;
      if (this.form.totalType == 1) {
        maxTotal = this.form.total;
        for (let i = 0, l = this.list.length; i < l; i++) {
          maxTotal -= this.list.total;
        }
      }
      this.$router.push({
        name: "S_CreateTask",
        query: { id: id },
        params: { maxTotal }
      });
    },
    toRedirectEdit(childid) {
      const id = this.$route.query.taskId || this.$route.query.id;
      this.$router.push({ name: "S_CreateTask", query: { id, childid } });
    },
    async toDelete(id) {
      const res = await DeleteTaskInfo(id);
      this.$message({
        message: res.msg || $lang("删除成功"),
        type: res.success ? "success" : "error",
        onClose: () => {
          if (res.success) {
            this.$router.go(0);
          }
        }
      });
    },
    onTInfoLoad(data) {
      this.form.totalType = data.totalType;
      this.form.total = data.total;
    },
    async UpdateTime(task, entryEndTime) {
      console.log(task);
      const res = await UpdateTime(task.id, entryEndTime + " 00:00:00");
      if (res.success) {
        this.$message($lang("修改成功"));
      } else {
        task.entryEndTime = task._entryEndTime;
      }
    }
  },
  async mounted() {
    const id = this.$route.query.taskId || this.$route.query.id;
    const res = await ChildTaskList(id);

    if (res.success) {
      this.list = res.data ? res.data : [];
    } else {
      console.log("error", res.msg);
      this.$message.warning(res.msg);
    }
  }
};
</script>
