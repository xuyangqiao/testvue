<template>
  <div id="app">
    <div class="header-wrapper" style="display:block;">
      <router-view name="jurisdiction"></router-view>
    </div>
    <router-view></router-view>
    <div class="footer-wrapper" style="display:block;">
      <!--<p>Copyright © 2013-2017 TUYIYI.COM - 优秀UI设计师互动平台 -粤ICP备12010950号-3</p>-->
      <p>
        <a style="color: #FFF;" href="http://www.miitbeian.gov.cn/">{{$lang(`Copyright 2013-${new Date().getFullYear()} VSWORK.COM - 优秀社会化协作平台 - 苏ICP备14020371号-2`)}}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "VSWORK", // set a title
    meta: [
      {
        // set meta
        name: "keyWords",
        content: "VSWORK,协作平台,vswork,三维建模,AR,VR,MR,在线验收"
      },
      {
        // set meta
        name: "description",
        content:
          "VSWORK是国内领先的数字内容在线协作平台，通过V（在线工作者）和S（项目管理者）的透明化协作实现数字内容的无差错交付。"
      }
    ]
  },
  created() {
    if (JSON.parse(localStorage.UserInfo || "{}").id && !this.$root.timer) {
      this.$root.updateCount(),
        (this.$root.timer = setInterval(() => this.$root.updateCount(), 30000));
    }
  }
};
</script>


<style>
.htm-jh p .nh-a-03.selected {
  padding: 2px;
  border-radius: 2px;
  display: inline-block;
  background-color: #808080;
}

[badge] {
  position: relative;
}

[badge]::before {
  top: -4px;
  right: -8px;
  height: 18px;
  color: white;
  min-width: 10px;
  font-size: 12px;
  padding: 0px 4px;
  line-height: 18px;
  position: absolute;
  text-align: center;
  border-radius: 9px;
  content: attr(badge);
  display: inline-block;
  background-color: red;
}

[badge="0"]::before {
  display: none;
}
</style>
