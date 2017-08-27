import axios from 'axios'

//用户提现
async function addAtms({atmType, money, name, cardNum, bankName}) {//提现方式 1.支付宝 2银行卡
    const res = await axios.post(`/atms/add`, JSON.stringify({atmType, money, name, cardNum, bankName}))
    return res.data;
}
//B查询用户余额
async function getMoney({userId}) {
    const res = await axios.get(`/money/getMoney?userId=` + userId);
    return res.data;
}
// //V查询支付账单列表
// async function getRechargeRecordList({type, page = 1, row = 10}) {//类型（支付任务佣金，任务退款，充值，提现）
//     const res = await axios.post(`/recharge/recordList/${page}/${row}`, JSON.stringify({type}));
//     return res.data;
// }
//取消提现
async function updataAtoms({id}) {
    const res = await axios.POST(`/atms/update` + JSON.stringify({id}));//提现订单id
    return res.data;
}
//充值
async function addRecharge({money}) {
    const res = await axios.post(`/recharge/add`, JSON.stringify({money}));
    return res.data;
}
//支付宝下单
async function getAliapyInfo({outTradeNo, subject, totalFee, body}) {
    const res = await axios.post(`/alipay/getAliapyInfo`, JSON.stringify({outTradeNo, subject, totalFee, body}));
    return res.data;
}
//微信下单
async function createWXPayOrder({orderId, attach}) {
    const res = await axios.post(`/wxpay/createOrder`, JSON.stringify({orderId, attach}));
    return res.data;
}
//订单支付查看
async function checkByOrderId({orderId, type}) {//订单类型，1：支付 2：充值
    const res = await axios.post(`/order/checkByOrderId`, JSON.stringify({orderId, type}));
    return res.data;//1.申请支付中 2.支付成功 3.支付失败
}
//修改
async function updataRecharge({orderId, state}) {
    const res = await axios.post(`/recharge/update`, JSON.stringify({orderId, state}));//状态1.创建 2.支付成功 3支付失败
    return res.data;
}
//查询订单
async function rechargeList({type, page = 1, row = 10}) {
    const res = await axios.post(`/recharge/list/${page}/${row}`, JSON.stringify({type}));//类型（支付任务佣金，任务退款，充值，提现）
    return res.data;
}
//子订单选择支付
async function addOrder({subtaskId}) {
    const res = await axios.post(`/order/add`, JSON.stringify({subtaskId}));
    return res.data;
}
//取消支付订单
async function cancelOrder({orderId}) {
    const res = await axios.post(`/order/cancel`, JSON.stringify({orderId}));
    return res.data;
}
//s给v打款
async function SToVpayMoney({id}) {
    const res = await axios.post(`/order/payMoney`, JSON.stringify({id}));
    return res.data;
}
//s给v打款页面信息
async function SToVTopayMoney({id}) {
    const res = await axios.post(`/order/toPayMoney`, JSON.stringify({id}));
    return res.data;
}
//余额支付
async function balancePay({orderId}) {
    const res = await axios.post(`/balance/payment`, JSON.stringify({orderId}));
    return res.data;
}

export{
    addAtms,
    getMoney,
    // getRechargeRecordList,
    updataAtoms,
    addRecharge,
    getAliapyInfo,
    createWXPayOrder,
    checkByOrderId,
    updataRecharge,
    rechargeList,
    addOrder,
    cancelOrder,
    SToVpayMoney,
    SToVTopayMoney,
    balancePay
}
