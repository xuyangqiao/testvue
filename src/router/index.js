import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import { isLogin, getUser } from '@/apis/storage'

import Home from '@/views/Home'
import Error from '@/views/error'

import Login from '@/views/Login'
import ChoseIdentity from '@/views/choseIdentity'
import Register from '@/views/register'
import Password from '@/views/password'
import Chat from '@/views/chat'



import Notices from '@/views/notices'



const g = [
  {
    path: '/login', name: "login", component: Login,
    beforeEnter: function (to, from, next) {
      localStorage.setItem('LoginUser', "{}");
      localStorage.setItem('UserInfo', "{}");
      next();
    }
  },
  { path: '/qq', name: "qq", component: Chat },
  { path: '/choise', name: "choise", component: ChoseIdentity },
  { path: '/registe', name: "registe", component: Register },
  { path: '/forget', name: "forget", component: Password },
  { path: '/error', name: "error", component: Error },
]
//游客端
import Index from '@/views/index'
import C_Header from '@/views/Header'
import C_Detail from '@/views/detail.vue'
//B端
import B_List from '@/views/B/TaskList.vue'
import B_TaskCreate from '@/views/B/TaskCreate.vue'
import B_TaskDetail from '@/views/B/TaskDetail.vue'
import B_RejectDetail from '@/views/B/RejectDetail.vue'
import B_Header from '@/views/B/Header'
import B_UserInfo from '@/views/B/userInfo.vue'
import B_Base from '@/views/B/user/baseInfo.vue'
import B_Account from '@/views/B/user/accountInfo.vue'
import B_ReApply from '@/views/B/user/reApply.vue'
import B_Bag from '@/views/B/user/bagInfo.vue'
import B_Child from '@/views/B/user/childInfo.vue'
import B_Paid from '@/views/B/user/paid.vue'
import B_Paying from '@/views/B/user/paying.vue'
import B_BillList from '@/views/B/user/billList.vue'
import B_ChatT from '@/views/B/ChatT.vue'
import B_ChatD from '@/views/B/ChatD.vue'
import B_TaskCheck from '@/views/B/TaskCheck.vue'
import B_DTaskCheck from '@/views/B/DTaskChecked.vue'
import B_TaskChildDetail from '@/views/B/TaskChildDetail.vue'
import B_History from '@/views/B/History.vue'
//S端
import S_UserInfo from '@/views/S/userInfo.vue'
import S_Base from '@/views/S/user/baseInfo.vue'
import S_Manage from '@/views/S/user/manageInfo.vue'
import S_TaskList from '@/views/S/list'
import S_CreateTask from '@/views/S/SdCutTask'
import S_Lock from '@/views/S/lock'
import S_ToExamine from '@/views/S/toExamine'
import S_ToEdit from '@/views/S/toEdit'
import S_ToFinally from '@/views/S/toFinally'
import S_dTaskAllot from '@/views/S/SdTaskAllot'
import S_toBaoMing from '@/views/S/toBaoMing'
import S_Header from '@/views/S/Header'
import S_SonTaskInfo from '@/views/S/SonTaskInfo'
import S_ChatT from '@/views/S/ChatT'
import S_ChatD from '@/views/S/ChatD'
import S_VUserInfo from '@/views/S/VUserInfo'
import S_BUserInfo from '@/views/S/BUserInfo'
import S_Dakuan from '@/views/S/Dakuan'
import S_History from '@/views/S/History'
import S_Proview from '@/views/S/proview.vue'
const S = [
  { path: 'index', component: Index, name: "S_Index" },
  { path: 'ddetail', component: C_Detail, name: "S_Detail" },
  { path: 'list', component: S_TaskList, name: "S_list" },
  { path: 'create', component: S_CreateTask, name: "S_CreateTask" },
  { path: 'lock', component: S_Lock, name: "S_Lock" },
  { path: 'toExamine', component: S_ToExamine, name: "S_ToExamine" },
  { path: 'toEdit', component: S_ToEdit, name: "toEdit" },
  { path: 'toFinally', component: S_ToFinally, name: "toFinally" },
  { path: 'toFenPei', component: S_dTaskAllot, name: "toFenPei" },
  { path: 'S_toBaoMing', component: S_toBaoMing, name: "S_toBaoMing" },
  { path: 'S_SonTaskInfo', component: S_SonTaskInfo, name: "S_SonTaskInfo" },
  { path: 'S_ChatT', component: S_ChatT, name: "S_ChatT" },
  { path: 'S_ChatD', component: S_ChatD, name: "S_ChatD" },//S_Dakuan
  { path: 'S_Dakuan', component: S_Dakuan, name: "S_Dakuan" },
  { path: 'S_History', component: S_History, name: "S_History" },
  { path: 'S_Proview', component: S_Proview, name: "S_Proview" },

  { path: 'notices', component: Notices, name: "S_Notices" },
];
//V端
import V_TaskList from '@/views/V/list'
import V_signInOut from '@/views/V/signInOut'
import V_detail from '@/views/V/detail'
import V_Header from '@/views/V/Header'
import V_UserInfo from '@/views/V/userInfo.vue'
import V_Base from '@/views/V/user/baseInfo.vue'
import V_Ability from '@/views/V/user/abilityInfo.vue'
import V_Finance from '@/views/V/user/financeInfo.vue'
import V_Identify from '@/views/V/user/identifyInfo.vue'
import V_ReApply from '@/views/V/user/reApply.vue'
import V_ChatUpload from '@/views/V/chatupload.vue'
import V_History from '@/views/V/History.vue'
import V_Proview from '@/views/V/proview.vue'
const V = [
  { path: 'index', component: Index, name: "V_Index" },
  { path: 'ddetail', component: C_Detail, name: "V_Detail" },
  { path: 'list', component: V_TaskList, name: "V_TaskList" },
  { path: 'signInOut', component: V_signInOut, name: "V_signInOut" },
  { path: 'detail', component: V_detail, name: "V_detail" },
  { path: 'upload', component: V_ChatUpload, name: "V_ChatUpload" },
  { path: 'history', component: V_History, name: "V_History" },
  { path: 'V_Proview', component: V_Proview, name: "V_Proview" },

  { path: 'notices', component: Notices, name: "V_Notices" },
];

