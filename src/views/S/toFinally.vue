<template>
  <TInfo :onload="load">
  </TInfo>
</template>
<script>
import TInfo from '@/components/TInfo'
export default {
  components: { TInfo },
  methods: {
    load(data, file) {
    },
  }
}
</script>