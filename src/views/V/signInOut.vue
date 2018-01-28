<template>
  <!--s端 待审核-->
  <div class="content-wrapper">
    <div class="all-task-wrapper">
      <TInfo :title="$lang('任务详情')" :onload="onTaskLoad" :isZong="false" role="V" :stateName="stateName" @loaded="loaded=true">
        <div slot="footer" class="bt-dashed" v-if="loaded">
          <div class="set-btn-wrap bt-dashed">
            <el-button type="cancel" v-if="isTimeout">{{isBM?"退出时间已经截止":"报名时间已经截止"}}</el-button>
            <el-button type="sure" @click="toSubmit" v-else>{{isBM?"退出":"报名"}}</el-button>
          </div>
        </div>
      </TInfo>
    </div>
  </div>
</template>
<script>
import TInfo from "@/components/TInfo";
import {
  SubentryCheckSign,
  SubentrySignUp,
  SubentrySignOff
} from "@/apis/task";
import { getUser, getUserInfo } from "@/apis/storage";
import { CheckUserInfoV } from "@/apis/person";
export default {
  components: { TInfo },
  async beforeRouteEnter(to, from, next) {
    if (getUser().applyState !== "2") {
      const res = await CheckUserInfoV({ userId: getUser().userId || "" });
      if (res.success) {
        if (res.data.applyState == "2") {
          localStorage.setItem("UserInfo", JSON.stringify(res.data));
          next(vm => (vm.userInfo = res.data));
        } else {
          next(vm => {
            vm.$message($lang("用户还未认证,请进行认证"));
            vm.$router.push({
              name: "V-userInfo-identify",
              query: { userId: getUser().userId || "" }
            });
          });
        }
      }
    } else {
      next();
    }
  },
  data() {
    return {
      isBM: false,
      id: "",
      stateName: "",
      isTimeout: true,
      userInfo: {},
      loaded: false
    };
  },
  async mounted() {
    const id = this.$route.query.id;
    const res = await SubentryCheckSign(id);
    console.log("判断是否报名", res);
    // this.id=res.data.id;
    if (res.msg == "已经报名") {
      this.id = res.data.id;
      this.isBM = true;
    } else {
      this.isBM = false;
    }
    this.stateName = res.msg;
  },
  methods: {
    onTaskLoad(taskInfo) {
      //报名
      if (
        Date.now() < new Date(taskInfo.entryEndTime) &&
        Date.now() < new Date(taskInfo.taskEndTime)
      ) {
        this.isTimeout = false;
      }
    },
    toSubmit() {
      if (this.isBM) {
        this.toTuichu();
      } else {
        if (this.userInfo.fullState != "1") {
          this.$message.warning($lang("信息未完善"));
        } else {
          this.toBaoming();
        }
      }
    },
    async toBaoming() {
      const id = this.$route.query.id;
      const res = await SubentrySignUp(id);
      this.$message({
        message: res.msg || $lang("报名失败"),
        type: res.success ? "success" : "error",
        onClose: () => {
          if (res.success) {
            this.$router.push({ name: "V_TaskList" });
          }
        }
      });
    },
    async toTuichu() {
      this.$alert(
        $lang("退出报名5次，将影响您的信誉，确定退出报名吗?"),
        $lang("退出"),
        {
          confirmButtonText: $lang("确定"),
          callback: action => {
            const id = this.$route.query.id;
            const res = SubentrySignOff(this.id).then(res => {
              this.$message({
                message: res.msg || $lang("退出报名成功"),
                type: res.success ? "success" : "error",
                onClose: () => {
                  if (res.success) {
                    this.$router.push({ name: "V_TaskList" });
                  }
                }
              });
            });
          }
        }
      );
    }
  }
};
</script>