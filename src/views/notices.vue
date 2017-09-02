<template>
    <div class="notices" v-loading="loading">
        <el-tabs v-model="tab" @tab-click="tabChange($event,1)">
            <el-tab-pane name="system" :label="$lang('系统通知')">
                <div class="tab system" v-for="(item,i) in page.system.data" :key="i">
                    <div class="item">
                        <div class="img" :class="{unread:item.state=='0'}">
                            <img :src="require('../assets/images/notice.png')" />
                        </div>
                        <div class="content">
                            <el-button type="text" class="title" @click="openDetail('system',item)">{{item.msgTitle}}</el-button>
                            <div class="context">{{item.msg}}</div>
                        </div>
                        <div class="date">{{item.createTime}}</div>
                        <div class="option">
                            <i class="el-icon-delete2" @click="remove('system',item.id)"></i>
                        </div>
                    </div>
                </div>
                <el-pagination layout="prev, pager, next" :page-size="page.system.size" :total="page.system.total" @current-change="tabChange({name:'system'},$event)" v-if="page.system.total" />
            </el-tab-pane>
            <el-tab-pane name="person" :label="$lang('个人通知')">
                <div class="tab person" v-for="(item,i) in page.person.data" :key="i">
                    <div class="item">
                        <div class="img" :class="{unread:item.state=='0'}">
                            <img :src="require('../assets/images/notice.png')" />
                        </div>
                        <div class="content">
                            <el-button type="text" class="title" @click="openDetail('person',item)">{{item.msgTitle}}</el-button>
                            <div class="context">{{item.msg}}</div>
                        </div>
                        <div class="date">{{item.createTime}}</div>
                        <div class="option">
                            <i class="el-icon-delete2" @click="remove('person',item.id)"></i>
                        </div>
                    </div>
                </div>
                <el-pagination layout="prev, pager, next" :page-size="page.person.size" :total="page.person.total" @current-change="tabChange({name:'person'},$event)" v-if="page.person.total" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {
    systemList,
    personList,
    detail,
    delSystem,
    delPerson,
    readSystem,
    readPerson
} from '@/apis/notices';

export default {
    data() {
        return {
            loading: false,
            tab: 'system',
            page: {
                system: {
                    index: 1,
                    size: 6,
                    total: 0,
                    data: []
                },
                person: {
                    index: 1,
                    size: 6,
                    total: 0,
                    data: []
                },
            },
            dialog: {
                show: false
            }
        }
    },
    methods: {
        async tabChange({ name }, index) {
            this.loading = true;
            this.page[name].index = index;
            let res = await { system: systemList, person: personList }[name](this.page[name]);
            if (res.success && res.data) {
                this.page[name].data = res.data.list;
                this.page[name].total = res.data.total;
            }
            this.loading = false;
        },
        async remove(type, id) {
            this.loading = true;
            let res = await { system: delSystem, person: delPerson }[type](id);
            this.$message[res.success ? 'success' : 'error'](res.success ? $lang('删除成功') : res.msg);
            if (res.success) this.tabChange({ name: this.tab }, this.page[this.tab].index), this.$root.count--;
            this.loading = false;
        },
        async openDetail(type, item) {
            if (item.state == '1') {
                this.$alert(item.msg, item.msgTitle);
            } else {
                let res = await { system: readSystem, person: readPerson }[type](item.id);
                if (res.success) this.$alert(item.msg, item.msgTitle, {
                    callback: () => item.state = '1'
                }), this.$root.count--;
                else this.$message.error(res.msg);
            }
        }
    },
    created() {
        this.tabChange({ name: this.tab }, 1);
    }
}
</script>

<style>
.notices {
    width: 800px;
    padding: 10px;
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: 2px 2px 5px #dddddd;
}

.notices .el-pagination {
    text-align: center;
}

.notices .tab {
    margin: 10px 0px;
}

.notices .tab .item {
    display: flex;
    padding: 15px 0px;
    border-bottom: 1px solid #f0f0f0;
}

.notices .tab .item>* {
    padding: 0px 10px;
    color: #999999;
}

.notices .tab .item .img {
    width: 25px;
    height: 25px;
    padding: 15px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    background-color: #161f40;
}

.notices .tab .item .img.unread::before {
    top: 0px;
    left: 0px;
    width: 15px;
    content: '';
    height: 15px;
    position: absolute;
    border-radius: 50%;
    display: inline-block;
    background-color: red;
}

.notices .tab .item .img img {
    width: 100%;
    height: 100%;
}

.notices .tab .item .content {
    flex: 1;
}

.notices .tab .item .title {
    font-size: 18px;
    padding: 5px 0px;
    color: #444444;
}

.notices .tab .item .context {
    line-height: 28px;
}

.notices .tab .item .option i {
    cursor: pointer;
}

.notices .el-tabs__item.is-active {
    color: #161f40;
}

.notices .el-tabs__active-bar {
    background-color: #161f40;
}

.notices .el-pager li.active {
    border-color: #161f40;
    background-color: #161f40;
}
</style>