const router = new Router({
  routes: [
    ...g,
    { path: '/', redirect: '/C' },
    {
      path: '/C',
      name: "C",
      components: {
        default: Home,
        jurisdiction: C_Header
      },
      children: [

        { path: "", redirect: 'index' },
        { path: 'index', component: Index, name: "C_Index" },
        { path: 'ddetail', component: C_Detail, name: "C_Detail" }
      ]
    },
    {
      path: '/B',
      name: "B",
      components: {
        default: Home,
        jurisdiction: B_Header
      },
      beforeEnter: async function (to, from, next) {
        if (getUser().userType == "B") {
          next();
        } else {
          next({ name: 'login' })
        }
      },
      children: [
        { path: "", redirect: 'index' },
        { path: 'index', component: Index, name: "B_Index" },
        { path: 'ddetail', component: C_Detail, name: "B_Detail" },
        { path: 'list', component: B_List, name: "B_list" },
        { path: 'create', component: B_TaskCreate, name: "B-create" },
        { path: 'detail', component: B_TaskDetail, name: "B-detail" },
        { path: 'reject', component: B_RejectDetail, name: "B-reject" },
        { path: 'B_ChatT', component: B_ChatT, name: "B_ChatT" },
        { path: 'B_ChatD', component: B_ChatD, name: "B_ChatD" },
        { path: 'B_TaskCheck', component: B_TaskCheck, name: "B_TaskCheck" },
        { path: 'B_DTaskCheck', component: B_DTaskCheck, name: "B_DTaskCheck" },
        { path: 'B_TaskChildDetail', component: B_TaskChildDetail, name: "B_TaskChildDetail" },
        { path: 'B_History', component: B_History, name: "B_History" },

        { path: 'notices', component: Notices, name: "B_Notices" },

        {
          path: 'userInfo', component: B_UserInfo, name: "B-userInfo",
          children: [
            { path: 'base', component: B_Base, name: 'B-userInfo-base' },
            { path: 'account', component: B_Account, name: 'B-userInfo-account' },
            { path: 'reapply', component: B_ReApply, name: 'B-userInfo-reApply' },
            { path: 'bag', component: B_Bag, name: 'B-userInfo-bag' },
            { path: 'child', component: B_Child, name: 'B-userInfo-child' },
            { path: 'paid', component: B_Paid, name: 'B-userInfo-paid' },
            { path: 'paying', component: B_Paying, name: 'B-userInfo-paying' },
            { path: 'billList', component: B_BillList, name: 'B-userInfo-billList' }
          ],
        }
      ]
    },
    {
      path: '/V',
      name: "V",
      components: {
        default: Home,
        jurisdiction: V_Header
      },
      beforeEnter: async function (to, from, next) {
        if (getUser().userType == "V") {
          next();
        } else {
          next({ name: 'login' })
        }
      },
      children: [
        { path: '', redirect: 'index' },
        ...V,
        {
          path: 'userInfo', component: V_UserInfo, name: 'V-userInfo',
          children: [
            { path: '', redirect: 'base' },
            { path: 'base', component: V_Base, name: 'V-userInfo-base' },
            { path: 'ability', component: V_Ability, name: 'V-userInfo-ability' },
            { path: 'finance', component: V_Finance, name: 'V-userInfo-finance' },
            { path: 'identify', component: V_Identify, name: 'V-userInfo-identify' },
            { path: 'reapply', component: V_ReApply, name: 'V-userInfo-reApply' }
          ]
        }
      ]
    },
    {
      path: '/S',
      name: 'S',
      beforeEnter: async function (to, from, next) {
        if (getUser().userType == "S") {
          next();
        } else {
          next({ name: 'login' })
        }
      },
      components: {
        default: Home,
        jurisdiction: S_Header
      },
      children: [
        { path: '', redirect: 'index' },
        ...S,
        {
          path: 'VuserInfo', component: S_VUserInfo, name: 'S-VuserInfo',
          children: [
            { path: '', redirect: 'base' },
            { path: 'base', component: V_Base, name: 'S-VuserInfo-base' },
            { path: 'ability', component: V_Ability, name: 'S-VuserInfo-ability' }
          ]
        }, {
          path: 'BuserInfo', component: S_BUserInfo, name: 'S-BuserInfo',
          children: [
            { path: '', redirect: 'base' },
            { path: 'base', component: B_Base, name: 'S-BuserInfo-base' },
            { path: 'account', component: B_Account, name: 'S-BuserInfo-account' }
          ]
        },
        {
          path: 'userInfo', component: S_UserInfo, name: 'S-userInfo',
          children: [
            { path: '', redirect: 'base' },
            { path: 'base', component: S_Base, name: 'S-userInfo-base' },
            { path: 'manage', component: S_Manage, name: 'S-userInfo-manage' }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (/^\/[S|B|V]/.test(to.path)) {
    if (isLogin()) {
      next();
    }
    else {
      next({ name: 'login' })
    }
  }
  else {
    next();
  }
})
export default router
