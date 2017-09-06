function getUser() {
  if(localStorage.getItem('LoginUser')){
    return JSON.parse(localStorage.getItem('LoginUser'))
  }else{
    return {}
  }
}
function getUserInfo() {
  if(localStorage.getItem('UserInfo')){
    return JSON.parse(localStorage.getItem('UserInfo'))
  }else{
    return {}
  }
}
function getTaskParam(){
    if(localStorage.getItem('TaskParam')){
    return JSON.parse(localStorage.getItem('TaskParam'))
  }else{
    return {}
  }
}
function isLogin(){
  const user=getUser();
  const token=localStorage.getItem('user_token')
  return user.userId&&token?true:false
}
export {getUser,getUserInfo,getTaskParam,isLogin}