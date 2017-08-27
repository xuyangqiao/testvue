import axios from 'axios'
import { addFile } from './files'
//登陆
async function Login({ phone, password }) {
    const res = await axios.post(`/user/login`, JSON.stringify({ phone, password }))
    return res.data;
}
//注册
async function Register({ phone, password, userType, code, type }) {
    let param = {
        phone: phone,
        password: password,
        userType: userType,
        code: code,
        type: type,
        headUrl: 'http://vsdata.oss-cn-hangzhou.aliyuncs.com/head.jpg'
    }
    const res = await axios.post("/user/register", JSON.stringify(param))
    return res.data;
}
async function UpdateForgetPwd({ phone, password, type, code }) {
    const res = await axios.post("/user/updateForgetPwd", JSON.stringify({ phone, password, type, code }));
    return res.data
}

async function test() {
    const res = await axios.get("/dataSource/getTaskParam")
    return res.data.data;
}
//获取图片验证码
async function ImgageCode(type) {
    const res = await axios.get("/verification/imgageCode?type=" + type)
    return res.data;
}
//获取短信验证码
async function PhoneCode({ phone, type, sessionId, imgCode }) {
    let param = { phone, type, sessionId, imgCode }
    let queryString = "?";
    let b = [];
    Object.keys(param).map((key) => {
        b.push(key + "=" + param[key])
    })
    queryString = queryString + b.join("&")
    const res = await axios.get("/verification/phoneCode" + queryString)
    return res.data;
}

export { Login, Register, UpdateForgetPwd, test, ImgageCode, PhoneCode }
