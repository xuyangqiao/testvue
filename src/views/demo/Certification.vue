<template>
    <div>
        <h1>提交企业认证资料</h1>
        <button @click="onSubmitCertification">提交审核</button>
    </div>
</template>
<script>
    export default {
        methods:{
            onSubmitCertification(){
                //ajax 提交企业认证
                router.push({ name: 'B-create', params: { userId: 123 }})
            }
        }
    }
</script>