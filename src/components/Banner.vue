<template>
    <div class="block banner-wrapper">
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(item,i) in list" :key="i">
                <a href="javascript:;">
                    <div class="banner-img"><img :src='item.fileUrl' /></div>
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>



<style>
.banner-wrapper {
    min-width: 1200px;
    margin-top: -20px;
}

.banner-img {
    background-size: cover;
}

.banner-img img {
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.banner-wrapper .el-carousel__container {
    height: 460px !important;
}
</style>

<script>
import { BannerlistAll } from '@/apis/task.js'
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        BannerlistAll().then((res) => {
            this.list = res.data
        })
    }
}
</script>
