<template>
  <div id="app">
    <div class="header-wrapper" style="display:block;">
      <router-view name="jurisdiction"></router-view>
    </div>
    <router-view></router-view>
    <div class="footer-wrapper" style="display:block;">
      <!--<p>Copyright © 2013-2017 TUYIYI.COM - 优秀UI设计师互动平台 -粤ICP备12010950号-3</p>-->
      <p>
        <a style="color: #FFF;" href="http://www.miitbeian.gov.cn/">Copyright 2013-2017 VSWORK.COM - 优秀社会化协作平台 - 苏ICP备14020371号-2</a>
      </p>
    </div>
  </div>
</template>

<style>
.htm-jh p .nh-a-03.selected {
  padding: 2px;
  border-radius: 2px;
  display: inline-block;
  background-color: #808080;
}
</style>
