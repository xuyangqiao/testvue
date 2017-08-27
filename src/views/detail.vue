<template>
  <TInfo :onload="load" :isZong="false" role="V" title="任务详情">
  </TInfo>
</template>
<script>
import TInfo from '@/components/TInfo'
export default {
  components: { TInfo },
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