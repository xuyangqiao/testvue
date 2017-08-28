<template>
    <TInfo :title="$lang('任务详情')" :isZong="false" role="S" :onload="onTInfoLoad">
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