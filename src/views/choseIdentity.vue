<template>
  <div class="lr-content-wrapper">
      <div class="login-logo" @click="$router.push({ path: '/'})"></div>
     <div class="chose-sf-main clearfix">
          <div class="chose-sf-one fbs-sf">
                <router-link :to="{ name: 'registe',query: { type: 'B' } }"><em></em></router-link>
          </div>
          <div class="chose-sf-one fws-sf">
               <router-link :to="{ name: 'registe',query: { type: 'V' } }"><em></em></router-link>
          </div>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>