import axios from 'axios'
import moment from 'moment'


async function getTackParam() {
    const res = await axios.get('dataSource/getTaskParam');
    return res.data.data;
}
async function TaskList({ appType, appAreas, packageType, state = 0, page = 1, row = 12, groupId }) {
    const res = await axios.post(`/task/list/${page}/${row}`, JSON.stringify({ appType, appAreas, state, packageType, groupId }))
    return res.data.data;
}
async function TaskInfoById(id) {
    const res = await axios.get(`/task/query/${id}`);
    res.data.data.taskEndTime == "Invalid date" && (res.data.data.taskEndTime = "");
    return res.data;
}
async function TaskAdd(state, { projectName, packageType, totalType, total, appAreas, vevironments, appType, groupId, taskEndTime, logo, referImg, remarks }) {
    // entryEndTime=moment(entryEndTime).format("YYYY-MM-DD HH:mm:ss");
    taskEndTime = moment(taskEndTime).format("YYYY-MM-DD HH:mm:ss");
    const res = await axios.post(`/task/save/${state}`, { projectName, packageType, totalType, total, appAreas, vevironments, appType, groupId, taskEndTime, logo, referImg, remarks })
    return res.data;
}
async function TaskSave(state, { id, projectName, packageType, totalType, total, appAreas, vevironments, appType, groupId, taskEndTime, logo, referImg, remarks }) {
    taskEndTime = moment(taskEndTime).format("YYYY-MM-DD HH:mm:ss");
    const res = await axios.post(`/task/update/${state}`, { id, projectName, packageType, totalType, total, appAreas, vevironments, appType, groupId, taskEndTime, logo, referImg, remarks })
    return res.data;
}
//锁定
async function TaskLock(id) {
    const res = await axios.post(`/task/lock/${id}`)
    return res.data;
}
//通过
async function TaskPass(id) {
    const res = await axios.get(`/task/adopt/${id}`)
    return res.data;
}
//驳回
async function TaskReject(id, remarks) {
    const res = await axios.post(`/task/repulse/${id}`, JSON.stringify({ remarks }))
    return res.data;
}

//创建任务组
async function CreateGroup(groupName) {
    const res = await axios.post(`/taskGroup/save`, JSON.stringify({ groupName }))
    return res.data;
}
//*****************************子任务************************************
async function getSubTaskParam(id) {
    const res = await axios.get(`/dataSource/getSubTaskParam/${id}`)
    return res.data;
}
//任务墙
async function taskWall({ appType, appAreas, packageType, state, page, row }) {
    const res = await axios.post(`/taskWall/list/${page}/${row}`, JSON.stringify({ appType, appAreas, packageType: 0, state }))
    return res.data.data;
}
//子任务列表
async function subTaskList({ appType, appAreas, packageType, state, vUserId, page, row, groupId }) {
    const res = await axios.post(`/subtask/list/${page}/${row}`, JSON.stringify({ appType, appAreas, packageType, state, vUserId, groupId }))
    return res.data.data;
}
//创建子任务
async function CreateChildTask(taskInfo, state) {
    let { modelStyle, chartlatFormat, chartlatProperty1, rangeTime } = taskInfo;
    if (Array.isArray(modelStyle)) {
        modelStyle = modelStyle.join(',');
    }
    // if(Array.isArray(chartlatFormat)){
    //     chartlatFormat=chartlatFormat.join(',');
    // }
    if (Array.isArray(chartlatProperty1)) {
        chartlatProperty1 = chartlatProperty1.join(',');
    }
    let entryEndTime = moment(new Date(rangeTime[0])).format("YYYY-MM-DD HH:mm:ss");
    let taskEndTime = moment(new Date(rangeTime[1])).format("YYYY-MM-DD HH:mm:ss");
    const res = await axios.post(`/subtask/save/${state}`, { ...taskInfo, modelStyle, chartlatFormat, chartlatProperty1, entryEndTime, taskEndTime })
    return res.data;
}
//保存更新子任务
async function UpdateChildTask(taskInfo, state) {
    let { modelStyle, chartlatFormat, chartlatProperty1, rangeTime } = taskInfo;
    if (Array.isArray(modelStyle)) {
        modelStyle = modelStyle.join(',');
    }
    // if(Array.isArray(chartlatFormat)){
    //     chartlatFormat=chartlatFormat.join(',');
    // }
    if (Array.isArray(chartlatProperty1)) {
        chartlatProperty1 = chartlatProperty1.join(',');
    }
    let entryEndTime = moment(new Date(rangeTime[0])).format("YYYY-MM-DD HH:mm:ss");
    let taskEndTime = moment(new Date(rangeTime[1])).format("YYYY-MM-DD HH:mm:ss");
    const res = await axios.post(`/subtask/update/${state}`, { ...taskInfo, modelStyle, chartlatFormat, chartlatProperty1, entryEndTime, taskEndTime })
    return res.data;
}
//保存更新子任务,至少用来确认，只带2个参数
async function UpdateChildTaskForSure(taskInfo, state) {
    const res = await axios.post(`/subtask/update/${state}`, taskInfo)
    return res.data;
}
// 根据ID查询子任务
async function ChildTaskInfo(id) {
    const res = await axios.get(`/subtask/query/${id}`)
    return res.data;
}
//删除总任务
async function DeleteTaskInfo(id) {
    const res = await axios.get(`/subtask/delete/${id}`)
    return res.data;
}
//根据总任务查子任务列表
async function ChildTaskList(id) {
    const res = await axios.get(`/subtask/queryList/${id}`)
    return res.data;
}
//子任务支付
async function PayChildTask(id) {
    const res = await axios.get(`/subtask/paySuccess/${id}`)
    return res.data;
}


