<template>
    <div class="chart-wrpaper clearfix">
        <div class="chart-left">
             <div class="box-flex-media-box">
                  <div class="flex1 chart-left-title">
                      <h3>宣传动画原型设计</h3>
                  </div>
                  <el-button type="sure">查看任务&gt;</el-button>
             </div>
             <div class="chart-left-list">
                  <ul class="chart-left-ul">
                      <li class="chart-left-li">
                           <div class="box-flex-media-box cl-top">
                                <a href="javascript:;" class="title flex1">
                                     <h4>待确认</h4>
                                </a>
                           </div>
                           <ul class="chose-people-ul">
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                        </div>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                           </ul>
                      </li>
                      <li class="chart-left-li">
                           <div class="box-flex-media-box cl-top">
                                <a href="javascript:;" class="title flex1">
                                     <h4 class="height70">待支付</h4>
                                </a>
                                <el-button type="sure" @click="dialogVisible = true">去支付</el-button>
                           </div>
                           <ul class="chose-people-ul">
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="pdr-15">
                                      <el-checkbox v-model="checked"></el-checkbox>
                                   </div>
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name flex1">呵呵哈哈</p>
                                        </div>
                                   </div>
                                   <div class="moey">
                                       <p>￥1000</p>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="pdr-15">
                                      <el-checkbox v-model="checked"></el-checkbox>
                                   </div>
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                        </div>
                                   </div>
                                   <div class="moey">
                                       <p>￥1000</p>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="pdr-15">
                                      <el-checkbox v-model="checked"></el-checkbox>
                                   </div>
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                        </div>
                                   </div>
                                   <div class="moey">
                                       <p>￥1000</p>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="pdr-15">
                                      <el-checkbox v-model="checked"></el-checkbox>
                                   </div>
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                        </div>
                                   </div>
                                   <div class="moey">
                                       <p>￥1000</p>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="pdr-15">
                                      <el-checkbox v-model="checked"></el-checkbox>
                                   </div>
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                            
                                        </div>
                                   </div>
                                   <div class="moey">
                                       <p>￥10002222</p>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                               
                           </ul>
                      </li>
                      <li class="chart-left-li">
                           <div class="box-flex-media-box cl-top">
                                <a href="javascript:;" class="title flex1">
                                     <h4>支付中</h4>
                                </a>
                           </div>
                           <ul class="chose-people-ul" style="dispaly:none">
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                        </div>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                           </ul>
                      </li>
                      <li class="chart-left-li">
                           <div class="box-flex-media-box cl-top">
                                <a href="javascript:;" class="title flex1">
                                     <h4>征集中</h4>
                                </a>
                           </div>
                           <ul class="chose-people-ul" style="display:none;">
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                        </div>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                           </ul>
                      </li>
                      <li class="chart-left-li">
                           <div class="box-flex-media-box cl-top">
                                <a href="javascript:;" class="title flex1">
                                     <h4>制作中</h4>
                                </a>
                           </div>
                           <ul class="chose-people-ul">
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                        </div>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                           </ul>
                      </li>
                      <li class="chart-left-li">
                           <div class="box-flex-media-box cl-top">
                                <a href="javascript:;" class="title flex1">
                                     <h4>验收中</h4>
                                </a>
                           </div>
                           <ul class="chose-people-ul">
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                            <div class="yswc-set">
                                                <a href="javascript:;" class="xz-a">下载</a>
                                                <a href="javascript:;">预览</a>
                                            </div>
                                        </div>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                           </ul>
                      </li>
                      <li class="chart-left-li">
                           <div class="box-flex-media-box cl-top">
                                <a href="javascript:;" class="title flex1">
                                     <h4>完成</h4>
                                </a>
                           </div>
                           <ul class="chose-people-ul">
                               <li class="chose-people-li box-flex-media-box">
                                   <div class="flex1">
                                      <div class="box-flex-media-box">
                                            <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                            <p class="name">呵呵哈哈</p>
                                            <div class="yswc-set">
                                                <a href="javascript:;" class="xz-a">下载</a>
                                            </div>
                                        </div>
                                   </div>
                                   <a href="javascript:;" class="more">查看&gt;</a>
                               </li>
                           </ul>
                      </li>
                  </ul>
             </div>
        </div>
        <div class="chart-right">
            右侧聊天界面
        </div>
        <!--去支付弹层-->
        <el-dialog
            title="支付"
            :visible.sync="dialogVisible"
            size="tiny"
            :before-close="handleClose">
            <div class="pay-dialog-wrap">
                 <!--申请支付-->
                 <div class="apply-payment-wrap"   style="display:none;">
                      <div class="apply-people-wrap">
                            <h4 class="title-h4-dig">确定任务：</h4>
                            <div class="apply-pay-people">
                                <div class="box-flex-media-box">
                                    <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                    <p class="name">呵呵哈哈</p>
                                </div>
                                <div class="box-flex-media-box">
                                    <p class="user-header"><img src="../assets/images/user-header.png"/></p>
                                    <p class="name">呵呵哈哈</p>
                                </div>
                            </div>
                      </div>
                      <div class="money-num">
                         <p>付款金额：<em>2000</em>元</p>
                      </div>

                      <!--申请付款 和 已发起付款 两种选择-->
                      <div class="fqfk-wrap">
                          <span>已发起付款</span>
                      </div>
                      <div class="payment-btn-wrap">
                          <el-button type="sure">申请支付</el-button>
                      </div>
                 </div>

                 <!--点击申请支付后 付款-->
                 <div class="payment-method-wrap">
                     <div class="box-flex-media-box">
                          <p class="flex1">付款金额：<em>2000</em>元</p>
                          <div class="pm-cz-btn">
                              <div class="box-flex-media-box">
                                 <el-button type="sure">充值</el-button>
                                 <p class="marg-left-10">余额：400 元</p>
                              </div>
                          </div>
                     </div>
                     <p class="yebz-tips">*余额不足请充值。</p>
                     <div class="zffs-div">
                        <ul class="clearfix">
                            <li class="zffs-li active">
                                <span class="zf-zfb"><i></i></span>
                                <p>支付宝支付</p>
                            </li>
                            <li class="zffs-li">
                                <span class="zf-wx"><i></i></span>
                                <p>微信支付</p>
                            </li>
                            <li class="zffs-li">
                                <span class="zf-ye"><i></i></span>
                                <p>余额支付</p>
                            </li>
                        </ul>
                     </div>
                     <div class="payment-btn-wrap">
                          <el-button type="sure">付款</el-button>
                      </div>
                 </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: true,
        dialogVisible: false   //去支付
      };
    }
  };
</script>