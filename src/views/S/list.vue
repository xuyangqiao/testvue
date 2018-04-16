<template>
    <div class="core-wrapper">
        <!--  <Banner></Banner> -->
        <TList :parentTasks="parentTasks" :childTasks="childTasks"></TList>
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
            parentTasks: [
                { name: $lang("全部"), value: "", color: "li_dsh" },
                { name: $lang("待审核"), value: 1, color: "li_dsh", to: "S_Lock" },
                { name: $lang("审核中"), value: 2, color: "li_shz", to: "S_ToExamine" },
                { name: $lang("已受理"), value: [4, 3], color: "li_ysl", to: "S_ChatT" },
                { name: $lang("已完成"), value: 5, color: "li_ywc", to: "S_ChatT" }
            ],
            childTasks: [
                // {name:"草稿",value:0,count:"99+",color:"dqd"},
                { name: $lang("全部"), value: "", color: "li_dsh", to: "S_ChatT" },
                { name: $lang("待确认"), value: 1, count: 99, color: "dqd", to: "S_ChatT" },
                { name: $lang("待支付"), value: [2, 3], count: 99, color: "dzf", to: "S_ChatT" },
                { name: $lang("征集中"), value: 4, count: 99, color: "zjz", to: "toFenPei" },
                { name: $lang("制作中"), value: 5, count: 99, color: "zzz", to: "S_ChatD" },
                { name: $lang("S验收中/B验收中"), value: 6, count: 99, color: "ysz", to: "S_ChatD" },
                { name: $lang("已完成"), value: 7, count: 99, color: "wc", to: "S_ChatD" },//"已打款","退款申请中","已关闭"
                { name: $lang("已打款"), value: 8, count: 99, color: "wc", to: "S_ChatD" },
                { name: $lang("退款申请中"), value: 9, count: 99, color: "wc", to: "S_SonTaskInfo" },
                { name: $lang("已关闭"), value: 10, count: 99, color: "wc", to: "S_SonTaskInfo" },
            ]
        }
    }
}
</script>