//****************************子任务阶段***********************************
async function CreateChildTaskStage({ stageName, stageRemarks, stageEndTime }, taskId) {
    stageEndTime = moment(stageEndTime).format("YYYY-MM-DD HH:mm:ss");
    const res = await axios.post(`/taskstage/save`, { stageName, stageRemarks, stageEndTime, taskId })
    return res.data;
}
async function ChildTaskStageList(id) {
    const res = await axios.get(`/taskstage/queryList/${id}`)
    return res.data;
}


//删除阶段
async function RemoveStage(id) {
    const res = await axios.get(`/taskstage/delete/${id}`);
    return res.data;
}

//创建任务组
async function SaveTaskGroup(groupName) {
    const res = await axios.post(`/taskGroup/save`, JSON.stringify({ groupName }));
    return res.data;
}
function TaskState(role, state) {
    const map = {
        B: ["草稿", "审核中", "审核中", "未通过", "已受理", "已完成"],
        S: ["", "待审核", "审核中", "", "已受理", "已完成"],
        V: ["", "", "", "", "", ""]
    }
    return map[role][state]
}
function ChildTaskState(role, state) {
    const map = {
        B: ["", "待确认", "待支付", "支付中", "征集中", "制作中", "验收中", "已完成", "已完成", "退款申请中", "已关闭"],
        S: ["草稿", "待确认", "待支付", "待支付", "征集中", "制作中", "验收中", "已完成", "已打款", "退款申请中", "已关闭"],
        V: ["", "", "", "", "征集中", "制作中", "验收中", "已完成", "已打款", "退款申请中", "已关闭"]
    }
    if (state !== undefined) {
        return map[role][state]
    } else {
        return map[role]
    }
}
//*************************************子任务报名***********************************
//任务报名
async function SubentrySignUp(subTaskId) {
    const res = await axios.post(`/subentry/signUp/${subTaskId}`);
    return res.data;
}
//退出报名
async function SubentrySignOff(subTaskId) {
    const res = await axios.post(`/subentry/signOff/${subTaskId}`);
    return res.data;
}
//根据子任务id查询报名列表
async function SubentryList(subtaskId, seekValue, state = 1, page = 1, row = 12) {
    const res = await axios.post(`/subentry/list/${state}/${page}/${row}`, JSON.stringify({ subtaskId, seekValue }))
    return res.data;
}
//根据子任务id验证是否报名
async function SubentryCheckSign(subTaskId) {
    const res = await axios.get(`/subentry/checkSign/${subTaskId}`)
    return res.data;
}
//分配任务
async function AssignedTask(id, vUserId, state) {
    const res = await axios.post(`/subtask/assignedTask`, JSON.stringify({ id, vUserId, state }))
    return res.data;
}
//验收任务
async function AcceptanceTask(id) {
    const res = await axios.post(`/subtask/acceptanceTask`, JSON.stringify({ id }))
    return res.data;
}
//完成验收任务
async function AccomplishTask(id) {
    const res = await axios.post(`/subtask/accomplishTask`, JSON.stringify({ id }))
    return res.data;
}
//驳回验收任务
async function OverruleTask(id, remarks) {
    const res = await axios.post(`/subtask/overruleTask`, JSON.stringify({ id, remarks }))
    return res.data;
}
//banner列表
async function BannerlistAll(state) {
    const res = await axios.post(`/banner/listAll`, JSON.stringify({ state }))
    return res.data;
}
//banner列表
async function getTalkByGroupId(taskId) {
    const res = await axios.post(`/talk/getTalkByGroupId`, JSON.stringify({ taskId }))
    return res.data;
}
///task/updateTotal
async function UpdateTotal({ id, totalType, total }) {
    const res = await axios.post(`/task/updateTotal`, JSON.stringify({ id, totalType, total }))
    return res.data;
}
//添加聊天记录
async function saveChatMsg({ time, data, fromUser, toUser, groupId }) {
    const res = await axios.post(`/chatMsg/saveChatMsg`, JSON.stringify({ time, data, fromUser, toUser, groupId }))
    return res.data;
}
//查看聊天记录
async function getChatMsgList({ currentPage, pageSize, groupId, time }) {
    const res = await axios.post(`/chatMsg/getChatMsgList`, JSON.stringify({ currentPage, pageSize, groupId, time }))
    return res.data;
}
async function entryList({ page, row, appType, appAreas, packageType, state = 4, vUserId }) {
    const res = await axios.post(`/subtask/entryList/${page}/${row}`, JSON.stringify({ appType, appAreas, packageType, state, entryVUserId: vUserId }))
    return res.data.data;
}
async function getChatConfig() {
    const res = await axios.get(`/dataSource/getChatConfig`)
    return res.data;
}
///verification/vsendToS
async function vsendToS(vPhone, sPhone, msg, projectName) {
    const res = await axios.post(`/verification/vsendToS`, JSON.stringify({ vPhone, sPhone, msg, projectName }))
    return res.data;
}

