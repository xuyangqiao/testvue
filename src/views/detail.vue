<template>
  <TInfo :tid="tid" :onload="load" :isZong="false" role="V" :title="$lang('任务详情')">
  </TInfo>
</template>
<script>
import TInfo from '@/components/TInfo'
export default {
  components: { TInfo },
  props: ['tid'],
  data() {
    return {
      User: {
        name: "",
        url: ""
      }
    }
  },
  methods: {
    load(data, file) {

    },
  }
}
</script>