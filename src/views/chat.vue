<template>
    <div class="chart-wrpaper clearfix">
        <Chat :user="user1"></Chat>
        <!--<Chat :user="user2"></Chat>-->
    </div>
</template>

<script>
import Chat from '@/components/Chat'
export default {
    components: {Chat},
    data(){
        return{
            user1:{
                user: this.$route.query.id?this.$route.query.id:"weiqingting",
                pwd: "123456",
            }
        }
    }
}
</script>