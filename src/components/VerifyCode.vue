<template>
    <div :class="parentClass">
        <el-form ref="form"  :model="form" :label-width="labelWidth" :rules="rules">   
            <el-form-item prop="myphone" label=" " required>
                <el-input :placeholder="$lang('输入手机号码')" v-model="form.myphone" @blur="checkCallBack"></el-input>
            </el-form-item>
            <el-form-item prop="imgCode" label=" " required>
                <el-col :span="15" >
                    <el-input :placeholder="$lang('图片验证码')" v-model="form.imgCode" @blur="checkCallBack"></el-input>
                </el-col>
                <el-col :span="9">
                    <div class="vcode-wrap">
                      <canvas id="imgCode" width="95" height="36" @click="drawPic"></canvas>
                      <!-- <a href="javascript:;" @click="drawPic"></a> -->
                    </div>
                </el-col>
            </el-form-item>
            <el-form-item class="tel-vcode" prop="mycode" label=" " required>
                <el-input :placeholder="$lang('请输入短信验证码')" v-model="form.mycode" @blur="checkCallBack"></el-input>
                <el-button type="text" :disabled="!form.myphone||!form.imgCode||disabled || time > 0" @click="send">{{msg}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { ImgageCode, PhoneCode } from "@/apis";
export default {
  created() {
    this.drawPic();
  },
  props: {
    phone: String,
    code: String,
    parentClass: String,
    getData: Function,
    type: String,
    labelWidth: {
      default: 0
    }
  },
  data() {
    return {
      form: {
        myphone: this.phone,
        imgCode: "",
        mycode: this.code
      },
      sessionId: "",
      picCode: "", //后端返回图形验证码
      disabled: false,
      second: 60,
      time: 0,
      rules: {
        mycode: [{ validator: this.validateCode, trigger: "blur" }],
        imgCode: [{ validator: this.validateImgCode, trigger: "blur" }],
        myphone: [{ validator: this.validatePhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    validateCode(rule, value, callback) {
      if (value === "") {
        callback(new Error($lang("请输入短信验证码")));
      } else if (value.length !== 6) {
        callback(new Error($lang("验证码为6位")));
      } else {
        callback();
      }
    },
    validateImgCode(rule, value, callback) {
      if (value === "") {
        callback(new Error($lang("请输入图形验证码")));
      } else if (value.length !== 6) {
        callback(new Error($lang("验证码为6位")));
      } else {
        callback();
      }
    },
    validatePhone(rule, value, callback) {
      if (value === "") {
        callback(new Error($lang("手机号码不能为空")));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error($lang("请输入正确的手机号码")));
      } else {
        callback();
      }
    },
    checkCallBack() {
      let param = {
        phone: this.form.myphone,
        type: this.type,
        imgCode: this.form.imgCode
      };
      if (param.phone !== "" && param.type !== "" && param.imgCode !== "") {
        this.$refs["form"].validate(valid => {
          this.getData({
            phone: param.phone,
            code: this.form.mycode,
            type: this.type,
            valid: valid
          });
        });
      }
    },
    clear(code) {
      if (code == "1005" || code == "1007" || code == "1006") {
        this.form.mycode = "";
      } else {
        this.form = {
          myphone: "",
          imgCode: "",
          mycode: ""
        };
        this.drawPic();
        this.time = 0;
      }
    },
    async send() {
      this.disabled = true;
      let param = {
        phone: this.form.myphone,
        type: this.type,
        sessionId: this.sessionId,
        imgCode: this.form.imgCode
      };
      const res = await PhoneCode(param);
      if (res.success) {
        setTimeout(this.sended, 1000);
      } else {
        this.drawPic();
        this.time = 0;
        this.form.imgCode = "";
        this.disabled = false;
        this.$message.error(res.msg);
      }
      this.checkCallBack();
    },
    sended() {
      this.disabled = false;
      this.run();
    },
    run() {
      this.time = this.second;
      this.timer();
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomColor(min, max) {
      var _r = this.randomNum(min, max);
      var _g = this.randomNum(min, max);
      var _b = this.randomNum(min, max);
      return "rgb(" + _r + "," + _g + "," + _b + ")";
    },
    async drawPic() {
      const res = await ImgageCode(this.type);
      if (res.success) {
        this.picCode = res.data.imgCode.code;
        this.sessionId = res.data.sessionId;
      } else {
        this.$message.error(res.msg);
      }
      let $canvas = document.getElementById("imgCode");
      let ctx = $canvas.getContext("2d");
      let _picTxt = "";
      let _str = this.picCode; //后端返回code
      let _width = $canvas.width;
      let _height = $canvas.height;
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, _width, _height);
      for (let i = 0; i < 6; i++) {
        let x = (_width - 10) / 6 * i + 10;
        let y = this.randomNum(_height / 2, _height);
        let txt = _str[i];
        _picTxt += txt;
        ctx.fillStyle = "red";
        ctx.font = "18px Verdana";
        ctx.translate(x, y);
        ctx.fillText(txt, 0, 0);
        ctx.translate(-x, -y);
      }
      return _picTxt;
    }
  },
  computed: {
    msg: function() {
      return this.time > 0 ? this.time + "s 后重新获取" : "获取验证码";
    }
  }
};
</script>