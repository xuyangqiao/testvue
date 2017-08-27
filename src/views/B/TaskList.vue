
<template>
    <div class="core-wrapper">
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
                { name: "草稿", value: 0, color: "li_dsh", to: "B-create" },
                { name: "审核中", value: [1, 2], color: "li_shz", to: "B-detail" },
                { name: "未通过", value: 3, color: "li_shz", to: "B-reject" },
                { name: "已受理", value: 4, color: "li_ysl", to: "B_ChatT" },
                { name: "已完成", value: 5, color: "li_ywc", to: "B-detail" }
            ],
            childTasks: [
                { name: "全部", value: "", color: "li_dsh" },
                { name: "待确认", value: 1, count: 99, color: "dqd", to: "B_ChatT" },
                { name: "待支付", value: 2, count: 99, color: "dzf", to: "B_ChatT" },
                { name: "支付中", value: 3, count: 99, color: "dzf", to: "B_ChatT" },
                { name: "征集中", value: 4, count: 99, color: "zjz", to: "B_ChatT" },
                { name: "制作中", value: 5, count: 99, color: "zzz", to: "B_ChatT" },
                { name: "验收中", value: 6, count: 99, color: "ysz", to: "B_ChatT" },
                { name: "已完成", value: [7, 8], count: 99, color: "wc", to: "B_ChatT" },
                { name: "退款申请中", value: 9, count: 99, color: "wc", to: "B_ChatT" },
                { name: "已关闭", value: 10, count: 99, color: "wc", to: "B_ChatT" },
                // {name:"已打款",value:8,count:99,color:"wc",to:"B_TaskChildDetail"},
            ]
        }
    }
}
</script>
