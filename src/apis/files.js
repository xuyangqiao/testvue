import axios from 'axios'
import './axiosConfig.js'
//*************************************文件模块***********************************
// fileName string 文件存储名
// alias string 文件别名(原名/下载名)
// findex string 文件关联标识
// bindid string 数据关联ID
// url string 存储地址
// id string id
//路径规则
/*
* 总任务                   /task/任务ID/
* 子任务                   /task/子任务ID/
* 子任务阶段                /task/子任务ID/阶段ID/            任务名称-阶段名称-版本号
* 聊天文件
* 作品集                   /user-info/用户ID/exhibition
* 企业认证                 /user-info/用户ID/company
* 用户实名认证              /user-info/用户ID/carded
* 用户头像                 /user-info/用户ID/head
* */

/*
* 用户头像				        head
* 用户身份证			            idcard
* 用户作品集			            samplereels
* 任务招标封面			        cover
* 任务附件				        enclosure    (子任务也是)
* 前端        B 用户 上传参考图	referencechart
* 前端        B 用户 上传参考案例	referencecase
* 企业营业执照复印件	            businesslicense
* */
//添加文件
async function addFile(map) {
    // fileName, alias, findex, bindid, url
    const res = await axios.post(`/file/add`, JSON.stringify(map));
    return res.data
}
//添加多个文件
async function addFileList(fileList) {
    const res = await axios.post(`/file/addList`, fileList);
    return res.data;
}
//查询单个文件
async function getFile(findex = "", bindid = "", id = "") {
    let map = { findex, bindid, id };
    const res = await axios.post(`/file/get`, JSON.stringify(map));
    return res.data;
}
//查询多个文件
async function getAllFile(findex = "", bindid = "") {
    const res = await axios.post(`file/getAll`, JSON.stringify({ findex, bindid }));
    return res.data;
}
//查询多个文件
async function getAllFileWithPage(findex = "", bindid = "", page = 1, row = 10) {
    const map = {
        findex,
        bindid
    };
    const res = await axios.post(`/file/list/${page}/${row}`, JSON.stringify(map));
    return res.data;
}
//修改文件
async function updateFile({ fileName, alias, findex, bindid, url, id }) {
    let map = { fileName, alias, findex, bindid, url, id };
    await axios.post(`/file/update`, JSON.stringify(map))
}
//删除文件
async function deleteFileByParam(bindid, findex) {
    const map = {
        bindid,
        findex
    };
    const res = await axios.post(`/file/deleteByParam`, map);
    return res.data;
}
//获取oss信息
async function getOSSConfig() {
    const res = await axios.post(`/oss/getOSSConfig`);
    return res.data
}
//根据id批量删除文件
async function deleteFileByIds(idList) {
    const res = await axios.post(`/file/deleteByIds`, idList);
    return res.data
}


//获取文件版本列表
async function getFileVersionList() {
    const res = await axios.get(`/dataSource/getFileVersion`);
    return res.data;
}

export {
    addFile,
    addFileList,
    getFile,
    getAllFile,
    getAllFileWithPage,
    updateFile,
    deleteFileByParam,
    deleteFileByIds,
    getOSSConfig,

    getFileVersionList,
}
