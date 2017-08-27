function zero(x) {
    return x > 9 ? x : '0' + x
}
function formatTime(str, type) {
    var a = new Date(str);
    var year = a.getFullYear();
    var mounth = zero(a.getMonth() + 1);
    var date = zero(a.getDate());
    var hour = zero(a.getHours());
    var minutes = zero(a.getMinutes());
    var second = zero(a.getSeconds());
    var result = ""
    switch (type) {
        case "date":
            result = year + "-" + mounth + "-" + date;
            break;
        default:
            result = year + "-" + mounth + "-" + date + " " + hour + ":" + minutes + ":" + second;
    }
    return result
}
function formatNumber(str){
    return parseFloat(str?str:0).toFixed(2);
}
export { formatTime,formatNumber }