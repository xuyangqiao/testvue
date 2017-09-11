<template>
    <div class="prd-center-wrapper">
        <div class="prd-center-search">
            <div class="prd-center-search_main">
                <el-form label-width="90px">
                    <el-form-item :label="$lang('任务类型:')" v-if="parentTasks.length&&childTasks.length">
                        <el-button :type="parentTaskState>-1?'sure':'diy'" @click="initState(true)">{{$lang('总任务')}}</el-button>
                        <el-button :type="childTaskState>-1?'sure':'diy'" @click="initState(false)">{{$lang('子任务')}}</el-button>
                        <!--<el-button type="diy">{{$lang('员工任务')}}</el-button>-->
                    </el-form-item>
                    <el-form-item :label="$lang('总任务:')" v-if="parentTasks.length&&parentTaskState>-1">
                        <!--<el-button type="sure" >{{$lang('全部')}}</el-button>-->
                        <el-button :type="parentTaskState==i?'sure':'diy'" v-for="(item, i) in parentTasks" @click="queryParentTask(i)" :key="i">{{item.name}}</el-button>
                    </el-form-item>
                    <el-form-item :label="$lang('子任务:')" v-if="childTasks.length&&childTaskState>-1">
                        <!--<el-button type="sure" >{{$lang('全部')}}</el-button>-->
                        <el-button :type="childTaskState==i?'sure':'diy'" v-for="(item, i) in childTasks" @click="queryChildTask(i)" :key="i">{{item.name}}</el-button>
                    </el-form-item>
                    <el-form-item :label="$lang('任务类型:')">
                        <el-col :span="20">
                            <Type-Select :onChange="AppClassChange" :dataSource="AppClass"></Type-Select>
                            <el-select v-model="appAreas" clearable :placeholder="$lang('应用场景')" @change="appTypeChange">
                                <el-option v-for="item in areaList" :key="item.key" :label="item.cnValue" :value="item.key"></el-option>
                            </el-select>
                            <el-select v-model="packageType" clearable @change="switchChange" :placeholder="$lang('是否公开')" v-if="!isWall">
                                <el-option :label="$lang('公开')" value="0" />
                                <el-option :label="$lang('私密')" value="1" />
                            </el-select>
                            <el-select v-model="groupId" clearable @change="groupChange" :placeholder="$lang('任务组')" v-if="hasTaskGroup">
                                <el-option :label="o.groupName" :value="o.id" v-for="o in taskGroup" :key="o.id" />
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="prd-center-main">
            <div class="task-set-wrap" :class="childTaskState == -1 ? '' : 'zrw-task-set-wrap'">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(item,i) in tasklist" :key="i">
                        <Card :stateName="getTo(item.state).name" :to="{ name: getTo(item.state).path||'error', query: Object.assign({ id: item.id ,taskId:item.taskId,state:item.state},(getTo(item.state).querys||{}))}" :state="item.state" :projectName="item.projectName" :time="item.taskEndTime" :total="item.total" :totalType="item.totalType" :userType="userType" :imageUrl="item.url" :unread="item.unread" :isDialog="isDialog" :origin="origin" @click="dialog.id=item.id,dialog.show=true" />
                    </el-col>
                </el-row>
                <div class="page-wrap clearfix">
                    <div class="fr">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[4, 8, 12, 16]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog size="auto" :visible.sync="dialog.show">
            <detail v-if="dialog.show" :tid="dialog.id" />
        </el-dialog>

        <SlideBtns :type="'list'"></SlideBtns>

    </div>
</template>

<script>
import { TaskList, subTaskList, taskWall, entryList } from '@/apis/task'
import { getTaskParam, getUser } from '@/apis/storage'
import { getTackParam, TaskState, ChildTaskState } from '@/apis/task'//注意一下 = =

import { statusList } from '@/apis/notices'

import Card from '@/components/Card'
import TypeSelect from '@/components/TypeSelect'
import SlideBtns from '@/components/SlideBtns'
import { getFile } from '@/apis/files'

import Detail from '@/views/detail.vue'

