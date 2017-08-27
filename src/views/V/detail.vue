<template>
 <!--s端 待审核-->
  <div class="content-wrapper">
    <div class="all-task-wrapper">
         <TInfo title="任务详情" :isZong="false" role="V" userType="B">
         </TInfo>
    </div>
  </div>
</template>
<script>
import TInfo from '@/components/TInfo'
export default {
    components: {TInfo}
}
</script>