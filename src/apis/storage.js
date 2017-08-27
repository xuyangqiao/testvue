function getUser() {
  if(sessionStorage.getItem('LoginUser')){
    return JSON.parse(sessionStorage.getItem('LoginUser'))
  }else{
    return {}
  }
}
function getUserInfo() {
  if(sessionStorage.getItem('UserInfo')){
    return JSON.parse(sessionStorage.getItem('UserInfo'))
  }else{
    return {}
  }
}
function getTaskParam(){
    if(sessionStorage.getItem('TaskParam')){
    return JSON.parse(sessionStorage.getItem('TaskParam'))
  }else{
    return {}
  }
}
function isLogin(){
  const user=getUser();
  const token=sessionStorage.getItem('user_token')
  return user.userId&&token?true:false
}
export {getUser,getUserInfo,getTaskParam,isLogin}