<template>
    <el-dialog :title="$lang('图片预览')" :visible.sync="show" size="large">
        <div class="dialog-img-preview">
            <div class="dialog-img-preview-left" v-if="index>1">
                <i @click="go(-1)" class="el-icon-arrow-left"></i>
            </div>
            <img :src="list[index]">
            <div class="dialog-img-preview-right" v-if="index<list.length-1">
                <i @click="go(1)" class="el-icon-arrow-right"></i>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            index: 0,
            list: []
        }
    },
    methods: {
        go(value) {
            this.index = Math.max(1, Math.min(this.index += value, this.list.length - 1));
        },
        open(list) {
            this.list.push(...(list instanceof Array ? list : [list]));
            this.show = true;
        }
    }
}
</script>
