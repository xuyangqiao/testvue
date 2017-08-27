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
                { name: "全部", value: "", color: "li_dsh" },
                { name: "待审核", value: 1, color: "li_dsh", to: "S_Lock" },
                { name: "审核中", value: 2, color: "li_shz", to: "S_ToExamine" },
                { name: "已受理", value: [4, 3], color: "li_ysl", to: "toEdit" },
                { name: "已完成", value: 5, color: "li_ywc", to: "toFinally" }
            ],
            childTasks: [
                // {name:"草稿",value:0,count:"99+",color:"dqd"},
                { name: "全部", value: "", color: "li_dsh", to: "S_ChatT" },
                { name: "待确认", value: 1, count: 99, color: "dqd", to: "S_ChatT" },
                { name: "待支付", value: [2, 3], count: 99, color: "dzf", to: "S_ChatT" },
                { name: "征集中", value: 4, count: 99, color: "zjz", to: "S_ChatT" },
                { name: "制作中", value: 5, count: 99, color: "zzz", to: "S_ChatT" },
                { name: "验收中", value: 6, count: 99, color: "ysz", to: "S_ChatT" },
                { name: "已完成", value: 7, count: 99, color: "wc", to: "S_ChatT" },//"已打款","退款申请中","已关闭"
                { name: "已打款", value: 8, count: 99, color: "wc", to: "S_SonTaskInfo" },
                { name: "退款申请中", value: 9, count: 99, color: "wc", to: "S_SonTaskInfo" },
                { name: "已关闭", value: 10, count: 99, color: "wc", to: "S_SonTaskInfo" },
            ]
        }
    }
}
</script>