//申请退款
async function applyRefund(subtaskId, percent, exitReason) {
    const res = await axios.post(`/order/applyRefund`, JSON.stringify({ subtaskId, percent, exitReason }))
    return res.data;
}


//保存组修改
async function saveGroup(id, groupName) {
    const res = await axios.post(`/taskGroup/update`, JSON.stringify({ id, groupName }));
    return res.data;
}

//删除组修改
async function removeGroup(id) {
    const res = await axios.get(`/taskGroup/delete/${id}`);
    return res.data;
}


export {
    vsendToS,
    getChatConfig,
    entryList,
    saveChatMsg,
    getChatMsgList,
    UpdateTotal,
    getTalkByGroupId,
    SubentrySignUp,
    SubentrySignOff,
    SubentryList,
    SubentryCheckSign,

    TaskState,
    ChildTaskState,

    getTackParam,
    TaskList,
    TaskInfoById,
    TaskAdd,
    TaskSave,

    CreateGroup,
    taskWall,
    subTaskList,

    getSubTaskParam,
    CreateChildTask,
    UpdateChildTask,
    UpdateChildTaskForSure,
    ChildTaskInfo,
    DeleteTaskInfo,
    ChildTaskList,
    PayChildTask,

    CreateChildTaskStage,
    ChildTaskStageList,
    DeleteChildTaskStage,
    TaskLock,
    TaskPass,
    TaskReject,

    SaveTaskGroup,


    AssignedTask,
    AcceptanceTask,
    AccomplishTask,
    OverruleTask,
    BannerlistAll,

    SaveStage,
    RemoveStage,

    applyRefund,

    saveGroup,
    removeGroup
}
