//用户数据redux管理页面

import axios from 'axios'
import { getRedirectPath } from '../util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'  //保存登陆cookie之后的本地data
const AUTH_SUCCESS = 'AUTH_SUCCESS' //
const LOGOUT = 'LOGOUT'
const initState = {
  redirectTo: '',
  //注册完成之后前端需要完成跳转，redux来控制。
  // 现在不能写死，因为好根据用户身份，和登陆信息是否完善来进行计算后跳转。
  msg: '',
  user: '',
  type: '',
}

//reducer   回头看不太明白
export function user (state = initState, action) {
  switch(action.type) {
    case LOGOUT:
      return {...initState, redirectTo:'/login'}
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case AUTH_SUCCESS:
      return {
        ...state, 
        msg:'', 
        ...action.payload, 
        redirectTo:getRedirectPath(action.payload),
        // redirectTo:'/completeinfo',
        passWord:'',
      }//依然是纯函数
    case ERROR_MSG:
      return {
        ...state, 
        isAuth:false, 
        msg:action.msg
      }
    default:
      return  state
  }
  // return state
}

function authSuccess(obj){ 
  const {passWord,...data} = obj //过滤掉password
  return {type:AUTH_SUCCESS, payload:data}//payload是啥 http的payload则是http自身的请求/响应体
}

function errorMsg(msg) {
  return {msg, type:ERROR_MSG}
}

export function logoutSubmit() {
  return {type:LOGOUT}
}
export function login({user, passWord}) {
  if(!user || !passWord) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch=>{
    axios.post('/user/login',{user, passWord})
    .then(res=>{
      if(res.status===200 && res.data.code===0) {
          dispatch(authSuccess(res.data.data))
        } else {
          
          console.log(res, '请求失败')
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
//注册信息处理
export function regisger ({user,passWord, repeatPassWord}) {
  if (!user || !passWord) {
    return errorMsg('用户名和密码必须输入')
  }
  if (passWord !== repeatPassWord) {
    return errorMsg('密码和确认密码必须一致')
  }
  return dispatch=>{  //异步
    axios.post('/user/register', {user,passWord})  //注册信息传进去
      .then(res=>{//注意踩坑，这边passWord跟状态里面的一样才能接住值
        if (res.status === 200 && res.data.code===0) {
          dispatch(authSuccess({user,passWord}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })

  }
}
export function loadData (userinfo) {
  return {type:LOAD_DATA, payload:userinfo}
}
export function update (data) { //优化，统一修改状态，loginSucceed跟registersuccess都不需要了。
  return dispatch=>{
    axios.post('/user/update',data)
      .then(res=>{
        if(res.status===200 && res.data.code===0) {
          dispatch(authSuccess(res.data.data))
          console.log(res,'updata')
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
//通过redux里的dispatch将数据发往后端，需引入axios，axios是一个封装的ajxs请求，返回一个promise