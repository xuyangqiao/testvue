<template>
    <!--<TaskCreate :submit="submit"></TaskCreate>-->
    <TaskCreate></TaskCreate>
</template>
<script>
import { TaskAdd, TaskSave } from '@/apis/task.js'
import TaskCreate from '@/components/TaskCreate'
import { CheckCompanyInfoB } from '@/apis/person'
import { getUser, getUserInfo } from '@/apis/storage'

export default {
    async beforeRouteEnter(to, from, next) {
        if (getUser().bUserType == '1') {//子发包商
            var applyState = getUserInfo().applyState;
            if (applyState == '2') {
                next()
            } else {
                next(vm => {
                        vm.$message($lang('总账户未企业认证！'));
                        vm.$router.push({ name: from.name})
                    })
            }
        } else {
            const res = await CheckCompanyInfoB({ userId: getUser().userId || "" })
            if (res.success) {
                if (res.data.applyState == '2') {
                    next()
                } else {
                    next(vm => {
                        vm.$message($lang('先进行企业认证'));
                        vm.$router.push({name:'B-userInfo-account',query:{userId:getUser().userId||""}})
                    })
                }
            }
        }

    },
    components: {
        TaskCreate
    }
}
</script>
