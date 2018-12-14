//把用户列表抽离成聊天对象的列表，牛人页展示boss对象，boss展示牛人对象

import axios from 'axios'

// action
const USER_LIST = 'USER_LIST'


const initState = {
  userlist:[]
}

//actionCreator
function userList (data) {
  return { type:USER_LIST, payload:data}
}

//reducer
export function chatuser (state=initState, action) {
  switch(action.type) {
    case USER_LIST:
      return {...state, userlist:action.payload}
    default:
      return state
  }
}


//用户列表
export function getUserListAll(type) {
  return dispatch=>{
    axios.get('user/list')//获取用户列表
      .then(res=>{
        if(res.data.code === 0)  {
          
          dispatch(userList(res.data.data))
          console.log(res.data.data)
        }
      })
  }
}