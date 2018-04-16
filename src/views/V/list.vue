<template>
    <div class="core-wrapper">
        <!--  <Banner></Banner> -->
        <TList :childTasks="childTasks" :isZong='false' :vUserId='getUserId()'></TList>
    </div>
</template>

<script>
import { TaskList } from '@/apis/task.js'
import TList from '@/components/TList'
import Banner from '@/components/Banner'
export default {
    components: { TList, Banner },
    data() {
        return {
            childTasks: [
                // {name: "全部", value: "", color: "li_dsh"},
                { name: $lang("征集中"), value: 4, count: 99, color: "zjz", to: "V_signInOut" },
                { name: $lang("已报名"), value: -100, count: 99, color: "zjz", to: "V_signInOut" },
                { name: $lang("制作中"), value: 5, count: 99, color: "zzz", to: "V_ChatUpload" },
                { name: $lang("S验收中/B验收中"), value: 6, count: 99, color: "ysz", to: "V_ChatUpload" },
                { name: $lang("已完成"), value: 7, count: 99, color: "wc", to: "V_ChatUpload" },
                { name: $lang("已打款"), value: 8, count: 99, color: "wc", to: "V_detail", querys: { isOnlyChat: true } },
                // { name: "退款申请中", value: 9, count: 99, color: "wc", to: "V_detail" },
                // { name: "已关闭", value: 10, count: 99, color: "wc", to: "V_detail" },
            ]
        }
    },
    methods: {
        getUserId() {
            return JSON.parse(localStorage.getItem("LoginUser")).userId
        }
    }
}
</script>
