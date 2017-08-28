<template>
    <div class="history-download">
        <div style="padding: 0 50px">
            <!-- <el-button @click="downloadSelected" class="download-selected">下载选中</el-button> -->
            <h1>{{$lang('历史文件')}}</h1>
        </div>
        <el-table ref="multipleTable" :data="fileData" tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="alias" :label="$lang('文件名')" width="300">
            </el-table-column>
            <el-table-column v-if="$route.query.index && $route.query.index == -1" prop="subvsion" :label="$lang('版本')" width="300">
            </el-table-column>
            <el-table-column prop="createTime" :label="$lang('日期')" width="300">
            </el-table-column>
            <el-table-column :label="$lang('操作')">
                <template scope="scope">
                    <el-button size="small" @click="proview(scope.row)">{{$lang('预览')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination :page-size="pageSize" @current-change="currentChange" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
        <SlideBtns :type="'back'"></SlideBtns>
    </div>
</template>

<script>
import { getAllFileWithPage } from '@/apis/files'
import SlideBtns from '@/components/SlideBtns'
export default {
    components: { SlideBtns },
    data() {
        return {
            fileData: [],
            multipleSelection: [],
            total: 1,
            pageSize: 1
        }
    },
    async created() {
        const me = this;

        const id = me.$route.query.id;
        const TaskStage = me.$route.query.TaskStage;
        const index = me.$route.query.index;
        let res;
        if (index == -1) {
            res = await getAllFileWithPage("checked", id);
        } else {
            res = await getAllFileWithPage("enclosure", id);
        }
        if (res.success) {
            me.fileData = res.data.list;
            me.total = res.data.total;
            me.pageSize = res.data.pageSize
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
        },
        proview({ fileVersion, url }) {
            this.$router.push({ name: 'B_DTaskCheck', query: { fileVersion, url } });
        },
        downloadSelected() {
            const me = this;
            if (me.multipleSelection.length == 0) {
                me.$message($lang("未选择文件"));
                return
            }
            me.multipleSelection.map(row => {
                me.downloadFile(row.alias, row.url)
            })
        },
        downloadFile(fileName, url) {
            var a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            var ev = document.createEvent('MouseEvents');
            ev.initEvent('click', false, true);
            a.dispatchEvent(ev);
        },
        async currentChange(currentPage) {
            const me = this;
            const TaskStage = me.$route.query.TaskStage;
            const res = await getAllFileWithPage("", TaskStage, currentPage);
            if (res.success) {
                me.fileData = res.data.list;
                me.total = res.data.total;
                me.pageSize = res.data.pageSize
            }
        }
    }
}
</script>
