import axios from 'axios';

async function systemList({ index, size }) {
    return (await axios.post(`/msg/listSys/${index}/${size}`)).data;
}
async function personList({ index, size }) {
    return (await axios.post(`/msg/listPerson/${index}/${size}`)).data;
}
async function detail(id) {
    return (await axios.post(`/msg/query/${id}`)).data;
}
async function delPerson(id) {
    return (await axios.post(`/msg/delPersonnelMsg`, { id })).data;
}
async function delSystem(id) {
    return (await axios.post(`/msg/delSysMsg`, { id })).data;
}
async function readPerson(id) {
    return (await axios.post(`/msg/readMsg`, { id })).data;
}
async function readSystem(id) {
    return (await axios.post(`/msg/readSysMsg`, { id })).data;
}
async function statusList() {
    return (await axios.get(`/msg/statusList`)).data;
}

export {
    systemList,
    personList,
    detail,
    delPerson,
    delSystem,
    readPerson,
    readSystem,
    statusList
}