export default {
    components: { Card, TypeSelect, SlideBtns, Detail },
    props: {
        isDialog: {
            default: false
        },
        origin: null,
        parentTasks: {
            type: Array,
            // required: true,
            default() {
                return [];
            }
        },
        childTasks: {
            type: Array,
            // required: true,
            default: []
        },
        isZong: {
            type: Boolean,
            default: true
        },
        isWall: {
            type: Boolean,
            default: false
        },
        vUserId: {
            type: String
        },
        hasTaskGroup: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            parentTaskState: window.store.parentTaskState,
            childTaskState: window.store.childTaskState,
            pagination: {
                currentPage: 1,
                pageSize: 12,
                total: 0,
            },
            packageType: "", //是否私有 0：公共 1：私有
            tasklist: [],
            AppClass: [],
            areaList: [],

            appAreas: "",
            appType: "",
            // vUserId:"",
            // isZong:true
            userType: getUser().userType,

            groupId: '',
            taskGroup: '',
            dialog: {
                show: false,
                id: null,
            }
        }
    },
    async created() {
        let { AppClass, areaList } = getTaskParam();
        if (!AppClass) {
            const data = await getTackParam();
            if (data) {
                AppClass = data.AppClass;
                areaList = data.areaList;
                localStorage.setItem("TaskParam", JSON.stringify(data));
            }

        }
        this.AppClass = AppClass;
        this.areaList = areaList;
        if (window.store.parentTaskState > 0 || window.store.childTaskState > 0) {
            await this.queryList();
        } else {
            this.initState(this.isZong)
        }

        this.taskGroup = JSON.parse(localStorage.getItem("TaskParam") || {}).taskGroup || [];

    },
    methods: {
        async initState(b) {
            if (b) {
                this.parentTaskState = 0;
                this.childTaskState = -1;
            } else {
                this.parentTaskState = -1;
                this.childTaskState = 0;
            }

            this.pagination.currentPage = 1;
            await this.queryList();
        },
        queryChildTask(i) {
            this.childTaskState = i
            this.parentTaskState = -1;
            this.pagination.currentPage = 1;
            this.queryList();
        },
        queryParentTask(i) {
            this.parentTaskState = i;
            this.childTaskState = -1;
            this.pagination.currentPage = 1;
            this.queryList();
        },
        getTo(state) {
            const { parentTasks, parentTaskState, childTaskState, childTasks, isZong } = this;
            let $role = this.$route.name.split('_')[0]
            if ($role == "C") { $role = "V" }
            let result = {
                name: "",
                path: "error",
                querys: {}
            }
            if (parentTaskState > -1) {
                const current = parentTasks.filter(item => {
                    if (Array.isArray(item.value)) {
                        return item.value.indexOf(+state) > -1
                    } else {
                        return item.value == state
                    }

                });
                if (current.length) {
                    // return current[0].to;
                    result = {
                        name: TaskState($role, state),
                        path: current[0].to,
                        querys: current[0].querys,
                    }
                }
            }
            if (childTaskState > -1) {
                const current = childTasks.filter(item => {
                    if (Array.isArray(item.value)) {
                        return item.value.indexOf(+state) > -1
                    } else {
                        return item.value == state
                    }
                });
                if (current.length) {
                    result = {
                        name: ChildTaskState($role, state),
                        path: current[0].to,
                        querys: current[0].querys,
                    }
                }
            }
            return result
        },
        async queryList() {
            let { pagination: { pageSize, currentPage }, appType, appAreas, vUserId, packageType, parentTasks, parentTaskState, childTasks, childTaskState, groupId } = this;
            let res = null;
            if (parentTaskState > -1) {
                let state = parentTasks[parentTaskState] ? parentTasks[parentTaskState].value : undefined
                if (Array.isArray(state)) state = state[0]
                res = await TaskList({ appType, appAreas, packageType, state, page: currentPage, row: pageSize, groupId });

            }

            if (childTaskState > -1) {
                let state = childTasks[childTaskState] ? childTasks[childTaskState].value : undefined
                if (Array.isArray(state)) state = state[0]
                if (+state == -100) {
                    res = await entryList({ appType, appAreas, page: currentPage, row: pageSize, vUserId })
                } else if (this.isWall) {
                    res = await taskWall({ appType, appAreas, state, page: currentPage, row: pageSize })
                } else {
                    // let vUserId = state == 4 ? "" : vUserId;//V
                    if (vUserId) {//V 端征集中不可以看私密
                        packageType = state == 4 ? "0" : packageType;
                    }
                    res = await subTaskList({ appType, appAreas, packageType, state, page: currentPage, row: pageSize, groupId })
                }
            }
            if (res) {
                let sList = (await statusList()).data;
                console.log(res.list, sList);
                this.tasklist = res.list.map(o => {
                    return o.unread = !!sList.filter(s => s.taskId == o.id)[0], o;
                });
                this.pagination.total = res.total;
            }

            window.store = {
                parentTaskState: parentTaskState,
                childTaskState: childTaskState
            }
        },
        async AppClassChange(value) {
            this.appType = value;
            await this.queryList()
        },
        async appTypeChange(value) {
            this.appAreas = value;
            await this.queryList()
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize;
            this.pagination.currentPage = 1;
            this.queryList();
        },
        handleCurrentChange(pageNum) {
            this.pagination.currentPage = pageNum;
            this.queryList();
        },
        switchChange(state) {
            this.packageType = state;
            this.pagination.currentPage = 1;
            this.queryList();
        },
        groupChange(state) {
            this.groupId = state;
            this.pagination.currentPage = 1;
            this.queryList();
        }

    }
}
</script>
