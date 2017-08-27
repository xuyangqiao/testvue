<template>
    <TInfo title="任务详情" :isZong="false" role="S" :onload="onTInfoLoad">
        <div slot="footer" class="bt-dashed">
        <div class="set-btn-wrap bt-dashed" style='text-align: left;'>
            <el-button type="sure">打款</el-button>
        </div>
        </div>
    </TInfo>
</template>
<script type="text/javascript">
import TInfo from '@/components/TInfo'

export default {
    components: { TInfo },
    methods: {
        onTInfoLoad(data, file) {
        }
    }
}
</script>