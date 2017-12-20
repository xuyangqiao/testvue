<template>
  <!--s端 待审核-->
  <div class="content-wrapper">
    <div class="all-task-wrapper">
      <Ts-Info :title="$lang('任务详情')" :isZong="false" role="S" ref="tsInfo"></Ts-Info>

      <!-- 如果任务是公开的。。那么 “allot-public” 显示。。如果是私密。。 这一块 隐藏-->

      <div class="serarch-diy">
        <el-input :placeholder="$lang('搜索用户或者用户标签')" v-model="seekValue">
          <el-button slot="prepend" icon="search"></el-button>
          <el-button slot="append" type="sure" @click="queryType(this.type)">{{$lang('搜索')}}</el-button>
        </el-input>
      </div>

      <div class="allot-public">
        <div class="userinfo-nav">
          <el-button :type="type==1?'sure':'text'" @click="queryType(1)">{{$lang('已报名列表')}}</el-button>
          <el-button :type="type==2?'sure':'text'" @click="queryType(2)">{{$lang('所有v端列表')}}</el-button>
        </div>
      </div>

      <div class="allot-chose-wrap">
        <template>
          <el-table ref="singleTable" :data="vlist" highlight-current-row @current-change="handleCurrentRowChange" style="width: 100%">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column :label="$lang('昵称')">
              <template scope="scope">
                <!-- <span @click="toVUser(scope.row)"></span> -->
                <router-link style="cursor:pointer;" :to="{ name: 'S-VuserInfo', query: { userId: scope.row.userid } }" target="_blank">{{scope.row.nickName}}</router-link>
              </template>
            </el-table-column>
            <el-table-column property="createTime" :label="$lang('注册时间')">
            </el-table-column>
            <el-table-column prop="tag" :label="$lang('标签')">
              <template scope="scope">
                <el-tag :type="'success'">{{scope.row.label}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column property="remarkName" :label="$lang('备注')"/>
          </el-table>
        </template>
        <div class="page-wrap clearfix">
          <div class="fr">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[4,8,12,16]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
            </el-pagination>
          </div>
        </div>
      </div>

      <div class="set-btn-wrap">
        <el-button type="sure" @click="toSubmit">{{$lang('确认选择')}}</el-button>
        <el-button type="sure" @click="$router.push({name:'S_toBaoMing',query:{id:$refs.tsInfo.form.id}})">{{$lang('查看报名')}}</el-button>
        <el-button type="sure" @click="$router.push({name:'toEdit',query:{id:$refs.tsInfo.form.taskId}})">{{$lang('编辑总任务')}}</el-button>
        <!-- <el-button type="sure" @click="openApplyRefund" v-if="$refs.tsInfo&&['4','5'].includes($refs.tsInfo.form.state)">{{$lang('申请退款')}}</el-button> -->
      </div>

    </div>

    <el-dialog :title="$lang('申请退款')" size="tiny" :visible.sync="dialog.applyRefund.show">
      <el-form>
        <el-form-item :label="$lang('退款原因：')">
          <el-input type="textarea" :rows="4" v-model.trim="dialog.applyRefund.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="applyRefund">{{$lang('确 定')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="$lang('用户信息')" size="large" :visible.sync="dialog.info.show">
      <v-user-info :id="dialog.info.id" />
    </el-dialog>

  </div>
</template>

<script>
import TsInfo from "@/components/TsInfo";
import VUserInfo from "./VUserInfo";
import { UserList } from "@/apis/person";
import {
  SubentrySignUp,
  SubentryList,
  AssignedTask,
  applyRefund
} from "@/apis/task";
export default {
  components: { TsInfo, VUserInfo },
  data() {
    return {
      vlist: [],
      currentRow: null,
      seekValue: "",
      type: 1,
      pagination: {
        currentPage: 1,
        pageSize: 12,
        total: 0
      },
      dialog: {
        applyRefund: {
          show: false,
          form: {
            reason: ""
          }
        },
        info: {
          show: false,
          id: ""
        }
      }
    };
  },
  async mounted() {
    this.queryType(this.type);
  },
  methods: {
    async toSubmit() {
      const id = this.$route.query.id;
      const { userid } = this.currentRow;
      const res = await AssignedTask(id, userid, this.$route.query.state || 4);
      this.$message({
        message: res.msg,
        type: res.success ? "success" : "error",
        onClose: () => {
          if (res.success) {
            // this.stageTasks.push(res.data)
            this.$router.go(-1);
          }
        }
      });
    },
    queryType(type) {
      this.type = type || this.type;
      if (this.type == 1) {
        this.querySubentrySignUp(this.$route.query.id);
      } else {
        this.queryUserList();
      }
    },
    async queryUserList() {
      const { pageSize, currentPage } = this.pagination;
      console.log(pageSize, currentPage);
      const res = await UserList({
        userType: "V",
        seekValue: this.seekValue,
        page: currentPage,
        row: pageSize
      });
      if (res.success) {
        this.vlist = res.data.list.map(item => {
          return {
            nickName: item.nickName,
            createTime: item.createTime,
            userid: item.id,
            label: item.lable,
            remarkName: item.remarkName
          };
        });
        this.pagination = {
          currentPage: res.data.pageNum,
          pageSize: res.data.pageSize,
          total: res.data.total
        };
      }
    },
    async querySubentrySignUp(id) {
      const { pageSize, currentPage } = this.pagination;
      const res = await SubentryList(
        id,
        this.seekValue,
        1,
        currentPage,
        pageSize
      );
      console.log("............", res);
      if (res.success) {
        this.vlist = res.data.list.map(item => {
          return {
            nickName: item.nickName,
            createTime: item.createTime,
            userid: item.vUserId,
            label: item.lable
          };
        });
        this.pagination = {
          currentPage: res.data.pageNum,
          pageSize: res.data.pageSize,
          total: res.data.total
        };
      }
    },
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.currentPage = 1;
      if (this.type == 1) {
        this.querySubentrySignUp(this.$route.query.id);
      } else {
        this.queryUserList();
      }
    },
    handleCurrentChange(pageNum) {
      this.pagination.currentPage = pageNum;
      this.currentRow = pageNum;
      if (this.type == 1) {
        this.querySubentrySignUp(this.$route.query.id);
      } else {
        this.queryUserList();
      }
    },
    handleCurrentRowChange(row) {
      this.currentRow = row;
    },
    toVUser(data) {
      data.userid &&
        this.$router.push({
          name: "S-VuserInfo",
          query: { userId: data.userid }
        });
      // if (data.userid) {
      //   this.dialog.info.id = data.userid;
      //   this.dialog.info.show = true;
      // }
    },
    openApplyRefund() {
      this.dialog.applyRefund.reason = "";
      this.dialog.applyRefund.show = true;
    },
    async applyRefund() {
      if (this.dialog.applyRefund.reason) {
        const res = await applyRefund(
          this.$route.query.id,
          this.dialog.applyRefund.reason
        );
        if (res.success) {
          this.$message.success($lang("申请成功"));
          this.$router.reload();
          this.dialog.applyRefund.show = false;
        } else {
          this.$message.error(res.msg);
        }
      } else {
        this.$message.warning($lang("请填写退款原因"));
      }
    }
  }
};
</script>

<style>
.el-table__body tr.current-row > td {
  color: #ffffff;
  background-color: #1f2e65 !important;
}
</style>
